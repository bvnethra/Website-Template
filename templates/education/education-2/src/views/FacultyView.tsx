import React, { useState, useMemo } from 'react';
import { Users, Search, Mail, BookOpen, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockFaculty, mockDepartments } from '../data/mockData';

interface FacultyViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const FacultyView: React.FC<FacultyViewProps> = ({ onNavigate }) => {
  const { theme } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredFaculty = useMemo(() => {
    return mockFaculty.filter((f) => {
      const matchesDept = selectedDept === 'All' || f.departmentId === selectedDept;
      const matchesQuery =
        !searchQuery.trim() ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDept && matchesQuery;
    });
  }, [searchQuery, selectedDept]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Distinguished Scholars & Chairs
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          University Faculty & Research Chairs Directory
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Over 1,420 full-time professors, MacArthur Fellows, and National Academy of Sciences members leading breakthroughs across laboratories, clinical wards, and seminars.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-7 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by professor name, research field, or specialization..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-xs"
          />
        </div>

        <div className="sm:col-span-5">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-xs"
          >
            <option value="All">All Academic Departments</option>
            {mockDepartments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((fac) => (
          <div
            key={fac.id}
            onClick={() => onNavigate('faculty-detail', fac.id)}
            className="bg-white rounded-3xl border border-slate-200 p-6 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={fac.avatar}
                  alt={fac.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                />
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold font-serif text-slate-900 group-hover:text-amber-800 transition-colors">
                    {fac.name}
                  </h3>
                  <span className="text-xs text-amber-800 font-semibold block">{fac.title}</span>
                  <span className="text-[11px] text-slate-500 block">{fac.departmentName}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {fac.bio}
              </p>

              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Research Specializations:
                </span>
                <div className="flex flex-wrap gap-1">
                  {fac.specialization.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
              <span>{fac.publications.length} Featured Papers</span>
              <span className="text-amber-800 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Faculty Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
