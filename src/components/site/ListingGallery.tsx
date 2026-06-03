'use client';

import { useState } from 'react';
import type { ListingImage } from '@/lib/listings';

/** Listing detail gallery: a large active image with a thumbnail strip. */
export function ListingGallery({ images, title }: { images: ListingImage[]; title: string }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) {
    return <div className="lg-main lg-empty" aria-hidden />;
  }
  return (
    <div className="listing-gallery">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="lg-main" src={images[active].url} alt={images[active].alt ?? title} />
      {images.length > 1 && (
        <div className="lg-thumbs">
          {images.map((im, i) => (
            <button
              key={im.url}
              type="button"
              className={`lg-thumb${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Image ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.url} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
