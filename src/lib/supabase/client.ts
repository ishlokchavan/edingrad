'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

/**
 * Supabase client for the browser (Client Components). Uses the anon key and
 * respects Row-Level Security. The `NEXT_PUBLIC_*` vars are inlined at build
 * time, so they must be referenced literally here.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
