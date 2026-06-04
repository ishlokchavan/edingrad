import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/site/PageHero';
import { SellInstantlyForm } from '@/components/site/SellInstantlyForm';
import { ArrowRight } from '@/components/icons/ui-icons';
import { heroImage } from '@/lib/page-images';

interface Step {
  title: string;
  body: string;
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'sellInstantly' });
  return { title: t('metaTitle') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('sellInstantly');
  const steps = t.raw('steps') as Step[];

  return (
    <>
      <PageHero overline={t('overline')} title={t('title')} lead={t('lead')} image={heroImage['sell-instantly']}>
        <div className="site-hero-actions">
          <a href="#qualify" className="btn">
            {t('ctaQualify')} <ArrowRight size={18} />
          </a>
        </div>
      </PageHero>

      <section className="mkt-section">
        <div className="wrap">
          <div className="over">{t('promiseOver')}</div>
          <h2 className="display si-promise">{t('promiseTitle')}</h2>
          <p className="lead si-promise-body">{t('promiseBody')}</p>
        </div>
      </section>

      <section className="mkt-section mkt-section-alt">
        <div className="wrap">
          <div className="over">{t('stepsOver')}</div>
          <h2>{t('stepsTitle')}</h2>
          <div className="mkt-grid mkt-grid-3">
            {steps.map((s) => (
              <div key={s.title} className="mkt-card mkt-card-static">
                <span className="mkt-card-title">{s.title}</span>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mkt-section">
        <div className="wrap si-detail-grid">
          <div>
            <h2>{t('marketTitle')}</h2>
            <p>{t('marketBody')}</p>
          </div>
          <div>
            <h2>{t('eligibilityTitle')}</h2>
            <p>{t('eligibility')}</p>
          </div>
        </div>
      </section>

      <section className="mkt-section mkt-section-alt" id="qualify">
        <div className="wrap form-wrap">
          <div className="over">{t('formOver')}</div>
          <h2>{t('formTitle')}</h2>
          <p className="lead">{t('formLead')}</p>
          <SellInstantlyForm />
          <p className="mkt-note si-disclaimer">{t('disclaimer')}</p>
        </div>
      </section>
    </>
  );
}
