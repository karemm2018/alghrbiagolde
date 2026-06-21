// src/components/property/UnitsCarousel.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { Property } from '@/lib/mockData';

interface UnitsCarouselProps {
  properties: Property[];
}

export default function UnitsCarousel({ properties }: UnitsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollLimits = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Show buttons only if there is overflow content to scroll
    setShowButtons(scrollWidth > clientWidth);

    const absScrollLeft = Math.abs(scrollLeft);
    const maxScroll = scrollWidth - clientWidth;
    
    // In both LTR and RTL, absScrollLeft tells us how far we have scrolled from the start.
    // Can scroll right (prev/visual right): if we are scrolled away from start
    setCanScrollRight(absScrollLeft > 5);
    
    // Can scroll left (next/visual left): if we haven't reached the end yet
    setCanScrollLeft(absScrollLeft < maxScroll - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollLimits);
      // Run once on load/resize
      checkScrollLimits();
      window.addEventListener('resize', checkScrollLimits);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScrollLimits);
      window.removeEventListener('resize', checkScrollLimits);
    };
  }, [properties]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.85;

    // Visual coordinate-based scrolling:
    // Left always scrolls visually to the left (-scrollAmount),
    // Right always scrolls visually to the right (+scrollAmount), regardless of LTR/RTL.
    const shift = direction === 'left' ? -scrollAmount : scrollAmount;

    container.scrollBy({
      left: shift,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full group/carousel">
      {/* Scroll Navigation Buttons (Hidden on mobile touch screen, visible on hover/tablet+) */}
      {showButtons && (
        <>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="absolute top-1/2 -translate-y-1/2 start-[-24px] z-30 w-12 h-12 rounded-full bg-gold-primary hover:bg-gold-light text-bg-deep border border-gold-dark/40 flex items-center justify-center shadow-[0_4px_20px_rgba(201,169,110,0.35)] hover:shadow-[0_4px_25px_rgba(201,169,110,0.5)] transition-all duration-300 cursor-pointer hidden md:flex hover:scale-105 active:scale-95 disabled:opacity-20 disabled:pointer-events-none disabled:scale-100"
            aria-label="السابق"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="absolute top-1/2 -translate-y-1/2 end-[-24px] z-30 w-12 h-12 rounded-full bg-gold-primary hover:bg-gold-light text-bg-deep border border-gold-dark/40 flex items-center justify-center shadow-[0_4px_20px_rgba(201,169,110,0.35)] hover:shadow-[0_4px_25px_rgba(201,169,110,0.5)] transition-all duration-300 cursor-pointer hidden md:flex hover:scale-105 active:scale-95 disabled:opacity-20 disabled:pointer-events-none disabled:scale-100"
            aria-label="التالي"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="w-full flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-1 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {properties.map((prop) => (
          <div
            key={prop.id}
            className="snap-start shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] transition-transform duration-300"
          >
            <PropertyCard property={prop} />
          </div>
        ))}
      </div>

      {/* Slide Indicators for mobile */}
      {properties.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {properties.map((_, idx) => {
            // Very simple active state mapping for indicators
            return (
              <div
                key={idx}
                className="w-1.5 h-1.5 rounded-full bg-white/20 transition-all"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
