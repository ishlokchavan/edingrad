/** Content data for the Philosophy and Animation sections. */

export interface Principle {
  title: string;
  body: string;
  checklist: string[];
}

/** The four Edingrad principles (IBM "Principles" structure). */
export const BRAND_PRINCIPLES: Principle[] = [
  {
    title: 'Carefully considered',
    body: 'Advice is a chain of decisions, and every link must hold. Before we act we weigh whether a thing is useful, essential and ours to do \u2014 then how completely we are prepared to see it through.',
    checklist: [
      'Is it essential, or merely available?',
      'Have we removed everything gratuitous?',
      'Do we have what we need to realise it fully?',
      'Does it respect the time it asks of the reader?',
    ],
  },
  {
    title: 'Quietly confident',
    body: 'Authority is shown through restraint, not volume. Continuity and judgement must both be recognisable: a fixed, unified system that still leaves room for a distinct point of view.',
    checklist: [
      'Would this read as Edingrad with the name covered?',
      'Is it consistent with what came before it?',
      'Have we said it plainly, without hedging or hype?',
      'Does one piece reinforce the next, side by side?',
    ],
  },
  {
    title: 'Clearly communicated',
    body: 'Everything we publish serves comprehension. Type, colour and data exist to make a position legible. If it cannot be explained plainly, it is not yet ready to leave the building.',
    checklist: [
      'Can a non-specialist follow the argument?',
      'Does every figure earn its place?',
      'Have we removed friction between message and reader?',
      'Is the most important thing the most prominent thing?',
    ],
  },
  {
    title: 'Built to endure',
    body: 'To advise is to take the long view. We favour what compounds over what flatters the quarter, and we hold ourselves \u2014 and our partners \u2014 to work that still looks sound a decade from now.',
    checklist: [
      'Is it additive, or merely activity?',
      'Will this judgement hold up in five years?',
      'Are we working with the right people and timeframe?',
      'Does it give more than it takes?',
    ],
  },
];

export interface NamedNote {
  title: string;
  body: string;
}

/** The 12 classic principles of animation, in Edingrad's reading. */
export const CLASSIC_PRINCIPLES: NamedNote[] = [
  { title: 'Squash & stretch', body: 'Embrace acceleration and reaction, but avoid overt stretch or deformation. Aim for precision, not cartoon playfulness.' },
  { title: 'Anticipation', body: 'Use acceleration and deceleration to set up instant changes and signal that something matters.' },
  { title: 'Staging', body: 'Lead the eye. Avoid busy compositions; direct attention with elements animated in sequence, not competing actions.' },
  { title: 'Pose to pose', body: 'Be efficient \u2014 as few key poses as possible while still creating a compelling performance.' },
  { title: 'Overlapping action', body: 'Secondary elements that inherit a parent\u2019s motion on a slight delay add interest and emphasis.' },
  { title: 'Slow in & slow out', body: 'Speed up quickly, slow down smoothly. Avoid curves that bounce, stretch or stop abruptly.' },
  { title: 'Arc', body: 'Favour purpose and order \u2014 translate on one axis at a time, with a slight overlap between each.' },
  { title: 'Secondary action', body: 'Introduce secondary motion only to support the main action, never to distract from it.' },
  { title: 'Timing', body: 'Be decisive getting from A to B. Avoid long exponential eases as elements settle.' },
  { title: 'Exaggeration', body: 'Not decoration \u2014 animate to clearly demonstrate function and purpose.' },
  { title: 'Solid drawing', body: 'Convey appropriate weight and momentum, especially for recognisable forms with volume.' },
  { title: 'Appeal', body: 'Look for moments of considered surprise and delight when applying motion.' },
];

/** The Edingrad Standard \u2014 three voice pillars. */
export const VOICE_PILLARS: { tag: string; essence: string; directive: string }[] = [
  {
    tag: 'Analytical Rigor',
    essence: 'Evidence before assertion.',
    directive: 'Lead with the data and the reasoning. Every claim is traceable to a source or a method; nothing is asserted that cannot be defended.',
  },
  {
    tag: 'Discerning Intuition',
    essence: 'Judgement, earned.',
    directive: 'Pattern recognition built on experience. We name what the numbers imply but cannot say outright \u2014 carefully, and never as a substitute for the work.',
  },
  {
    tag: 'Measured Gravitas',
    essence: 'Weight without noise.',
    directive: 'A calm, senior register. We are never breathless, never promotional. Confidence is conveyed through precision and restraint.',
  },
];

