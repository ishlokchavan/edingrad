import 'server-only';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export type PostType = 'press' | 'insight' | 'resource';

/** URL section slug (under /who-we-are) -> posts.type enum value. */
export const POST_SECTIONS: Record<string, PostType> = {
  press: 'press',
  insights: 'insight',
  resources: 'resource',
};

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string | null;
  published_at: string | null;
  tags: string[];
}

export interface PostFull extends PostSummary {
  body: string | null;
  cover_image: string | null;
}

/** Published posts of a type, newest first. RLS also restricts to published. */
export async function listPosts(type: PostType): Promise<PostSummary[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('posts')
    .select('slug,title,excerpt,published_at,tags')
    .eq('type', type)
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

/** A single published post, or null if not found / not published. */
export async function getPost(type: PostType, slug: string): Promise<PostFull | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('posts')
    .select('slug,title,excerpt,published_at,tags,body,cover_image')
    .eq('type', type)
    .eq('status', 'published')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}
