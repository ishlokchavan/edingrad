import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Edingrad',
    short_name: 'Edingrad',
    description: 'Edingrad: investment advisory and property in Dubai.',
    start_url: '/',
    display: 'standalone',
    background_color: '#161616',
    theme_color: '#161616',
    icons: [{ src: '/icon', sizes: '32x32', type: 'image/png' }],
  };
}
