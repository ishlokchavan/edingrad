import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getJob } from '@/lib/jobs';
import { MarkdownBody } from './MarkdownBody';
import { ApplyForm } from './ApplyForm';
import { JsonLd } from './JsonLd';

/** A single published job + application form, under /who-we-are/careers/<slug>. */
export async function JobDetailPage({ slug, locale }: { slug: string; locale: string }) {
  setRequestLocale(locale);
  const tr = await getTranslations('routes');
  const t = await getTranslations('careers');
  const job = await getJob(slug);
  if (!job) notFound();

  const meta = [job.department, job.location, job.employment_type].filter(Boolean).join(' · ');

  return (
    <article className="article">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: job.title,
          description: job.description ?? job.title,
          datePosted: job.published_at ?? undefined,
          employmentType: job.employment_type ?? undefined,
          hiringOrganization: { '@type': 'Organization', name: 'Edingrad' },
          jobLocation: {
            '@type': 'Place',
            address: { '@type': 'PostalAddress', addressLocality: job.location ?? 'Dubai', addressCountry: 'AE' },
          },
        }}
      />
      <div className="wrap article-wrap">
        <Link href="/who-we-are/careers" className="article-back">
          ← {tr('careers.title')}
        </Link>
        {meta && <div className="article-meta">{meta}</div>}
        <h1>{job.title}</h1>

        {job.description && <MarkdownBody>{job.description}</MarkdownBody>}

        <div className="apply">
          <h2 className="downloads-h">{t('applyTitle')}</h2>
          <ApplyForm jobId={job.id} jobTitle={job.title} />
        </div>
      </div>
    </article>
  );
}
