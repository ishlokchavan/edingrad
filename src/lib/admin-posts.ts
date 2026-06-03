import 'server-only';

import { createSupabaseServerClient } from '@/lib/supabase/server';

/** Posts list for staff (all statuses — RLS posts_editor_all grants this). */
export interface AdminPostRow {
  id: string;
  type: string;
  slug: string;
  title: string;
  status: string;
  published_at: string | null;
  updated_at: string;
}

export async function listAllPosts(): Promise<AdminPostRow[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('posts')
    .select('id,type,slug,title,status,published_at,updated_at')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export interface AdminPost extends AdminPostRow {
  excerpt: string | null;
  body: string | null;
  cover_image: string | null;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
}

export async function getPostById(id: string): Promise<AdminPost | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('posts')
    .select('id,type,slug,title,status,published_at,updated_at,excerpt,body,cover_image,tags,seo_title,seo_description')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}
