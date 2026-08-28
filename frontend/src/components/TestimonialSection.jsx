import React from 'react';
import { Quote } from 'lucide-react';

export default function TestimonialSection() {
  return (
    <section className="py-32 bg-charcoal text-soft-white border-t border-soft-white/10 relative overflow-hidden arch-grid-bg">
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center space-y-12 relative z-10">
        
        {/* Subtle Architectural Category Label */}
        <div className="inline-flex items-center space-x-2 font-mono-tech text-[11px] uppercase tracking-[0.3em] text-arch-gray border-b border-soft-white/10 pb-2">
          <Quote className="w-3.5 h-3.5 text-deep-earth" />
          <span>Built through collaboration.</span>
        </div>

        {/* Minimal Full-Width Typography Quote */}
        <blockquote className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-soft-white leading-tight max-w-5xl mx-auto italic">
          "ATELIER NORTH brought a clarity to the project that changed how we understood the space itself."
        </blockquote>

        {/* Client Attribution */}
        <div className="space-y-1 pt-4">
          <div className="font-sans text-sm uppercase tracking-[0.25em] font-semibold text-limestone">
            Elena Marlow
          </div>
          <div className="font-mono-tech text-xs text-arch-gray">
            Director, Forma Courtyard
          </div>
        </div>

      </div>

    </section>
  );
}
