import type { ReactNode } from 'react';

export function Card({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`card ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>;
}

/** A color swatch: chip + name + hex. */
export function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="sw">
      <div className="chip" style={{ background: hex }} />
      <div className="meta">
        <div className="nm">{name}</div>
        <div className="hx">{hex.toUpperCase()}</div>
      </div>
    </div>
  );
}

export function SwatchRow({ items }: { items: { name: string; hex: string }[] }) {
  return (
    <div className="swrow">
      {items.map((s) => (
        <Swatch key={s.name + s.hex} name={s.name} hex={s.hex} />
      ))}
    </div>
  );
}

interface DoDontProps {
  dos: string[];
  donts: string[];
}

/** Side-by-side Do / Don't guidance block. */
export function DoDont({ dos, donts }: DoDontProps) {
  return (
    <div className="dd">
      <div className="col do">
        <h4>
          <span className="badge">{'\u2713'}</span> Do
        </h4>
        <ul>
          {dos.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
      <div className="col dont">
        <h4>
          <span className="badge">{'\u2717'}</span> Don&rsquo;t
        </h4>
        <ul>
          {donts.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
