'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { SECTIONS } from '@/lib/sections';
import { useScrollSpy } from '@/lib/useScrollSpy';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Search } from './Search';

const SECTION_IDS = SECTIONS.map((s) => s.id);

export function Shell({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const active = useScrollSpy(SECTION_IDS);

  // Scroll progress bar.
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100 || 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard shortcuts: "/" or Cmd/Ctrl-K to open search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !searchOpen)) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);

  const closeNav = useCallback(() => setNavOpen(false), []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <Header
        onMenu={() => setNavOpen((v) => !v)}
        onSearch={() => setSearchOpen(true)}
        navOpen={navOpen}
        searchOpen={searchOpen}
      />
      <Sidebar active={active} open={navOpen} onNavigate={closeNav} />
      {navOpen && <div className="nav-scrim" onClick={closeNav} aria-hidden="true" />}
      <main className="ud-main" id="main" tabIndex={-1}>
        {children}
        <Footer />
      </main>
      <Search open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
