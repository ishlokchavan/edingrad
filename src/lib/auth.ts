import 'server-only';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export type Role = 'admin' | 'editor' | 'agent';

export interface SessionProfile {
  userId: string;
  email: string | null;
  name: string | null;
  role: Role;
  status: string;
}

/** The signed-in user's profile, or null if not authenticated / no profile. */
export async function getSessionProfile(): Promise<SessionProfile | null> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_id,email,name,role,status')
    .eq('user_id', user.id)
    .maybeSingle();
  if (!profile) return null;

  return {
    userId: profile.user_id,
    email: profile.email,
    name: profile.name,
    role: profile.role as Role,
    status: profile.status,
  };
}

/** Require a signed-in user; redirect to /login otherwise. */
export async function requireSession(): Promise<SessionProfile> {
  const profile = await getSessionProfile();
  if (!profile) redirect('/login');
  return profile;
}

/** Require one of the given roles; redirect to /dashboard if signed in but not
 *  permitted, or /login if not signed in. */
export async function requireRole(roles: Role[]): Promise<SessionProfile> {
  const profile = await requireSession();
  if (!roles.includes(profile.role)) redirect('/dashboard');
  return profile;
}
