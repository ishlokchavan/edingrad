import { Section } from '@/components/primitives/Section';
import {
  BLUE_SCALE,
  GRAY_SCALE,
  FULL_PALETTE,
  CORE_FAMILIES,
  CATEGORICAL,
  ALERTS,
  DARK_SURFACES,
  type Swatch,
  type PaletteFamily,
} from '@/data/colors';

/** Relative luminance test to pick a readable label color on a swatch. */
function isLight(hex: string): boolean {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

function ScaleBar({ steps }: { steps: Swatch[] }) {
  return (
    <div className="scale-bar">
      {steps.map((s) => (
        <div key={s.step} className="seg" style={{ background: s.hex, color: isLight(s.hex) ? '#161616' : '#fff' }}>
          <span>{s.step}</span>
        </div>
      ))}
    </div>
  );
}

/** The full IBM palette: one row per family, ten steps each (10 -> 100). */
function PaletteGrid({ families }: { families: PaletteFamily[] }) {
  return (
    <div style={{ display: 'grid', gap: 14, marginTop: 24 }}>
      {families.map((fam) => (
        <div key={fam.name}>
          <div
            style={{
              fontSize: '.78rem',
              fontWeight: 600,
              color: 'var(--mid)',
              marginBottom: 6,
            }}
          >
            {fam.name}
          </div>
          <div style={{ display: 'flex', borderRadius: 4, overflow: 'hidden' }}>
            {fam.steps.map((s) => (
              <div
                key={s.step}
                title={`${fam.name} ${s.step} · ${s.hex.toUpperCase()}`}
                style={{
                  background: s.hex,
                  flex: 1,
                  height: 56,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  color: isLight(s.hex) ? '#161616' : '#fff',
                  fontSize: '.62rem',
                  lineHeight: 1.1,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <span style={{ fontWeight: 600 }}>{s.step}</span>
                <span style={{ opacity: 0.85 }}>{s.hex.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Color() {
  return (
    <Section
      id="color"
      lead={
        <>
          Blue at the core. A ten-step blue scale carries the brand, balanced by the full set of
          color families and used with deliberate restraint across both themes.
        </>
      }
    >
      <h3 id="color">Blue at the core</h3>
      <p style={{ marginBottom: 16 }}>
        Blue&nbsp;60 (<b>#0F62FE</b>) is the primary action color. Lighter steps carry text and
        links on dark; darker steps build depth.
      </p>
      <ScaleBar steps={BLUE_SCALE} />

      <h3 id="color-families" style={{ margin: '48px 0 8px' }}>
        Color families
      </h3>
      <p>
        The full IBM palette &mdash; ten hue families plus three neutral grays, each in ten steps
        (10 light &rarr; 100 dark). Every value matches the IBM Design Language exactly. Blue leads
        the brand; the others support data, status and accent use.
      </p>
      <PaletteGrid families={FULL_PALETTE} />

      <h3 id="color-core" style={{ margin: '48px 0 8px' }}>
        Core color families
      </h3>
      <p>
        Beyond the full set, the palette is organised into families built for combination &mdash;
        each one carrying core blue. Begin with a four-colour family, then subdivide to three, two
        or one colour as a layout needs fewer hues.
      </p>
      <div className="fam-set" style={{ marginTop: 24 }}>
        {CORE_FAMILIES.map((fam) => (
          <div className="fam-block" key={fam.label}>
            <div className="fam-label">{fam.label}</div>
            <div className="fam-row">
              {fam.chips.map((c) => (
                <span className="fam-chip" key={c.name} style={{ background: c.hex }}>
                  <b>{c.name}</b>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="grid2" style={{ marginTop: 24, alignItems: 'start' }}>
        <div className="card">
          <div className="chart-title">Combinations to avoid</div>
          <ul className="avoid-list">
            <li>
              <span className="sw-dot" style={{ background: '#24a148' }} />
              <span className="sw-dot" style={{ background: '#fa4d56' }} /> Greens with reds,
              magentas or purples.
            </li>
            <li>
              <span className="sw-dot" style={{ background: '#009d9a' }} />
              <span className="sw-dot" style={{ background: '#ee5396' }} /> Teals with reds or
              magentas.
            </li>
          </ul>
        </div>
        <div className="card">
          <div className="chart-title">Gradients</div>
          <p style={{ margin: '8px 0 12px', fontSize: '.9rem', color: 'var(--mid)' }}>
            Blend within one 2-colour family, between steps 30&ndash;60, never across more than two
            steps or two colours.
          </p>
          <div className="grad-bar" style={{ background: 'linear-gradient(90deg,#0f62fe,#1192e8)' }} />
          <div className="grad-cap">Blue 60 &rarr; Cyan 50</div>
        </div>
      </div>

      <h3 id="color-grays" style={{ margin: '48px 0 8px' }}>
        Grays, black &amp; white
      </h3>
      <p>Gray is the workhorse neutral &mdash; ten steps from near-white to near-black.</p>
      <ScaleBar steps={GRAY_SCALE} />

      <h3 id="color-theme" style={{ margin: '48px 0 14px' }}>
        Dark theme surfaces
      </h3>
      <p style={{ marginBottom: 16 }}>
        Build the interface in layers &mdash; each step up sits slightly lighter, so elevation reads
        without hard borders.
      </p>
      <div className="famscale">
        {DARK_SURFACES.map((s) => (
          <div
            key={s.name}
            className="seg"
            style={{
              background: s.hex,
              flex: 1,
              height: 90,
              display: 'flex',
              alignItems: 'flex-end',
              padding: 16,
              color: s.light || !isLight(s.hex) ? '#fff' : '#161616',
              fontSize: '.78rem',
            }}
          >
            {s.name} &middot; {s.hex.toUpperCase()}
          </div>
        ))}
      </div>

      <h3 id="color-status" style={{ margin: '48px 0 14px' }}>
        Alert &amp; support
      </h3>
      <p style={{ marginBottom: 16 }}>Status colours signal error, success, warning, caution and info.</p>
      <div className="grid3" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
        {ALERTS.map((a) => (
          <div className="card" key={a.name} style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ background: a.hex, height: 72 }} />
            <div style={{ padding: '12px 14px' }}>
              <div className="nm" style={{ fontWeight: 600 }}>
                {a.name}
              </div>
              <div className="hx" style={{ fontSize: '.72rem', color: 'var(--low)', fontVariantNumeric: 'tabular-nums' }}>
                {a.hex.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
