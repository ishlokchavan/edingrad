import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from './PageHero';
import { listPosts, type PostType } from '@/lib/content';

/** Listing of published posts of a type, under /who-we-are/<section>. */
export async function PostListPage({
  section,
  type,
  locale,
}: {
  section: string;
  type: PostType;
  locale: string;
}) {
  setRequestLocale(locale);
  const tr = await getTranslations('routes');
  const tc = await getTranslations('content');
  const posts = await listPosts(type);
  const fmt = new Intl.DateTimeFormat(locale, { dateStyle: 'long' });

  return (
    <>
      <PageHero overline={tr(`${section}.over`)} title={tr(`${section}.title`)} lead={tr(`${section}.lead`)} />
      <section className="mkt-section">
        <div className="wrap">
          {posts.length === 0 ? (
            <p className="mkt-note">{tc('empty')}</p>
          ) : (
            <ul className="post-list">
              {posts.map((p) => (
                <li key={p.slug} className="post-item">
                  <Link href={`/who-we-are/${section}/${p.slug}`}>
                    {p.published_at && (
                      <span className="post-meta">{fmt.format(new Date(p.published_at))}</span>
                    )}
                    <span className="post-title">{p.title}</span>
                    {p.excerpt && <span className="post-excerpt">{p.excerpt}</span>}
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
