import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { signOut } from '@/app/[locale]/login/actions';
import type { SessionProfile } from '@/lib/auth';

/** App shell for the protected dashboard: a dark bar with role + sign-out. */
export async function DashboardChrome({
  profile,
  children,
}: {
  profile: SessionProfile;
  children: React.ReactNode;
}) {
  const t = await getTranslations('dashboard');
  const canManageContent = profile.role === 'admin' || profile.role === 'editor';
  return (
    <>
      <header className="dash-header">
        <div className="wrap dash-header-inner">
          <span className="dash-brand">
            <span className="site-logo-mark" /> Edingrad <span className="dash-tag">{t('tag')}</span>
          </span>
          <nav className="dash-nav">
            <Link href="/dashboard">{t('tag')}</Link>
            {canManageContent && <Link href="/dashboard/content">Content</Link>}
          </nav>
          <div className="dash-user">
            <span className="dash-role">{profile.role}</span>
            <span className="dash-email">{profile.email}</span>
            <form action={signOut}>
              <button type="submit" className="btn-ghost dash-signout">
                {t('signOut')}
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="dash-main">
        <div className="wrap">{children}</div>
      </main>
    </>
  );
}
