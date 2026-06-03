'use client';

import { useEffect, useState } from 'react';
import { SECTIONS } from '@/lib/sections';

const Chevron = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

interface SidebarProps {
  /** Currently active section id from scroll-spy. */
  active: string;
  /** Called when a link is chosen (used to close the mobile drawer). */
  onNavigate?: () => void;
  open: boolean;
}

export function Sidebar({ active, onNavigate, open }: SidebarProps) {
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set([active]));

  // Keep the active group expanded as the user scrolls.
  useEffect(() => {
    setOpenGroups((prev) => {
      if (prev.has(active)) return prev;
      const next = new Set(prev);
      next.add(active);
      return next;
    });
  }, [active]);

  const toggle = (id: string) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <aside className={`ud-side${open ? ' open' : ''}`} id="side" aria-label="Section navigation">
      <div className="nav-label">Brand</div>
      {SECTIONS.map((s) => {
        const isActive = s.id === active;
        const isOpen = openGroups.has(s.id);
        const hasSub = s.sub.length > 1;
        return (
          <div
            key={s.id}
            className={`nav-group${isActive ? ' active' : ''}${isOpen ? ' open' : ''}`}
            data-sec={s.id}
          >
            <div className="nav-item">
              <a href={`#${s.id}`} aria-current={isActive ? 'true' : undefined} onClick={onNavigate}>
                {s.navLabel ?? s.title}
              </a>
              {hasSub && (
                <button
                  type="button"
                  className="chev"
                  aria-label={`Toggle ${s.title}`}
                  aria-expanded={isOpen}
                  aria-controls={`nav-sub-${s.id}`}
                  onClick={() => toggle(s.id)}
                >
                  <Chevron />
                </button>
              )}
            </div>
            {hasSub && (
              <div className="nav-sub" id={`nav-sub-${s.id}`}>
                {s.sub.map((sub) => (
                  <a key={sub.anchor} href={`#${sub.anchor}`} onClick={onNavigate}>
                    {sub.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
