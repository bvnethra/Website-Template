import React, { useState } from 'react';
import { ArrowUpRight, Crosshair, X, Maximize2, MapPin, Calendar, Tag } from 'lucide-react';

export default function SelectedProjects() {
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const projects = [
    {
      id: '01',
      name: 'Cedar House',
      location: 'Northwood, 2026',
      category: 'Residential',
      description: 'A quiet family home shaped around light, privacy, and the changing seasons.',
      image: '/images/project_cedar_house.jpg',
      coordinates: "44°58'N 93°15'W",
      details: {
        area: '480 m²',
        materialLead: 'Vertical Cedar, Cast Concrete, Low-E Glass',
        concept: 'Oriented along the sun arc to maximize passive heat in winter while maintaining complete forest privacy.',
        blueprintGrid: 'RES-NW-2026-01'
      },
      layoutType: 'full'
    },
    {
      id: '02',
      name: 'Tidal Pavilion',
      location: 'Westhaven, 2025',
      category: 'Cultural',
      description: 'A public gathering space inspired by the movement between land and water.',
      image: '/images/project_tidal_pavilion.jpg',
      coordinates: "53°12'N 06°14'W",
      details: {
        area: '1,200 m²',
        materialLead: 'Curved Off-White Concrete, Marine Grade Bronze',
        concept: 'Designed to allow natural ocean tides to flood the inner acoustic chamber during high tide cycles.',
        blueprintGrid: 'CUL-WH-2025-02'
      },
      layoutType: 'split'
    },
    {
      id: '03',
      name: 'Forma Courtyard',
      location: 'Elmont, 2026',
      category: 'Hospitality',
      description: 'A hospitality experience built around landscape, material, and stillness.',
      image: '/images/project_forma_courtyard.jpg',
      coordinates: "37°48'N 14°59'E",
      details: {
        area: '2,800 m²',
        materialLead: 'Honest Travertine, Olive Timber, Lime Plaster',
        concept: 'Structured around three secluded internal sanctuaries where acoustic water basins mask urban soundscapes.',
        blueprintGrid: 'HOS-EL-2026-03'
      },
      layoutType: 'asymmetrical'
    },
    {
      id: '04',
      name: 'The Archive',
      location: 'Ravine District, 2024',
      category: 'Civic',
      description: 'A contemporary public archive designed as a place for memory and discovery.',
      image: '/images/project_archive.jpg',
      coordinates: "60°10'N 24°56'E",
      details: {
        area: '3,400 m²',
        materialLead: 'Dark Basalt Monolith, Slotted Bronze Panels',
        concept: 'Light is channeled through vertical basalt fissures to illuminate historic document vaults beneath earth level.',
        blueprintGrid: 'CIV-RD-2024-04'
      },
      layoutType: 'dark'
    }
  ];

  return (
    <section id="projects" className="py-28 bg-charcoal text-soft-white border-t border-soft-white/10 relative">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-soft-white/15">
          <div>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-arch-gray block mb-3">
              INDEX // 02
            </span>
            <h2 className="font-editorial text-4xl md:text-6xl text-soft-white font-light">
              Selected projects
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-soft-white/60 max-w-sm mt-4 md:mt-0 font-light">
            A curation of spatial works exploring light, permanence, and human experience.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-28">
        
        {/* PROJECT 01: Full Width Layout */}
        {(() => {
          const p = projects[0];
          return (
            <div
              key={p.id}
              className="group relative cursor-pointer"
              onClick={() => setActiveProjectModal(p)}
              data-cursor="VIEW"
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-charcoal border border-soft-white/10">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
                
                {/* Coordinate Trace Line */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center font-mono-tech text-[10px] text-soft-white/70">
                  <span className="bg-charcoal/80 backdrop-blur-sm px-3 py-1 border border-soft-white/10">
                    PROJECT // {p.id}
                  </span>
                  <span className="flex items-center space-x-1 bg-charcoal/80 backdrop-blur-sm px-3 py-1 border border-soft-white/10">
                    <Crosshair className="w-3 h-3 text-deep-earth" />
                    <span>{p.coordinates}</span>
                  </span>
                </div>

                {/* Bottom Info Overlay */}
                <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-deep-earth">
                      {p.category} — {p.location}
                    </span>
                    <h3 className="font-editorial text-3xl md:text-5xl text-soft-white group-hover:translate-x-2 transition-transform duration-300">
                      {p.name}
                    </h3>
                    <p className="text-xs md:text-sm text-soft-white/80 max-w-lg font-light">
                      {p.description}
                    </p>
                  </div>
                  
                  <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-limestone group-hover:text-soft-white transition-colors">
                    <span>Explore project</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* PROJECT 02: Split Editorial Layout */}
        {(() => {
          const p = projects[1];
          return (
            <div
              key={p.id}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer border-t border-soft-white/10 pt-16"
              onClick={() => setActiveProjectModal(p)}
              data-cursor="INSPECT"
            >
              <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden border border-soft-white/10">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-sm px-3 py-1 font-mono-tech text-[10px] text-arch-gray border border-soft-white/10">
                  {p.coordinates}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6 lg:pl-8">
                <div className="font-mono-tech text-[11px] text-deep-earth tracking-widest uppercase">
                  {p.id} // {p.category}
                </div>
                <h3 className="font-editorial text-4xl md:text-5xl text-soft-white group-hover:text-limestone transition-colors">
                  {p.name}
                </h3>
                <p className="font-sans text-sm text-soft-white/70 leading-relaxed font-light">
                  {p.description}
                </p>

                <div className="border-t border-b border-soft-white/10 py-4 font-mono-tech text-[11px] text-arch-gray space-y-2">
                  <div className="flex justify-between">
                    <span>LOCATION</span>
                    <span className="text-soft-white">{p.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SURFACE AREA</span>
                    <span className="text-soft-white">{p.details.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MATERIAL LEAD</span>
                    <span className="text-soft-white">{p.details.materialLead}</span>
                  </div>
                </div>

                <button className="inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-[0.2em] text-soft-white group-hover:text-deep-earth transition-colors">
                  <span>View architectural specs</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })()}

        {/* PROJECT 03: Asymmetrical Image Composition */}
        {(() => {
          const p = projects[2];
          return (
            <div
              key={p.id}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-end cursor-pointer border-t border-soft-white/10 pt-16"
              onClick={() => setActiveProjectModal(p)}
              data-cursor="VIEW"
            >
              <div className="lg:col-span-5 space-y-6 order-2 lg:order-1 lg:pr-8">
                <span className="font-mono-tech text-[11px] text-deep-earth tracking-widest uppercase block">
                  PROJECT {p.id} — {p.category}
                </span>
                <h3 className="font-editorial text-4xl md:text-5xl text-soft-white">
                  {p.name}
                </h3>
                <p className="text-sm text-soft-white/70 leading-relaxed font-light">
                  {p.description}
                </p>
                <div className="p-4 bg-soft-white/5 border border-soft-white/10 font-mono-tech text-[10px] text-arch-gray">
                  <span className="text-deep-earth block mb-1">DESIGN CONCEPT</span>
                  <p className="text-soft-white/80 italic font-editorial text-xs leading-normal">
                    "{p.details.concept}"
                  </p>
                </div>
                <div className="font-mono-tech text-[10px] text-arch-gray flex items-center space-x-4">
                  <span>GRID: {p.details.blueprintGrid}</span>
                  <span>//</span>
                  <span>{p.location}</span>
                </div>
              </div>

              <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden border border-soft-white/10 order-1 lg:order-2">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 left-4 bg-charcoal/90 px-3 py-1.5 font-mono-tech text-[10px] text-limestone border border-soft-white/10">
                  {p.coordinates}
                </div>
              </div>
            </div>
          );
        })()}

        {/* PROJECT 04: Minimal Dark Architectural Layout */}
        {(() => {
          const p = projects[3];
          return (
            <div
              key={p.id}
              className="group bg-charcoal border border-soft-white/15 p-8 md:p-12 cursor-pointer hover:border-deep-earth/50 transition-colors"
              onClick={() => setActiveProjectModal(p)}
              data-cursor="OPEN"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden border border-soft-white/10">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-110"
                  />
                </div>

                <div className="lg:col-span-6 space-y-6 lg:pl-6">
                  <div className="flex justify-between items-center font-mono-tech text-[10px] text-arch-gray border-b border-soft-white/10 pb-4">
                    <span>CIVIC MONUMENT // {p.id}</span>
                    <span>{p.coordinates}</span>
                  </div>

                  <h3 className="font-editorial text-4xl md:text-5xl text-soft-white group-hover:text-deep-earth transition-colors">
                    {p.name}
                  </h3>

                  <p className="text-sm text-soft-white/70 font-light leading-relaxed">
                    {p.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 font-mono-tech text-[10px] bg-soft-white/5 p-4 border border-soft-white/10">
                    <div>
                      <span className="text-arch-gray block">AREA</span>
                      <span className="text-soft-white">{p.details.area}</span>
                    </div>
                    <div>
                      <span className="text-arch-gray block">COMPLETION</span>
                      <span className="text-soft-white">{p.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono-tech text-[10px] text-deep-earth uppercase tracking-widest">
                      {p.category} DESIGN ARCHIVE
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-soft-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

      </div>

      {/* Project Inspector Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
          <div className="bg-charcoal border border-soft-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative space-y-8">
            {/* Close Button */}
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-6 right-6 text-soft-white/70 hover:text-soft-white p-2 border border-soft-white/20 hover:border-soft-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 border-b border-soft-white/10 pb-6">
              <div className="flex items-center space-x-3 font-mono-tech text-xs text-deep-earth">
                <span>PROJECT // {activeProjectModal.id}</span>
                <span>•</span>
                <span>{activeProjectModal.category}</span>
              </div>
              <h3 className="font-editorial text-4xl md:text-5xl text-soft-white">
                {activeProjectModal.name}
              </h3>
              <div className="flex items-center space-x-4 font-mono-tech text-xs text-arch-gray pt-2">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-deep-earth" />
                  <span>{activeProjectModal.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Tag className="w-3.5 h-3.5 text-deep-earth" />
                  <span>{activeProjectModal.coordinates}</span>
                </span>
              </div>
            </div>

            {/* Main Modal Image */}
            <div className="relative aspect-[16/9] border border-soft-white/10 overflow-hidden">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Architectural Details Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h4 className="font-mono-tech text-xs uppercase tracking-widest text-limestone">
                  SPECIFICATIONS & MATERIALS
                </h4>
                <div className="space-y-3 font-mono-tech text-xs text-arch-gray">
                  <div className="flex justify-between border-b border-soft-white/10 pb-2">
                    <span>BLUEPRINT REF</span>
                    <span className="text-soft-white">{activeProjectModal.details.blueprintGrid}</span>
                  </div>
                  <div className="flex justify-between border-b border-soft-white/10 pb-2">
                    <span>BUILD AREA</span>
                    <span className="text-soft-white">{activeProjectModal.details.area}</span>
                  </div>
                  <div className="flex justify-between border-b border-soft-white/10 pb-2">
                    <span>PRIMARY PALETTE</span>
                    <span className="text-soft-white">{activeProjectModal.details.materialLead}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-mono-tech text-xs uppercase tracking-widest text-limestone">
                  ARCHITECTURAL PHILOSOPHY
                </h4>
                <p className="font-editorial text-lg text-soft-white/90 leading-relaxed italic">
                  "{activeProjectModal.details.concept}"
                </p>
                <p className="text-xs text-soft-white/70 font-light leading-relaxed">
                  {activeProjectModal.description} ATELIER NORTH executed full conceptual design, spatial flow engineering, structural coordination, and interior detailing.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-soft-white/10 flex justify-end">
              <button
                onClick={() => setActiveProjectModal(null)}
                className="px-6 py-2.5 bg-soft-white text-charcoal font-sans text-xs uppercase tracking-widest font-semibold hover:bg-limestone transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
