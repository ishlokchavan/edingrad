/**
 * The marketing-site route tree (build-plan §3). Hubs link to real subpages
 * for SEO. Child labels/copy come from the `routes` message namespace, keyed by
 * slug — so this file is structure, not strings.
 */
export interface SiteSection {
  href: string;
  children: string[]; // slugs under the hub
}

export const SITE_SECTIONS: Record<string, SiteSection> = {
  'who-we-help': {
    href: '/who-we-help',
    children: ['developers', 'asset-management', 'private-wealth'],
  },
  'what-we-do': {
    href: '/what-we-do',
    children: [
      'residential',
      'commercial',
      'off-plan',
      'property-management',
      'mortgage',
      'currency-services',
      'crypto-exchange',
      'sell-instantly',
    ],
  },
  'who-we-are': {
    href: '/who-we-are',
    children: ['about', 'press', 'insights', 'resources', 'agents', 'careers'],
  },
};
