import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/site/PageHero';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'getInTouch' });
  return { title: t('metaTitle') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('getInTouch');
  const tc = await getTranslations('common');
  return (
    <PageHero overline={t('overline')} title={t('title')} lead={t('lead')}>
      <p className="mkt-note">{tc('comingSoon')}</p>
    </PageHero>
  );
}
