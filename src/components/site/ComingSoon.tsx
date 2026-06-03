import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from './PageHero';

/**
 * Placeholder for routes that exist in the skeleton but whose full content is
 * scheduled for a later increment. Copy comes from the `routes.<slug>` message
 * namespace so it stays externalised and on-brand.
 */
export async function ComingSoon({ slug, locale }: { slug: string; locale: string }) {
  setRequestLocale(locale);
  const t = await getTranslations('routes');
  const tc = await getTranslations('common');
  return (
    <PageHero overline={t(`${slug}.over`)} title={t(`${slug}.title`)} lead={t(`${slug}.lead`)}>
      <p className="mkt-note">{tc('comingSoon')}</p>
    </PageHero>
  );
}
