'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/auth';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';
import { POST_TYPES, type ActionState, type PostTypeValue } from '@/lib/admin-types';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function parseTags(raw: string): string[] {
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Create a draft post, then go to its edit page. */
export async function createPost(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireRole(['admin', 'editor']);
  const type = String(formData.get('type') ?? '') as PostTypeValue;
  const title = String(formData.get('title') ?? '').trim();
  let slug = String(formData.get('slug') ?? '').trim() || slugify(title);

  if (!POST_TYPES.includes(type)) return { error: 'Choose a content type.' };
  if (!title) return { error: 'A title is required.' };
  if (!slug) return { error: 'A slug is required.' };

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('posts')
    .insert({ type, title, slug, status: 'draft' })
    .select('id')
    .single();

  if (error) {
    return { error: error.code === '23505' ? 'That slug is already in use.' : error.message };
  }
  redirect(`/dashboard/content/${data.id}`);
}

/** Save the editable fields of a post. */
export async function updatePost(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireRole(['admin', 'editor']);
  const id = String(formData.get('id') ?? '');
  const title = String(formData.get('title') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim();
  if (!id) return { error: 'Missing id.' };
  if (!title || !slug) return { error: 'Title and slug are required.' };

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from('posts')
    .update({
      type: String(formData.get('type') ?? '') as PostTypeValue,
      title,
      slug,
      excerpt: String(formData.get('excerpt') ?? '').trim() || null,
      body: String(formData.get('body') ?? '') || null,
      tags: parseTags(String(formData.get('tags') ?? '')),
      seo_title: String(formData.get('seo_title') ?? '').trim() || null,
      seo_description: String(formData.get('seo_description') ?? '').trim() || null,
    })
    .eq('id', id);

  if (error) {
    return { error: error.code === '23505' ? 'That slug is already in use.' : error.message };
  }
  revalidatePath('/dashboard/content');
  return { ok: true };
}

/** Publish or revert a post to draft. */
export async function setPostStatus(id: string, status: 'draft' | 'published') {
  await requireRole(['admin', 'editor']);
  const supabase = createSupabaseServerClient();
  await supabase
    .from('posts')
    .update({ status, ...(status === 'published' ? { published_at: new Date().toISOString() } : {}) })
    .eq('id', id);
  revalidatePath('/dashboard/content');
  redirect(`/dashboard/content/${id}`);
}

export async function deletePost(id: string) {
  await requireRole(['admin', 'editor']);
  const supabase = createSupabaseServerClient();
  await supabase.from('posts').delete().eq('id', id);
  revalidatePath('/dashboard/content');
  redirect('/dashboard/content');
}

/** Upload a cover image to the public `media` bucket and set it on the post. */
export async function uploadCover(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireRole(['admin', 'editor']);
  const id = String(formData.get('id') ?? '');
  const file = formData.get('file') as File | null;
  if (!id) return { error: 'Missing id.' };
  if (!file || file.size === 0) return { error: 'Choose an image.' };
  if (!file.type.startsWith('image/')) return { error: 'That file is not an image.' };
  if (file.size > 8 * 1024 * 1024) return { error: 'Image is too large (8MB max).' };

  const admin = createSupabaseAdminClient();
  const path = `posts/${id}/cover-${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-60)}`;
  const { error: upErr } = await admin.storage
    .from('media')
    .upload(path, file, { contentType: file.type, upsert: true });
  if (upErr) return { error: upErr.message };

  const { data: pub } = admin.storage.from('media').getPublicUrl(path);
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('posts').update({ cover_image: pub.publicUrl }).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/dashboard/content');
  return { ok: true };
}
