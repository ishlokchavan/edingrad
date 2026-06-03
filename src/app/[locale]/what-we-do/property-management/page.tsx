import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContentPage } from '@/components/site/ContentPage';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'routes' });
  return { title: t('property-management.title') };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <ContentPage slug="property-management" locale={locale} contentNamespace="whatWeDo.services" />;
}
