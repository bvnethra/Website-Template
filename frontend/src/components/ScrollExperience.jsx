import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Disc, Layers } from 'lucide-react';

export default function ScrollExperience() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const stages = [
    {
      id: '01',
      title: 'LAND',
      image: '/images/scroll_land.jpg',
      sentence: 'Architecture does not conquer terrain; it listens to the slope, wind, and memory of the soil.',
      textureDetail: 'Raw Basalt & Weathered Limestone',
      coordinates: 'STAGE 01 // GEOLOGICAL CONTEXT',
      note: 'Topographical mapping determines the structural axis before any sketch begins.'
    },
    {
      id: '02',
      title: 'LIGHT',
      image: '/images/scroll_light.jpg',
      sentence: 'Light is our primary building material—shaping emotion and drawing quiet geometric shadows.',
      textureDetail: 'Diffused Solar Rays & Lime Plaster',
      coordinates: 'STAGE 02 // LUMINANCE AXIS',
      note: 'Apertures are positioned to track solstices, transforming daily living into a canvas of shadow.'
    },
    {
      id: '03',
      title: 'MATERIAL',
      image: '/images/scroll_material.jpg',
      sentence: 'We choose materials that possess weight, honest texture, and a commitment to age with grace.',
      textureDetail: 'Tactile Travertine & Charred Timber',
      coordinates: 'STAGE 03 // TACTILE SPECTRUM',
      note: 'Unfinished natural surfaces gain depth through human touch and exposure to climate.'
    },
    {
      id: '04',
      title: 'FORM',
      image: '/images/scroll_form.jpg',
      sentence: 'Form emerges when unnecessary ornament is stripped away until function and purity remain.',
      textureDetail: 'Cast Concrete & Monolithic Mass',
      coordinates: 'STAGE 04 // GEOMETRIC REFINEMENT',
      note: 'Volume is sculpted to frame landscape vistas while harboring acoustic quiet.'
    },
    {
      id: '05',
      title: 'SPACE',
      image: '/images/scroll_space.jpg',
      sentence: 'The final outcome is not merely a structure, but the atmosphere created for human life within.',
      textureDetail: 'Acoustic Void & Warm Wood Ceiling',
      coordinates: 'STAGE 05 // INHABITED ATMOSPHERE',
      note: 'Spaces invite slowness, presence, and seamless transition between indoor and outdoor realm.'
    }
  ];

  const currentStage = stages[activeStageIndex];

  return (
    <section className="py-28 bg-charcoal text-soft-white border-t border-soft-white/10 relative overflow-hidden">
      
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 arch-grid-bg" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-soft-white/15 pb-8">
          <div>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-arch-gray block mb-3">
              PHILOSOPHY // OBSERVATION SEQUENCE
            </span>
            <h2 className="font-editorial text-4xl md:text-6xl text-soft-white font-light max-w-2xl">
              Architecture begins with observation.
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-soft-white/60 max-w-xs mt-4 md:mt-0 font-light">
            A continuous sequence connecting land to atmosphere.
          </p>
        </div>

        {/* Stage Navigation / Connecting Line Trace */}
        <div className="relative py-4">
          
          {/* Continuous Trace Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-soft-white/20 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-deep-earth -translate-y-1/2 z-0 transition-all duration-500"
            style={{
              width: `${((activeStageIndex + 1) / stages.length) * 100}%`
            }}
          />

          <div className="relative z-10 flex justify-between items-center">
            {stages.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`flex flex-col items-center group transition-all duration-300 ${
                    isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                  data-cursor="EXPLORE"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono-tech text-[11px] border transition-all duration-300 ${
                      isActive
                        ? 'bg-deep-earth text-soft-white border-deep-earth shadow-lg'
                        : 'bg-charcoal text-arch-gray border-soft-white/30 group-hover:border-soft-white'
                    }`}
                  >
                    {stage.id}
                  </div>
                  <span
                    className={`mt-2 font-mono-tech text-[10px] uppercase tracking-widest ${
                      isActive ? 'text-limestone font-semibold' : 'text-arch-gray'
                    }`}
                  >
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-soft-white/5 border border-soft-white/10 p-6 md:p-12 relative min-h-[460px]">
          
          {/* Stage Visual */}
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden border border-soft-white/10 group">
            <img
              key={currentStage.id}
              src={currentStage.image}
              alt={currentStage.title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-soft-white font-mono-tech text-[10px]">
              <span className="bg-charcoal/90 px-3 py-1 border border-soft-white/10">
                {currentStage.coordinates}
              </span>
              <span className="bg-deep-earth/90 text-soft-white px-3 py-1 font-semibold">
                TEXTURE // {currentStage.textureDetail}
              </span>
            </div>
          </div>

          {/* Stage Narrative Content */}
          <div className="lg:col-span-5 space-y-6 lg:pl-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 font-mono-tech text-xs text-deep-earth">
                <Disc className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                <span>STAGE {currentStage.id} OF 05 // {currentStage.title}</span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl text-soft-white leading-snug font-light">
                {currentStage.sentence}
              </h3>
            </div>

            <div className="space-y-4 border-t border-soft-white/10 pt-6">
              <div className="flex items-start space-x-3">
                <Layers className="w-4 h-4 text-deep-earth mt-0.5 shrink-0" />
                <p className="font-mono-tech text-xs text-arch-gray leading-relaxed">
                  {currentStage.note}
                </p>
              </div>

              {/* Stage Advance Controls */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-mono-tech text-[10px] text-arch-gray">
                  CLICK STAGE TO NAVIGATE SEQUENCE
                </span>
                <button
                  onClick={() => setActiveStageIndex((prev) => (prev + 1) % stages.length)}
                  className="inline-flex items-center space-x-2 font-mono-tech text-xs uppercase tracking-widest text-limestone hover:text-soft-white transition-colors"
                >
                  <span>NEXT STAGE</span>
                  <ChevronRight className="w-4 h-4 text-deep-earth" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
