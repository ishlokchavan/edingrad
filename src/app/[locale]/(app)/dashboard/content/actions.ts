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

const MEDIA_MAX = 12 * 1024 * 1024;
const DOC_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

function storagePathFromPublicUrl(url: string): string | null {
  const marker = '/object/public/media/';
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}

async function uploadToMedia(file: File, kind: string, postId: string): Promise<string> {
  const admin = createSupabaseAdminClient();
  const name = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-60);
  const path = `posts/${postId}/${kind}-${crypto.randomUUID()}-${name}`;
  const { error } = await admin.storage
    .from('media')
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  return admin.storage.from('media').getPublicUrl(path).data.publicUrl;
}

async function nextSortOrder(postId: string, kind: string): Promise<number> {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from('post_assets')
    .select('sort_order')
    .eq('post_id', postId)
    .eq('kind', kind)
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data?.sort_order ?? 0) + 1;
}

/** Add a gallery image to a post. */
export async function addGalleryImage(postId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireRole(['admin', 'editor']);
  const file = formData.get('file') as File | null;
  if (!file || file.size === 0) return { error: 'Choose an image.' };
  if (!file.type.startsWith('image/')) return { error: 'That file is not an image.' };
  if (file.size > MEDIA_MAX) return { error: 'Image is too large (12MB max).' };

  try {
    const url = await uploadToMedia(file, 'gallery', postId);
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('post_assets').insert({
      post_id: postId,
      kind: 'image',
      url,
      sort_order: await nextSortOrder(postId, 'image'),
    });
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Upload failed.' };
  }
  revalidatePath('/dashboard/content');
  return { ok: true };
}

/** Add a downloadable file (PDF/DOC) to a post. */
export async function addDownload(postId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireRole(['admin', 'editor']);
  const file = formData.get('file') as File | null;
  const label = String(formData.get('label') ?? '').trim();
  if (!file || file.size === 0) return { error: 'Choose a file.' };
  if (!DOC_TYPES.has(file.type)) return { error: 'Upload a PDF or Word document.' };
  if (file.size > MEDIA_MAX) return { error: 'File is too large (12MB max).' };

  try {
    const url = await uploadToMedia(file, 'download', postId);
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('post_assets').insert({
      post_id: postId,
      kind: 'download',
      url,
      label: label || file.name,
      mime_type: file.type,
      size_bytes: file.size,
      sort_order: await nextSortOrder(postId, 'download'),
    });
    if (error) throw error;
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Upload failed.' };
  }
  revalidatePath('/dashboard/content');
  return { ok: true };
}

/** Remove an asset (DB row + best-effort storage object). */
export async function removeAsset(assetId: string, postId: string) {
  await requireRole(['admin', 'editor']);
  const supabase = createSupabaseServerClient();
  const { data: asset } = await supabase
    .from('post_assets')
    .select('url')
    .eq('id', assetId)
    .maybeSingle();

  await supabase.from('post_assets').delete().eq('id', assetId);

  const path = asset?.url ? storagePathFromPublicUrl(asset.url) : null;
  if (path) {
    await createSupabaseAdminClient().storage.from('media').remove([path]);
  }
  revalidatePath('/dashboard/content');
  redirect(`/dashboard/content/${postId}`);
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
