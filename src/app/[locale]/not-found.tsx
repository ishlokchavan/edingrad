import { Link } from '@/i18n/navigation';

/** Branded 404 for missing resources within a valid locale (renders inside the
 *  [locale] layout, so providers/theme are present). */
export default function NotFound() {
  return (
    <div className="error-screen">
      <div className="wrap error-inner">
        <span className="error-logo">
          <span className="site-logo-mark" /> Edingrad
        </span>
        <div className="error-code">404</div>
        <h1>This page can’t be found.</h1>
        <p className="lead">The link may be old, or the page has moved.</p>
        <div className="site-hero-actions">
          <Link href="/" className="btn">Back to home</Link>
          <Link href="/properties" className="btn-ghost">Browse properties</Link>
        </div>
      </div>
    </div>
  );
}
