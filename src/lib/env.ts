/**
 * Environment contract.
 *
 * Values are read at call time (not module load) so a missing secret never
 * crashes the build — only the code path that actually needs it. Secrets live
 * in Vercel env vars (and `.env.local` for local dev); never commit them.
 *
 * `NEXT_PUBLIC_*` vars are inlined into the client bundle by Next.js and must be
 * referenced literally (see `supabase/client.ts`). The accessors here are for
 * server code.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Set it in Vercel project settings (or .env.local for local dev).`,
    );
  }
  return value;
}

/** True if a var is present and non-empty, without throwing. */
export function hasEnv(name: string): boolean {
  return Boolean(process.env[name]);
}

export const env = {
  // Supabase
  supabaseUrl: () => required('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: () => required('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  /** Service role bypasses RLS — server-only, never expose to the client. */
  supabaseServiceRoleKey: () => required('SUPABASE_SERVICE_ROLE_KEY'),

  // Brevo (transactional email)
  brevoApiKey: () => required('BREVO_API_KEY'),
  brevoSenderEmail: () => process.env.BREVO_SENDER_EMAIL ?? 'no-reply@edingrad.com',
  brevoSenderName: () => process.env.BREVO_SENDER_NAME ?? 'Edingrad',
  /** Inbox that receives lead / application notifications. */
  teamInboxEmail: () => required('TEAM_INBOX_EMAIL'),
} as const;

/** Names of the env vars the app expects, for the health check. */
export const EXPECTED_ENV = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'BREVO_API_KEY',
  'TEAM_INBOX_EMAIL',
] as const;
