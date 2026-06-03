import { defineRouting } from 'next-intl/routing';

/**
 * Locale routing. English ships now; the structure is locale-segmented so
 * Arabic (RTL) can be switched on later by adding 'ar' here and an `ar.json`
 * message catalogue — no route restructuring (build-plan §8).
 *
 * `localePrefix: 'as-needed'` keeps English at the root (`/`, `/what-we-do`)
 * and would prefix only non-default locales (`/ar/...`).
 */
export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
