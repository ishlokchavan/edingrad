import type { ReactNode } from 'react';

/** Standard interior-page hero: overline + Palestra title + lead. With `image`,
 *  renders a photographic background hero with a dark overlay and white text. */
export function PageHero({
  overline,
  title,
  lead,
  image,
  children,
}: {
  overline?: string;
  title: string;
  lead?: string;
  image?: string;
  children?: ReactNode;
}) {
  if (image) {
    return (
      <section className="page-hero page-hero--image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="page-hero-bg" src={image} alt="" aria-hidden="true" />
        <div className="wrap page-hero-content">
          {overline && <div className="over">{overline}</div>}
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
      </section>
    );
  }
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
