/** Canonical site origin, used for metadata, sitemap, robots and JSON-LD.
 *  Set NEXT_PUBLIC_SITE_URL in production (e.g. https://edingrad.com). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://edingrad.vercel.app').replace(
  /\/$/,
  '',
);
