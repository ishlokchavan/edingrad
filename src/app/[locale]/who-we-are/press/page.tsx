import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PostListPage } from '@/components/site/PostListPage';

// DB-backed content — render per request so new posts appear without a rebuild.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'routes' });
  return { title: t('press.title') };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <PostListPage section="press" type="press" locale={locale} />;
}
