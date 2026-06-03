import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from './PageHero';
import { ArrowRight } from '@/components/icons/ui-icons';
import { heroImage } from '@/lib/page-images';

interface Point {
  title: string;
  body: string;
}

/**
 * Generic content page for hub subpages (Who We Help audiences, What We Do
 * services): hero (from `routes.<slug>`) + a points grid + closing CTA band.
 * Extended copy lives at `<contentNamespace>.<slug>`.
 */
export async function ContentPage({
  slug,
  locale,
  contentNamespace,
  browse = false,
  cols = 3,
  image,
}: {
  slug: string;
  locale: string;
  /** e.g. "whoWeHelp.audiences" or "whatWeDo.services" */
  contentNamespace: string;
  /** show a secondary "Browse properties" CTA */
  browse?: boolean;
  /** points grid columns on wide screens */
  cols?: 3 | 4;
  /** hero background image; defaults to the page's mapped image */
  image?: string;
}) {
  setRequestLocale(locale);
  const tr = await getTranslations('routes');
  const t = await getTranslations(`${contentNamespace}.${slug}`);
  const tc = await getTranslations('getInTouch');
  const tw = await getTranslations('whatWeDo');
  const points = t.raw('points') as Point[];

  return (
    <>
      <PageHero
        overline={tr(`${slug}.over`)}
        title={tr(`${slug}.title`)}
        lead={tr(`${slug}.lead`)}
        image={image ?? heroImage[slug]}
      />

      <section className="mkt-section">
        <div className="wrap">
          <div className="over">{t('pointsOver')}</div>
          <h2>{t('pointsTitle')}</h2>
          <div className={`mkt-grid mkt-grid-${cols}`}>
            {points.map((p) => (
              <div key={p.title} className="mkt-card mkt-card-static">
                <span className="mkt-card-title">{p.title}</span>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2 className="display">{t('closingTitle')}</h2>
          {t.has('closingBody') && <p className="lead">{t('closingBody')}</p>}
          <div className="site-hero-actions">
            <Link href="/get-in-touch" className="btn">
              {tc('title')} <ArrowRight size={18} />
            </Link>
            {browse && (
              <Link href="/properties" className="btn-ghost">
                {tw('browseProperties')}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
