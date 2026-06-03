import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { requireRole } from '@/lib/auth';
import { NewJobForm } from '@/components/dashboard/JobForms';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'New job' };

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  await requireRole(['admin', 'editor']);
  return (
    <>
      <Link href="/dashboard/jobs" className="article-back">
        ← Jobs
      </Link>
      <h1>New job</h1>
      <p className="mkt-note">Create a draft, then add the details on the next screen.</p>
      <div style={{ marginTop: 24 }}>
        <NewJobForm />
      </div>
    </>
  );
}
