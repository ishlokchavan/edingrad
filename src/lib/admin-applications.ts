import 'server-only';

import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';

export interface ApplicationRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  jobTitle: string | null;
  cvUrl: string | null;
  coverUrl: string | null;
}

/** Recent job applications with short-lived signed download links for the
 *  private CV / cover-letter files. Staff only (RLS job_applications_staff_read). */
export async function listApplications(): Promise<ApplicationRow[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('job_applications')
    .select('id,created_at,name,email,phone,message,cv_url,cover_letter_url, jobs(title)')
    .order('created_at', { ascending: false })
    .limit(200);
  if (error) throw error;

  const rows = data ?? [];
  const paths = rows
    .flatMap((r) => [r.cv_url, r.cover_letter_url])
    .filter((p): p is string => Boolean(p));

  const links = new Map<string, string>();
  if (paths.length > 0) {
    const admin = createSupabaseAdminClient();
    const { data: signed } = await admin.storage.from('applications').createSignedUrls(paths, 3600);
    (signed ?? []).forEach((s) => {
      if (s.path && s.signedUrl) links.set(s.path, s.signedUrl);
    });
  }

  return rows.map((r) => {
    const job = r.jobs as { title: string } | { title: string }[] | null;
    const jobTitle = Array.isArray(job) ? (job[0]?.title ?? null) : (job?.title ?? null);
    return {
      id: r.id,
      created_at: r.created_at,
      name: r.name,
      email: r.email,
      phone: r.phone,
      message: r.message,
      jobTitle,
      cvUrl: r.cv_url ? (links.get(r.cv_url) ?? null) : null,
      coverUrl: r.cover_letter_url ? (links.get(r.cover_letter_url) ?? null) : null,
    };
  });
}
