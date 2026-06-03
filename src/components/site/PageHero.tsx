import type { ReactNode } from 'react';
import Image from 'next/image';

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
        <Image className="page-hero-bg" src={image} alt="" aria-hidden fill priority sizes="100vw" />
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
