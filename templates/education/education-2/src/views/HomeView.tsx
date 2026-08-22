import React, { useState } from 'react';
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  BookOpen,
  Building,
  Users,
  Compass,
  Award,
  Calendar,
  FileText,
  ShieldCheck,
  TrendingUp,
  Search,
  Bookmark,
  CheckCircle,
  ExternalLink,
  Layers,
  Scale,
  Microscope,
  Cpu,
  Globe,
  DollarSign,
  ChevronRight,
  Clock,
  MapPin,
  Check,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  mockPrograms,
  mockDepartments,
  mockFaculty,
  mockResearchProjects,
  mockEvents,
  mockNews,
  mockTestimonials,
  mockRankings,
} from '../data/mockData';

// Home Modular Subsections
import { HeroSection } from '../components/home/HeroSection';
import { QuickAccessHub } from '../components/home/QuickAccessHub';
import { AboutEditorialSection } from '../components/home/AboutEditorialSection';
import { MetricsSection } from '../components/home/MetricsSection';

interface HomeViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const {
    theme,
    config,
    openApplyModal,
    openBrochureModal,
    openProspectusModal,
    openTourModal,
    openTuitionCalc,
    openSearch,
    savedPrograms,
    toggleSaveProgram,
    compareProgramIds,
    toggleCompareProgram,
    openCompareModal,
  } = useTheme();

  const [activeTrackFilter, setActiveTrackFilter] = useState('All');

  // Filter programs by track / level
  const filteredPrograms = mockPrograms.filter((p) => {
    if (activeTrackFilter === 'All') return true;
    if (activeTrackFilter === 'STEM') return p.departmentName?.toLowerCase().includes('computer') || p.departmentName?.toLowerCase().includes('quantum') || p.name.toLowerCase().includes('robotics') || p.name.toLowerCase().includes('data');
    if (activeTrackFilter === 'Undergraduate') return p.level === 'Undergraduate';
    if (activeTrackFilter === 'Graduate') return p.level === 'Graduate' || p.level === 'Doctoral';
    if (activeTrackFilter === 'Honors & IB') return p.level === 'Certificate' || p.featured || p.name.toLowerCase().includes('honors');
    return true;
  });

  const featuredResearch = mockResearchProjects.slice(0, 3);
  const upcomingEvents = mockEvents.slice(0, 3);
  const latestNews = mockNews.slice(0, 3);

  return (
    <div className="space-y-24 pb-20 bg-white">
      {/* 1. Hero Landmark Section with Dynamic Theme & Fast Filters */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Quick Access Utility Hub (Overlapping Floating Cards) */}
      <QuickAccessHub onNavigate={onNavigate} />

      {/* 3. About Editorial & 25-Year Institutional Legacy */}
      <AboutEditorialSection onNavigate={onNavigate} />

      {/* 4. Flagship Academic Programs & Interactive Degrees Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Rigorous Curricula</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-950">
              Academic Degrees & Scholarly Pathways
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Explore 25+ accredited degree options spanning applied engineering, natural sciences, international governance, and creative arts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {compareProgramIds.length > 0 && (
              <button
                onClick={openCompareModal}
                className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center gap-2 border border-amber-300 transition-colors shadow-xs"
              >
                <Layers className="w-4 h-4 text-amber-800" />
                <span>Compare Selected ({compareProgramIds.length})</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('programs')}
              style={{ backgroundColor: theme.primary }}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
            >
              <span>Full Degree Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Track Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-slate-100 pb-4">
          {['All', 'Undergraduate', 'Graduate', 'STEM', 'Honors & IB'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTrackFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTrackFilter === tab
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab === 'All' ? 'All Degrees & Tracks' : tab}
            </button>
          ))}
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.slice(0, 6).map((prog) => {
            const isSaved = savedPrograms.includes(prog.id);
            const isCompared = compareProgramIds.includes(prog.id);

            return (
              <div
                key={prog.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60 font-mono">
                        {prog.level}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">
                        {prog.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompareProgram(prog.id);
                        }}
                        className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                          isCompared
                            ? 'bg-amber-100 text-amber-900 font-bold'
                            : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                        }`}
                        title="Compare program"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span className="text-[10px]">{isCompared ? 'Added' : 'Compare'}</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveProgram(prog.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                        title={isSaved ? 'Remove bookmark' : 'Bookmark program'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Title & School */}
                  <div className="space-y-1">
                    <h3
                      onClick={() => onNavigate('program-detail', prog.id)}
                      className="text-base sm:text-lg font-bold font-serif text-slate-900 group-hover:text-amber-800 transition-colors cursor-pointer line-clamp-1"
                    >
                      {prog.name}
                    </h3>
                    <span className="text-xs text-slate-500 block font-medium">
                      {prog.departmentName}
                    </span>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prog.shortDescription}
                  </p>

                  {/* Program Snapshot Metrics */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Annual Tuition:</span>
                      <span className="font-mono font-bold text-slate-900">${prog.annualTuition.toLocaleString()}/yr</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Placement Rate:</span>
                      <span className="font-bold text-emerald-700">{prog.careerProspects.placementRate}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Study Mode:</span>
                      <span className="font-medium text-slate-700">{prog.studyMode}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openBrochureModal(prog.id)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 py-1.5 px-2 flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Curriculum</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openApplyModal(prog.id)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-white text-slate-800 text-xs font-bold transition-colors"
                    >
                      Quick Apply
                    </button>
                    <button
                      onClick={() => onNavigate('program-detail', prog.id)}
                      style={{ backgroundColor: theme.primary }}
                      className="px-3.5 py-1.5 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Validated Institutional Metrics & Impact */}
      <MetricsSection />

      {/* 6. Breakthrough Research Labs & External Innovation Grants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Microscope className="w-3.5 h-3.5" />
              <span>Scientific Discovery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-950">
              Endowed Labs & Breakthrough Research
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Collaborative interdisciplinary investigations funded by the National Science Foundation, DARPA, and philanthropic endowments.
            </p>
          </div>

          <button
            onClick={() => onNavigate('research')}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1.5 group"
          >
            <span>Explore All Research Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredResearch.map((res) => (
            <div
              key={res.id}
              onClick={() => onNavigate('research')}
              className="bg-slate-900 text-white rounded-3xl p-6 space-y-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group border border-slate-800"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    {res.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{res.grantAmount}</span>
                </div>

                <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {res.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <div className="text-slate-400">
                  Lead Scholar: <span className="text-white font-medium">{res.leadInvestigator}</span>
                </div>
                <div className="text-slate-400">
                  Funding Body: <span className="text-amber-300 font-medium">{res.fundingBody}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Academic Schools & Colleges Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Building className="w-3.5 h-3.5" />
              <span>Centres of Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-950">
              Academic Schools & Departments
            </h2>
          </div>
          <button
            onClick={() => onNavigate('departments')}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 group"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockDepartments.slice(0, 4).map((dept) => (
            <div
              key={dept.id}
              onClick={() => onNavigate('department-detail', dept.id)}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                  <span className="text-[11px] font-bold text-white bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20">
                    {dept.school}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold font-serif text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{dept.stats.studentCount} Scholars</span>
                  <span className="font-semibold text-amber-800">{dept.stats.researchGrants}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Campus Events Calendar & Gazette News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Events Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                Academic & Campus Life
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">Upcoming Academy Events</h3>
            </div>
            <button
              onClick={() => onNavigate('events')}
              className="text-xs font-bold text-amber-800 hover:underline"
            >
              View Calendar
            </button>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => onNavigate('event-detail', evt.id)}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex gap-4 items-start group"
              >
                <div
                  style={{ backgroundColor: theme.primary }}
                  className="w-16 h-16 rounded-2xl text-white flex flex-col items-center justify-center shrink-0 shadow-sm"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    {evt.date.split(' ')[0]}
                  </span>
                  <span className="text-base font-black font-serif">{evt.date.split(' ')[1]?.replace(',', '') || '22'}</span>
                </div>

                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {evt.category}
                  </span>
                  <h4 className="text-sm font-bold font-serif text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{evt.location} • {evt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                Gazette & Research Press
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">Academy News & Dispatches</h3>
            </div>
            <button
              onClick={() => onNavigate('news')}
              className="text-xs font-bold text-amber-800 hover:underline"
            >
              All Articles
            </button>
          </div>

          <div className="space-y-4">
            {latestNews.map((art) => (
              <div
                key={art.id}
                onClick={() => onNavigate('news-detail', art.id)}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-amber-800">{art.category}</span>
                  <span>{art.publishDate} • {art.readTime}</span>
                </div>
                <h4 className="text-sm font-bold font-serif text-slate-900 group-hover:text-amber-800 transition-colors">
                  {art.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Alumni Success & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 block">
            The Edunexa Legacy
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
            Voices of Scholars, Alumni & Leaders
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Over 25 years of graduates leading transformative scientific breakthroughs, global tech initiatives, health systems, and civic enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTestimonials.map((test) => (
            <div
              key={test.id}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{test.quote}"
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{test.name}</h4>
                  <span className="text-[11px] text-slate-500 block">
                    {test.currentRole}, <strong className="text-slate-700">{test.company}</strong>
                  </span>
                  <span className="text-[10px] text-amber-800 font-semibold">{test.degree} ({test.gradYear})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Admissions Call-To-Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div
          style={{ backgroundColor: theme.primary }}
          className="rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-3 max-w-xl text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admissions Cycle 2026–2027</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-white leading-tight">
              Begin Your Journey with Edunexa
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              Early Action and Regular Admissions are currently open. Explore generous need-met aid packages, schedule an individualized campus tour, or download our 64-page guide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0 relative z-10">
            <button
              onClick={() => openApplyModal()}
              style={{ backgroundColor: theme.accent }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Start Application</span>
            </button>
            <button
              onClick={openTourModal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Book Campus Visit</span>
            </button>
            <button
              onClick={openProspectusModal}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white font-semibold text-xs border border-white/10 transition-all"
            >
              Prospectus PDF
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
