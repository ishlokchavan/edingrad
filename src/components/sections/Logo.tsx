import { Section } from '@/components/primitives/Section';
import { DoDont } from '@/components/primitives/ui';

/** Approved logo colors, matching the IBM 8-bar logo guidance exactly. */
const LOGO_COLORS: { name: string; hex: string; note: string; border?: boolean }[] = [
  { name: 'Blue 60', hex: '#0f62fe', note: 'Primary, on light or neutral backgrounds' },
  { name: 'Black', hex: '#161616', note: 'On light backgrounds where blue is unavailable' },
  { name: 'White', hex: '#ffffff', note: 'On dark, blue or photographic backgrounds', border: true },
];

export function Logo() {
  return (
    <Section
      id="logo"
      lead={
        <>
          The Edingrad wordmark is set in Palestra &mdash; high-contrast, confident, unmistakably
          editorial. It is the one fixed signature of the brand.
        </>
      }
    >
      <h3 id="logo">Wordmark</h3>
      <p>
        The wordmark is always set in Palestra and used in white or brand blue only. It is never
        recreated in another typeface, recoloured, or given effects.
      </p>
      <div
        className="card"
        style={{
          display: 'grid',
          placeItems: 'center',
          padding: '64px 24px',
          marginTop: 24,
        }}
      >
        <span style={{ fontFamily: "'Palestra', serif", fontWeight: 700, fontSize: 'clamp(2.4rem,6vw,4rem)', letterSpacing: '-.02em' }}>
          Edingrad
        </span>
      </div>

      <h3 id="logo-color" style={{ margin: '56px 0 8px' }}>
        Logo color
      </h3>
      <p>
        Following the IBM 8-bar logo guidance, the wordmark appears in exactly three colors:
        Blue&nbsp;60 (<b>#0F62FE</b>), black (<b>#161616</b>) or white (<b>#FFFFFF</b>). Blue is the
        primary treatment; black and white are reserved for where blue cannot hold contrast. Never
        introduce any other colour, tint or gradient.
      </p>
      <div className="grid3" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginTop: 16 }}>
        {LOGO_COLORS.map((c) => (
          <div className="card" key={c.name} style={{ padding: 0, overflow: 'hidden' }}>
            <div
              style={{
                background: c.hex,
                height: 96,
                display: 'grid',
                placeItems: 'center',
                borderBottom: c.border ? '1px solid var(--line-2)' : 'none',
              }}
            >
              <span
                style={{
                  fontFamily: "'Palestra', serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: c.hex === '#ffffff' ? '#0f62fe' : '#fff',
                }}
              >
                Edingrad
              </span>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div className="nm" style={{ fontWeight: 600 }}>
                {c.name}
              </div>
              <div
                className="hx"
                style={{ fontSize: '.72rem', color: 'var(--low)', fontVariantNumeric: 'tabular-nums', marginBottom: 4 }}
              >
                {c.hex.toUpperCase()}
              </div>
              <div style={{ fontSize: '.74rem', color: 'var(--mid)' }}>{c.note}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 id="logo-clearspace" style={{ margin: '56px 0 8px' }}>
        Clear space
      </h3>
      <p>
        Maintain clear space around the wordmark equal to the cap-height of the &ldquo;E&rdquo; on
        all sides. Never crowd it with other elements, and keep it above a minimum legible size.
      </p>
      <div
        className="card"
        style={{ display: 'grid', placeItems: 'center', padding: 24, marginTop: 16 }}
      >
        <div style={{ border: '1px dashed var(--line-2)', padding: 'clamp(20px,4vw,40px)' }}>
          <span style={{ fontFamily: "'Palestra', serif", fontWeight: 700, fontSize: 'clamp(1.6rem,4vw,2.6rem)' }}>
            Edingrad
          </span>
        </div>
      </div>

      <h3 id="logo-heritage" style={{ margin: '56px 0 8px' }}>
        Heritage mark
      </h3>
      <p>
        In the spirit of IBM&rsquo;s rebus, a playful heritage mark may stand in for the wordmark in
        rare celebratory contexts. It is never a substitute for the primary wordmark, never used in
        running communications, and always follows the same three-colour rule.
      </p>

      <h3 id="logo-usage" style={{ margin: '56px 0 16px' }}>
        Usage
      </h3>
      <DoDont
        dos={[
          'Use the wordmark in Blue 60, black or white only.',
          'Maintain the clear-space and minimum-size rules.',
          'Place on the dark canvas or brand blue for contrast.',
        ]}
        donts={[
          'Don’t stretch, skew, outline or add effects.',
          'Don’t recolour or set in any font other than Palestra.',
          'Don’t place on busy imagery or low-contrast backgrounds.',
        ]}
      />
    </Section>
  );
}
