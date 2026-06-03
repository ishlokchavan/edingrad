import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { requireRole } from '@/lib/auth';
import { listLeads } from '@/lib/admin-leads';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Leads' };

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  await requireRole(['admin', 'agent']);
  const leads = await listLeads();
  const fmt = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <>
      <div className="over">Enquiries</div>
      <h1>Leads</h1>
      {leads.length === 0 ? (
        <p className="mkt-note">No enquiries yet.</p>
      ) : (
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Type</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Audience</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td className="admin-muted">{fmt.format(new Date(l.created_at))}</td>
                  <td>{l.type}</td>
                  <td>{l.name ?? '—'}</td>
                  <td>{l.email ? <a className="admin-link" href={`mailto:${l.email}`}>{l.email}</a> : '—'}</td>
                  <td>{l.phone ?? '—'}</td>
                  <td>{l.audience ?? '—'}</td>
                  <td className="admin-muted">{l.source_page ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
