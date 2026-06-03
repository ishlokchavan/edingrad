import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getPost, type PostType } from '@/lib/content';

/** A single published post under /who-we-are/<section>/<slug>. */
export async function PostDetailPage({
  section,
  type,
  slug,
  locale,
}: {
  section: string;
  type: PostType;
  slug: string;
  locale: string;
}) {
  setRequestLocale(locale);
  const tr = await getTranslations('routes');
  const post = await getPost(type, slug);
  if (!post) notFound();

  const fmt = new Intl.DateTimeFormat(locale, { dateStyle: 'long' });
  const paragraphs = (post.body ?? '').split('\n\n').filter(Boolean);

  return (
    <article className="article">
      <div className="wrap article-wrap">
        <Link href={`/who-we-are/${section}`} className="article-back">
          ← {tr(`${section}.title`)}
        </Link>
        {post.published_at && (
          <div className="article-meta">{fmt.format(new Date(post.published_at))}</div>
        )}
        <h1>{post.title}</h1>
        <div className="article-body">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        {post.tags.length > 0 && (
          <div className="article-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="pill">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
