'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { ActionState } from '@/lib/admin-types';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export async function createJob(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireRole(['admin', 'editor']);
  const title = String(formData.get('title') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim() || slugify(title);
  if (!title) return { error: 'A title is required.' };
  if (!slug) return { error: 'A slug is required.' };

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('jobs')
    .insert({ title, slug, status: 'draft' })
    .select('id')
    .single();
  if (error) return { error: error.code === '23505' ? 'That slug is already in use.' : error.message };
  redirect(`/dashboard/jobs/${data.id}`);
}

export async function updateJob(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireRole(['admin', 'editor']);
  const id = String(formData.get('id') ?? '');
  const title = String(formData.get('title') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim();
  if (!id) return { error: 'Missing id.' };
  if (!title || !slug) return { error: 'Title and slug are required.' };

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from('jobs')
    .update({
      title,
      slug,
      department: String(formData.get('department') ?? '').trim() || null,
      location: String(formData.get('location') ?? '').trim() || null,
      employment_type: String(formData.get('employment_type') ?? '').trim() || null,
      description: String(formData.get('description') ?? '') || null,
    })
    .eq('id', id);
  if (error) return { error: error.code === '23505' ? 'That slug is already in use.' : error.message };
  revalidatePath('/dashboard/jobs');
  return { ok: true };
}

export async function setJobStatus(id: string, status: 'draft' | 'published') {
  await requireRole(['admin', 'editor']);
  const supabase = createSupabaseServerClient();
  await supabase
    .from('jobs')
    .update({ status, ...(status === 'published' ? { published_at: new Date().toISOString() } : {}) })
    .eq('id', id);
  revalidatePath('/dashboard/jobs');
  redirect(`/dashboard/jobs/${id}`);
}

export async function deleteJob(id: string) {
  await requireRole(['admin', 'editor']);
  const supabase = createSupabaseServerClient();
  await supabase.from('jobs').delete().eq('id', id);
  revalidatePath('/dashboard/jobs');
  redirect('/dashboard/jobs');
}
