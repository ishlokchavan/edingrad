import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from '@/components/icons/ui-icons';
import { JsonLd } from '@/components/site/JsonLd';
import { VisualCard } from '@/components/site/VisualCard';
import { siteUrl } from '@/lib/site';
import { heroImage } from '@/lib/page-images';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tc = await getTranslations('common');
  const tf = await getTranslations('footer');

  const who = [
    { key: 'developers', href: '/who-we-help/developers' },
    { key: 'assetManagement', href: '/who-we-help/asset-management' },
    { key: 'privateWealth', href: '/who-we-help/private-wealth' },
  ] as const;

  const what = [
    { slug: 'residential', href: '/what-we-do/residential' },
    { slug: 'commercial', href: '/what-we-do/commercial' },
    { slug: 'off-plan', href: '/what-we-do/off-plan' },
    { slug: 'mortgage', href: '/what-we-do/mortgage' },
  ] as const;
  const tr = await getTranslations('routes');

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Edingrad',
          url: siteUrl,
          description: t('lead'),
          areaServed: 'AE',
        }}
      />
      <section className="site-hero site-hero--image">
        <Image className="site-hero-bg" src={heroImage['home']!} alt="" aria-hidden fill priority sizes="100vw" />
        <div className="wrap site-hero-content">
          <div className="over">{t('overline')}</div>
          <h1 className="display">{t('title')}</h1>
          <p className="lead site-hero-lead">{t('lead')}</p>
          <div className="site-hero-actions">
            <Link href="/get-in-touch" className="btn">
              {t('ctaPrimary')} <ArrowRight size={18} />
            </Link>
            <Link href="/properties" className="btn-ghost">
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>

      <section className="mkt-section">
        <div className="wrap">
          <div className="over">{t('whoOverline')}</div>
          <h2>{t('whoTitle')}</h2>
          <div className="mkt-grid mkt-grid-3">
            {who.map(({ key, href }) => (
              <Link key={key} href={href} className="mkt-card">
                <span className="mkt-card-title">{t(`who.${key}.title`)}</span>
                <p>{t(`who.${key}.body`)}</p>
                <span className="mkt-card-arrow" aria-hidden>
                  <ArrowRight size={20} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="image-band image-band-tall">
        <Image src={heroImage['properties']!} alt="" aria-hidden fill sizes="100vw" />
        <div className="image-band-overlay">
          <div className="wrap">
            <p className="image-band-quote">{tf('tagline')}</p>
          </div>
        </div>
      </section>

      <section className="mkt-section mkt-section-alt">
        <div className="wrap">
          <div className="over">{t('whatOverline')}</div>
          <h2>{t('whatTitle')}</h2>
          <div className="visual-grid visual-grid-4">
            {what.map(({ slug, href }) => (
              <VisualCard
                key={slug}
                href={href}
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
          <h2 className="display">{t('ctaTitle')}</h2>
          <p className="lead">{t('ctaBody')}</p>
          <Link href="/get-in-touch" className="btn">
            {t('ctaButton')} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
