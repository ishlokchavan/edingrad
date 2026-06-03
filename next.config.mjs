import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Server app (not a static export): Vercel builds and runs this as a
  // standard Next.js server, so route handlers, server actions, ISR and the
  // Next image optimiser are all available out of the box.
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withNextIntl(nextConfig);
