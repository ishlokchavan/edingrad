import { Section } from '@/components/primitives/Section';

export function Help() {
  return (
    <Section id="help" lead={<>Questions about applying the brand, or need source files? Here is how to reach the team.</>}>
      <h3 id="help">Support</h3>
      <div className="grid2" style={{ marginTop: 16, alignItems: 'start' }}>
        <div className="card">
          <h4>Brand &amp; design</h4>
          <p style={{ marginTop: 8 }}>
            For approvals, asset requests or guidance on applying the system, contact the brand team
            via the main site.
          </p>
          <p style={{ marginTop: 12 }}>
            <a href="https://www.edingrad.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              edingrad.com &rarr;
            </a>
          </p>
        </div>
        <div className="card">
          <h4>This codebase</h4>
          <p style={{ marginTop: 8 }}>
            Built with Next.js and TypeScript. To add a section, add one entry to the section
            registry and one component &mdash; navigation, numbering, search and the pager update
            automatically.
          </p>
        </div>
      </div>
    </Section>
  );
}
