import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { listListings, type ListingFilters } from '@/lib/listings';
import { ListingCard } from '@/components/site/ListingCard';
import { PageHero } from '@/components/site/PageHero';
import { VisualCard } from '@/components/site/VisualCard';
import { heroImage } from '@/lib/page-images';

const CATEGORIES = [
  { value: 'residential', routeKey: 'residential' },
  { value: 'commercial', routeKey: 'commercial' },
  { value: 'offplan', routeKey: 'off-plan' },
] as const;

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'properties' });
  return { title: t('metaTitle') };
}

function num(v: string | undefined): number | undefined {
  const n = Number(v);
  return v && Number.isFinite(n) ? n : undefined;
}

export default async function Page({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: Record<string, string | undefined>;
}) {
  setRequestLocale(locale);
  const t = await getTranslations('properties');
  const tr = await getTranslations('routes');
  const tc = await getTranslations('common');

  const filters: ListingFilters = {
    category: searchParams.category || undefined,
    transaction: searchParams.transaction || undefined,
    beds: num(searchParams.beds),
    minPrice: num(searchParams.minPrice),
    maxPrice: num(searchParams.maxPrice),
    community: searchParams.community || undefined,
  };
  const listings = await listListings(filters);

  return (
    <>
      <PageHero overline={t('overline')} title={t('title')} lead={t('lead')} image={heroImage['properties']} />

      <section className="mkt-section">
        <div className="wrap">
          <div className="over">{t('browseOver')}</div>
          <h2>{t('browseTitle')}</h2>
          <div className="visual-grid visual-grid-3">
            {CATEGORIES.map((c) => (
              <VisualCard
                key={c.value}
                href={`/properties?category=${c.value}`}
                image={heroImage[c.routeKey]!}
                title={t(`cat.${c.value}`)}
                body={tr(`${c.routeKey}.lead`)}
                cta={tc('learnMore')}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mkt-section mkt-section-alt">
        <div className="wrap">
          <h2 className="properties-results-title">{t('allTitle')}</h2>
          <form method="get" className="listing-filters">
            <select name="category" defaultValue={filters.category ?? ''} aria-label={t('filters.category')}>
              <option value="">{t('filters.anyCategory')}</option>
              <option value="residential">{t('cat.residential')}</option>
              <option value="commercial">{t('cat.commercial')}</option>
              <option value="offplan">{t('cat.offplan')}</option>
            </select>
            <select name="transaction" defaultValue={filters.transaction ?? ''} aria-label={t('filters.transaction')}>
              <option value="">{t('filters.anyTransaction')}</option>
              <option value="sale">{t('tx.sale')}</option>
              <option value="rent">{t('tx.rent')}</option>
            </select>
            <select name="beds" defaultValue={searchParams.beds ?? ''} aria-label={t('filters.beds')}>
              <option value="">{t('filters.anyBeds')}</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
            <input name="minPrice" type="number" inputMode="numeric" placeholder={t('filters.minPrice')} defaultValue={searchParams.minPrice ?? ''} />
            <input name="maxPrice" type="number" inputMode="numeric" placeholder={t('filters.maxPrice')} defaultValue={searchParams.maxPrice ?? ''} />
            <input name="community" type="text" placeholder={t('filters.communityPh')} defaultValue={filters.community ?? ''} />
            <button type="submit" className="btn">{t('filters.apply')}</button>
          </form>

          <p className="listing-count">{t('filters.results', { count: listings.length })}</p>

          {listings.length === 0 ? (
            <p className="mkt-note">{t('empty')}</p>
          ) : (
            <div className="listing-grid">
              {listings.map((l) => (
                <ListingCard key={l.id} listing={l} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
