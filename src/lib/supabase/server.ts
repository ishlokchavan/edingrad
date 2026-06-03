import 'server-only';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';
import type { Database } from './types';

/**
 * Supabase client for Server Components, Route Handlers and Server Actions.
 * Anon key + the user's session cookies, so Row-Level Security applies as the
 * signed-in user (or anon).
 */
export function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient<Database>(env.supabaseUrl(), env.supabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // `setAll` is called from a Server Component (read-only cookies).
          // Safe to ignore when session refresh is handled by middleware.
        }
      },
    },
  });
}

/**
 * Privileged client using the service role key. **Bypasses RLS** — use only in
 * trusted server code (admin tasks, bulk imports, webhooks). Never import this
 * into client code or expose its key.
 */
export function createSupabaseAdminClient() {
  return createClient<Database>(env.supabaseUrl(), env.supabaseServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Anonymous, cookie-less client for read-only public data in contexts where
 * request cookies aren't available (sitemap, OG images). RLS-restricted to
 * published rows.
 */
export function createSupabasePublicClient() {
  return createClient<Database>(env.supabaseUrl(), env.supabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
