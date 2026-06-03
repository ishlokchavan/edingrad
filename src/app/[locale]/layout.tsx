import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import '../globals.css';
import { ThemeProvider } from '@/lib/theme';
import { SiteHeader } from '@/components/site/Header';
import { SiteFooter } from '@/components/site/Footer';

const STORAGE_KEY = 'edingrad-theme';

/** Light-first (build-plan §1): saved preference, else light. Applied pre-paint. */
const themeInitScript = `(function(){try{
  var s=localStorage.getItem('${STORAGE_KEY}');
  document.documentElement.setAttribute('data-theme', s || 'light');
}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: { default: t('metaTitle'), template: '%s · Edingrad' },
    description: t('metaDescription'),
    applicationName: 'Edingrad',
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), type: 'website' },
  };
}

export const viewport: Viewport = {
  themeColor: '#161616',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <a href="#main" className="skip-link">
              {messages.common && (messages.common as { skipToContent: string }).skipToContent}
            </a>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
