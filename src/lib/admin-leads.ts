import 'server-only';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export interface LeadRow {
  id: string;
  created_at: string;
  type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  audience: string | null;
  source_page: string | null;
  status: string;
}

/** Recent leads — admin only (RLS leads_admin_read). */
export async function listLeads(): Promise<LeadRow[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('leads')
    .select('id,created_at,type,name,email,phone,audience,source_page,status')
    .order('created_at', { ascending: false })
    .limit(200);
  if (error) throw error;
  return data ?? [];
}
