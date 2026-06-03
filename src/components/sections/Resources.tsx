import { Section } from '@/components/primitives/Section';

const RESOURCES = [
  ['Logo package', 'Wordmark in SVG and PNG, light and blue, with clear-space templates.'],
  ['Typefaces', 'Palestra and Lynx Sans web fonts (woff2) and licensing notes.'],
  ['Color tokens', 'The full palette as design tokens \u2014 CSS variables, JSON and Figma styles.'],
  ['Chart toolkit', 'Blue-family chart templates and the categorical sequence.'],
  ['Icon library', 'The UI icon set as SVG, on the 32px grid.'],
  ['This site', 'The guidelines as a Next.js + TypeScript codebase.'],
];

export function Resources() {
  return (
    <Section
      id="resources"
      lead={<>Everything you need to apply the system, in one place. Downloadable kits and living references.</>}
    >
      <h3 id="resources">Downloads</h3>
      <p>Request access to the brand drive for the latest source files.</p>
      <div className="grid3 res" style={{ marginTop: 16 }}>
        {RESOURCES.map(([t, d]) => (
          <a className="card" href="https://www.edingrad.com" target="_blank" rel="noopener noreferrer" key={t}>
            <h4>{t}</h4>
            <p style={{ marginTop: 8 }}>{d}</p>
          </a>
        ))}
      </div>
    </Section>
  );
}
