import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  SlidersHorizontal,
  Bookmark,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  List,
  CheckCircle,
  X,
  FileText,
  DollarSign,
  Clock,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockPrograms, mockDepartments } from '../data/mockData';
import { DegreeLevel } from '../types';

interface ProgramsViewProps {
  initialLevel?: string;
  onNavigate: (route: string, param?: string) => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({ initialLevel, onNavigate }) => {
  const {
    theme,
    config,
    openApplyModal,
    openBrochureModal,
    savedPrograms,
    toggleSaveProgram,
    compareProgramIds,
    toggleCompareProgram,
    openCompareModal,
  } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>(() => {
    if (initialLevel === 'undergraduate') return 'Undergraduate';
    if (initialLevel === 'graduate') return 'Graduate';
    if (initialLevel === 'doctoral') return 'Doctoral';
    return 'All';
  });
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'tuition-asc' | 'tuition-desc' | 'credits'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const filteredPrograms = useMemo(() => {
    return mockPrograms
      .filter((prog) => {
        const matchesLevel = selectedLevel === 'All' || prog.level === selectedLevel;
        const matchesDept = selectedDept === 'All' || prog.departmentId === selectedDept;
        const matchesQuery =
          !searchQuery.trim() ||
          prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prog.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prog.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesLevel && matchesDept && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'tuition-asc') return a.annualTuition - b.annualTuition;
        if (sortBy === 'tuition-desc') return b.annualTuition - a.annualTuition;
        if (sortBy === 'credits') return b.credits - a.credits;
        return a.name.localeCompare(b.name);
      });
  }, [searchQuery, selectedLevel, selectedDept, sortBy]);

  const compareList = mockPrograms.filter((p) => savedPrograms.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
            Academic Degree Catalog
          </span>
          <span className="text-xs text-slate-500">• 60+ Degree Programs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Explore Undergraduate, Graduate & Doctoral Programs
        </h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
            From quantum engineering to ethical jurisprudence and clinical genomics, {config.name} degrees combine foundational theory with laboratory immersion and world-class faculty mentorship.
          </p>
          {compareProgramIds.length > 0 && (
            <button
              onClick={openCompareModal}
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center gap-2 border border-amber-300 transition-colors shadow-xs shrink-0"
            >
              <span>Compare Selected Programs ({compareProgramIds.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by degree title, topic, or department..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Department Select */}
          <div className="md:col-span-4">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Academic Schools & Departments</option>
              {mockDepartments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Select */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="name">Sort: Alphabetical (A-Z)</option>
              <option value="tuition-asc">Tuition: Low to High</option>
              <option value="tuition-desc">Tuition: High to Low</option>
              <option value="credits">Credit Hours: High to Low</option>
            </select>
          </div>
        </div>

        {/* Level Filters & Layout Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/80">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {['All', 'Undergraduate', 'Graduate', 'Doctoral'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  selectedLevel === lvl
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {lvl} Degrees
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {savedPrograms.length > 0 && (
              <button
                onClick={() => setIsCompareOpen(!isCompareOpen)}
                className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-200 transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5 fill-amber-700" />
                <span>Compare Saved ({savedPrograms.length})</span>
              </button>
            )}

            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Program Comparison Tray (When Active) */}
      {isCompareOpen && compareList.length > 0 && (
        <div className="bg-amber-50/80 rounded-3xl border border-amber-300 p-6 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-amber-200 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <h3 className="text-sm font-bold text-amber-950 font-serif">
                Side-by-Side Degree Comparison ({compareList.length} Selected)
              </h3>
            </div>
            <button onClick={() => setIsCompareOpen(false)} className="text-amber-800 text-xs font-bold hover:underline">
              Close Comparison
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {compareList.map((cp) => (
              <div key={cp.id} className="bg-white rounded-2xl p-4 border border-amber-200 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-900">{cp.name}</span>
                  <button onClick={() => toggleSaveProgram(cp.id)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-slate-500">{cp.level} • {cp.duration} • {cp.credits} Credits</div>
                <div className="font-bold text-amber-800">Annual Tuition: ${cp.annualTuition.toLocaleString()}/yr</div>
                <div className="text-slate-600">Avg Starting Salary: {cp.careerProspects.averageSalary}</div>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('program-detail', cp.id)}
                    className="w-full py-1.5 bg-slate-900 text-white rounded-xl font-bold text-[11px] hover:bg-slate-800"
                  >
                    View Degree Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Program Results List / Grid */}
      {filteredPrograms.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">No matching degree programs found</h4>
          <p className="text-xs text-slate-500">Try adjusting your keyword search or degree level filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLevel('All');
              setSelectedDept('All');
            }}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => {
            const isSaved = savedPrograms.includes(prog.id);

            return (
              <div
                key={prog.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={prog.image}
                    alt={prog.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/60 text-white backdrop-blur-xs border border-white/20">
                      {prog.level}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-amber-500/90 text-slate-950 font-bold backdrop-blur-xs">
                      {prog.duration}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompareProgram(prog.id);
                      }}
                      className={`p-2 rounded-xl text-xs font-semibold shadow-sm backdrop-blur-xs transition-colors flex items-center gap-1 ${
                        compareProgramIds.includes(prog.id)
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'bg-white/80 hover:bg-white text-slate-700'
                      }`}
                      title="Compare Program"
                    >
                      <span className="text-[10px]">{compareProgramIds.includes(prog.id) ? 'Compared' : 'Compare'}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveProgram(prog.id);
                      }}
                      className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-700 shadow-sm backdrop-blur-xs transition-colors"
                      title="Bookmark Degree"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                      {prog.school}
                    </span>
                    <h3
                      onClick={() => onNavigate('program-detail', prog.id)}
                      className="text-lg font-bold font-serif text-slate-900 group-hover:text-amber-800 transition-colors cursor-pointer line-clamp-2"
                    >
                      {prog.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {prog.shortDescription}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Annual Tuition:</span>
                      <span className="font-bold text-slate-900">${prog.annualTuition.toLocaleString()}/yr</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Average Salary:</span>
                      <span className="font-bold text-emerald-700">{prog.careerProspects.averageSalary}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>Study Mode:</span>
                      <span>{prog.studyMode}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openBrochureModal(prog.id)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-2"
                  >
                    Prospectus
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openApplyModal(prog.id)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => onNavigate('program-detail', prog.id)}
                      style={{ backgroundColor: theme.primary }}
                      className="px-3.5 py-1.5 rounded-xl text-white text-xs font-bold hover:opacity-95 transition-opacity"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPrograms.map((prog) => {
            const isSaved = savedPrograms.includes(prog.id);

            return (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-amber-400 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {prog.level}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{prog.departmentName}</span>
                  </div>
                  <h3
                    onClick={() => onNavigate('program-detail', prog.id)}
                    className="text-base font-bold font-serif text-slate-900 hover:text-amber-800 cursor-pointer"
                  >
                    {prog.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-1">{prog.shortDescription}</p>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 shrink-0">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tuition Rate</span>
                    <span className="font-bold text-slate-900">${prog.annualTuition.toLocaleString()}/yr</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Duration</span>
                    <span className="font-bold text-slate-900">{prog.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Avg Salary</span>
                    <span className="font-bold text-emerald-700">{prog.careerProspects.averageSalary}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSaveProgram(prog.id)}
                      className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-amber-800"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                    </button>
                    <button
                      onClick={() => onNavigate('program-detail', prog.id)}
                      style={{ backgroundColor: theme.primary }}
                      className="px-4 py-2 rounded-xl text-white font-bold text-xs hover:opacity-95"
                    >
                      View Program
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
