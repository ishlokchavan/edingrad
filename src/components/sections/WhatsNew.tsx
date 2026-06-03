import { Section } from '@/components/primitives/Section';

const CHANGES: [string, string, string][] = [
  ['v1.0', '30 May 2026', 'First public release of the Edingrad brand guidelines, rebuilt as a Next.js + TypeScript application.'],
  ['Iconography', '30 May 2026', 'Added the UI icon system \u2014 principles, 32px construction, a 24-icon library, sizing and usage.'],
  ['Animation', '30 May 2026', 'Added the motion section \u2014 approach, productive vs expressive, the twelve classic principles and tips.'],
  ['Data viz', '30 May 2026', 'Recoloured the chart catalogue to the blue family and documented the categorical palette.'],
  ['Theming', '30 May 2026', 'Hero and section bands now follow the active theme; full light/dark parity.'],
];

export function WhatsNew() {
  return (
    <Section id="whatsnew" lead={<>A running record of what has changed in the system and when.</>}>
      <h3 id="whatsnew">Changelog</h3>
      <div className="timeline" style={{ marginTop: 20 }}>
        {CHANGES.map(([tag, date, body]) => (
          <div key={tag + date} style={{ position: 'relative', paddingBottom: 28 }}>
            <span
              style={{
                position: 'absolute',
                left: -30,
                top: 4,
                width: 9,
                height: 9,
                background: 'var(--accent-deep)',
                borderRadius: '50%',
              }}
            />
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <b>{tag}</b>
              <span style={{ fontSize: '.78rem', color: 'var(--low)', fontVariantNumeric: 'tabular-nums' }}>{date}</span>
            </div>
            <p style={{ marginTop: 6 }}>{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
