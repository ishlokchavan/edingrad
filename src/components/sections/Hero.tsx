import { SECTIONS } from '@/lib/sections';

const BLURB: Record<string, string> = {
  philosophy: 'Point of view, principles and the intent behind the system.',
  logo: 'The Edingrad wordmark, clear space and misuse.',
  type: 'Palestra & Lynx Sans, the type scale and the one-Palestra rule.',
  color: 'Blue at the core, the full Carbon families and surfaces.',
  grid: 'The 2x\u00a0Grid \u2014 8\u202fpx base unit, spatial scale, columns and gutters.',
  icons: 'UI icons on the 32\u202fpx grid \u2014 principles, construction and the library.',
  data: 'The Carbon data palette, the chart taxonomy and worked specimens.',
  motion: 'Motion approach, productive vs expressive, and the classic principles.',
  voice: 'The Edingrad Standard \u2014 tone, vocabulary and the litmus test.',
};

const STATS = [
  { n: '2', k: 'Typefaces' },
  { n: '100+', k: 'Color Tokens' },
  { n: '10', k: 'Data Hues' },
  { n: 'AAA', k: 'Contrast Target' },
];

export function Hero() {
  const cards = SECTIONS.filter((s) => BLURB[s.id]);
  return (
    <>
      <header className="hero" id="top">
        <div className="wrap">
          <div className="over">Edingrad &middot; Investment Advisory &middot; 2026</div>
          <h1 className="display">
            Brand
            <br />
            <span className="b">Guidelines</span>
          </h1>
          <p className="lead sub">
            The identity system behind Edingrad &mdash; sourcing institutional-grade investment
            opportunities for asset managers and private wealth. Blue-led, dark-first, built on
            Palestra and Lynx Sans.
          </p>
          <div className="hero-stats">
            {STATS.map((s) => (
              <div className="stat" key={s.k}>
                <div className="n">{s.n}</div>
                <div className="k">{s.k}</div>
              </div>
            ))}
          </div>
          <a className="hero-down" href="#explore" aria-label="Explore the system">
            {'\u2193'}
          </a>
        </div>
      </header>

      <div className="wrap explore-wrap" id="explore">
        <div className="over" style={{ color: 'var(--low)', marginBottom: 16 }}>
          Explore the system
        </div>
        <div className="explore-grid">
          {cards.map((s) => (
            <a className="card xcard" href={`#${s.id}`} key={s.id}>
              <span className="xh">{s.title}</span>
              <p>{BLURB[s.id]}</p>
              <span className="xarrow">{'\u2192'}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
