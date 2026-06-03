import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LoginForm } from '@/components/site/LoginForm';
import { getSessionProfile } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'auth' });
  return { title: t('title') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  if (await getSessionProfile()) redirect('/dashboard');
  const t = await getTranslations('auth');

  return (
    <main className="auth-screen">
      <div className="auth-card">
        <Link href="/" className="auth-logo">
          <span className="site-logo-mark" /> Edingrad
        </Link>
        <h1>{t('title')}</h1>
        <p className="auth-sub">{t('subtitle')}</p>
        <LoginForm />
        <Link href="/" className="auth-back">
          ← {t('backToSite')}
        </Link>
      </div>
    </main>
  );
}
