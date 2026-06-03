import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAgent, listAgentListings } from '@/lib/agents';
import { ListingCard } from '@/components/site/ListingCard';

export const revalidate = 300;

export async function generateMetadata({ params: { id } }: { params: { locale: string; id: string } }): Promise<Metadata> {
  const agent = await getAgent(id);
  return { title: agent?.name ?? 'Agent' };
}

export default async function Page({ params: { locale, id } }: { params: { locale: string; id: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('agents');
  const agent = await getAgent(id);
  if (!agent) notFound();
  const listings = await listAgentListings(id);

  return (
    <article className="article">
      <div className="wrap article-wrap">
        <Link href="/who-we-are/agents" className="article-back">← {t('title')}</Link>
        <div className="agent-head">
          <span className="agent-avatar agent-avatar-lg">
            {agent.photo_url ? <Image src={agent.photo_url} alt="" fill sizes="120px" /> : <span className="agent-initial">{(agent.name ?? '·').charAt(0)}</span>}
          </span>
          <div>
            <h1>{agent.name ?? 'Agent'}</h1>
            {agent.rera_brn && <div className="agent-sub">BRN {agent.rera_brn}</div>}
            <div className="agent-contact">
              {agent.phone && <a href={`tel:${agent.phone}`}>{agent.phone}</a>}
              {agent.email && <a href={`mailto:${agent.email}`}>{agent.email}</a>}
            </div>
          </div>
        </div>
        {agent.bio && <p className="lead" style={{ marginTop: 20 }}>{agent.bio}</p>}
      </div>

      <div className="wrap" style={{ marginTop: 40 }}>
        <h2 className="downloads-h">{t('listingsTitle')}</h2>
        {listings.length === 0 ? (
          <p className="mkt-note">{t('noListings')}</p>
        ) : (
          <div className="listing-grid" style={{ marginTop: 16 }}>
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
