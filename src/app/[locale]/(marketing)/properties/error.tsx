'use client';

import { useEffect } from 'react';
import { Link } from '@/i18n/navigation';

/** Error boundary for the properties routes. A failed data fetch (e.g. the
 *  Supabase backend being unreachable) renders this branded screen with a
 *  retry, instead of Next.js's generic "Application error" crash. */
export default function PropertiesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Properties route error:', error);
  }, [error]);

  return (
    <div className="error-screen">
      <div className="wrap error-inner">
        <span className="error-logo">
          <span className="site-logo-mark" /> Edingrad
        </span>
        <h1>Properties are temporarily unavailable.</h1>
        <p className="lead">
          We couldn’t load listings right now. Please try again in a moment.
        </p>
        <div className="site-hero-actions">
          <button type="button" className="btn" onClick={() => reset()}>
            Try again
          </button>
          <Link href="/" className="btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
