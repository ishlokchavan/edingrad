import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { createSupabasePublicClient } from '@/lib/supabase/server';

export const revalidate = 3600;

const STATIC_PATHS = [
  '',
  '/who-we-help',
  '/who-we-help/developers',
  '/who-we-help/asset-management',
  '/who-we-help/private-wealth',
  '/what-we-do',
  '/what-we-do/residential',
  '/what-we-do/commercial',
  '/what-we-do/off-plan',
  '/what-we-do/property-management',
  '/what-we-do/mortgage',
  '/what-we-do/currency-services',
  '/what-we-do/crypto-exchange',
  '/what-we-do/sell-instantly',
  '/who-we-are',
  '/who-we-are/about',
  '/who-we-are/press',
  '/who-we-are/insights',
  '/who-we-are/resources',
  '/who-we-are/agents',
  '/who-we-are/careers',
  '/properties',
  '/get-in-touch',
];

const POST_SECTION: Record<string, string> = { press: 'press', insight: 'insights', resource: 'resources' };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => ({
    url: `${siteUrl}${p}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7,
  }));

  try {
    const supabase = createSupabasePublicClient();
    const [posts, jobs, listings, agents] = await Promise.all([
      supabase.from('posts').select('slug,type,updated_at').eq('status', 'published'),
      supabase.from('jobs').select('slug,updated_at').eq('status', 'published'),
      supabase.from('listings').select('slug,updated_at').eq('status', 'published'),
      supabase.from('profiles').select('user_id,updated_at').eq('role', 'agent').eq('status', 'active'),
    ]);

    for (const p of posts.data ?? []) {
      const section = POST_SECTION[p.type];
      if (section) entries.push({ url: `${siteUrl}/who-we-are/${section}/${p.slug}`, lastModified: new Date(p.updated_at), changeFrequency: 'monthly', priority: 0.6 });
    }
    for (const j of jobs.data ?? []) entries.push({ url: `${siteUrl}/who-we-are/careers/${j.slug}`, lastModified: new Date(j.updated_at), changeFrequency: 'weekly', priority: 0.5 });
    for (const l of listings.data ?? []) entries.push({ url: `${siteUrl}/properties/${l.slug}`, lastModified: new Date(l.updated_at), changeFrequency: 'weekly', priority: 0.8 });
    for (const a of agents.data ?? []) entries.push({ url: `${siteUrl}/who-we-are/agents/${a.user_id}`, lastModified: new Date(a.updated_at), changeFrequency: 'monthly', priority: 0.4 });
  } catch {
    // No DB at build time — static routes still produce a valid sitemap.
  }

  return entries;
}
