import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-soft-white border-t border-soft-white/15 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-soft-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-block uppercase font-sans tracking-[0.25em] font-semibold text-lg text-soft-white">
              ATELIER NORTH
            </a>
            <p className="font-editorial text-lg italic text-limestone max-w-sm font-light">
              Spaces shaped for the way life unfolds.
            </p>
            <div className="font-mono-tech text-[10px] text-arch-gray space-y-1 pt-2">
              <p>INDEPENDENT ARCHITECTURE & SPATIAL DESIGN PRACTICE</p>
              <p>RESIDENTIAL // CULTURAL // HOSPITALITY // CIVIC</p>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3 font-mono-tech text-xs">
            <span className="text-deep-earth text-[10px] uppercase tracking-widest block mb-2">NAVIGATION</span>
            <ul className="space-y-2 text-arch-gray">
              <li>
                <a href="#projects" className="hover:text-soft-white transition-colors">Projects</a>
              </li>
              <li>
                <a href="#studio" className="hover:text-soft-white transition-colors">Studio</a>
              </li>
              <li>
                <a href="#approach" className="hover:text-soft-white transition-colors">Approach</a>
              </li>
              <li>
                <a href="#journal" className="hover:text-soft-white transition-colors">Journal</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-soft-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-4 space-y-3 font-mono-tech text-xs">
            <span className="text-deep-earth text-[10px] uppercase tracking-widest block mb-2">STUDIO LOCATIONS</span>
            <div className="text-arch-gray space-y-1">
              <p className="text-soft-white font-medium">Northwood Headquarters</p>
              <p>48 Atelier Way, Northwood Studio 04</p>
              <p>Westhaven Cultural District</p>
            </div>
            <div className="pt-2 text-arch-gray space-y-1">
              <p>
                <a href="mailto:hello@ateliernorth.studio" className="hover:text-soft-white transition-colors">
                  hello@ateliernorth.studio
                </a>
              </p>
              <p>+00 000 000 0000</p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Back To Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 font-mono-tech text-[10px] text-arch-gray">
          
          <div>
            <span>© 2026 ATELIER NORTH. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-soft-white transition-colors">Instagram</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-soft-white transition-colors">LinkedIn</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-soft-white transition-colors">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-soft-white transition-colors">Terms</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-soft-white hover:text-deep-earth transition-colors p-2 border border-soft-white/10 hover:border-soft-white/30"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </footer>
  );
}
