import React from 'react';

export default function NumbersSection() {
  const stats = [
    {
      number: '48',
      label: 'Spaces completed',
      detail: 'Residential, cultural, hospitality, and civic projects.'
    },
    {
      number: '12',
      label: 'Years of practice',
      detail: 'A decade of refined architectural craftsmanship.'
    },
    {
      number: '9',
      label: 'Countries explored',
      detail: 'Global spatial studies shaping localized contexts.'
    },
    {
      number: '26',
      label: 'Collaborators',
      detail: 'Artisans, engineers, stonemasons, and lighting specialists.'
    }
  ];

  return (
    <section className="py-24 bg-charcoal text-soft-white border-t border-soft-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Minimal Architectural Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-soft-white/15 border border-soft-white/15">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="bg-charcoal p-8 md:p-12 space-y-4 hover:bg-soft-white/5 transition-colors group"
            >
              <div className="font-mono-tech text-[10px] text-arch-gray flex justify-between items-center border-b border-soft-white/10 pb-3">
                <span>METRIC // 0{idx + 1}</span>
                <span className="w-1.5 h-1.5 bg-deep-earth rounded-full" />
              </div>

              {/* Large Metric Number */}
              <div className="font-editorial text-7xl md:text-8xl text-soft-white font-light group-hover:text-limestone transition-colors leading-none tracking-tighter">
                {stat.number}
              </div>

              <div className="space-y-1 pt-2">
                <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-soft-white">
                  {stat.label}
                </h3>
                <p className="font-mono-tech text-[11px] text-arch-gray font-light">
                  {stat.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
