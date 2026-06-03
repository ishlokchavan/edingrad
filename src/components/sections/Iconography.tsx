import { Section } from '@/components/primitives/Section';
import { DoDont, Pill } from '@/components/primitives/ui';
import { ICON_LIBRARY, Analytics } from '@/components/icons/ui-icons';

const SIZES = [
  ['32px', '2px', '2px', '28px', '2px', '\u2014'],
  ['24px', '1.5px', '1.5px', '21px', '1.5px', '\u2014'],
  ['20px', '1.25px', '1.25px', '17.5px', '1.25px', '16pt type'],
  ['16px', '1px', '1px', '14px', '1px', '14pt type'],
];

const PRINCIPLES = [
  ['01', 'Engineered', 'Precise and balanced. Consistent grid, shapes, angles and corner radius create a deliberate, systematic aesthetic.'],
  ['02', 'Clear', 'Never overloaded. Only the essential elements needed to communicate the core idea, so the metaphor reads instantly.'],
  ['03', 'Nimble', 'A sense of ease and lightness. Composition, spacing and weight let the eye grasp the concept without effort.'],
];

export function Iconography() {
  return (
    <Section
      id="icons"
      lead={
        <>
          Visual symbols that represent ideas, objects and actions &mdash; engineered on a shared
          grid, drawn at a single weight, and built from the same details as the typeface.
        </>
      }
    >
      <h3 id="icons">Principles</h3>
      <p>
        Edingrad icons follow three principles, drawn from the IBM Design Language: they are
        engineered, clear and nimble. Precise on the grid, never overworked, and light enough to
        read at a glance.
      </p>
      <div className="grid3" style={{ marginTop: 24 }}>
        {PRINCIPLES.map(([n, t, b]) => (
          <div className="card" key={t}>
            <Pill>{n}</Pill>
            <h4 style={{ marginTop: 16 }}>{t}</h4>
            <p style={{ marginTop: 8 }}>{b}</p>
          </div>
        ))}
      </div>

      <h3 id="icons-grid" style={{ margin: '56px 0 8px' }}>
        Grid &amp; construction
      </h3>
      <p>
        Every icon is drawn on a <b>32&times;32px grid</b> with <b>2px padding</b>, so the live area
        is 28px. A single <b>2px stroke</b> keeps the whole set at one visual weight; corners use a{' '}
        <b>2px radius</b>, and angles sit on multiples of 15&deg; (45&deg; for clean anti-aliasing).
        Exteriors are rounded, interiors stay at 90&deg;.
      </p>
      <div className="icon-construct">
        <div className="ic-demo-grid">
          <Analytics aria-label="Icon construction example" />
        </div>
        <ul className="icon-specs">
          <li><b>32&times;32</b> base grid, scaled linearly to smaller sizes</li>
          <li><b>2px</b> padding ring &mdash; artwork stays inside the live area</li>
          <li><b>2px</b> stroke weight, uniform across the set</li>
          <li><b>2px</b> corner radius; square arrow tips and stroke caps</li>
          <li>Rounded exterior, <b>90&deg;</b> interior &mdash; a bond with the typeface</li>
          <li>Straight-on perspective; no dimensional or perspective views</li>
        </ul>
      </div>
      <DoDont
        dos={[
          'Snap artwork to the pixel grid; keep one 2px weight.',
          'Use straight-on or profile views with square caps.',
          'Place arrow points and angled caps on the grid.',
        ]}
        donts={[
          'Don\u2019t mix stroke weights within or across icons.',
          'Don\u2019t add dimensional or perspective effects.',
          'Don\u2019t use rounded arrow tips or off-grid points.',
        ]}
      />

      <h3 id="icons-library" style={{ margin: '56px 0 8px' }}>
        Library
      </h3>
      <p>
        A starter set of UI icons, grouped by purpose. All share the 32px grid, 2px stroke and a
        single colour &mdash; they inherit the current text colour, so they adapt to both themes.
      </p>
      {ICON_LIBRARY.map((cat) => (
        <div key={cat.category}>
          <div className="icon-cat-label">{cat.category}</div>
          <div className="icon-grid">
            {cat.icons.map(({ name, Comp }) => (
              <figure className="icon-cell" key={name}>
                <span className="icon-box">
                  <Comp aria-label={name} />
                </span>
                <figcaption>{name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ))}

      <h3 id="icons-sizing" style={{ margin: '56px 0 8px' }}>
        Sizing
      </h3>
      <p>
        Icons are produced at four sizes. Stroke, padding, live area and corner radius all scale
        with the icon &mdash; use them at their produced size rather than rescaling artwork.
      </p>
      <div className="table-scroll">
        <table className="bp-table">
          <thead>
            <tr>
              <th>Icon size</th>
              <th>Stroke</th>
              <th>Padding</th>
              <th>Live area</th>
              <th>Corner radius</th>
              <th>Pairs with</th>
            </tr>
          </thead>
          <tbody>
            {SIZES.map((r) => (
              <tr key={r[0]}>
                {r.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="icon-size-demo">
        {[32, 24, 20, 16].map((s) => (
          <span className="isd" key={s} style={{ width: s, height: s }}>
            <Analytics size={s} aria-hidden="true" />
          </span>
        ))}
        <span className="isd-cap">32 / 24 / 20 / 16&#8239;px</span>
      </div>

      <h3 id="icons-usage" style={{ margin: '56px 0 8px' }}>
        Usage
      </h3>
      <p>
        Use icons sparingly and strategically to reduce cognitive load. Centre&#8209;align them with
        adjacent text, match their colour to that text, and keep touch targets at least 44px.
      </p>
      <DoDont
        dos={[
          'Centre-align icons with the text they sit beside.',
          'Match icon colour to the text; keep them monochromatic.',
          'Give touch targets a 44px minimum, padding the target in CSS.',
        ]}
        donts={[
          'Don\u2019t baseline-align icons to text or rescale artwork.',
          'Don\u2019t use more than one colour within an icon.',
          'Don\u2019t crowd targets below the 44px clearance.',
        ]}
      />
    </Section>
  );
}
