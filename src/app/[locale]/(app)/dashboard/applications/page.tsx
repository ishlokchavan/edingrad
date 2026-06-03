import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { requireRole } from '@/lib/auth';
import { listApplications } from '@/lib/admin-applications';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Applications' };

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  await requireRole(['admin', 'editor']);
  const apps = await listApplications();
  const fmt = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <>
      <div className="over">Careers</div>
      <h1>Applications</h1>
      {apps.length === 0 ? (
        <p className="mkt-note">No applications yet.</p>
      ) : (
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Role</th>
                <th>Applicant</th>
                <th>Email</th>
                <th>Files</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id}>
                  <td className="admin-muted">{fmt.format(new Date(a.created_at))}</td>
                  <td>{a.jobTitle ?? '—'}</td>
                  <td>{a.name}</td>
                  <td>
                    <a className="admin-link" href={`mailto:${a.email}`}>{a.email}</a>
                  </td>
                  <td>
                    {a.cvUrl ? (
                      <a className="admin-link" href={a.cvUrl} target="_blank" rel="noopener">CV</a>
                    ) : (
                      '—'
                    )}
                    {a.coverUrl && (
                      <>
                        {' · '}
                        <a className="admin-link" href={a.coverUrl} target="_blank" rel="noopener">Cover</a>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
