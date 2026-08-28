import React from 'react';
import { Compass, PenTool, Ruler, Frame } from 'lucide-react';

export default function StudioSection() {
  return (
    <section id="studio" className="py-28 bg-charcoal text-soft-white border-t border-soft-white/10 relative">
      
      {/* Background Architectural Blueprint Overlay */}
      <div className="absolute inset-0 opacity-10 arch-grid-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20 relative z-10">
        
        {/* Editorial Text Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-arch-gray block">
              STUDIO // ATELIER NORTH
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-soft-white font-light leading-tight">
              We design beyond the building.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="font-sans text-sm md:text-base text-soft-white/80 font-light leading-relaxed border-l-2 border-deep-earth pl-6">
              ATELIER NORTH is an independent architecture and spatial design practice working across residential, cultural, hospitality, and public environments. We believe architecture becomes meaningful when it responds to the people who inhabit it.
            </p>
          </div>
        </div>

        {/* Asymmetrical Editorial Composition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Main Large Visual: Architectural Scale Models & Drafting Table */}
          <div className="md:col-span-7 relative aspect-[4/3] overflow-hidden border border-soft-white/15 group shadow-2xl">
            <img
              src="/images/studio_composition.jpg"
              alt="ATELIER NORTH Studio Process & Scale Models"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-soft-white font-mono-tech text-[10px]">
              <div>
                <span className="text-deep-earth block font-semibold">STUDIO WORKBENCH</span>
                <span className="text-arch-gray">PHYSICAL MODELING & SKETCHING</span>
              </div>
              <span className="bg-charcoal/80 px-3 py-1 border border-soft-white/10">
                FRAME // 04.1
              </span>
            </div>
          </div>

          {/* Secondary Stacked Editorial Cards */}
          <div className="md:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Card 1: Studio Philosophy Note */}
            <div className="bg-soft-white/5 border border-soft-white/10 p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between font-mono-tech text-[10px] text-arch-gray">
                <span className="flex items-center space-x-2 text-deep-earth">
                  <PenTool className="w-3.5 h-3.5" />
                  <span>ANALOG SKETCHING & PHYSICAL CRAFT</span>
                </span>
                <span>EST. 2014</span>
              </div>
              <p className="font-editorial text-xl text-soft-white/90 italic font-light leading-relaxed">
                "Every line drawn by hand carries an implicit human scale before it enters digital calculation."
              </p>
              <div className="font-mono-tech text-[10px] text-arch-gray flex items-center space-x-2 pt-2 border-t border-soft-white/10">
                <span>HEAD ARCHITECT NOTES</span>
                <span>•</span>
                <span className="text-limestone">ATELIER NORTH WORKSHOP</span>
              </div>
            </div>

            {/* Card 2: Interactive Studio Details */}
            <div className="bg-charcoal border border-soft-white/15 p-6 md:p-8 space-y-4">
              <h3 className="font-editorial text-2xl text-soft-white">
                Independent Practice Model
              </h3>
              <p className="font-sans text-xs text-soft-white/70 font-light leading-relaxed">
                We purposefully limit our concurrent project count to ensure that each spatial design receives meticulous partner-level attention, custom material sourcing, and dedicated site oversight.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2 font-mono-tech text-[10px] border-t border-soft-white/10">
                <div>
                  <span className="text-arch-gray block">STUDIO LOCATIONS</span>
                  <span className="text-soft-white">NORTHWOOD // WESTHAVEN</span>
                </div>
                <div>
                  <span className="text-arch-gray block">DISCIPLINE</span>
                  <span className="text-soft-white">ARCH + INTERIORS + LANDSCAPE</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
