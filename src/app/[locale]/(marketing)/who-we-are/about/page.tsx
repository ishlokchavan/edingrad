import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContentPage } from '@/components/site/ContentPage';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'routes' });
  return { title: t('about.title') };
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ContentPage
      slug="about"
      locale={locale}
      contentNamespace="whoWeAre.pages"
      cols={4}
      image="https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7/hf_20260603_172915_61bb2713-b343-4bfc-982d-62780c21d531_min.webp"
    />
  );
}
