import { createServerClient } from '@supabase/ssr';
import { type NextRequest, type NextResponse } from 'next/server';

/**
 * Refresh the Supabase auth session on each request and persist rotated cookies
 * onto the given response (which next-intl has already produced). Uses the
 * public URL + anon key, referenced literally so they inline into the Edge
 * middleware bundle.
 */
export async function updateSession(request: NextRequest, response: NextResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Not configured (e.g. local dev without env): skip session refresh.
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Touch the user to refresh an expiring session (writes rotated cookies).
  await supabase.auth.getUser();
  return response;
}
