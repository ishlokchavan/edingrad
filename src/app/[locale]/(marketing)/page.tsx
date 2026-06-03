import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from '@/components/icons/ui-icons';
import { JsonLd } from '@/components/site/JsonLd';
import { siteUrl } from '@/lib/site';

const HERO_IMAGE =
  'https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7/hf_20260603_172728_e89eac88-89ce-4c76-a670-f1c465c00f07_min.webp';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const who = [
    { key: 'developers', href: '/who-we-help/developers' },
    { key: 'assetManagement', href: '/who-we-help/asset-management' },
    { key: 'privateWealth', href: '/who-we-help/private-wealth' },
  ] as const;

  const what = [
    { key: 'residential', href: '/what-we-do/residential' },
    { key: 'commercial', href: '/what-we-do/commercial' },
    { key: 'offplan', href: '/what-we-do/off-plan' },
    { key: 'mortgage', href: '/what-we-do/mortgage' },
  ] as const;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="site-hero-bg" src={HERO_IMAGE} alt="" aria-hidden="true" />
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

      <section className="mkt-section mkt-section-alt">
        <div className="wrap">
          <div className="over">{t('whatOverline')}</div>
          <h2>{t('whatTitle')}</h2>
          <div className="mkt-grid mkt-grid-4">
            {what.map(({ key, href }) => (
              <Link key={key} href={href} className="mkt-card">
                <span className="mkt-card-title">{t(`what.${key}.title`)}</span>
                <p>{t(`what.${key}.body`)}</p>
                <span className="mkt-card-arrow" aria-hidden>
                  <ArrowRight size={20} />
                </span>
              </Link>
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
