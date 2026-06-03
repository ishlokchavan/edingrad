import { Link } from '@/i18n/navigation';
import { ArrowRight } from '@/components/icons/ui-icons';

/** An image-topped card that links somewhere: a photo, a title, a line of copy
 *  and a call-to-action. Used for service tiles, property categories and the
 *  "explore the firm" grid. */
export function VisualCard({
  href,
  image,
  title,
  body,
  cta,
}: {
  href: string;
  image: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link href={href} className="visual-card">
      <div className="visual-card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" loading="lazy" />
      </div>
      <div className="visual-card-body">
        <span className="visual-card-title">{title}</span>
        <p>{body}</p>
        <span className="visual-card-cta">
          {cta} <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
