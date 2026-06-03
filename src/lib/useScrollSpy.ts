'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently considered "active" based on scroll
 * position. Observes each `[data-sec]` element and the hero; the active section
 * is the last one whose top has passed a threshold below the fixed header.
 */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const probe = window.scrollY + 140; // just below the fixed header
        let current = sections[0].id;
        for (const el of sections) {
          if (el.offsetTop <= probe) current = el.id;
        }
        // Snap to last section when near the bottom of the page.
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
          current = sections[sections.length - 1].id;
        }
        setActive(current);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
