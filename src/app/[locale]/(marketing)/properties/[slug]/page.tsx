import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getListing, formatPrice } from '@/lib/listings';
import { MarkdownBody } from '@/components/site/MarkdownBody';
import { ListingGallery } from '@/components/site/ListingGallery';
import { EnquiryForm } from '@/components/site/EnquiryForm';
import { JsonLd } from '@/components/site/JsonLd';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const listing = await getListing(slug);
  return { title: listing?.title ?? 'Not found' };
}

export default async function Page({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('properties');
  const listing = await getListing(slug);
  if (!listing) notFound();

  const fmtNum = (n: number | null) => (n == null ? '—' : new Intl.NumberFormat(locale).format(n));
  const specs: { label: string; value: string }[] = [
    { label: t('specs.category'), value: t(`cat.${listing.category}`) },
    { label: t('specs.transaction'), value: t(`tx.${listing.transaction_type}`) },
    ...(listing.bedrooms != null ? [{ label: t('specs.beds'), value: String(listing.bedrooms) }] : []),
    ...(listing.bathrooms != null ? [{ label: t('specs.baths'), value: String(listing.bathrooms) }] : []),
    ...(listing.size_sqft != null ? [{ label: t('specs.sqft'), value: fmtNum(listing.size_sqft) }] : []),
    ...(listing.community ? [{ label: t('specs.community'), value: listing.community }] : []),
    ...(listing.developer ? [{ label: t('specs.developer'), value: listing.developer }] : []),
    ...(listing.completion_status ? [{ label: t('specs.completion'), value: listing.completion_status }] : []),
  ];

  return (
    <article className="listing-detail">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: listing.title,
          description: listing.description ?? undefined,
          category: listing.category,
          image: listing.images[0]?.url ? [listing.images[0].url] : undefined,
          offers: listing.price
            ? {
                '@type': 'Offer',
                price: listing.price,
                priceCurrency: listing.currency,
                availability: 'https://schema.org/InStock',
                url: `${siteUrl}/properties/${listing.slug}`,
              }
            : undefined,
        }}
      />
      <div className="wrap">
        <Link href="/properties" className="article-back">
          ← {t('title')}
        </Link>
      </div>

      <div className="wrap">
        <ListingGallery images={listing.images} title={listing.title} />
      </div>

      <div className="wrap listing-detail-grid">
        <div className="listing-main">
          <div className="listing-head">
            <div>
              <h1>{listing.title}</h1>
              {listing.community && <p className="listing-detail-community">{listing.community}</p>}
            </div>
            <div className="listing-detail-price">
              {formatPrice(listing.price, listing.currency, listing.transaction_type, locale)}
            </div>
          </div>

          <dl className="spec-grid">
            {specs.map((s) => (
              <div key={s.label} className="spec">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>

          {listing.description && <MarkdownBody>{listing.description}</MarkdownBody>}

          {listing.amenities.length > 0 && (
            <>
              <h2 className="downloads-h">{t('specs.amenities')}</h2>
              <ul className="amenities">
                {listing.amenities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </>
          )}

          {listing.rera_permit_number && (
            <p className="listing-permit">
              {t('specs.reraPermit')}: <strong>{listing.rera_permit_number}</strong>
            </p>
          )}
        </div>

        <aside className="listing-side">
          {listing.agent && (
            <div className="agent-card">
              <div className="agent-name">{listing.agent.name ?? 'Edingrad'}</div>
              {listing.agent.rera_brn && <div className="agent-sub">BRN {listing.agent.rera_brn}</div>}
              {listing.agent.phone && (
                <a className="agent-line" href={`tel:${listing.agent.phone}`}>{listing.agent.phone}</a>
              )}
              {listing.agent.email && (
                <a className="agent-line" href={`mailto:${listing.agent.email}`}>{listing.agent.email}</a>
              )}
            </div>
          )}
          <h2 className="downloads-h">{t('enquiry.title')}</h2>
          <EnquiryForm listingId={listing.id} listingTitle={listing.title} slug={listing.slug} />
        </aside>
      </div>
    </article>
  );
}
