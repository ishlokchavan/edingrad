import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from './PageHero';
import { SITE_SECTIONS } from '@/lib/site-nav';
import { ArrowRight } from '@/components/icons/ui-icons';
import { heroImage } from '@/lib/page-images';

/** A hub page: its own hero + a grid of cards linking to the real subpages. */
export async function HubPage({
  sectionKey,
  namespace,
  locale,
}: {
  sectionKey: keyof typeof SITE_SECTIONS;
  namespace: string;
  locale: string;
}) {
  setRequestLocale(locale);
  const t = await getTranslations(namespace);
  const tr = await getTranslations('routes');
  const section = SITE_SECTIONS[sectionKey];

  return (
    <>
      <PageHero overline={t('overline')} title={t('title')} lead={t('lead')} image={heroImage[sectionKey]} />
      <section className="mkt-section">
        <div className="wrap">
          <div className="mkt-grid mkt-grid-3">
            {section.children.map((slug) => (
              <Link key={slug} href={`${section.href}/${slug}`} className="mkt-card">
                <span className="mkt-card-title">{tr(`${slug}.title`)}</span>
                <p>{tr(`${slug}.lead`)}</p>
                <span className="mkt-card-arrow" aria-hidden>
                  <ArrowRight size={20} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
