import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HubPage } from '@/components/site/HubPage';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'whoWeHelp' });
  return { title: t('metaTitle') };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <HubPage sectionKey="who-we-help" namespace="whoWeHelp" locale={locale} />;
}
