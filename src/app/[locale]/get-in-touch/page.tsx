import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/site/PageHero';
import { LeadForm } from '@/components/site/LeadForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'getInTouch' });
  return { title: t('metaTitle') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('getInTouch');
  return (
    <>
      <PageHero overline={t('overline')} title={t('title')} lead={t('lead')} />
      <section className="mkt-section">
        <div className="wrap form-wrap">
          <LeadForm />
        </div>
      </section>
    </>
  );
}
