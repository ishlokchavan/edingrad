import { setRequestLocale } from 'next-intl/server';
import { requireSession } from '@/lib/auth';
import { DashboardChrome } from '@/components/dashboard/DashboardChrome';

/** Protected area: requires a signed-in user with a profile, else /login. */
export default async function AppLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const profile = await requireSession();
  return <DashboardChrome profile={profile}>{children}</DashboardChrome>;
}
