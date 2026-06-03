import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

/**
 * Run the next-intl locale middleware first, then refresh the Supabase session
 * on its response so auth cookies stay current across both.
 */
export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  return updateSession(request, response);
}

export const config = {
  // All paths except API routes, Next internals, generated metadata image
  // routes, and files with an extension (sitemap.xml/robots.txt/fonts).
  matcher: ['/((?!api|_next|_vercel|opengraph-image|twitter-image|icon|apple-icon|.*\\..*).*)'],
};
