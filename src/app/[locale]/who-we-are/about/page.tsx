import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ComingSoon } from '@/components/site/ComingSoon';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'routes' });
  return { title: t('about.title') };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <ComingSoon slug="about" locale={locale} />;
}
