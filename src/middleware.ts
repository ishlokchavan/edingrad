import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Run on all paths except API routes, Next internals, and files with an
  // extension (e.g. /fonts/*.woff2). Keeps /api/health and static assets clear.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
