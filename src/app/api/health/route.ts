import { NextResponse } from 'next/server';
import { ENV_GROUPS, hasEnv } from '@/lib/env';

/**
 * Health check — confirms the server runtime is alive and reports which
 * expected env vars are configured, grouped by service. Booleans only; never
 * echoes secret values. Used to verify the Vercel ↔ Supabase ↔ Brevo pipeline
 * (build-plan Phase 0).
 */
export const dynamic = 'force-dynamic';

export function GET() {
  const services = Object.fromEntries(
    Object.entries(ENV_GROUPS).map(([service, names]) => {
      const vars = Object.fromEntries(names.map((name) => [name, hasEnv(name)]));
      return [service, { configured: Object.values(vars).every(Boolean), vars }];
    }),
  );

  const configured = Object.values(services).every((s) => s.configured);

  return NextResponse.json({
    status: 'ok',
    service: 'edingrad',
    runtime: 'server',
    configured,
    services,
    time: new Date().toISOString(),
  });
}
