import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/site/PageHero';
import { VisualCard } from '@/components/site/VisualCard';
import { ArrowRight } from '@/components/icons/ui-icons';
import { heroImage } from '@/lib/page-images';

const ADVISORY = ['residential', 'commercial', 'off-plan'] as const;
const SERVICES = ['property-management', 'mortgage', 'currency-services', 'crypto-exchange', 'sell-instantly'] as const;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'whatWeDo' });
  return { title: t('metaTitle') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('whatWeDo');
  const tr = await getTranslations('routes');
  const tc = await getTranslations('common');
  const tg = await getTranslations('getInTouch');

  return (
    <>
      <PageHero overline={t('overline')} title={t('title')} lead={t('lead')} image={heroImage['what-we-do']} />

      <section className="mkt-section">
        <div className="wrap">
          <div className="over">{t('groupAdvisoryOver')}</div>
          <h2>{t('groupAdvisory')}</h2>
          <div className="visual-grid visual-grid-3">
            {ADVISORY.map((slug) => (
              <VisualCard
                key={slug}
                href={`/what-we-do/${slug}`}
                image={heroImage[slug]!}
                title={tr(`${slug}.title`)}
                body={tr(`${slug}.lead`)}
                cta={tc('learnMore')}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mkt-section mkt-section-alt">
        <div className="wrap">
          <div className="over">{t('groupServicesOver')}</div>
          <h2>{t('groupServices')}</h2>
          <div className="visual-grid visual-grid-3">
            {SERVICES.map((slug) => (
              <VisualCard
                key={slug}
                href={`/what-we-do/${slug}`}
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
          <h2 className="display">{tg('title')}</h2>
          <p className="lead">{tg('lead')}</p>
          <div className="site-hero-actions">
            <Link href="/get-in-touch" className="btn">
              {tg('overline')} <ArrowRight size={18} />
            </Link>
            <Link href="/properties" className="btn-ghost">
              {t('browseProperties')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
