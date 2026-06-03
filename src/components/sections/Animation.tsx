import { Section } from '@/components/primitives/Section';
import { CLASSIC_PRINCIPLES } from '@/data/principles';

const APPROACH = [
  ['Effective', 'Motion amplifies meaning \u2014 it explains sequentially and refocuses attention on what matters, never obscuring or distracting.'],
  ['Concise', 'Define the message and convey it promptly. Respect the viewer\u2019s time and answer questions in advance.'],
  ['Simple', 'Animate only what\u2019s vital. No needless flourish \u2014 the simplest solution is usually the most elegant.'],
  ['Engineered', 'Begin with a clear goal. Finely engineered, precise and produced with confidence, for a consistent tone of motion.'],
];

export function Animation() {
  return (
    <Section
      id="motion"
      lead={
        <>
          Motion is an extension of our voice. It should serve a purpose, embody precision and
          communicate clearly &mdash; moving from here to there, now to next, start to finish.
        </>
      }
    >
      <h3 id="motion">Approach</h3>
      <p>
        How we communicate through motion matters as much as what we communicate. Four themes hold
        across every execution.
      </p>
      <div className="grid2" style={{ marginTop: 24 }}>
        {APPROACH.map(([t, b]) => (
          <div className="card" key={t}>
            <h4>{t}</h4>
            <p style={{ marginTop: 8 }}>{b}</p>
          </div>
        ))}
      </div>

      <h3 id="motion-types" style={{ margin: '56px 0 8px' }}>
        Productive &amp; expressive
      </h3>
      <p>
        Two types of motion give the system contrast and cooperation &mdash; man and machine,
        organic and engineered. Productive motion leans toward efficiency and responsiveness;
        expressive motion is more enthusiastic and vibrant. They are useful alone, but greater
        together.
      </p>
      <div className="grid2" style={{ marginTop: 16, alignItems: 'start' }}>
        <div className="card motion-demo">
          <div className="chart-title">Productive</div>
          <div className="chart-sub">Efficient, responsive, confident</div>
          <div className="md-stage">
            <span className="md-dot prod" />
          </div>
          <p style={{ marginTop: 12, fontSize: '.86rem', color: 'var(--low)' }}>
            Standard easing &middot; ~240&ndash;400ms &middot; single-axis
          </p>
        </div>
        <div className="card motion-demo">
          <div className="chart-title">Expressive</div>
          <div className="chart-sub">Enthusiastic, vibrant, characterful</div>
          <div className="md-stage">
            <span className="md-dot expr" />
          </div>
          <p style={{ marginTop: 12, fontSize: '.86rem', color: 'var(--low)' }}>
            Eased entrance/exit &middot; ~400&ndash;700ms &middot; more presence
          </p>
        </div>
      </div>
      <p style={{ marginTop: 14, fontSize: '.86rem', color: 'var(--low)' }}>
        Reduced-motion preferences are always respected &mdash; these demos pause when the system
        requests less motion.
      </p>

      <h3 id="motion-principles" style={{ margin: '56px 0 8px' }}>
        Classic principles
      </h3>
      <p>
        The twelve classic principles of animation, in Edingrad&rsquo;s reading &mdash; applied to
        graphic forms with precision rather than cartoon playfulness.
      </p>
      <div className="anim-grid">
        {CLASSIC_PRINCIPLES.map((p, i) => (
          <div className="anim-cell" key={p.title}>
            <span className="anim-n">{String(i + 1).padStart(2, '0')}</span>
            <h4>{p.title}</h4>
            <p>{p.body}</p>
          </div>
        ))}
      </div>

      <h3 id="motion-tips" style={{ margin: '56px 0 8px' }}>
        Tips &amp; techniques
      </h3>
      <p>Guidance that holds for every execution, from simple linework to high-fidelity sequences.</p>
      <div className="grid2" style={{ alignItems: 'start' }}>
        <div>
          <h4 style={{ margin: '0 0 8px' }}>Attention &amp; clarity</h4>
          <ul className="checklist">
            <li>Hold one focal point; transfer it seamlessly between subjects.</li>
            <li>Move the camera on a single axis &mdash; controlled, not chaotic.</li>
            <li>Detailed visuals call for subtle motion; simple designs allow expansive motion.</li>
            <li>Animate stroke weight from zero, and between swatch colours &mdash; not opacity cross-fades.</li>
          </ul>
        </div>
        <div>
          <h4 style={{ margin: '0 0 8px' }}>Personality &amp; structure</h4>
          <ul className="checklist">
            <li>Align to the grid and snap into place; use momentum for crisp transitions.</li>
            <li>Establish rhythm &mdash; stagger similar actions, then let elements rest.</li>
            <li>Animate at or above 24fps for fluid, seamless movement.</li>
            <li>Reveal type left-to-right, top-to-bottom, on one axis, legible long enough to read.</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
