import 'server-only';

import { createSupabasePublicClient } from '@/lib/supabase/server';

export interface JobSummary {
  slug: string;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  published_at: string | null;
}

export interface JobFull extends JobSummary {
  id: string;
  description: string | null;
}

/** Published jobs, newest first. RLS also restricts to published. */
export async function listJobs(): Promise<JobSummary[]> {
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from('jobs')
      .select('slug,title,department,location,employment_type,published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

/** A single published job, or null. */
export async function getJob(slug: string): Promise<JobFull | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from('jobs')
    .select('id,slug,title,department,location,employment_type,published_at,description')
    .eq('status', 'published')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}
