import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/site/PageHero';
import { FeatureRow } from '@/components/site/FeatureRow';
import { VisualCard } from '@/components/site/VisualCard';
import { ArrowRight } from '@/components/icons/ui-icons';
import { heroImage, sectionImage } from '@/lib/page-images';

const EXPLORE = ['press', 'insights', 'resources', 'agents', 'careers'] as const;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'whoWeAre' });
  return { title: t('metaTitle') };
}

interface Point {
  title: string;
  body: string;
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('whoWeAre');
  const tr = await getTranslations('routes');
  const tc = await getTranslations('common');
  const tg = await getTranslations('getInTouch');
  const about = t.raw('pages.about') as {
    pointsOver: string;
    pointsTitle: string;
    points: Point[];
    closingTitle: string;
    closingBody: string;
  };

  return (
    <>
      <PageHero overline={t('overline')} title={t('title')} lead={t('lead')} image={heroImage['who-we-are']} />

      <section className="feature-stack">
        <div className="wrap">
          <FeatureRow
            image={sectionImage.team}
            overline={tr('about.over')}
            title={tr('about.title')}
            body={tr('about.lead')}
            footer={
              <Link href="/who-we-are/about" className="text-link">
                {tc('learnMore')} <ArrowRight size={16} />
              </Link>
            }
          />
        </div>
      </section>

      <section className="image-band">
        <Image src={sectionImage.facade} alt="" aria-hidden fill sizes="100vw" />
      </section>

      <section className="mkt-section">
        <div className="wrap">
          <div className="over">{about.pointsOver}</div>
          <h2>{about.pointsTitle}</h2>
          <div className="mkt-grid mkt-grid-4">
            {about.points.map((p) => (
              <div key={p.title} className="mkt-card mkt-card-static">
                <span className="mkt-card-title">{p.title}</span>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mkt-section mkt-section-alt">
        <div className="wrap">
          <div className="over">{t('exploreOver')}</div>
          <h2>{t('exploreTitle')}</h2>
          <div className="visual-grid visual-grid-3">
            {EXPLORE.map((slug) => (
              <VisualCard
                key={slug}
                href={`/who-we-are/${slug}`}
                image={heroImage[slug]!}
                title={tr(`${slug}.title`)}
                body={tr(`${slug}.lead`)}
                cta={tc('learnMore')}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2 className="display">{about.closingTitle}</h2>
          <p className="lead">{about.closingBody}</p>
          <div className="site-hero-actions">
            <Link href="/get-in-touch" className="btn">
              {tg('overline')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
