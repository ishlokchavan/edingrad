import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { JobListPage } from '@/components/site/JobListPage';

export const revalidate = 300;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'routes' });
  return { title: t('careers.title') };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <JobListPage locale={locale} />;
}
