import React, { useEffect, useState } from 'react';
import { ArrowDown, Layers, Compass, Grid } from 'lucide-react';

export default function Hero({ onExploreWork }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal pt-24 pb-12 arch-grid-bg">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="15%"
            y1="0"
            x2="15%"
            y2="100%"
            stroke="#E8E4DC"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <line
            x1="85%"
            y1="0"
            x2="85%"
            y2="100%"
            stroke="#E8E4DC"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <line
            x1="0"
            y1="35%"
            x2="100%"
            y2="35%"
            stroke="#E8E4DC"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Editorial Content */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
          
          {/* Label with technical marker */}
          <div
            className={`flex items-center space-x-3 transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-2 h-2 bg-deep-earth"></span>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-arch-gray">
              ARCHITECTURE AND SPATIAL DESIGN
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={`font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-soft-white leading-[0.95] tracking-tight transition-all duration-1000 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Spaces shaped <br />
            <span className="italic font-normal text-limestone">for the way</span> <br />
            life unfolds.
          </h1>

          {/* Supporting Text */}
          <p
            className={`text-sm md:text-base text-soft-white/70 font-sans max-w-lg leading-relaxed font-light transition-all duration-1000 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            We design places where architecture, material, light, and everyday life meet with purpose.
          </p>

          {/* CTA & Scroll Indicator */}
          <div
            className={`pt-4 flex items-center space-x-8 transition-all duration-1000 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a
              href="#projects"
              data-cursor="VIEW"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-soft-white text-charcoal font-sans text-xs uppercase tracking-[0.25em] font-medium hover:bg-limestone transition-colors duration-300 flex items-center space-x-3 group"
            >
              <span>Explore selected work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>

            <div className="hidden sm:flex items-center space-x-2 font-mono-tech text-[10px] text-arch-gray tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-deep-earth" />
              <span>59°19'N 18°04'E</span>
            </div>
          </div>
        </div>

        {/* Right Column: Layered Presentation Board */}
        <div className="lg:col-span-6 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] flex items-center justify-center">
          
          {/* Layer 1: Background Vector Blueprint Graphic */}
          <div className="absolute inset-0 z-0 opacity-40">
            <svg className="w-full h-full" viewBox="0 0 500 600" fill="none">
              <rect
                x="20"
                y="20"
                width="460"
                height="560"
                stroke="#E8E4DC"
                strokeWidth="0.75"
                strokeDasharray="6 6"
              />
              <circle cx="250" cy="300" r="180" stroke="#8A705C" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="20" y1="300" x2="480" y2="300" stroke="#77756F" strokeWidth="0.5" />
              <line x1="250" y1="20" x2="250" y2="580" stroke="#77756F" strokeWidth="0.5" />
              <text x="30" y="45" fill="#77756F" fontSize="9" fontFamily="JetBrains Mono">
                PLAN // ELEVATION 01-A
              </text>
              <text x="370" y="45" fill="#77756F" fontSize="9" fontFamily="JetBrains Mono">
                SCALE 1:200
              </text>
            </svg>
          </div>

          {/* Layer 2: Main Building Image Mask Reveal */}
          <div
            className={`relative z-10 w-[85%] h-[82%] overflow-hidden shadow-2xl transition-all duration-1000 delay-300 border border-soft-white/10 ${
              loaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            data-cursor="EXPLORE"
          >
            <img
              src="/images/hero_building.jpg"
              alt="ATELIER NORTH Modern Architectural Scene"
              className="w-full h-full object-cover filter contrast-[1.05] brightness-95 hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            
            {/* Image Overlay Technical Badge */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-soft-white">
              <div>
                <span className="font-mono-tech text-[9px] uppercase tracking-widest text-limestone block">
                  FEATURED STUDY
                </span>
                <span className="font-editorial text-xl italic text-soft-white">
                  The Northwood Residence
                </span>
              </div>
              <span className="font-mono-tech text-[10px] text-arch-gray border-b border-arch-gray/50 pb-0.5">
                2026 ARCHIVE
              </span>
            </div>
          </div>

          {/* Layer 3: Floating Material Sample Fragment */}
          <div
            className={`absolute top-6 left-0 z-20 bg-charcoal/90 border border-soft-white/20 p-3 shadow-2xl backdrop-blur-md transition-all duration-1000 delay-700 max-w-[160px] ${
              loaded ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
            }`}
          >
            <div className="flex items-center space-x-2 border-b border-soft-white/10 pb-1.5 mb-2">
              <Layers className="w-3 h-3 text-deep-earth" />
              <span className="font-mono-tech text-[9px] text-limestone tracking-wider uppercase">
                MATERIAL FRAGMENT
              </span>
            </div>
            <p className="font-editorial text-xs italic text-soft-white/90">
              Honest travertine & charred timber slat system.
            </p>
          </div>

          {/* Layer 4: Technical Coordinates Badge */}
          <div
            className={`absolute bottom-8 -right-2 z-20 bg-limestone text-charcoal px-4 py-2.5 shadow-2xl transition-all duration-1000 delay-1000 font-mono-tech text-[10px] tracking-widest uppercase flex items-center space-x-3 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-deep-earth" />
            <div>
              <span className="block font-semibold">GRID REF 48.09</span>
              <span className="text-[9px] text-arch-gray">ELEVATION 142M</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Subtle Animated Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-soft-white/20 to-transparent" />
    </section>
  );
}
