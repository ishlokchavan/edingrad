import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { requireRole } from '@/lib/auth';
import { listAllJobs } from '@/lib/admin-jobs';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Jobs' };

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  await requireRole(['admin', 'editor']);
  const jobs = await listAllJobs();
  const fmt = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' });

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <div className="over">Careers</div>
          <h1>Jobs</h1>
        </div>
        <Link href="/dashboard/jobs/new" className="btn">
          New job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p className="mkt-note">No jobs yet. Create your first.</p>
      ) : (
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id}>
                  <td>
                    <Link href={`/dashboard/jobs/${j.id}`} className="admin-link">
                      {j.title}
                    </Link>
                  </td>
                  <td>{j.department ?? '—'}</td>
                  <td>
                    <span className={`status-badge status-${j.status}`}>{j.status}</span>
                  </td>
                  <td className="admin-muted">{fmt.format(new Date(j.updated_at))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
