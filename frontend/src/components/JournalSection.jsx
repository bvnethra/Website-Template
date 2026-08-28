import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Clock, X } from 'lucide-react';

export default function JournalSection() {
  const [activeJournalEntry, setActiveJournalEntry] = useState(null);

  const entries = [
    {
      id: 'ENTRY // 01',
      date: 'OCTOBER 2026',
      readTime: '4 MIN READ',
      title: 'LIGHT AS A BUILDING MATERIAL',
      subtitle: 'How natural light shapes emotion, movement, and space.',
      image: '/images/journal_light.jpg',
      excerpt: 'We often talk about timber and stone, yet light remains the heaviest element in architectural design. When daylight enters a space through a deliberate aperture, it transforms raw plaster into a canvas of slowness.',
      fullText: `Light is not merely illumination—it is a physical medium. In our residential work at Cedar House, the orientation of window assemblies was calibrated not to flood the interior with indiscriminate brightness, but to track the solstices. Morning sun strikes raw lime plaster walls at a low angle, revealing subtle trowel textures that vanish by mid-afternoon.

By treating light as a primary structural element, we reduce reliance on artificial lighting while creating rooms that feel alive and responsive to climate and season.`
    },
    {
      id: 'ENTRY // 02',
      date: 'JULY 2026',
      readTime: '6 MIN READ',
      title: 'DESIGNING FOR STILLNESS',
      subtitle: 'Why the most memorable spaces are not always the loudest.',
      image: '/images/journal_stillness.jpg',
      excerpt: 'In an era dominated by visual noise and instant spectacle, architecture has a unique duty to offer calm. Stillness is achieved when proportion, acoustic dampening, and honest material alignment come into harmony.',
      fullText: `Contemporary design frequently mistakes complexity for luxury. At ATELIER NORTH, our study of acoustic stillness informed the inner courtyard sequence of the Forma Courtyard project. By pairing heavy travertine monoliths with quiet water basins, urban acoustic pollution is attenuated by up to 24 decibels.

The result is an oasis of slowness where occupants naturally lower their voices, pause, and reconnect with their immediate surroundings.`
    },
    {
      id: 'ENTRY // 03',
      date: 'MAY 2026',
      readTime: '5 MIN READ',
      title: 'MATERIALS THAT AGE WELL',
      subtitle: 'Thinking beyond the first impression.',
      image: '/images/journal_materials.jpg',
      excerpt: 'Modern construction often prioritizes flawless surface perfection on handover day. We believe the true test of a building is how it looks twenty years later when rain, sun, and human hands have left their mark.',
      fullText: `A building should gain dignity as it ages. Synthetic coatings peel and degrade, whereas honest mineral materials—honed travertine, charred timber, oxidized bronze, and lime plaster—develop a deep, quiet patina.

In our selection process, we subject material samples to simulated weathering, salt spray, and UV exposure to ensure their long-term grace under environmental stress.`
    }
  ];

  return (
    <section id="journal" className="py-28 bg-charcoal text-soft-white border-t border-soft-white/10 relative">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-soft-white/15 pb-8">
          <div>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-arch-gray block mb-3">
              PUBLICATION // JOURNAL
            </span>
            <h2 className="font-editorial text-4xl md:text-6xl text-soft-white font-light">
              Notes from the studio.
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-soft-white/60 max-w-sm mt-4 md:mt-0 font-light">
            Reflections on spatial theory, natural light, and honest materiality.
          </p>
        </div>

        {/* Editorial Publication List */}
        <div className="space-y-12">
          {entries.map((entry, idx) => (
            <div
              key={entry.title}
              onClick={() => setActiveJournalEntry(entry)}
              className="group border-b border-soft-white/10 pb-12 cursor-pointer transition-all duration-300 hover:border-deep-earth"
              data-cursor="READ"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Entry Number & Meta */}
                <div className="lg:col-span-3 font-mono-tech text-xs text-arch-gray space-y-2">
                  <span className="text-deep-earth font-bold block">{entry.id}</span>
                  <div>{entry.date}</div>
                  <div className="flex items-center space-x-1 text-[10px]">
                    <Clock className="w-3 h-3 text-arch-gray" />
                    <span>{entry.readTime}</span>
                  </div>
                </div>

                {/* Main Article Title & Subtitle */}
                <div className="lg:col-span-6 space-y-3">
                  <h3 className="font-editorial text-3xl md:text-4xl text-soft-white group-hover:text-limestone transition-colors leading-tight">
                    {entry.title}
                  </h3>
                  <p className="font-sans text-sm text-soft-white/70 font-light leading-relaxed">
                    {entry.subtitle}
                  </p>
                  <p className="font-editorial italic text-xs text-arch-gray">
                    "{entry.excerpt}"
                  </p>
                </div>

                {/* Subtle Image Preview Mask */}
                <div className="lg:col-span-3 relative aspect-[4/3] overflow-hidden border border-soft-white/10 group-hover:border-soft-white/40 transition-colors">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-3 right-3 bg-charcoal/90 p-2 text-soft-white">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {activeJournalEntry && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
          <div className="bg-charcoal border border-soft-white/20 max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-10 relative space-y-6">
            <button
              onClick={() => setActiveJournalEntry(null)}
              className="absolute top-6 right-6 text-soft-white/70 hover:text-soft-white p-2 border border-soft-white/20 hover:border-soft-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-soft-white/10 pb-6">
              <div className="flex items-center space-x-3 font-mono-tech text-xs text-deep-earth">
                <span>{activeJournalEntry.id}</span>
                <span>•</span>
                <span>{activeJournalEntry.date}</span>
              </div>
              <h3 className="font-editorial text-3xl md:text-5xl text-soft-white">
                {activeJournalEntry.title}
              </h3>
              <p className="font-mono-tech text-xs text-arch-gray">
                {activeJournalEntry.subtitle}
              </p>
            </div>

            <div className="relative aspect-[16/9] border border-soft-white/10 overflow-hidden">
              <img
                src={activeJournalEntry.image}
                alt={activeJournalEntry.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 font-sans text-sm text-soft-white/80 font-light leading-relaxed whitespace-pre-line">
              {activeJournalEntry.fullText}
            </div>

            <div className="pt-6 border-t border-soft-white/10 flex justify-between items-center font-mono-tech text-xs text-arch-gray">
              <span>ATELIER NORTH JOURNAL</span>
              <button
                onClick={() => setActiveJournalEntry(null)}
                className="px-5 py-2 bg-soft-white text-charcoal font-sans text-xs uppercase tracking-widest font-semibold hover:bg-limestone transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
