import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/site/PageHero';
import { listAgents } from '@/lib/agents';
import { heroImage } from '@/lib/page-images';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'routes' });
  return { title: t('agents.title') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const tr = await getTranslations('routes');
  const t = await getTranslations('agents');
  const agents = await listAgents();
  return (
    <>
      <PageHero overline={tr('agents.over')} title={tr('agents.title')} lead={tr('agents.lead')} image={heroImage['agents']} />
      <section className="mkt-section">
        <div className="wrap">
          {agents.length === 0 ? (
            <p className="mkt-note">{t('empty')}</p>
          ) : (
            <div className="agent-grid">
              {agents.map((a) => (
                <Link key={a.user_id} href={`/who-we-are/agents/${a.user_id}`} className="agent-tile">
                  <span className="agent-avatar">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {a.photo_url ? <img src={a.photo_url} alt="" /> : <span className="agent-initial">{(a.name ?? '·').charAt(0)}</span>}
                  </span>
                  <span className="agent-tile-name">{a.name ?? 'Agent'}</span>
                  {a.languages.length > 0 && <span className="agent-langs">{a.languages.join(' · ')}</span>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
