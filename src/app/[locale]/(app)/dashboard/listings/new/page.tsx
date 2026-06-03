import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { requireRole } from '@/lib/auth';
import { NewListingForm } from '@/components/dashboard/ListingForms';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'New listing' };

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  await requireRole(['admin', 'agent']);
  return (
    <>
      <Link href="/dashboard/listings" className="article-back">← Listings</Link>
      <h1>New listing</h1>
      <p className="mkt-note">Create a draft, then add details and photos on the next screen.</p>
      <div style={{ marginTop: 24 }}><NewListingForm /></div>
    </>
  );
}
