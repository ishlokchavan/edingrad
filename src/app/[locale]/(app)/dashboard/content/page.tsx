import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { requireRole } from '@/lib/auth';
import { listAllPosts } from '@/lib/admin-posts';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Content' };

const TYPE_LABELS: Record<string, string> = { press: 'Press', insight: 'Insight', resource: 'Resource' };

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  await requireRole(['admin', 'editor']);
  const posts = await listAllPosts();
  const fmt = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' });

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <div className="over">Content</div>
          <h1>Press, Insights &amp; Resources</h1>
        </div>
        <Link href="/dashboard/content/new" className="btn">
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mkt-note">No posts yet. Create your first.</p>
      ) : (
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link href={`/dashboard/content/${p.id}`} className="admin-link">
                      {p.title}
                    </Link>
                  </td>
                  <td>{TYPE_LABELS[p.type] ?? p.type}</td>
                  <td>
                    <span className={`status-badge status-${p.status}`}>{p.status}</span>
                  </td>
                  <td className="admin-muted">{fmt.format(new Date(p.updated_at))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
