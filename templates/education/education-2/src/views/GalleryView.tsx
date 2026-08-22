import React, { useState } from 'react';
import { Image, Compass, Sparkles, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface GalleryViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onNavigate }) => {
  const { theme, openTourModal } = useTheme();
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const photos = [
    { title: 'The Great Quad & Old Main Bell Tower', category: 'Campus Grounds', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200' },
    { title: 'Alden Memorial Library Grand Hall', category: 'Libraries', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200' },
    { title: 'Quantum Cleanroom & Supercomputing Core', category: 'Laboratories', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200' },
    { title: 'Spring Commencement on Harvard Bridge', category: 'Traditions', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200' },
    { title: 'Vance Interdisciplinary Engineering Center', category: 'Architecture', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200' },
    { title: 'Charles River Rowing Regatta Boathouse', category: 'Athletics', url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&q=80&w=1200' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Collegiate Imagery
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Edunexa Campus Photography & Visual Archives
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Gothic stone arches, state-of-the-art cleanrooms, riverfront regattas, and intellectual life across our 185-acre historic Cambridge sanctuary.
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((p, idx) => (
          <div
            key={idx}
            onClick={() => setActivePhoto(p.url)}
            className="group relative rounded-3xl overflow-hidden aspect-4/3 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200"
          >
            <img
              src={p.url}
              alt={p.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">{p.category}</span>
              <h3 className="text-sm font-bold font-serif">{p.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activePhoto}
            alt="Enlarged Campus View"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
