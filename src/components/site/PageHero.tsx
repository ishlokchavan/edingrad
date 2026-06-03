import type { ReactNode } from 'react';

/** Standard interior-page hero: overline + Palestra title + lead. */
export function PageHero({
  overline,
  title,
  lead,
  children,
}: {
  overline?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="wrap">
        {overline && <div className="over">{overline}</div>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
