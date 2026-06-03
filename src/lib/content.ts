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
  cover_image: string | null;
}

export interface PostAsset {
  url: string;
  label: string | null;
  mime_type: string | null;
  size_bytes: number | null;
}

export interface PostFull extends PostSummary {
  body: string | null;
  gallery: PostAsset[];
  downloads: PostAsset[];
}

/** Published posts of a type, newest first. RLS also restricts to published. */
export async function listPosts(type: PostType): Promise<PostSummary[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('posts')
    .select('slug,title,excerpt,published_at,tags,cover_image')
    .eq('type', type)
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

/** A single published post with its gallery + downloads, or null. */
export async function getPost(type: PostType, slug: string): Promise<PostFull | null> {
  const supabase = createSupabaseServerClient();
  const { data: post, error } = await supabase
    .from('posts')
    .select('id,slug,title,excerpt,published_at,tags,cover_image,body')
    .eq('type', type)
    .eq('status', 'published')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  if (!post) return null;

  const { data: assets, error: assetErr } = await supabase
    .from('post_assets')
    .select('kind,url,label,mime_type,size_bytes,sort_order')
    .eq('post_id', post.id)
    .order('sort_order', { ascending: true });
  if (assetErr) throw assetErr;

  const pick = (kind: string): PostAsset[] =>
    (assets ?? [])
      .filter((a) => a.kind === kind)
      .map(({ url, label, mime_type, size_bytes }) => ({ url, label, mime_type, size_bytes }));

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    published_at: post.published_at,
    tags: post.tags,
    cover_image: post.cover_image,
    body: post.body,
    gallery: pick('image'),
    downloads: pick('download'),
  };
}

/** Human-readable file size, e.g. "1.2 MB". */
export function formatBytes(bytes: number | null): string | null {
  if (!bytes || bytes <= 0) return null;
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}