/**
 * Voice principles \u2014 four named principles, each with a one-line thesis and
 * three concrete tactics, mirroring the structure of Bang & Olufsen's
 * voice-principles model. The register is Edingrad's own: measured and senior
 * rather than playful. Each closes with a Bain-style before/after rewrite.
 */
export const VOICE_PRINCIPLES: {
  name: string;
  thesis: string;
  tactics: { title: string; body: string }[];
  example: { avoid: string; write: string };
}[] = [
  {
    name: 'Be precise',
    thesis:
      'Precision is the whole point. One right word beats three approximate ones, and a qualifier that carries no weight is just noise. We write to be understood exactly, not to sound impressive.',
    tactics: [
      { title: 'Cut the qualifiers', body: 'Delete \u201cpotentially\u201d, \u201cin order to\u201d, and every hedge that softens a claim without sharpening it.' },
      { title: 'Name the specific', body: '\u201cReduce the position by a third\u201d, not \u201ctrim exposure\u201d. Concrete beats generic every time.' },
      { title: 'One idea per sentence', body: 'Break compound sentences apart. Each should carry a single claim the reader can weigh.' },
    ],
    example: {
      avoid: 'We aim to potentially help optimise risk-adjusted outcomes.',
      write: 'We allocate where capital compounds.',
    },
  },
  {
    name: 'Lead with the finding',
    thesis:
      'State the conclusion first, then show the work. A reader should know where they stand by the end of the first sentence \u2014 not the third paragraph. Evidence follows the call; it never buries it.',
    tactics: [
      { title: 'Conclusion first', body: 'Open with the decision or the view. Context and caveats come after it, not before.' },
      { title: 'Show the method', body: 'Make every claim traceable to a source or a model. Assertion without evidence is only opinion.' },
      { title: 'State the confidence', body: 'Name the conviction level and the caveats, so the reader can size the risk, not just the idea.' },
    ],
    example: {
      avoid: 'After extensive multi-scenario analysis, a view was formed on the position.',
      write: 'Reduce the position. The downside is no longer priced in.',
    },
  },
  {
    name: 'Write to one reader',
    thesis:
      'Address a single, intelligent person \u2014 never a market. Formality is a barrier; clarity is courtesy. Translate complexity into consequence, and consequence into a decision they can act on.',
    tactics: [
      { title: 'One to one', body: 'Write \u201cyou\u201d, to one decision-maker. Drop the committee voice and the passive \u201cit is recommended\u201d.' },
      { title: 'Translate to consequence', body: 'Don\u2019t stop at what is true; say what it means for the reader\u2019s next move.' },
      { title: 'Read it aloud', body: 'If you wouldn\u2019t say it across a table to them, rewrite it until you would.' },
    ],
    example: {
      avoid: 'Stakeholders should be cognisant of the multifaceted risk factors herein.',
      write: 'Here is the one risk that should change your mind \u2014 and why.',
    },
  },
  {
    name: 'Senior, never loud',
    thesis:
      'Authority is shown through restraint, not volume. We never sell, oversell, or shout. Confidence reads in what we leave out \u2014 and in our willingness to take the long view when everyone else is chasing the quarter.',
    tactics: [
      { title: 'Refuse hype', body: 'No \u201cexplosive\u201d, \u201conce-in-a-generation\u201d, \u201cguaranteed\u201d. The words we ban protect the trust we keep.' },
      { title: 'Let restraint carry', body: 'Understate. A measured line outlasts a loud one, and ages better in a downturn.' },
      { title: 'Take the long view', body: 'Favour what compounds over what flatters today. Write as if the reader will reread you in five years.' },
    ],
    example: {
      avoid: 'A once-in-a-generation, can\u2019t-miss opportunity with explosive upside.',
      write: 'The asymmetry favours the patient holder. We are buyers.',
    },
  },
];

/**
 * Tone spectrum \u2014 the voice is constant; the tone moves along these axes by
 * context. Inspired by Bang & Olufsen\u2019s tone-of-voice guidance.
 */
export const TONE_SPECTRUM: { axis: string; left: string; right: string; note: string }[] = [
  {
    axis: 'Register',
    left: 'Conversational',
    right: 'Formal',
    note: 'Lean formal for institutional memos; relax toward conversational for client letters and the site.',
  },
  {
    axis: 'Pace',
    left: 'Brisk',
    right: 'Considered',
    note: 'Brisk for alerts and decisions; considered for thesis pieces that earn their length.',
  },
  {
    axis: 'Warmth',
    left: 'Reserved',
    right: 'Warm',
    note: 'Reserved with peers who want the signal; warmer with private clients who want reassurance.',
  },
];
