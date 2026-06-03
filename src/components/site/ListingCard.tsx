import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { formatPrice, type ListingSummary } from '@/lib/listings';

export async function ListingCard({ listing, locale }: { listing: ListingSummary; locale: string }) {
  const t = await getTranslations('properties');
  const specs = [
    listing.bedrooms != null ? t('specs.bedsN', { n: listing.bedrooms }) : null,
    listing.bathrooms != null ? t('specs.bathsN', { n: listing.bathrooms }) : null,
    listing.size_sqft != null
      ? t('specs.sqftN', { n: new Intl.NumberFormat(locale).format(listing.size_sqft) })
      : null,
  ].filter(Boolean);

  return (
    <Link href={`/properties/${listing.slug}`} className="listing-card">
      <span className={`listing-cover${listing.coverUrl ? '' : ' listing-cover-empty'}`}>
        {listing.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={listing.coverUrl} alt={listing.title} loading="lazy" />
        )}
        <span className="listing-badge">{t(`tx.${listing.transaction_type}`)}</span>
      </span>
      <span className="listing-body">
        <span className="listing-price">
          {formatPrice(listing.price, listing.currency, listing.transaction_type, locale)}
        </span>
        <span className="listing-title">{listing.title}</span>
        {listing.community && <span className="listing-community">{listing.community}</span>}
        {specs.length > 0 && <span className="listing-specs">{specs.join('  ·  ')}</span>}
      </span>
    </Link>
  );
}
