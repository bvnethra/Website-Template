'use client';

import React, { useRef } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  title: string;
  description?: string;
  products: Product[];
}

export function ProductCarousel({ title, description, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // scroll 80% of container width
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="container-page py-8 lg:py-10 border-t border-brand-border bg-white" aria-labelledby={`carousel-heading-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2
            id={`carousel-heading-${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-lg sm:text-xl font-bold text-navy-900 tracking-tight"
          >
            {title}
          </h2>
          {description && (
            <p className="text-xs text-navy-500 mt-1">
              {description}
            </p>
          )}
        </div>

        {/* Scroll Buttons (Desktop only) */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full border border-brand-border hover:bg-navy-50 flex items-center justify-center text-navy-600 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full border border-brand-border hover:bg-navy-50 flex items-center justify-center text-navy-600 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrolling Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-[190px] sm:w-[230px] md:w-[250px] snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
