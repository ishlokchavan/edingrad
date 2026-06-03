import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/site/PageHero';
import { FeatureRow } from '@/components/site/FeatureRow';
import { ArrowRight } from '@/components/icons/ui-icons';
import { heroImage } from '@/lib/page-images';

const AUDIENCES = ['developers', 'asset-management', 'private-wealth'] as const;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'whoWeHelp' });
  return { title: t('metaTitle') };
}

interface Audience {
  pointsTitle: string;
  points: { title: string; body: string }[];
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('whoWeHelp');
  const tr = await getTranslations('routes');
  const tc = await getTranslations('common');
  const tg = await getTranslations('getInTouch');

  return (
    <>
      <PageHero overline={t('overline')} title={t('title')} lead={t('lead')} image={heroImage['who-we-help']} />

      <section className="feature-stack">
        <div className="wrap">
          {AUDIENCES.map((slug, i) => {
            const a = t.raw(`audiences.${slug}`) as Audience;
            return (
              <FeatureRow
                key={slug}
                reversed={i % 2 === 1}
                image={heroImage[slug]!}
                overline={a.pointsTitle}
                title={tr(`${slug}.title`)}
                body={tr(`${slug}.lead`)}
                points={a.points}
                footer={
                  <Link href={`/who-we-help/${slug}`} className="text-link">
                    {tc('learnMore')} <ArrowRight size={16} />
                  </Link>
                }
              />
            );
          })}
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2 className="display">{tg('title')}</h2>
          <p className="lead">{tg('lead')}</p>
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
