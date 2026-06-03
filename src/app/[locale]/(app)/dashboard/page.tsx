import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { requireSession, type Role } from '@/lib/auth';
import { ArrowRight } from '@/components/icons/ui-icons';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'dashboard' });
  return { title: t('tag') };
}

/** Capability shortcuts by role. A href makes the card a live link; without one
 *  it shows "Coming soon". */
const CAPS: Record<Role, string[]> = {
  admin: ['content', 'jobs', 'listings', 'applications', 'leads', 'users'],
  editor: ['content', 'jobs', 'applications'],
  agent: ['ownListings', 'ownLeads'],
};

const CAP_HREF: Record<string, string | undefined> = {
  content: '/dashboard/content',
  jobs: '/dashboard/jobs',
  listings: '/dashboard/listings',
  ownListings: '/dashboard/listings',
  applications: '/dashboard/applications',
  leads: '/dashboard/leads',
  ownLeads: '/dashboard/leads',
  users: undefined, // user management not built yet
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
        {CAPS[profile.role].map((cap) => {
          const href = CAP_HREF[cap];
          const body = (
            <>
              <span className="mkt-card-title">{t(`caps.${cap}.title`)}</span>
              <p>{t(`caps.${cap}.body`)}</p>
              {href ? (
                <span className="mkt-card-arrow" aria-hidden>
                  <ArrowRight size={20} />
                </span>
              ) : (
                <span className="pill">{t('soon')}</span>
              )}
            </>
          );
          return href ? (
            <Link key={cap} href={href} className="mkt-card">
              {body}
            </Link>
          ) : (
            <div key={cap} className="mkt-card mkt-card-static">
              {body}
            </div>
          );
        })}
      </div>
    </>
  );
}
