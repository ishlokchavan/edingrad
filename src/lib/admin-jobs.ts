import 'server-only';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export interface AdminJobRow {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  status: string;
  published_at: string | null;
  updated_at: string;
}

export async function listAllJobs(): Promise<AdminJobRow[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('jobs')
    .select('id,slug,title,department,status,published_at,updated_at')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export interface AdminJob extends AdminJobRow {
  location: string | null;
  employment_type: string | null;
  description: string | null;
}

export async function getJobById(id: string): Promise<AdminJob | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('jobs')
    .select('id,slug,title,department,status,published_at,updated_at,location,employment_type,description')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}
