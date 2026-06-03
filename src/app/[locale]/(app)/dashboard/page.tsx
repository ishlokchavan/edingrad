import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { requireSession, type Role } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'dashboard' });
  return { title: t('tag') };
}

/** Capabilities by role — placeholders until the authoring/listing UIs land. */
const CAPS: Record<Role, string[]> = {
  admin: ['content', 'listings', 'leads', 'users'],
  editor: ['content'],
  agent: ['ownListings', 'ownLeads'],
};

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const profile = await requireSession();
  const t = await getTranslations('dashboard');

  return (
    <>
      <div className="over">{t('tag')}</div>
      <h1>{t('welcome', { name: profile.name ?? profile.email ?? '' })}</h1>
      <p className="lead">{t('roleIs', { role: profile.role })}</p>
      <p className="mkt-note">{t('intro')}</p>

      <div className="mkt-grid mkt-grid-3" style={{ marginTop: 32 }}>
        {CAPS[profile.role].map((cap) => (
          <div key={cap} className="mkt-card mkt-card-static">
            <span className="mkt-card-title">{t(`caps.${cap}.title`)}</span>
            <p>{t(`caps.${cap}.body`)}</p>
            <span className="pill">{t('soon')}</span>
          </div>
        ))}
      </div>
    </>
  );
}
