import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';

const STORAGE_KEY = 'edingrad-theme';

/** Runs before paint so the saved/system theme is applied with no flash. */
const themeInitScript = `(function(){try{
  var s=localStorage.getItem('${STORAGE_KEY}');
  var t=s||(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.setAttribute('data-theme',t);
}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export const metadata: Metadata = {
  title: 'Edingrad',
  description:
    'Edingrad — a Next.js 14 server app on the Edingrad design system: Palestra and Lynx Sans, IBM Carbon tokens, and a 24-icon set.',
  applicationName: 'Edingrad',
  authors: [{ name: 'Edingrad' }],
  openGraph: {
    title: 'Edingrad',
    description: 'Blue-led, dark-first. Built on Palestra and Lynx Sans.',
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
