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

  // Brevo (transactional email over SMTP relay)
  brevoSmtpUser: () => required('BREVO_SMTP_USER'),
  brevoSmtpKey: () => required('BREVO_SMTP_KEY'),
  brevoFromEmail: () => required('BREVO_FROM_EMAIL'),
  brevoFromName: () => process.env.BREVO_FROM_NAME ?? 'Edingrad',
  /** Inbox that receives lead / application notifications (defaults to the sender). */
  teamInboxEmail: () => process.env.TEAM_INBOX_EMAIL || env.brevoFromEmail(),
} as const;

/** Env vars grouped by service, for the health check. */
export const ENV_GROUPS = {
  supabase: [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
  ],
  brevo: ['BREVO_SMTP_USER', 'BREVO_SMTP_KEY', 'BREVO_FROM_EMAIL'],
} as const satisfies Record<string, readonly string[]>;
