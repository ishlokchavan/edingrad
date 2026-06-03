'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

const NAV = [
  { key: 'whoWeHelp', href: '/who-we-help' },
  { key: 'whatWeDo', href: '/what-we-do' },
  { key: 'whoWeAre', href: '/who-we-are' },
  { key: 'properties', href: '/properties' },
] as const;

export function SiteHeader() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <Link href="/" className="site-logo" aria-label={tc('brand')}>
          <span className="site-logo-mark" />
          <span className="site-logo-word">{tc('brand')}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.key} href={item.href} className="site-nav-link">
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="site-header-actions">
          <Link href="/get-in-touch" className="btn site-cta">
            {t('getInTouch')}
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="site-burger"
            aria-expanded={open}
            aria-label={open ? t('close') : t('menu')}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {open && (
        <nav className="site-nav-mobile" aria-label="Primary mobile">
          {NAV.map((item) => (
            <Link key={item.key} href={item.href} onClick={() => setOpen(false)}>
              {t(item.key)}
            </Link>
          ))}
          <Link href="/get-in-touch" className="btn" onClick={() => setOpen(false)}>
            {t('getInTouch')}
          </Link>
        </nav>
      )}
    </header>
  );
}
