import { notFound } from 'next/navigation';

/** Catch-all for unmatched paths within a locale, so the branded
 *  [locale]/not-found boundary renders (instead of the default 404). */
export default function CatchAll() {
  notFound();
}
