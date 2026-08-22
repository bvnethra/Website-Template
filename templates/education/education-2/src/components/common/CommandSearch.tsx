import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Users, Calendar, Building, Sparkles, ArrowRight, FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import {
  mockPrograms,
  mockFaculty,
  mockDepartments,
  mockEvents,
  mockNews,
  mockFacilities,
} from '../../data/mockData';

interface CommandSearchProps {
  onNavigate: (route: string, param?: string) => void;
}

export const CommandSearch: React.FC<CommandSearchProps> = ({ onNavigate }) => {
  const { isSearchOpen, closeSearch, theme } = useTheme();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'programs' | 'faculty' | 'departments' | 'events' | 'news'>('all');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const results: Array<{
      type: 'program' | 'faculty' | 'department' | 'event' | 'news' | 'facility';
      title: string;
      subtitle: string;
      route: string;
      param?: string;
      badge: string;
    }> = [];

    // Search Programs
    if (filterType === 'all' || filterType === 'programs') {
      mockPrograms.forEach((p) => {
        if (
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.departmentName.toLowerCase().includes(q) ||
          p.level.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'program',
            title: p.name,
            subtitle: `${p.level} • ${p.departmentName} • ${p.duration}`,
            route: 'program-detail',
            param: p.id,
            badge: p.level,
          });
        }
      });
    }

    // Search Faculty
    if (filterType === 'all' || filterType === 'faculty') {
      mockFaculty.forEach((f) => {
        if (
          f.name.toLowerCase().includes(q) ||
          f.title.toLowerCase().includes(q) ||
          f.departmentName.toLowerCase().includes(q) ||
          f.specialization.some((s) => s.toLowerCase().includes(q))
        ) {
          results.push({
            type: 'faculty',
            title: f.name,
            subtitle: `${f.title} • ${f.departmentName}`,
            route: 'faculty-detail',
            param: f.id,
            badge: 'Faculty',
          });
        }
      });
    }

    // Search Departments
    if (filterType === 'all' || filterType === 'departments') {
      mockDepartments.forEach((d) => {
        if (
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.school.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'department',
            title: d.name,
            subtitle: `${d.school} • Dean: ${d.dean}`,
            route: 'department-detail',
            param: d.id,
            badge: 'Department',
          });
        }
      });
    }

    // Search Events
    if (filterType === 'all' || filterType === 'events') {
      mockEvents.forEach((e) => {
        if (
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'event',
            title: e.title,
            subtitle: `${e.date} • ${e.location}`,
            route: 'event-detail',
            param: e.id,
            badge: e.category,
          });
        }
      });
    }

    // Search News
    if (filterType === 'all' || filterType === 'news') {
      mockNews.forEach((n) => {
        if (
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
        ) {
          results.push({
            type: 'news',
            title: n.title,
            subtitle: `${n.publishDate} • ${n.readTime}`,
            route: 'news-detail',
            param: n.id,
            badge: 'News',
          });
        }
      });
    }

    // Search Facilities
    if (filterType === 'all') {
      mockFacilities.forEach((fac) => {
        if (fac.name.toLowerCase().includes(q) || fac.description.toLowerCase().includes(q)) {
          results.push({
            type: 'facility',
            title: fac.name,
            subtitle: `${fac.category} • ${fac.location}`,
            route: 'facilities',
            badge: fac.category,
          });
        }
      });
    }

    return results.slice(0, 12);
  }, [query, filterType]);

  if (!isSearchOpen) return null;

  const handleSelect = (route: string, param?: string) => {
    closeSearch();
    setQuery('');
    onNavigate(route, param);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'program':
        return <BookOpen className="w-4 h-4 text-amber-600" />;
      case 'faculty':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'department':
        return <Building className="w-4 h-4 text-purple-600" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-emerald-600" />;
      case 'news':
        return <FileText className="w-4 h-4 text-rose-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search degrees, professors, events, labs, or campus facilities..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-medium focus:outline-hidden"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-200/80 rounded-lg"
          >
            Esc
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
          {(['all', 'programs', 'faculty', 'departments', 'events', 'news'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1 rounded-full font-semibold capitalize whitespace-nowrap transition-colors ${
                filterType === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100">
          {query.trim() === '' ? (
            <div className="p-8 text-center space-y-3 text-slate-500">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto opacity-70" />
              <p className="text-sm font-semibold text-slate-700">Quick Institutional Search</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Type any keyword such as "Computer Science", "Dr. Chen", "Quantum", "Tuition", or "Commencement".
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
                <button
                  onClick={() => setQuery('Computer Science')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                >
                  Computer Science
                </button>
                <button
                  onClick={() => setQuery('Quantum')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                >
                  Quantum Labs
                </button>
                <button
                  onClick={() => setQuery('Scholarships')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                >
                  Scholarships
                </button>
                <button
                  onClick={() => setQuery('Al-Mansoor')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                >
                  Dr. Al-Mansoor
                </button>
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <p className="text-sm font-semibold text-slate-700">No matching university resources found</p>
              <p className="text-xs text-slate-400">
                Try searching for broader terms or explore the academic programs directory.
              </p>
            </div>
          ) : (
            filteredResults.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(item.route, item.param)}
                className="w-full p-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between text-left group transition-colors"
              >
                <div className="flex items-center gap-3 pr-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-amber-100/70 flex items-center justify-center shrink-0 transition-colors">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase">
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 line-clamp-1 block mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-700 group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or Tab</span>
          <span className="font-mono">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
