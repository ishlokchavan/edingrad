import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { requireRole } from '@/lib/auth';
import { getPostById, listPostAssets } from '@/lib/admin-posts';
import { PostEditForm } from '@/components/dashboard/PostEditForm';
import { CoverUploader } from '@/components/dashboard/CoverUploader';
import { GalleryUploader, DownloadUploader } from '@/components/dashboard/AssetUploaders';
import { setPostStatus, deletePost, removeAsset } from '../actions';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit post' };

const SECTION: Record<string, string> = { press: 'press', insight: 'insights', resource: 'resources' };

export default async function Page({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(locale);
  await requireRole(['admin', 'editor']);
  const post = await getPostById(id);
  if (!post) notFound();
  const assets = await listPostAssets(id);
  const gallery = assets.filter((a) => a.kind === 'image');
  const downloads = assets.filter((a) => a.kind === 'download');

  const published = post.status === 'published';

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <Link href="/dashboard/content" className="article-back">
            ← Content
          </Link>
          <h1>{post.title}</h1>
          <span className={`status-badge status-${post.status}`}>{post.status}</span>
        </div>
        <div className="admin-actions">
          <form action={setPostStatus.bind(null, post.id, published ? 'draft' : 'published')}>
            <button type="submit" className="btn">
              {published ? 'Unpublish' : 'Publish'}
            </button>
          </form>
          {published && (
            <Link href={`/who-we-are/${SECTION[post.type]}/${post.slug}`} className="btn-ghost">
              View live
            </Link>
          )}
          <form action={deletePost.bind(null, post.id)}>
            <button type="submit" className="btn-ghost admin-danger">
              Delete
            </button>
          </form>
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-main">
          <PostEditForm post={post} />
        </div>
        <aside className="admin-side">
          <h2 className="downloads-h">Cover image</h2>
          <CoverUploader id={post.id} current={post.cover_image} />
        </aside>
      </div>

      <section className="admin-media">
        <div className="admin-media-col">
          <h2 className="downloads-h">Gallery</h2>
          {gallery.length > 0 && (
            <div className="asset-thumbs">
              {gallery.map((g) => (
                <div key={g.id} className="asset-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.url} alt={g.label ?? ''} />
                  <form action={removeAsset.bind(null, g.id, post.id)}>
                    <button type="submit" className="asset-remove" aria-label="Remove image">×</button>
                  </form>
                </div>
              ))}
            </div>
          )}
          <GalleryUploader postId={post.id} />
        </div>

        <div className="admin-media-col">
          <h2 className="downloads-h">Downloads</h2>
          {downloads.length > 0 && (
            <ul className="asset-downloads">
              {downloads.map((d) => (
                <li key={d.id}>
                  <span>{d.label ?? 'File'}</span>
                  <form action={removeAsset.bind(null, d.id, post.id)}>
                    <button type="submit" className="asset-remove" aria-label="Remove download">×</button>
                  </form>
                </li>
              ))}
            </ul>
          )}
          <DownloadUploader postId={post.id} />
        </div>
      </section>
    </>
  );
}
