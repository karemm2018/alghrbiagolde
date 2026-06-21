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
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollLimits = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // In RTL, scrollLeft is 0 when fully scrolled to the right (start in RTL).
    // It goes negative as we scroll to the left.
    // Let's use absolute scrollLeft or RTL standard matching.
    const isLtr = document.dir === 'ltr';
    
    if (isLtr) {
      setCanScrollRight(scrollLeft > 5);
      setCanScrollLeft(scrollLeft < scrollWidth - clientWidth - 5);
    } else {
      // RTL Mode scroll coordinates:
      // scrollLeft is 0 at start, and goes negative as we scroll left.
      // Maximum scroll is: clientWidth - scrollWidth (which is negative).
      const absScrollLeft = Math.abs(scrollLeft);
      const maxScroll = scrollWidth - clientWidth;
      
      // scrollRight button in RTL goes towards 0 (which is right/start).
      // scrollLeft button in RTL goes towards maxScroll (which is left/end).
      setCanScrollRight(absScrollLeft > 5);
      setCanScrollLeft(absScrollLeft < maxScroll - 5);
    }
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

    // RTL scroll directions:
    // Moving left means subtracting/reducing value (scrollLeft becomes more negative).
    // Moving right means adding/increasing value (scrollLeft moves towards 0).
    const rtlMultiplier = document.dir === 'ltr' ? 1 : -1;
    const shift = direction === 'left' ? -scrollAmount : scrollAmount;

    container.scrollBy({
      left: shift * rtlMultiplier,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full group/carousel">
      {/* Scroll Navigation Buttons (Hidden on mobile touch screen, visible on hover/tablet+) */}
      {properties.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute top-1/2 -translate-y-1/2 start-[-16px] z-30 p-3 rounded-full bg-bg-deep/90 border border-gold-primary/30 text-gold-primary shadow-2xl hover:border-gold-primary transition-all duration-300 cursor-pointer hidden md:flex hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none disabled:scale-100`}
            aria-label="السابق"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute top-1/2 -translate-y-1/2 end-[-16px] z-30 p-3 rounded-full bg-bg-deep/90 border border-gold-primary/30 text-gold-primary shadow-2xl hover:border-gold-primary transition-all duration-300 cursor-pointer hidden md:flex hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none disabled:scale-100`}
            aria-label="التالي"
          >
            <ChevronLeft className="w-5 h-5" />
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
