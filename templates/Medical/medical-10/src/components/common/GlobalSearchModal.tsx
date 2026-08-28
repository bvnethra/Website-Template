import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, User, Activity, BookOpen, Stethoscope, ArrowRight } from 'lucide-react';
import { DOCTORS } from '../../data/doctors';
import { DEPARTMENTS } from '../../data/departments';
import { SERVICES } from '../../data/services';
import { BLOG_ARTICLES } from '../../data/blog';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingDoctors = trimmed
    ? DOCTORS.filter(
        d =>
          d.name.toLowerCase().includes(trimmed) ||
          d.specialty.toLowerCase().includes(trimmed) ||
          d.biography.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const matchingDepartments = trimmed
    ? DEPARTMENTS.filter(
        dept =>
          dept.name.toLowerCase().includes(trimmed) ||
          dept.shortDescription.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const matchingServices = trimmed
    ? SERVICES.filter(
        s =>
          s.title.toLowerCase().includes(trimmed) ||
          s.shortDescription.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const matchingArticles = trimmed
    ? BLOG_ARTICLES.filter(
        a =>
          a.title.toLowerCase().includes(trimmed) ||
          a.category.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  const hasResults =
    matchingDoctors.length > 0 ||
    matchingDepartments.length > 0 ||
    matchingServices.length > 0 ||
    matchingArticles.length > 0;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search doctors, departments, services, health articles..."
            className="w-full bg-transparent text-slate-900 font-medium placeholder-slate-400 focus:outline-none text-base"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-slate-200 text-slate-600 hover:bg-slate-300 font-semibold px-2.5 py-1 rounded-lg transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!query && (
            <div className="text-center py-8 text-slate-400 text-sm">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-30 text-primary" />
              <p>Type to search across the entire CareNova network...</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Cardiology', 'Dr. Sarah', 'Pediatrics', 'Migraines', 'BMI Calculator'].map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(chip)}
                    className="text-xs bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-primary px-3 py-1.5 rounded-full transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="text-center py-8 text-slate-500">
              <p className="font-semibold text-slate-700">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try checking spelling or search a different medical term.</p>
            </div>
          )}

          {matchingDoctors.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-primary" /> Doctors
              </h4>
              <div className="space-y-2">
                {matchingDoctors.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => handleSelect(`/doctors/${doc.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-blue-50/70 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={doc.avatar} alt={doc.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 text-sm group-hover:text-primary">{doc.name}</p>
                        <p className="text-xs text-slate-500">{doc.title}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingDepartments.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-secondary" /> Departments
              </h4>
              <div className="space-y-2">
                {matchingDepartments.map(dept => (
                  <button
                    key={dept.id}
                    onClick={() => handleSelect(`/departments/${dept.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-teal-50/70 transition-colors text-left group"
                  >
                    <div>
                      <p className="font-bold text-slate-900 text-sm group-hover:text-secondary">{dept.name}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{dept.shortDescription}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingServices.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-500" /> Clinical Services
              </h4>
              <div className="space-y-2">
                {matchingServices.map(srv => (
                  <button
                    key={srv.id}
                    onClick={() => handleSelect(`/services/${srv.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-amber-50/70 transition-colors text-left group"
                  >
                    <div>
                      <p className="font-bold text-slate-900 text-sm group-hover:text-amber-600">{srv.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{srv.shortDescription}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingArticles.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-500" /> Health Articles
              </h4>
              <div className="space-y-2">
                {matchingArticles.map(art => (
                  <button
                    key={art.id}
                    onClick={() => handleSelect(`/health-library/${art.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-purple-50/70 transition-colors text-left group"
                  >
                    <div>
                      <p className="font-bold text-slate-900 text-sm group-hover:text-purple-600">{art.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{art.excerpt}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
