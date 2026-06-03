import { Section } from '@/components/primitives/Section';
import { VOICE_PILLARS, VOICE_PRINCIPLES, TONE_SPECTRUM } from '@/data/principles';

const TONE = [
  ['Institutional clients', 'Peer-to-peer and precise. Lead with thesis and evidence; assume fluency. Never explain what they already know.'],
  ['Private wealth', 'Clear and reassuring without condescension. Translate complexity into consequence, and consequence into a decision.'],
  ['Internal & analysts', 'Direct and exacting. State the method, the confidence and the caveats. Disagreement is welcome; vagueness is not.'],
];

const VOCAB = [
  ['Prefer', ['thesis', 'conviction', 'diligence', 'allocation', 'downside', 'mandate', 'measured', 'evidence']],
  ['Avoid', ['guaranteed', 'unprecedented', 'game-changing', 'hot', 'explosive', 'no-brainer', 'sure thing', 'hype']],
];

export function Voice() {
  return (
    <Section
      id="voice"
      lead={
        <>
          The Edingrad Standard governs how we write. A calm, senior register that earns trust
          through precision and restraint &mdash; never volume. The voice stays constant; only the
          tone moves with the reader.
        </>
      }
    >
      <h3 id="voice">The Edingrad Standard</h3>
      <p>
        Three pillars define the voice. Together they make Edingrad recognisable on the page with
        the name covered: rigorous, discerning and measured.
      </p>
      <div style={{ marginTop: 16 }}>
        {VOICE_PILLARS.map((p) => (
          <div className="principle" key={p.tag}>
            <div>
              <div className="prin-th" style={{ fontSize: '.78rem' }}>
                {p.tag}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Palestra', serif", fontWeight: 200, fontSize: 'clamp(1.4rem,3vw,2rem)', lineHeight: 1.1 }}>
                {p.essence}
              </div>
              <p style={{ marginTop: 10 }}>{p.directive}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 id="voice-principles" style={{ margin: '56px 0 8px' }}>
        Voice principles
      </h3>
      <p>
        Four principles govern everything we publish. Use them as guidance, not gospel &mdash; not
        every one applies every time. The way to write like Edingrad is mostly the discipline of
        what we choose to leave out.
      </p>
      <div className="vp-set">
        {VOICE_PRINCIPLES.map((p, i) => (
          <article className="vp" key={p.name}>
            <h4 className="vp-h">
              <span className="vp-num">{i + 1}.</span> {p.name}
            </h4>
            <p className="vp-thesis">{p.thesis}</p>
            <div className="vp-tactics">
              {p.tactics.map((t) => (
                <div className="vp-tactic" key={t.title}>
                  <div className="vp-tactic-h">{t.title}</div>
                  <p>{t.body}</p>
                </div>
              ))}
            </div>
            <div className="vp-example">
              <div className="vmsg no">
                <div className="h">Avoid</div>
                <div className="b">{p.example.avoid}</div>
              </div>
              <div className="vmsg yes">
                <div className="h">Write</div>
                <div className="b">{p.example.write}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <h3 id="voice-tone" style={{ margin: '56px 0 8px' }}>
        Tone by audience
      </h3>
      <p>The register shifts with the reader, but the standard never relaxes.</p>
      <div className="grid3" style={{ marginTop: 16 }}>
        {TONE.map(([who, how]) => (
          <div className="card" key={who}>
            <h4>{who}</h4>
            <p style={{ marginTop: 8 }}>{how}</p>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 32 }}>
        Within those audiences the tone moves along three axes. The voice is fixed; where we sit on
        each scale is a deliberate choice, not an accident.
      </p>
      <div style={{ marginTop: 16 }}>
        {TONE_SPECTRUM.map((t) => (
          <div className="tone-axis" key={t.axis}>
            <div className="tone-axis-head">
              <span className="tone-axis-name">{t.axis}</span>
              <span className="tone-axis-ends">
                {t.left} &harr; {t.right}
              </span>
            </div>
            <p style={{ marginTop: 6 }}>{t.note}</p>
          </div>
        ))}
      </div>

      <h3 id="voice-vocab" style={{ margin: '56px 0 8px' }}>
        Vocabulary
      </h3>
      <p>Words carry risk. We choose those that signal judgement, and refuse those that signal hype.</p>
      <div className="grid2" style={{ marginTop: 16, alignItems: 'start' }}>
        {VOCAB.map(([label, words]) => (
          <div className="card" key={label as string}>
            <div className="chart-title">{label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {(words as string[]).map((w) => (
                <span
                  key={w}
                  style={{
                    fontSize: '.86rem',
                    padding: '5px 11px',
                    border: '1px solid var(--line-2)',
                    color: label === 'Prefer' ? 'var(--text)' : 'var(--low)',
                    textDecoration: label === 'Avoid' ? 'line-through' : 'none',
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 id="voice-litmus" style={{ margin: '56px 0 8px' }}>
        The litmus test
      </h3>
      <p>Before anything leaves the building, it must pass four questions.</p>
      <ul className="checklist">
        <li>Could every claim be defended to a sceptical institutional reader?</li>
        <li>Have we stated the confidence and the caveats, not just the conclusion?</li>
        <li>Is there a single word of hype we would regret in a downturn?</li>
        <li>Would this read as Edingrad with the logo removed?</li>
      </ul>
    </Section>
  );
}
