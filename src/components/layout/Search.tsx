'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { buildSearchIndex } from '@/lib/sections';

interface SearchProps {
  open: boolean;
  onClose: () => void;
}

export function Search({ open, onClose }: SearchProps) {
  const index = useMemo(() => buildSearchIndex(), []);
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 8);
    const seen = new Set<string>();
    return index
      .filter((e) => e.label.toLowerCase().includes(q) || e.section.toLowerCase().includes(q))
      .filter((e) => {
        const key = e.anchor + e.label;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 10);
  }, [query, index]);

  // On open: reset, focus the input, and restore focus to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    setQuery('');
    setSel(0);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      clearTimeout(t);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  useEffect(() => setSel(0), [query]);

  const go = (anchor: string) => {
    onClose();
    if (typeof window !== 'undefined') window.location.hash = `#${anchor}`;
  };

  // Arrow / Enter handling on the input.
  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const r = results[sel];
      if (r) go(r.anchor);
    }
  };

  // Dialog-level handling: Escape closes from anywhere, Tab is trapped inside.
  const onOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'Tab') {
      const focusables = overlayRef.current?.querySelectorAll<HTMLElement>(
        'input, a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;
      const list = Array.from(focusables);
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="search-ov open"
      id="searchOv"
      role="dialog"
      aria-modal="true"
      aria-label="Search the guidelines"
      onKeyDown={onOverlayKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="search-box">
        <input
          ref={inputRef}
          id="searchInput"
          type="text"
          placeholder="Search the guidelines…"
          autoComplete="off"
          role="combobox"
          aria-expanded="true"
          aria-controls="searchRes"
          aria-label="Search the guidelines"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onInputKeyDown}
        />
        <div className="search-res" id="searchRes" role="listbox" aria-label="Search results">
          {results.map((r, i) => (
            <a
              key={r.anchor + r.label}
              href={`#${r.anchor}`}
              role="option"
              aria-selected={i === sel}
              className={i === sel ? 'sel' : undefined}
              onMouseEnter={() => setSel(i)}
              onClick={(e) => {
                e.preventDefault();
                go(r.anchor);
              }}
            >
              <span>{r.label}</span>
              <span className="grp">{r.section}</span>
            </a>
          ))}
          {results.length === 0 && (
            <a href="#top" onClick={(e) => { e.preventDefault(); onClose(); }}>
              <span>No matches</span>
              <span className="grp">Try another term</span>
            </a>
          )}
        </div>
        <div className="search-hint">{'↑↓'} to navigate {'·'} Enter to open {'·'} Esc to close</div>
      </div>
    </div>
  );
}
