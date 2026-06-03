import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { requireRole } from '@/lib/auth';
import { getListingById, listListingImages } from '@/lib/admin-listings';
import { ListingEditForm, ListingImageUploader } from '@/components/dashboard/ListingForms';
import { setListingStatus, deleteListing, setListingCover, removeListingImage } from '../actions';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Edit listing' };

export default async function Page({ params: { locale, id } }: { params: { locale: string; id: string } }) {
  setRequestLocale(locale);
  await requireRole(['admin', 'agent']);
  const listing = await getListingById(id);
  if (!listing) notFound();
  const images = await listListingImages(id);
  const published = listing.status === 'published';

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <Link href="/dashboard/listings" className="article-back">← Listings</Link>
          <h1>{listing.title}</h1>
          <span className={`status-badge status-${listing.status}`}>{listing.status}</span>
        </div>
        <div className="admin-actions">
          <form action={setListingStatus.bind(null, listing.id, published ? 'draft' : 'published')}>
            <button type="submit" className="btn">{published ? 'Unpublish' : 'Publish'}</button>
          </form>
          {published && <Link href={`/properties/${listing.slug}`} className="btn-ghost">View live</Link>}
          <form action={deleteListing.bind(null, listing.id)}>
            <button type="submit" className="btn-ghost admin-danger">Delete</button>
          </form>
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-main"><ListingEditForm listing={listing} /></div>
        <aside className="admin-side">
          <h2 className="downloads-h">Photos</h2>
          {images.length > 0 && (
            <div className="asset-thumbs">
              {images.map((im) => (
                <div key={im.id} className="asset-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={im.url} alt="" />
                  {im.is_cover && <span className="cover-tag">Cover</span>}
                  <div className="asset-thumb-actions">
                    {!im.is_cover && (
                      <form action={setListingCover.bind(null, im.id, listing.id)}>
                        <button type="submit" className="asset-mini" aria-label="Set as cover">★</button>
                      </form>
                    )}
                    <form action={removeListingImage.bind(null, im.id, listing.id)}>
                      <button type="submit" className="asset-mini asset-remove" aria-label="Remove">×</button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
          <ListingImageUploader listingId={listing.id} />
        </aside>
      </div>
    </>
  );
}
