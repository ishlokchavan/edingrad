/** Renders a JSON-LD structured-data script. Data is serialised, not user
 *  HTML, so dangerouslySetInnerHTML is safe here. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
