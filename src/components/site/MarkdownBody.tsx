import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renders a Markdown string (GitHub-flavoured: headings, lists, tables, links,
 * images, blockquotes) as styled article prose. Raw HTML is not rendered, so
 * content is safe by default. Body content will come from the CMS.
 */
export function MarkdownBody({ children }: { children: string }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
