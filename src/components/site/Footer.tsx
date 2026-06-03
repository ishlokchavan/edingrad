import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function SiteFooter() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const tc = useTranslations('common');

  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="site-foot-grid">
          <div>
            <div className="site-foot-brand">
              <span className="site-logo-mark" /> {tc('brand')}
            </div>
            <p className="site-foot-tag">{t('tagline')}</p>
          </div>

          <div>
            <h5>{t('colHelp')}</h5>
            <Link href="/who-we-help/developers">Developers</Link>
            <Link href="/who-we-help/asset-management">Asset management</Link>
            <Link href="/who-we-help/private-wealth">Private wealth</Link>
          </div>

          <div>
            <h5>{t('colDo')}</h5>
            <Link href="/what-we-do/residential">Residential</Link>
            <Link href="/what-we-do/commercial">Commercial</Link>
            <Link href="/what-we-do/off-plan">Off-plan</Link>
            <Link href="/what-we-do/mortgage">Mortgage</Link>
          </div>

          <div>
            <h5>{t('colFirm')}</h5>
            <Link href="/who-we-are/about">{t('about')}</Link>
            <Link href="/who-we-are/insights">{t('insights')}</Link>
            <Link href="/who-we-are/careers">{t('careers')}</Link>
            <Link href="/get-in-touch">{tn('getInTouch')}</Link>
          </div>
        </div>

        <div className="site-foot-bottom">
          <span>{t('rights')}</span>
          <span>{t('disclaimer')}</span>
        </div>
      </div>
    </footer>
  );
}
