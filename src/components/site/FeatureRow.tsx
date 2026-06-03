import type { ReactNode } from 'react';
import Image from 'next/image';

interface Point {
  title: string;
  body: string;
}

/**
 * A two-column feature block: a photograph beside a column of copy (overline,
 * heading, lead and an optional list of points). Alternate `reversed` down a
 * page to get the image-left / image-right rhythm.
 */
export function FeatureRow({
  image,
  imageAlt = '',
  overline,
  title,
  body,
  points,
  reversed = false,
  footer,
}: {
  image: string;
  imageAlt?: string;
  overline?: string;
  title: string;
  body?: string;
  points?: Point[];
  reversed?: boolean;
  footer?: ReactNode;
}) {
  return (
    <div className={`feature-row${reversed ? ' feature-row--reversed' : ''}`}>
      <div className="feature-media">
        <Image src={image} alt={imageAlt} fill sizes="(max-width:860px) 100vw, 50vw" />
      </div>
      <div className="feature-body">
        {overline && <div className="over">{overline}</div>}
        <h2>{title}</h2>
        {body && <p className="lead">{body}</p>}
        {points && points.length > 0 && (
          <ul className="feature-points">
            {points.map((p) => (
              <li key={p.title}>
                <span className="feature-point-title">{p.title}</span>
                <span className="feature-point-body">{p.body}</span>
              </li>
            ))}
          </ul>
        )}
        {footer && <div className="feature-footer">{footer}</div>}
      </div>
    </div>
  );
}
