import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import { Shell } from '@/components/layout/Shell';

const STORAGE_KEY = 'edingrad-theme';

/** Runs before paint so the saved/system theme is applied with no flash. */
const themeInitScript = `(function(){try{
  var s=localStorage.getItem('${STORAGE_KEY}');
  var t=s||(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.setAttribute('data-theme',t);
}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export const metadata: Metadata = {
  title: 'Edingrad \u2014 Brand Guidelines',
  description:
    'The Edingrad brand and design system: philosophy, logo, typography, colour, grid, iconography, data visualisation, animation and voice.',
  applicationName: 'Edingrad Brand Guidelines',
  authors: [{ name: 'Edingrad' }],
  openGraph: {
    title: 'Edingrad \u2014 Brand Guidelines',
    description: 'The identity system behind Edingrad. Blue-led, dark-first, built on Palestra and Lynx Sans.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#161616',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  );
}
