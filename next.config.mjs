import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Server app (not a static export): Vercel builds and runs this as a
  // standard Next.js server, so route handlers, server actions, ISR and the
  // Next image optimiser are all available out of the box.
  images: {
    // Photography is served from the image CDN; the Next optimiser resizes it
    // per breakpoint and re-encodes to AVIF/WebP, so a 350px card no longer
    // downloads a 1200px source.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000, // 30 days
    remotePatterns: [
      { protocol: 'https', hostname: 'd8j0ntlcm91z4.cloudfront.net' },
    ],
  },
  experimental: {
    // Allow CV + cover-letter uploads through Server Actions (default is 1MB).
    serverActions: { bodySizeLimit: '12mb' },
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withNextIntl(nextConfig);
