import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HubPage } from '@/components/site/HubPage';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'whatWeDo' });
  return { title: t('metaTitle') };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <HubPage sectionKey="what-we-do" namespace="whatWeDo" locale={locale} />;
}
