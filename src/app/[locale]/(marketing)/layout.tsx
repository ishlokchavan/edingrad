import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/site/Header';
import { SiteFooter } from '@/components/site/Footer';

/** Public marketing chrome: header + footer around the page content. */
export default async function MarketingLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const tc = await getTranslations('common');
  return (
    <>
      <a href="#main" className="skip-link">
        {tc('skipToContent')}
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
