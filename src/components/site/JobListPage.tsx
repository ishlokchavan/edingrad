import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from './PageHero';
import { listJobs } from '@/lib/jobs';
import { heroImage } from '@/lib/page-images';

/** Listing of published jobs under /who-we-are/careers. */
export async function JobListPage({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const tr = await getTranslations('routes');
  const t = await getTranslations('careers');
  const jobs = await listJobs();

  return (
    <>
      <PageHero overline={tr('careers.over')} title={tr('careers.title')} lead={tr('careers.lead')} image={heroImage['careers']} />
      <section className="mkt-section">
        <div className="wrap">
          {jobs.length === 0 ? (
            <p className="mkt-note">{t('noOpenings')}</p>
          ) : (
            <ul className="job-list">
              {jobs.map((j) => (
                <li key={j.slug} className="job-item">
                  <Link href={`/who-we-are/careers/${j.slug}`}>
                    <span className="job-title">{j.title}</span>
                    <span className="job-meta">
                      {[j.department, j.location, j.employment_type].filter(Boolean).join(' · ')}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
