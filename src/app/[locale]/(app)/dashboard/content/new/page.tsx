import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { requireRole } from '@/lib/auth';
import { NewPostForm } from '@/components/dashboard/NewPostForm';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'New post' };

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  await requireRole(['admin', 'editor']);
  return (
    <>
      <Link href="/dashboard/content" className="article-back">
        ← Content
      </Link>
      <h1>New post</h1>
      <p className="mkt-note">Create a draft, then add the body, cover and media on the next screen.</p>
      <div style={{ marginTop: 24 }}>
        <NewPostForm />
      </div>
    </>
  );
}
