'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import {
  Pill,
  Droplet,
  Heart,
  Baby,
  Sparkles,
  Scissors,
  Apple,
  Dumbbell,
  HeartPulse,
  Leaf,
  Activity,
  ChevronLeft,
  ChevronRight,
  Flame,
  Flower2,
  Cpu,
  HeartHandshake,
  Shield,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'pain-relief': Pill,
  'cold-allergy': Flame, // custom representation
  'diabetes': Droplet,
  'heart-care': Heart,
  'digestive': Activity,
  'womens-health': Flower2,
  'mens-health': Shield,
  'baby-care': Baby,
  'skin-care': Sparkles,
  'hair-care': Scissors,
  'nutrition': Apple,
  'fitness': Dumbbell,
  'first-aid': HeartPulse,
  'medical-devices': Cpu,
  'ayurveda': Leaf,
  'elder-care': HeartHandshake,
};

export function CategoryRail() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="container-page py-8 border-t border-brand-border bg-white" aria-labelledby="categories-heading">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 id="categories-heading" className="text-xl font-bold text-navy-900 tracking-tight">
            Browse by Category
          </h2>
          <p className="text-xs text-navy-500 mt-1">
            Find the health essentials you need, organized by category
          </p>
        </div>
        
        {/* Navigation arrows (Desktop only) */}
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

      {/* Categories Horizontal Rail */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          const Icon = iconMap[category.icon] || Pill;
          
          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex-shrink-0 w-[110px] sm:w-[130px] flex flex-col items-center text-center snap-start group"
            >
              {/* Icon Bubble */}
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-2.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm ${category.color}`}>
                <Icon className="w-6.5 h-6.5 sm:w-7 sm:h-7 stroke-[1.75]" />
              </div>
              
              {/* Category Name */}
              <span className="text-xs font-semibold text-navy-800 group-hover:text-mint-600 transition-colors line-clamp-2 px-1">
                {category.name}
              </span>
              
              {/* Count */}
              <span className="text-[10px] text-navy-400 mt-0.5">
                {category.productCount} Items
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
