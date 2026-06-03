import { NextResponse } from 'next/server';
import { EXPECTED_ENV, hasEnv } from '@/lib/env';

/**
 * Health check — confirms the server runtime is alive and reports which
 * expected env vars are configured. Booleans only; never echoes secret values.
 * Used to verify the Vercel ↔ Supabase ↔ Brevo pipeline (build-plan Phase 0).
 */
export const dynamic = 'force-dynamic';

export function GET() {
  const env = Object.fromEntries(EXPECTED_ENV.map((name) => [name, hasEnv(name)]));
  const configured = Object.values(env).every(Boolean);

  return NextResponse.json({
    status: 'ok',
    service: 'edingrad',
    runtime: 'server',
    configured,
    env,
    time: new Date().toISOString(),
  });
}
