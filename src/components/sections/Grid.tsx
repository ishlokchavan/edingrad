import { Section } from '@/components/primitives/Section';
import { DoDont } from '@/components/primitives/ui';

const MULTIPLES: [number, number][] = [
  [1, 8],
  [2, 16],
  [3, 24],
  [4, 32],
  [6, 48],
  [8, 64],
  [10, 80],
  [12, 96],
];

const BREAKPOINTS = [
  ['Small', '320px', '4', '16px', '32px'],
  ['Medium', '672px', '8', '24px', '32px'],
  ['Large', '1056px', '16', '32px', '32px'],
  ['X\u2011Large', '1312px', '16', '48px', '32px'],
  ['Max', '1584px', '16', '48px', '32px'],
];

function divisions(n: number) {
  return Array.from({ length: n }).map((_, i) => <i key={i} />);
}

export function Grid() {
  return (
    <Section
      id="grid"
      lead={
        <>
          The 2x&nbsp;Grid is the framework beneath every layout &mdash; divisions of two, an
          eight&#8209;pixel base unit and a consistent spatial scale give the system structure so
          the content can lead.
        </>
      }
    >
      <h3 id="grid">Divisions of two</h3>
      <p>
        At the core of the system is the idea of dividing space by two. Splitting a surface into 4,
        8 or 16 equal parts gives every layout a predictable structure to build on.
      </p>
      <div className="divset">
        {[4, 8, 16].map((n) => (
          <div className="divline" key={n}>
            <span className="dl">{n}</span>
            <div className="divbar" style={{ gridTemplateColumns: `repeat(${n},1fr)` }}>
              {divisions(n)}
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ margin: '56px 0 8px' }}>The 8&#8239;px base unit</h3>
      <p>
        In product and on the web an <b>eight&#8209;pixel mini unit</b> guides everything &mdash; the
        grid itself and every element placed within it. Building on one unit keeps proportion, type
        and space in tune.
      </p>

      <h3 id="grid-spacing" style={{ margin: '56px 0 8px' }}>
        Spatial scale
      </h3>
      <p>
        Space between elements is always a multiple of the base unit. Edingrad uses the 2x set
        &mdash; 1&times;, 2&times;, 3&times;, 4&times;, 6&times;, 8&times;, 10&times;, 12&times;.
      </p>
      <div className="sp-list">
        {MULTIPLES.map(([m, v]) => (
          <div className="sp-row" key={m}>
            <b>{m}&times;</b>
            <span className="sp-px">{v}</span>
            <div className="sp-bar" style={{ width: v }} />
          </div>
        ))}
      </div>

      <h3 id="grid-columns" style={{ margin: '56px 0 8px' }}>
        Columns &amp; gutters
      </h3>
      <p>
        Layouts run on a sixteen&#8209;column grid with a <b>32&#8239;px gutter</b>. Columns and rows
        stay equal and type aligns to the gutters, not the canvas edge.
      </p>
      <div className="table-scroll">
        <table className="bp-table">
          <thead>
            <tr>
              <th>Breakpoint</th>
              <th>Min width</th>
              <th>Columns</th>
              <th>Margin</th>
              <th>Gutter</th>
            </tr>
          </thead>
          <tbody>
            {BREAKPOINTS.map((r) => (
              <tr key={r[0]}>
                {r.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 id="grid-demo" style={{ margin: '56px 0 8px' }}>
        The grid in this document
      </h3>
      <p>
        This page is built on the same grid: sixteen columns, a 32&#8239;px gutter and a
        1056&#8239;px maximum content width.
      </p>
      <div className="gridcols">{divisions(16)}</div>
      <div className="gridcap">Sixteen columns &middot; 32&#8239;px gutter &middot; 1056&#8239;px max content width</div>

      <DoDont
        dos={[
          'Divide the live area so every column and row stays equal.',
          'Align type and elements to the gutters.',
          'Keep all spacing on a multiple of the 8\u202fpx base unit.',
        ]}
        donts={[
          'Don\u2019t divide from the canvas edge when a margin is set.',
          'Don\u2019t add a gutter without redistributing the columns.',
          'Don\u2019t use off\u2011grid values like 14 or 18\u202fpx for spacing.',
        ]}
      />
    </Section>
  );
}
