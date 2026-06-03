import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { requireRole } from '@/lib/auth';
import { getJobById } from '@/lib/admin-jobs';
import { JobEditForm } from '@/components/dashboard/JobForms';
import { setJobStatus, deleteJob } from '../actions';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit job' };

export default async function Page({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(locale);
  await requireRole(['admin', 'editor']);
  const job = await getJobById(id);
  if (!job) notFound();
  const published = job.status === 'published';

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <Link href="/dashboard/jobs" className="article-back">
            ← Jobs
          </Link>
          <h1>{job.title}</h1>
          <span className={`status-badge status-${job.status}`}>{job.status}</span>
        </div>
        <div className="admin-actions">
          <form action={setJobStatus.bind(null, job.id, published ? 'draft' : 'published')}>
            <button type="submit" className="btn">
              {published ? 'Unpublish' : 'Publish'}
            </button>
          </form>
          {published && (
            <Link href={`/who-we-are/careers/${job.slug}`} className="btn-ghost">
              View live
            </Link>
          )}
          <form action={deleteJob.bind(null, job.id)}>
            <button type="submit" className="btn-ghost admin-danger">
              Delete
            </button>
          </form>
        </div>
      </div>
      <JobEditForm job={job} />
    </>
  );
}
