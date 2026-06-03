import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { requireRole } from '@/lib/auth';
import { ImportForm } from '@/components/dashboard/ImportForm';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Import listings' };

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  await requireRole(['admin']);
  return (
    <>
      <Link href="/dashboard/listings" className="article-back">
        ← Listings
      </Link>
      <h1>Bulk import</h1>
      <p className="mkt-note">
        Upload a CSV to create listings in bulk. They land as drafts for review before publishing.
      </p>
      <div style={{ marginTop: 24 }}>
        <ImportForm />
      </div>
    </>
  );
}
