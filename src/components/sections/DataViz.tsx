import { Section } from '@/components/primitives/Section';
import { DoDont } from '@/components/primitives/ui';
import { ChartCatalog } from '@/components/charts/ChartCatalog';
import { BarChart, LineChart, Donut } from '@/components/charts/Charts';
import { CATEGORICAL } from '@/data/colors';

export function DataViz() {
  return (
    <Section
      id="data"
      lead={
        <>
          Data is where the brand earns trust. A disciplined palette and a clear chart taxonomy keep
          every figure honest, legible and unmistakably Edingrad.
        </>
      }
    >
      <h3 id="data">The categorical palette</h3>
      <p>
        For unordered categories, draw from the Carbon 14-step categorical sequence strictly in
        order. It is engineered for maximum distinction and adequate contrast at every step.
      </p>
      <div className="famscale" style={{ marginTop: 16, flexWrap: 'wrap' }}>
        {CATEGORICAL.map((c) => (
          <div
            key={c.step}
            className="seg"
            title={c.step}
            style={{ background: c.hex, flex: '1 0 7%', height: 56 }}
          />
        ))}
      </div>
      <p style={{ marginTop: 10, fontSize: '.84rem', color: 'var(--low)' }}>
        14 steps &middot; applied in sequence, never reordered for aesthetics.
      </p>

      <h3 id="data-charts" style={{ margin: '54px 0 8px' }}>
        Chart types
      </h3>
      <p>
        Charts are grouped by intent, exactly as in the IBM Design Language. Pick the family that
        matches the question, then the simplest form that answers it. Every thumbnail is drawn from
        the blue family.
      </p>
      <ChartCatalog />

      <h4 className="specimen-h">Worked specimens</h4>
      <div className="grid2" style={{ alignItems: 'start' }}>
        <div className="card">
          <div className="chart-title">Comparison &mdash; grouped bars</div>
          <div className="chart-sub">Blue family across periods</div>
          <BarChart
            labels={['Q1', 'Q2', 'Q3', 'Q4', 'Q5']}
            series={[
              [40, 55, 48, 70, 62],
              [30, 42, 60, 52, 75],
              [22, 35, 30, 45, 58],
            ]}
            ariaLabel="Grouped bar chart in the blue family"
          />
          <div className="legend">
            <span><i style={{ background: '#0f62fe' }} />Series A</span>
            <span><i style={{ background: '#4589ff' }} />Series B</span>
            <span><i style={{ background: '#78a9ff' }} />Series C</span>
          </div>
        </div>
        <div className="card">
          <div className="chart-title">Trend &mdash; multi-line</div>
          <div className="chart-sub">Blue steps, legible in both themes</div>
          <LineChart
            series={[
              [20, 34, 30, 48, 44, 62, 58, 78],
              [14, 22, 40, 38, 56, 52, 70, 66],
              [8, 16, 22, 30, 28, 42, 50, 60],
            ]}
            ariaLabel="Multi-line trend chart in the blue family"
          />
          <div className="legend">
            <span><i style={{ background: '#0f62fe' }} />North</span>
            <span><i style={{ background: '#4589ff' }} />South</span>
            <span><i style={{ background: '#78a9ff' }} />East</span>
          </div>
        </div>
      </div>
      <div className="grid2" style={{ marginTop: 16, alignItems: 'start' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="chart-title" style={{ alignSelf: 'flex-start' }}>
            Proportion &mdash; donut
          </div>
          <div className="chart-sub" style={{ alignSelf: 'flex-start' }}>
            Limit to ~6 slices for legibility
          </div>
          <div style={{ maxWidth: 270, width: '100%' }}>
            <Donut data={[34, 24, 16, 13, 8, 5]} centerLabel="6" centerSub="CATEGORIES" ariaLabel="Donut chart" />
          </div>
        </div>
        <div>
          <h3 id="data-seq" style={{ margin: '4px 0 8px' }}>
            Sequential &amp; diverging
          </h3>
          <div className="chart-sub" style={{ marginBottom: 14 }}>
            A single blue scale orders data from low to high. For unordered categories, draw from the
            full categorical sequence instead.
          </div>
          <div className="seqlabel">Sequential blue</div>
          <div className="scale-bar">
            {['#002d9c', '#0043ce', '#0f62fe', '#4589ff', '#78a9ff', '#a6c8ff'].map((h, i) => (
              <div key={h} className="seg" style={{ background: h, color: i > 2 ? '#161616' : '#fff' }}>
                <span />
              </div>
            ))}
          </div>
          <p style={{ marginTop: 12, fontSize: '.85rem', color: 'var(--low)' }}>
            Ordered single-series data &middot; low &rarr; high.
          </p>
        </div>
      </div>

      <h3 id="data-guide" style={{ margin: '56px 0 16px' }}>
        Guidelines
      </h3>
      <DoDont
        dos={[
          'Match the chart family to the question being asked.',
          'Use sequential blue for ordered data; categorical for unordered.',
          'Label axes, keep ~6 slices max, and start bar axes at zero.',
        ]}
        donts={[
          'Don\u2019t reorder the categorical palette for looks.',
          'Don\u2019t use more hues than the data requires.',
          'Don\u2019t rely on colour alone \u2014 add labels and legends.',
        ]}
      />
    </Section>
  );
}
