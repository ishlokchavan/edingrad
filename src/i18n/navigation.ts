import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation helpers. Import `Link`, `redirect`, `usePathname`
 * and `useRouter` from here (not from `next/*`) so links carry the locale.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
