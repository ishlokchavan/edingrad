import { Section } from '@/components/primitives/Section';
import { BRAND_PRINCIPLES } from '@/data/principles';

export function Philosophy() {
  return (
    <Section
      id="philosophy"
      lead={
        <>
          Edingrad&rsquo;s identity is engineered for institutional trust: restrained, precise and
          unmistakably blue. Every choice signals diligence and discretion.
        </>
      }
    >
      <h3 id="philosophy">Point of view</h3>
      <p style={{ margin: '8px 0 0' }}>
        Our philosophy and principles govern every recommendation Edingrad makes. We believe in
        disciplined progress &mdash; that rigour, judgement and transparency, applied patiently,
        compound into trust. Given the scale of the capital we advise, sound work is not a
        preference; it is a responsibility to the relationships we serve.
      </p>

      <div className="pov-move">
        <div className="ph">Trust is built, not claimed.</div>
        <p>
          Capital has never had more options, or more noise. The pressure to react quickly can
          flatten judgement into sameness. Distinction comes from the opposite instinct &mdash; from
          restraint, from owning a clear point of view, and from a recognisable seriousness in
          everything we put our name to. Everything we do, and decline to do, communicates.
        </p>
        <div className="pullquote">
          <p>Good judgement is quiet. It shows in what we decline as readily as in what we recommend.</p>
          <div className="src">The Edingrad Standard</div>
        </div>
      </div>

      <div className="pov-move">
        <div className="ph">Stand for something, and you stand out.</div>
        <p>
          Edingrad sits between serious capital and genuine opportunity &mdash; sourcing
          institutional-grade investments for asset managers and private wealth, and standing in the
          gap between the two. That relationship is the brand. Our role within it is singular: to
          guide. To clarify, to qualify, and to move a client from uncertainty to a position they
          can hold with conviction.
        </p>
        <div className="arrowline">Diligence&nbsp;&rarr;&nbsp;Conviction</div>
      </div>

      <div className="pov-move">
        <div className="ph">Think, then guide.</div>
        <p>
          Like our values, this ethos must be felt in everything we produce &mdash; by analysts and
          clients alike. The expression may evolve over time; the principles are built to endure. A
          by-product of every Edingrad engagement should be the same: confidence that is hard-won
          and well-founded.
        </p>
      </div>

      <h3 id="philosophy-principles" style={{ margin: '56px 0 8px' }}>
        Principles
      </h3>
      <p>
        Four principles give clear criteria for the judgement, craft and conviction our clients
        deserve. They are for everyone who authors or authorises work on behalf of Edingrad.
      </p>

      {BRAND_PRINCIPLES.map((p) => (
        <div className="prin" key={p.title}>
          <div className="prin-th">{p.title}</div>
          <p>{p.body}</p>
          <ul className="checklist">
            {p.checklist.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}
