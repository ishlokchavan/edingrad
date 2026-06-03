import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { Card, Pill, SwatchRow } from '@/components/primitives/ui';
import { ICON_LIBRARY } from '@/components/icons/ui-icons';
import { BLUE_SCALE, CORE_FAMILIES } from '@/data/colors';

/**
 * Hello-world landing page. It is intentionally small but exercises the whole
 * ported design system end to end: the self-hosted Palestra display + Lynx Sans
 * body fonts, the IBM Carbon design tokens (light/dark via the theme toggle),
 * the 24-icon set, the colour data, and the reusable primitives.
 */
export default function Page() {
  return (
    <>
      <header className="ud-header">
        <div className="wmk" style={{ paddingLeft: 16 }}>
          <b>Edingrad</b>
          <span>Design System</span>
        </div>
        <div className="hr">
          <ThemeToggle />
        </div>
      </header>

      <main style={{ marginTop: 'var(--header-h)' }}>
        <section className="hero">
          <div className="wrap">
            <div className="over">Hello, world</div>
            <h1 className="display">
              Edin<span className="b">grad</span>
            </h1>
            <p className="sub lead">
              A Next.js 14 server app, scaffolded on the Edingrad design system —
              Palestra and Lynx Sans, IBM Carbon tokens, a 24-icon set, and
              reusable primitives.
            </p>
          </div>
        </section>

        <section className="sec">
          <div className="band">
            <div className="wrap">
              <div className="over">01 — Typography</div>
              <h2>Two typefaces</h2>
            </div>
          </div>
          <div className="wrap secbody">
            <p className="lead">
              Palestra carries display and headlines; Lynx Sans carries body and
              UI. Both are self-hosted as woff2 with <code>font-display: swap</code>.
            </p>
            <div className="grid2">
              <Card className="tf serif">
                <Pill>Display · Palestra</Pill>
                <div className="big">
                  Aa<b>Bb</b>
                </div>
                <div className="role">
                  <b>Palestra</b> — thin &amp; bold display serif
                </div>
              </Card>
              <Card className="tf sans">
                <Pill>Text · Lynx Sans</Pill>
                <div className="big">AaBb</div>
                <div className="role">
                  <b>Lynx Sans</b> — humanist sans for body &amp; UI
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="band">
            <div className="wrap">
              <div className="over">02 — Colour</div>
              <h2>IBM Carbon palette</h2>
            </div>
          </div>
          <div className="wrap secbody">
            <p className="lead">Blue leads the brand. Blue&nbsp;60 is the primary action colour.</p>
            <div className="scale-bar">
              {BLUE_SCALE.map((s) => (
                <div key={s.step} className="seg" style={{ background: s.hex }}>
                  <span>{s.step}</span>
                </div>
              ))}
            </div>
            {CORE_FAMILIES.map((fam) => (
              <div key={fam.label} style={{ marginTop: 24 }}>
                <div className="fam-label">{fam.label}</div>
                <SwatchRow items={fam.chips} />
              </div>
            ))}
          </div>
        </section>

        <section className="sec">
          <div className="band">
            <div className="wrap">
              <div className="over">03 — Iconography</div>
              <h2>24 UI icons</h2>
            </div>
          </div>
          <div className="wrap secbody">
            <p className="lead">
              Hand-drawn on a 32&times;32 grid with a 2px stroke. Monochrome, they
              inherit <code>currentColor</code> and adapt to either theme.
            </p>
            {ICON_LIBRARY.map((group) => (
              <div key={group.category}>
                <div className="icon-cat-label">{group.category}</div>
                <div className="icon-grid">
                  {group.icons.map(({ name, Comp }) => (
                    <figure key={name} className="icon-cell">
                      <span className="icon-box">
                        <Comp />
                      </span>
                      <figcaption>{name}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer>
          <div className="wrap">
            <div className="foot-brand">
              <span className="mk" /> Edingrad
            </div>
            <div className="foot-bottom">
              <span>Scaffold · EG-24</span>
              <span>© 2026 Edingrad</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
