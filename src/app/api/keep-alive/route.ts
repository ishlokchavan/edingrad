import { NextResponse } from 'next/server';
import { createSupabasePublicClient } from '@/lib/supabase/server';

/**
 * Keep-alive ping. Issues a tiny database query so Supabase registers activity
 * and the project doesn't auto-pause on the free tier (which made
 * `/properties` crash with "fetch failed" once the backend went to sleep).
 *
 * Triggered daily by the Vercel Cron entry in `vercel.json`. When the optional
 * `CRON_SECRET` env var is set, Vercel sends it as a bearer token and we reject
 * any caller that doesn't present it; without the var the endpoint is open
 * (still a harmless count, no data exposed).
 */
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ status: 'unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createSupabasePublicClient();
    const { error } = await supabase
      .from('listings')
      .select('id', { count: 'exact', head: true });
    if (error) throw error;
    return NextResponse.json({ status: 'ok', time: new Date().toISOString() });
  } catch (err) {
    console.error('Keep-alive ping failed:', err);
    return NextResponse.json(
      { status: 'error', time: new Date().toISOString() },
      { status: 500 },
    );
  }
}
