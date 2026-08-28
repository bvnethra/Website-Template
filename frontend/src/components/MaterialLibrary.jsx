import React, { useState } from 'react';
import { Layers, Sparkles, Plus, Check } from 'lucide-react';

export default function MaterialLibrary() {
  const [activeMaterial, setActiveMaterial] = useState(0);

  const materials = [
    {
      name: 'TRAVERTINE',
      subtitle: 'Honed Italian Mineral Stone',
      image: '/images/material_travertine.jpg',
      note: 'A natural surface that gains character through time and light.',
      porosity: 'Low-density microporous',
      durability: '100+ Years',
      origin: 'Fictional Quarry 04, Northern Basin',
      application: 'Facade Cladding, Pool Decking, Sanctuary Steps'
    },
    {
      name: 'DARK TIMBER',
      subtitle: 'Charred Shou Sugi Ban Cedar',
      image: '/images/material_timber.jpg',
      note: 'Charred surface creating organic warmth, weather resistance, and acoustic dampening.',
      porosity: 'Carbonized hydrophobic layer',
      durability: '80+ Years',
      origin: 'Sustainable Coastal Pine Reserve',
      application: 'Residential Screen Panels, Wall Lining, Ceilings'
    },
    {
      name: 'BRUSHED METAL',
      subtitle: 'Architectural Oxidized Bronze Alloy',
      image: '/images/material_metal.jpg',
      note: 'Low-reflection metal alloy that develops a rich, quiet patina under coastal exposure.',
      porosity: 'Non-porous sealed patina',
      durability: '150+ Years',
      origin: 'Precision Metallurgical Foundry',
      application: 'Window Mullions, Entrance Portals, Hardware'
    },
    {
      name: 'HAND-FINISHED PLASTER',
      subtitle: 'Mineral Lime & Marble Aggregate',
      image: '/images/material_plaster.jpg',
      note: 'Hand-troweled mineral render designed to absorb and diffuse ambient daylight softy.',
      porosity: 'Vapor permeable breathable',
      durability: '50+ Years',
      origin: 'Artisanal Lime Pit Formulations',
      application: 'Interior Galleries, Curved Wall Transitions'
    },
    {
      name: 'RECYCLED CONCRETE',
      subtitle: 'Low-Carbon Aggregate Monolith',
      image: '/images/material_concrete.jpg',
      note: 'Cast concrete infused with local basalt fragments for structural and visual mass.',
      porosity: 'Dense polished matrix',
      durability: '200+ Years',
      origin: 'Reclaimed Regional Quarry Waste',
      application: 'Foundation Walls, Structural Pillars, Benches'
    }
  ];

  return (
    <section className="py-28 bg-charcoal text-soft-white border-t border-soft-white/10 relative">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-soft-white/15 pb-8">
          <div>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-arch-gray block mb-3">
              TACTILE LIBRARY // MATERIALITY
            </span>
            <h2 className="font-editorial text-4xl md:text-6xl text-soft-white font-light">
              Built from what lasts.
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-soft-white/60 max-w-sm mt-4 md:mt-0 font-light">
            We prioritize raw, authentic materials chosen for how they age and interact with daylight.
          </p>
        </div>

        {/* Material Selection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Material Accordion / List */}
          <div className="lg:col-span-5 space-y-3">
            {materials.map((mat, idx) => {
              const isSelected = activeMaterial === idx;
              return (
                <div
                  key={mat.name}
                  onClick={() => setActiveMaterial(idx)}
                  onMouseEnter={() => setActiveMaterial(idx)}
                  className={`p-5 border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-soft-white/10 border-deep-earth translate-x-2'
                      : 'bg-charcoal border-soft-white/10 hover:border-soft-white/30'
                  }`}
                  data-cursor="INSPECT"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="font-mono-tech text-xs text-arch-gray">
                        0{idx + 1}
                      </span>
                      <div>
                        <h3
                          className={`font-editorial text-xl md:text-2xl transition-colors ${
                            isSelected ? 'text-soft-white font-medium' : 'text-soft-white/70'
                          }`}
                        >
                          {mat.name}
                        </h3>
                        <span className="font-mono-tech text-[10px] text-arch-gray block">
                          {mat.subtitle}
                        </span>
                      </div>
                    </div>
                    {isSelected ? (
                      <span className="w-2 h-2 bg-deep-earth rounded-full animate-ping" />
                    ) : (
                      <Plus className="w-4 h-4 text-arch-gray" />
                    )}
                  </div>

                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-soft-white/10 font-sans text-xs text-soft-white/80 leading-relaxed font-light">
                      <p className="italic font-editorial text-sm text-limestone">"{mat.note}"</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Expanded Material Preview Card */}
          <div className="lg:col-span-7 relative bg-soft-white/5 border border-soft-white/15 p-6 md:p-8 space-y-6">
            
            <div className="relative aspect-[16/10] overflow-hidden border border-soft-white/10 shadow-2xl">
              <img
                key={materials[activeMaterial].name}
                src={materials[activeMaterial].image}
                alt={materials[activeMaterial].name}
                className="w-full h-full object-cover transition-all duration-700 ease-out transform scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 bg-charcoal/90 px-3 py-1 font-mono-tech text-[10px] text-deep-earth border border-soft-white/10">
                SAMPLE REF // MAT-0{activeMaterial + 1}
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-soft-white font-mono-tech text-[10px]">
                <span className="bg-charcoal/80 px-3 py-1 text-limestone">
                  {materials[activeMaterial].porosity}
                </span>
                <span className="bg-charcoal/80 px-3 py-1 text-arch-gray">
                  EST. LIFE: {materials[activeMaterial].durability}
                </span>
              </div>
            </div>

            {/* Material Technical Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-tech text-xs bg-charcoal/60 p-4 border border-soft-white/10">
              <div>
                <span className="text-arch-gray text-[10px] block">ORIGIN & PROVENANCE</span>
                <span className="text-soft-white text-xs">{materials[activeMaterial].origin}</span>
              </div>
              <div>
                <span className="text-arch-gray text-[10px] block">TYPICAL APPLICATION</span>
                <span className="text-soft-white text-xs">{materials[activeMaterial].application}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono-tech text-arch-gray">
              <span className="flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-deep-earth" />
                <span>AUTHENTIC MATERIAL SPECIFICATION</span>
              </span>
              <span className="text-limestone uppercase">ATELIER NORTH PALETTE</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
