import type { CSSProperties } from 'react';

/** Blue family used across the worked specimens. */
export const BLUE_SERIES = ['#0f62fe', '#4589ff', '#78a9ff', '#a6c8ff'];

const AXIS = { stroke: 'currentColor', strokeWidth: 1, opacity: 0.4 } as const;
const tabular: CSSProperties = { fontVariantNumeric: 'tabular-nums' };

interface BarChartProps {
  /** One array of values per series. */
  series: number[][];
  labels?: string[];
  max?: number;
  colors?: string[];
  ariaLabel?: string;
}

/** Grouped vertical bar chart. */
export function BarChart({ series, labels, max, colors = BLUE_SERIES, ariaLabel }: BarChartProps) {
  const groups = series[0]?.length ?? 0;
  const hi = max ?? Math.max(90, ...series.flat());
  const W = 320;
  const H = 200;
  const padL = 28;
  const padB = 24;
  const padT = 10;
  const plotW = W - padL - 8;
  const plotH = H - padB - padT;
  const groupW = plotW / groups;
  const barW = Math.min(14, (groupW - 8) / series.length);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel ?? 'Grouped bar chart'} width="100%">
      {[0, 22, 45, 67, 90].map((v) => {
        const y = padT + plotH - (v / hi) * plotH;
        return (
          <g key={v}>
            <line x1={padL} y1={y} x2={W - 8} y2={y} {...AXIS} opacity={0.18} />
            <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="8" fill="currentColor" opacity={0.55} style={tabular}>
              {v}
            </text>
          </g>
        );
      })}
      <line x1={padL} y1={padT + plotH} x2={W - 8} y2={padT + plotH} {...AXIS} />
      {Array.from({ length: groups }).map((_, g) =>
        series.map((s, si) => {
          const v = s[g];
          const h = (v / hi) * plotH;
          const x = padL + g * groupW + (groupW - barW * series.length) / 2 + si * barW;
          return <rect key={`${g}-${si}`} x={x} y={padT + plotH - h} width={barW - 1} height={h} fill={colors[si % colors.length]} />;
        }),
      )}
      {labels?.map((lab, g) => (
        <text key={lab} x={padL + g * groupW + groupW / 2} y={H - 8} textAnchor="middle" fontSize="8" fill="currentColor" opacity={0.55}>
          {lab}
        </text>
      ))}
    </svg>
  );
}

interface LineChartProps {
  series: number[][];
  max?: number;
  colors?: string[];
  ariaLabel?: string;
}

/** Multi-line trend chart. */
export function LineChart({ series, max, colors = BLUE_SERIES, ariaLabel }: LineChartProps) {
  const n = series[0]?.length ?? 0;
  const hi = max ?? Math.max(90, ...series.flat());
  const W = 320;
  const H = 200;
  const padL = 28;
  const padB = 24;
  const padT = 10;
  const plotW = W - padL - 8;
  const plotH = H - padB - padT;
  const x = (i: number) => padL + (i / (n - 1)) * plotW;
  const y = (v: number) => padT + plotH - (v / hi) * plotH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel ?? 'Multi-line trend chart'} width="100%">
      {[0, 22, 45, 67, 90].map((v) => (
        <line key={v} x1={padL} y1={y(v)} x2={W - 8} y2={y(v)} {...AXIS} opacity={0.18} />
      ))}
      <line x1={padL} y1={padT + plotH} x2={W - 8} y2={padT + plotH} {...AXIS} />
      {[0, 22, 45, 67, 90].map((v) => (
        <text key={v} x={padL - 6} y={y(v) + 3} textAnchor="end" fontSize="8" fill="currentColor" opacity={0.55} style={tabular}>
          {v}
        </text>
      ))}
      {series.map((s, si) => (
        <polyline
          key={si}
          points={s.map((v, i) => `${x(i)},${y(v)}`).join(' ')}
          fill="none"
          stroke={colors[si % colors.length]}
          strokeWidth={2}
        />
      ))}
      {Array.from({ length: n }).map((_, i) => (
        <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="8" fill="currentColor" opacity={0.55} style={tabular}>
          {i + 1}
        </text>
      ))}
    </svg>
  );
}

interface DonutProps {
  data: number[];
  colors?: string[];
  centerLabel?: string;
  centerSub?: string;
  ariaLabel?: string;
}

/** Donut / proportion chart. */
export function Donut({
  data,
  colors = ['#002d9c', '#0043ce', '#0f62fe', '#4589ff', '#78a9ff', '#a6c8ff'],
  centerLabel,
  centerSub,
  ariaLabel,
}: DonutProps) {
  const total = data.reduce((a, b) => a + b, 0);
  const r = 52;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 160 160" role="img" aria-label={ariaLabel ?? 'Donut chart'} width="100%">
      <g transform="translate(80,80) rotate(-90)" fill="none" strokeWidth={22}>
        {data.map((v, i) => {
          const len = (v / total) * c;
          const seg = (
            <circle
              key={i}
              r={r}
              stroke={colors[i % colors.length]}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return seg;
        })}
      </g>
      {centerLabel && (
        <text x="80" y="80" textAnchor="middle" fontSize="30" fill="currentColor" style={{ fontFamily: "'Palestra', serif", fontWeight: 200 }}>
          {centerLabel}
        </text>
      )}
      {centerSub && (
        <text x="80" y="98" textAnchor="middle" fontSize="9" fill="currentColor" opacity={0.6} letterSpacing="1.5">
          {centerSub}
        </text>
      )}
    </svg>
  );
}
