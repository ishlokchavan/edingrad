import Link from 'next/link';
import type { ReactNode } from 'react';
import { SECTIONS, sectionNumber, pagerFor, type SubItem } from '@/lib/sections';

/** The "↳ on this page" jump grid, derived from a section's sub-items. */
export function OnThisPage({ sub }: { sub: SubItem[] }) {
  if (sub.length <= 1) return null;
  return (
    <div className="jumps">
      {sub.map((s) => (
        <a key={s.anchor} href={`#${s.anchor}`}>
          {s.label}
        </a>
      ))}
    </div>
  );
}

/** Previous / Next pager, derived from the section registry order. */
export function Pager({ id }: { id: string }) {
  const { prev, next } = pagerFor(id);
  return (
    <nav className="pager" aria-label="Section pagination">
      {prev ? (
        <a className="prev" href={`#${prev.id}`}>
          <span className="dir">Previous</span>
          <span className="ttl">{prev.title}</span>
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a className="next" href={`#${next.id}`}>
          <span className="dir">Next</span>
          <span className="ttl">{next.title}</span>
        </a>
      ) : (
        <span />
      )}
    </nav>
  );
}

interface SectionProps {
  id: string;
  /** Optional lead paragraph shown above the jump grid. */
  lead?: ReactNode;
  children: ReactNode;
}

/**
 * Standard section shell: themed band (overline + title) followed by the
 * content area with the lead, on-this-page jumps, body, and pager. All meta
 * (number, title, sub-links, pager neighbours) comes from the registry, so a
 * section component only supplies its lead and body.
 */
export function Section({ id, lead, children }: SectionProps) {
  const index = SECTIONS.findIndex((s) => s.id === id);
  const meta = SECTIONS[index];
  if (!meta) throw new Error(`Unknown section id: ${id}`);

  return (
    <section className="sec" id={id} data-sec>
      <div className="band">
        <div className="wrap">
          <div className="over">
            {sectionNumber(index)} &mdash; {meta.title}
          </div>
          <h2>{meta.title}</h2>
        </div>
      </div>
      <div className="wrap secbody">
        {lead && <p className="lead">{lead}</p>}
        <OnThisPage sub={meta.sub} />
        {children}
        <Pager id={id} />
      </div>
    </section>
  );
}

/** Re-export Link so sections can use it without another import line. */
export { Link };
