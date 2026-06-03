import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from './PageHero';
import { ArrowRight } from '@/components/icons/ui-icons';

interface Point {
  title: string;
  body: string;
}

/** A "Who We Help" audience page: hero (from `routes`) + how-we-help points +
 *  closing CTA. Extended copy lives in `whoWeHelp.audiences.<slug>`. */
export async function AudiencePage({ slug, locale }: { slug: string; locale: string }) {
  setRequestLocale(locale);
  const tr = await getTranslations('routes');
  const t = await getTranslations(`whoWeHelp.audiences.${slug}`);
  const tc = await getTranslations('getInTouch');
  const points = t.raw('points') as Point[];

  return (
    <>
      <PageHero overline={tr(`${slug}.over`)} title={tr(`${slug}.title`)} lead={tr(`${slug}.lead`)} />

      <section className="mkt-section">
        <div className="wrap">
          <div className="over">{t('pointsOver')}</div>
          <h2>{t('pointsTitle')}</h2>
          <div className="mkt-grid mkt-grid-3">
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
          <p className="lead">{t('closingBody')}</p>
          <Link href="/get-in-touch" className="btn">
            {tc('title')} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
