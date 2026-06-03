import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/site/PageHero';
import { MortgageCalculator } from '@/components/site/MortgageCalculator';
import { heroImage } from '@/lib/page-images';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'routes' });
  return { title: t('mortgage.title') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const tr = await getTranslations('routes');
  return (
    <>
      <PageHero overline={tr('mortgage.over')} title={tr('mortgage.title')} lead={tr('mortgage.lead')} image={heroImage['mortgage']} />
      <section className="mkt-section">
        <div className="wrap">
          <MortgageCalculator />
        </div>
      </section>
    </>
  );
}
