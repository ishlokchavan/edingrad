import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getPost, formatBytes, type PostType } from '@/lib/content';
import { MarkdownBody } from './MarkdownBody';
import { Download } from '@/components/icons/ui-icons';

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
  const tc = await getTranslations('content');
  const post = await getPost(type, slug);
  if (!post) notFound();

  const fmt = new Intl.DateTimeFormat(locale, { dateStyle: 'long' });

  return (
    <article className="article">
      {post.cover_image && (
        <div className="article-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover_image} alt="" />
        </div>
      )}
      <div className="wrap article-wrap">
        <Link href={`/who-we-are/${section}`} className="article-back">
          ← {tr(`${section}.title`)}
        </Link>
        {post.published_at && (
          <div className="article-meta">{fmt.format(new Date(post.published_at))}</div>
        )}
        <h1>{post.title}</h1>

        {post.body && <MarkdownBody>{post.body}</MarkdownBody>}

        {post.gallery.length > 0 && (
          <div className="gallery">
            {post.gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.url} src={g.url} alt={g.label ?? ''} loading="lazy" />
            ))}
          </div>
        )}

        {post.downloads.length > 0 && (
          <div className="downloads">
            <h2 className="downloads-h">{tc('downloads')}</h2>
            {post.downloads.map((d) => {
              const size = formatBytes(d.size_bytes);
              return (
                <a key={d.url} href={d.url} className="download-row" download>
                  <span className="download-ic"><Download size={20} /></span>
                  <span className="download-meta">
                    <span className="download-label">{d.label ?? tc('download')}</span>
                    <span className="download-sub">
                      {[d.mime_type?.split('/').pop()?.toUpperCase(), size].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        )}

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
