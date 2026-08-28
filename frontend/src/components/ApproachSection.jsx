import React, { useState } from 'react';
import { Eye, Lightbulb, Sliders, CheckCircle2, Box, Square, Triangle } from 'lucide-react';

export default function ApproachSection() {
  const [hoveredStage, setHoveredStage] = useState(null);

  const stages = [
    {
      number: '01',
      title: 'Observe',
      description: 'We study context, behavior, landscape, and the possibilities already present.',
      icon: Eye,
      detail: 'Site orientation, solar trajectory, wind currents, and local architectural heritage analysis.',
      geometricShape: 'Square'
    },
    {
      number: '02',
      title: 'Imagine',
      description: 'We explore ideas through sketches, models, material, and conversation.',
      icon: Lightbulb,
      detail: 'Iterative physical massing models, light studies, and collaborative spatial dialogue.',
      geometricShape: 'Circle'
    },
    {
      number: '03',
      title: 'Refine',
      description: 'We test every decision until function and feeling move together.',
      icon: Sliders,
      detail: 'Acoustic modeling, tactile material pairing, and structural detail optimization.',
      geometricShape: 'Triangle'
    },
    {
      number: '04',
      title: 'Realize',
      numberFull: '04',
      titleFull: 'Realize',
      description: 'We bring ideas into the physical world with precision and care.',
      icon: CheckCircle2,
      detail: 'Meticulous on-site craftsman oversight, custom joinery, and spatial commissioning.',
      geometricShape: 'Cube'
    }
  ];

  return (
    <section id="approach" className="py-28 bg-charcoal text-soft-white border-t border-soft-white/10 relative overflow-hidden">
      
      {/* Animated Blueprint Background Vector Line */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path
            d="M 100 150 L 350 150 L 350 350 L 650 350 L 650 550 L 950 550 L 950 700 L 1100 700"
            stroke="#E8E4DC"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="animate-draw"
          />
          <circle cx="350" cy="150" r="6" fill="#8A705C" />
          <circle cx="650" cy="350" r="6" fill="#8A705C" />
          <circle cx="950" cy="550" r="6" fill="#8A705C" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-soft-white/15 pb-8">
          <div>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-arch-gray block mb-3">
              METHODOLOGY // ARCHITECTURAL PROCESS
            </span>
            <h2 className="font-editorial text-4xl md:text-6xl text-soft-white font-light">
              A process built around possibilities.
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-soft-white/60 max-w-sm mt-4 md:mt-0 font-light">
            Four disciplined stages translating abstract intent into permanent spatial experience.
          </p>
        </div>

        {/* 4 Stage Process Grid with Connecting Architectural Path */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isHovered = hoveredStage === idx;
            return (
              <div
                key={stage.number}
                onMouseEnter={() => setHoveredStage(idx)}
                onMouseLeave={() => setHoveredStage(null)}
                className={`bg-soft-white/5 border p-8 space-y-6 relative transition-all duration-500 group ${
                  isHovered
                    ? 'border-deep-earth bg-soft-white/10 -translate-y-2 shadow-2xl'
                    : 'border-soft-white/10'
                }`}
                data-cursor="OPEN"
              >
                {/* Geometric Node Icon */}
                <div className="flex items-center justify-between font-mono-tech text-xs text-arch-gray border-b border-soft-white/10 pb-4">
                  <span className="text-deep-earth font-bold text-sm">STAGE // {stage.number}</span>
                  <div className="w-6 h-6 border border-soft-white/20 flex items-center justify-center group-hover:border-deep-earth transition-colors">
                    <Icon className="w-3.5 h-3.5 text-soft-white" />
                  </div>
                </div>

                {/* Stage Title */}
                <h3 className="font-editorial text-3xl text-soft-white group-hover:text-limestone transition-colors">
                  {stage.title}
                </h3>

                {/* Stage Description */}
                <p className="font-sans text-sm text-soft-white/70 font-light leading-relaxed">
                  {stage.description}
                </p>

                {/* Additional Detail Box on Hover/Focus */}
                <div className="pt-4 border-t border-soft-white/10 font-mono-tech text-[10px] text-arch-gray space-y-2">
                  <span className="text-deep-earth block uppercase tracking-wider">PROCESS ACTION</span>
                  <p className="text-soft-white/80 leading-normal">
                    {stage.detail}
                  </p>
                </div>

                {/* Bottom Corner Accent */}
                <div className="absolute bottom-2 right-2 font-mono-tech text-[9px] text-arch-gray/50">
                  [{stage.geometricShape.toUpperCase()}]
                </div>
              </div>
            );
          })}

        </div>

        {/* Abstract Architectural Line Completion Banner */}
        <div className="p-8 bg-charcoal border border-soft-white/15 flex flex-col md:flex-row items-center justify-between gap-6 font-mono-tech text-xs text-arch-gray">
          <div className="flex items-center space-x-4">
            <span className="w-3 h-3 bg-deep-earth" />
            <span>CONTINUOUS ARCHITECTURAL TRACE: OBSERVE ➔ IMAGINE ➔ REFINE ➔ REALIZE</span>
          </div>
          <span className="text-soft-white uppercase tracking-widest text-[10px] bg-soft-white/10 px-3 py-1 border border-soft-white/10">
            SYSTEM COMPLETE // READY FOR INQUIRY
          </span>
        </div>

      </div>

    </section>
  );
}
