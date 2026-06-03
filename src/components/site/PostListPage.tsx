import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from './PageHero';
import { listPosts, type PostType } from '@/lib/content';
import { heroImage } from '@/lib/page-images';

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
      <PageHero overline={tr(`${section}.over`)} title={tr(`${section}.title`)} lead={tr(`${section}.lead`)} image={heroImage[section]} />
      <section className="mkt-section">
        <div className="wrap">
          {posts.length === 0 ? (
            <p className="mkt-note">{tc('empty')}</p>
          ) : (
            <div className="mkt-grid mkt-grid-3 post-grid">
              {posts.map((p) => (
                <Link key={p.slug} href={`/who-we-are/${section}/${p.slug}`} className="post-card">
                  <span className={`post-card-cover${p.cover_image ? '' : ' post-card-cover-empty'}`}>
                    {p.cover_image && (
                      <Image src={p.cover_image} alt="" fill sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw" />
                    )}
                  </span>
                  <span className="post-card-body">
                    {p.published_at && (
                      <span className="post-card-meta">{fmt.format(new Date(p.published_at))}</span>
                    )}
                    <span className="post-card-title">{p.title}</span>
                    {p.excerpt && <span className="post-card-excerpt">{p.excerpt}</span>}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
