import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/site/PageHero';
import { CryptoCalculator } from '@/components/site/CryptoCalculator';
import { fetchCryptoRates } from '@/lib/crypto';

export const revalidate = 300;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'routes' });
  return { title: t('crypto-exchange.title') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const tr = await getTranslations('routes');
  const data = await fetchCryptoRates();
  return (
    <>
      <PageHero overline={tr('crypto-exchange.over')} title={tr('crypto-exchange.title')} lead={tr('crypto-exchange.lead')} />
      <section className="mkt-section">
        <div className="wrap">
          <CryptoCalculator data={data} />
        </div>
      </section>
    </>
  );
}
