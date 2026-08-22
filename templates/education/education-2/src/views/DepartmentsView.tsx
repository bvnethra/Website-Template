import React, { useState } from 'react';
import { Building, Users, BookOpen, ArrowRight, Sparkles, Search, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockDepartments, mockPrograms } from '../data/mockData';

interface DepartmentsViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const DepartmentsView: React.FC<DepartmentsViewProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDepts = mockDepartments.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Collegiate Faculties & Schools
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Academic Departments & Institutes
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Seven endowed schools and divisions encompassing 42 academic departments, offering interdisciplinary research opportunities and foundational undergraduate instruction.
        </p>
      </div>

      {/* Search Filter */}
      <div className="max-w-md relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter departments by name or school..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-xs"
        />
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDepts.map((dept) => {
          const deptPrograms = mockPrograms.filter((p) => p.departmentId === dept.id);

          return (
            <div
              key={dept.id}
              onClick={() => onNavigate('department-detail', dept.id)}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/40 px-2.5 py-0.5 rounded backdrop-blur-xs w-fit mb-1 border border-white/10">
                      {dept.school}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-white">{dept.name}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
                    <div className="flex justify-between">
                      <span>Dean / Chair:</span>
                      <span className="font-bold text-slate-800">{dept.dean}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Building / Location:</span>
                      <span className="font-semibold text-slate-700">{dept.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Research Grants:</span>
                      <span className="font-mono font-bold text-emerald-700">{dept.stats.researchGrants}</span>
                    </div>
                  </div>

                  {deptPrograms.length > 0 && (
                    <div className="space-y-1 pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Degrees Offered:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {deptPrograms.slice(0, 3).map((p) => (
                          <span
                            key={p.id}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                          >
                            {p.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {dept.stats.facultyCount} Faculty • {dept.stats.studentCount} Students
                </span>
                <span className="text-xs font-bold text-amber-800 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Explore School</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
