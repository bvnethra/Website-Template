import React, { useState } from 'react';
import { Building, MapPin, Sparkles, Compass, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockFacilities } from '../data/mockData';

interface FacilitiesViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const FacilitiesView: React.FC<FacilitiesViewProps> = ({ onNavigate }) => {
  const { theme, openTourModal } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Library & Archives', 'Laboratories & Supercomputing', 'Arts & Performance', 'Athletics & Recreation', 'Student Life'];

  const filteredFacilities = mockFacilities.filter(
    (f) => selectedCategory === 'All' || f.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Campus Infrastructure
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          University Facilities, Libraries & Laboratories
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          From the 4.2-million volume Alden Rare Book Library to the Edunexa Quantum Cleanroom and riverfront boathouse, explore our 185-acre collegiate campus.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFacilities.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative h-52 overflow-hidden bg-slate-100">
              <img
                src={fac.image}
                alt={fac.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/40 px-2.5 py-0.5 rounded backdrop-blur-xs w-fit mb-1 border border-white/10">
                  {fac.category}
                </span>
                <h3 className="text-xl font-bold font-serif text-white">{fac.name}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">{fac.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{fac.location}</span>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Key Amenities:
                </span>
                <div className="flex flex-wrap gap-1">
                  {fac.amenities.map((am, i) => (
                    <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-700">{fac.leedCertification || 'Historical Landmark'}</span>
              <button
                onClick={openTourModal}
                className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1"
              >
                <span>Virtual View</span>
                <Compass className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
