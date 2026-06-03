/**
 * Section registry — the single source of truth for the whole site.
 *
 * Navigation, ordering, section numbering, the search index, scroll-spy, and
 * the Previous/Next pager are all derived from this one array. To add a new
 * guideline section you only need to (1) add an entry here and (2) create the
 * matching component in `src/components/sections`. Everything else updates
 * automatically.
 */

export interface SubItem {
  /** Visible label in the sidebar and the "on this page" jump list. */
  label: string;
  /** Anchor id this links to (without the leading #). */
  anchor: string;
}

export interface SectionMeta {
  /** Stable section id, also used as the DOM id and route hash. */
  id: string;
  /** Display title used in the band and the pager. */
  title: string;
  /** Optional shorter label for the sidebar (defaults to `title`). */
  navLabel?: string;
  /** Two-digit overline number is derived from order; this is the group. */
  group: 'BRAND';
  /** Sidebar sub-links / on-this-page jumps. */
  sub: SubItem[];
  /** Extra keywords to widen search matches. */
  keywords?: string[];
}

export const SECTIONS: SectionMeta[] = [
  {
    id: 'philosophy',
    title: 'Philosophy',
    group: 'BRAND',
    sub: [
      { label: 'Point of view', anchor: 'philosophy' },
      { label: 'Principles', anchor: 'philosophy-principles' },
    ],
    keywords: ['pov', 'standard', 'values', 'positioning'],
  },
  {
    id: 'logo',
    title: 'Logo',
    group: 'BRAND',
    sub: [
      { label: 'Wordmark', anchor: 'logo' },
      { label: 'Logo color', anchor: 'logo-color' },
      { label: 'Clear space', anchor: 'logo-clearspace' },
      { label: 'Heritage mark', anchor: 'logo-heritage' },
      { label: 'Usage', anchor: 'logo-usage' },
    ],
    keywords: ['wordmark', 'mark', 'clear space', '8-bar', 'rebus', 'logo color'],
  },
  {
    id: 'type',
    title: 'Typography',
    group: 'BRAND',
    sub: [
      { label: 'Typefaces', anchor: 'type' },
      { label: 'Type scale', anchor: 'type-scale' },
      { label: 'Type as voice', anchor: 'type-voice' },
      { label: 'Specimens', anchor: 'type-specimens' },
    ],
    keywords: ['palestra', 'lynx sans', 'type scale', 'font', 'type as voice'],
  },
  {
    id: 'color',
    title: 'Color',
    group: 'BRAND',
    sub: [
      { label: 'Blue at the core', anchor: 'color' },
      { label: 'Color families', anchor: 'color-families' },
      { label: 'Core families', anchor: 'color-core' },
      { label: 'Grays', anchor: 'color-grays' },
      { label: 'Dark theme', anchor: 'color-theme' },
      { label: 'Alert & support', anchor: 'color-status' },
    ],
    keywords: ['blue', 'carbon', 'palette', 'gray', 'tokens'],
  },
  {
    id: 'grid',
    title: 'Grid',
    group: 'BRAND',
    sub: [
      { label: 'Base unit', anchor: 'grid' },
      { label: 'Spatial scale', anchor: 'grid-spacing' },
      { label: 'Columns & gutters', anchor: 'grid-columns' },
      { label: 'The grid here', anchor: 'grid-demo' },
    ],
    keywords: ['2x grid', 'columns', 'gutter', 'spacing', 'layout'],
  },
  {
    id: 'icons',
    title: 'Iconography',
    group: 'BRAND',
    sub: [
      { label: 'Principles', anchor: 'icons' },
      { label: 'Grid & construction', anchor: 'icons-grid' },
      { label: 'Library', anchor: 'icons-library' },
      { label: 'Sizing', anchor: 'icons-sizing' },
      { label: 'Usage', anchor: 'icons-usage' },
    ],
    keywords: ['ui icons', 'icon', 'glyph', 'stroke'],
  },
  {
    id: 'data',
    title: 'Data visualization',
    navLabel: 'Data visualization',
    group: 'BRAND',
    sub: [
      { label: 'Palette', anchor: 'data' },
      { label: 'Charts', anchor: 'data-charts' },
      { label: 'Sequential', anchor: 'data-seq' },
      { label: 'Guidelines', anchor: 'data-guide' },
    ],
    keywords: ['charts', 'categorical', 'sequential', 'diverging', 'dataviz'],
  },
  {
    id: 'motion',
    title: 'Animation',
    group: 'BRAND',
    sub: [
      { label: 'Approach', anchor: 'motion' },
      { label: 'Productive & expressive', anchor: 'motion-types' },
      { label: 'Classic principles', anchor: 'motion-principles' },
      { label: 'Tips & techniques', anchor: 'motion-tips' },
    ],
    keywords: ['motion', 'animation', 'easing', 'principles'],
  },
  {
    id: 'voice',
    title: 'Brand voice',
    group: 'BRAND',
    sub: [
      { label: 'The Edingrad Standard', anchor: 'voice' },
      { label: 'Voice principles', anchor: 'voice-principles' },
      { label: 'Tone by audience', anchor: 'voice-tone' },
      { label: 'Vocabulary', anchor: 'voice-vocab' },
      { label: 'Litmus test', anchor: 'voice-litmus' },
    ],
    keywords: ['tone', 'writing', 'copy', 'vocabulary', 'voice principles'],
  },
  {
    id: 'resources',
    title: 'Resources',
    group: 'BRAND',
    sub: [{ label: 'Downloads', anchor: 'resources' }],
    keywords: ['downloads', 'files', 'kit'],
  },
  {
    id: 'whatsnew',
    title: 'What\u2019s new',
    group: 'BRAND',
    sub: [{ label: 'Changelog', anchor: 'whatsnew' }],
    keywords: ['changelog', 'updates', 'release'],
  },
  {
    id: 'help',
    title: 'Help',
    group: 'BRAND',
    sub: [{ label: 'Support', anchor: 'help' }],
    keywords: ['support', 'contact', 'faq'],
  },
];

/** Two-digit overline string, e.g. "01". */
export function sectionNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

export interface PagerLink {
  id: string;
  title: string;
}

/** Previous / next neighbours for a given section id. */
export function pagerFor(id: string): { prev: PagerLink | null; next: PagerLink | null } {
  const i = SECTIONS.findIndex((s) => s.id === id);
  const toLink = (s?: SectionMeta): PagerLink | null => (s ? { id: s.id, title: s.title } : null);
  return { prev: toLink(SECTIONS[i - 1]), next: toLink(SECTIONS[i + 1]) };
}

export interface SearchEntry {
  label: string;
  anchor: string;
  section: string;
}

/** Flat search index derived from titles, sub-items, and keywords. */
export function buildSearchIndex(): SearchEntry[] {
  const out: SearchEntry[] = [];
  for (const s of SECTIONS) {
    out.push({ label: s.title, anchor: s.id, section: s.title });
    for (const sub of s.sub) out.push({ label: sub.label, anchor: sub.anchor, section: s.title });
    for (const kw of s.keywords ?? []) out.push({ label: kw, anchor: s.id, section: s.title });
  }
  return out;
}
