import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/site/PageHero';
import { MarkdownBody } from '@/components/site/MarkdownBody';
import { LEGAL_SLUGS, legalDocs, type LegalSlug } from '@/lib/legal';

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

function doc(slug: string) {
  return (LEGAL_SLUGS as readonly string[]).includes(slug) ? legalDocs[slug as LegalSlug] : null;
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const d = doc(slug);
  return { title: d ? `${d.title} · Edingrad` : 'Not found' };
}

export default function Page({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  setRequestLocale(locale);
  const d = doc(slug);
  if (!d) notFound();

  return (
    <article className="article">
      <PageHero overline={d.overline} title={d.title} lead={d.lead} />
      <div className="wrap article-wrap">
        <p className="article-meta">{d.updated}</p>
        <div className="prose legal-prose">
          <MarkdownBody>{d.body}</MarkdownBody>
        </div>
      </div>
    </article>
  );
}
