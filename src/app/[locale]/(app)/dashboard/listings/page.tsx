import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { requireRole } from '@/lib/auth';
import { listAdminListings } from '@/lib/admin-listings';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Listings' };

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const profile = await requireRole(['admin', 'agent']);
  const listings = await listAdminListings(profile.role === 'admin', profile.userId);
  const fmt = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' });
  const price = new Intl.NumberFormat(locale);

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <div className="over">Portfolio</div>
          <h1>{profile.role === 'admin' ? 'All listings' : 'My listings'}</h1>
        </div>
        <Link href="/dashboard/listings/new" className="btn">New listing</Link>
      </div>
      {listings.length === 0 ? (
        <p className="mkt-note">No listings yet. Create your first.</p>
      ) : (
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr><th>Title</th><th>Category</th><th>Price</th><th>Status</th><th>Updated</th></tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l.id}>
                  <td><Link href={`/dashboard/listings/${l.id}`} className="admin-link">{l.title}</Link></td>
                  <td>{l.category} · {l.transaction_type}</td>
                  <td className="admin-muted">{l.price != null ? `${l.currency} ${price.format(l.price)}` : '—'}</td>
                  <td><span className={`status-badge status-${l.status}`}>{l.status}</span></td>
                  <td className="admin-muted">{fmt.format(new Date(l.updated_at))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
