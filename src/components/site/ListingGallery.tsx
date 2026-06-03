'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { ListingImage } from '@/lib/listings';
import { ArrowRight } from '@/components/icons/ui-icons';

/** Listing detail gallery: a large active image with a thumbnail strip, and a
 *  full-screen lightbox opened by clicking the main image. */
export function ListingGallery({ images, title }: { images: ListingImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const count = images.length;
  const go = useCallback(
    (dir: number) => setActive((i) => (count ? (i + dir + count) % count : 0)),
    [count],
  );

  // Touch swipe (mobile): horizontal drag past the threshold switches image.
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, go]);

  if (count === 0) {
    return <div className="lg-main lg-empty" aria-hidden />;
  }

  return (
    <div className="listing-gallery">
      <button type="button" className="lg-main-btn" onClick={() => setOpen(true)} aria-label="Open gallery">
        <Image className="lg-main" src={images[active].url} alt={images[active].alt ?? title} fill priority sizes="(max-width:900px) 100vw, 66vw" />
        <span className="lg-zoom" aria-hidden>⤢</span>
      </button>

      {count > 1 && (
        <div className="lg-thumbs">
          {images.map((im, i) => (
            <button
              key={im.url}
              type="button"
              className={`lg-thumb${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Image ${i + 1}`}
            >
              <Image src={im.url} alt="" fill sizes="96px" />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button type="button" className="lightbox-close" onClick={() => setOpen(false)} aria-label="Close">
            <span aria-hidden>×</span>
          </button>
          {count > 1 && (
            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label="Previous image"
            >
              <ArrowRight size={26} />
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lightbox-img"
            src={images[active].url}
            alt={images[active].alt ?? title}
            onClick={(e) => e.stopPropagation()}
          />
          {count > 1 && (
            <button
              type="button"
              className="lightbox-nav lightbox-next"
              onClick={(e) => { e.stopPropagation(); go(1); }}
              aria-label="Next image"
            >
              <ArrowRight size={26} />
            </button>
          )}
          {count > 1 && (
            <div className="lightbox-count" onClick={(e) => e.stopPropagation()}>
              {active + 1} / {count}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
