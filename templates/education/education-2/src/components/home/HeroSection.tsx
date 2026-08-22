import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Compass,
  Search,
  CheckCircle,
  Play,
  Award,
  BookOpen,
  Calendar,
  Users,
  Shield,
  Layers,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeroSectionProps {
  onNavigate: (route: string, param?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { theme, config, openApplyModal, openTourModal, openProspectusModal, openSearch } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const filterChips = [
    { label: 'All Programs', filter: 'All', route: 'programs' },
    { label: 'STEM & AI Labs', filter: 'STEM', route: 'programs', param: 'STEM' },
    { label: 'High School Honors & AP', filter: 'High School', route: 'programs', param: 'High School' },
    { label: 'IB Diploma Programme', filter: 'IB', route: 'programs', param: 'International Baccalaureate' },
    { label: 'Fine Arts & Music', filter: 'Arts', route: 'programs', param: 'Arts' },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[640px] lg:min-h-[720px] flex items-center border-b border-slate-800">
      {/* Background Graphic & High-Res Campus Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000"
          alt="Edunexa Campus Quadrangle and Innovation Pavilion"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Dynamic Theme Gradient Overlay */}
        <div
          style={{
            background: `linear-gradient(135deg, ${theme.primary}f0 0%, rgba(15, 23, 42, 0.94) 55%, rgba(2, 6, 23, 0.98) 100%)`,
          }}
          className="absolute inset-0"
        />
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Main Editorial Narrative (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-semibold backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Admissions Open for 2026–2027 • Boston Waterfront Campus</span>
            </div>

            {/* Editorial Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.12]">
              Pioneering Intellect, <span className="italic text-amber-300">Inspiring Character,</span> Shaping Global Leaders.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light max-w-2xl">
              Edunexa brings together world-renowned scholars, advanced quantum & robotics laboratories, and a rich arts heritage to empower learners from Kindergarten to Grade 12 and post-graduate fellowships.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openApplyModal()}
                style={{ backgroundColor: theme.accent }}
                className="px-6 py-3.5 rounded-2xl text-slate-950 font-bold text-sm hover:brightness-110 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Apply for 2026–2027</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={openTourModal}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-300" />
                <span>Interactive Campus Tour</span>
              </button>

              <button
                onClick={openProspectusModal}
                className="px-5 py-3.5 rounded-2xl text-slate-200 hover:text-white font-semibold text-sm transition-colors flex items-center gap-1.5"
              >
                <span>Download Prospectus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Fast Search & Program Filter Pill Bar */}
            <div className="pt-4 space-y-3">
              <div
                onClick={openSearch}
                className="cursor-pointer px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/20 border border-white/20 flex items-center justify-between text-xs sm:text-sm text-slate-300 backdrop-blur-md transition-all shadow-inner max-w-xl group"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span>Search 25+ degrees, labs, faculty chairs, admissions deadlines...</span>
                </div>
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-black/40 text-slate-300 rounded border border-white/20">
                  ⌘K
                </kbd>
              </div>

              {/* Quick filter chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mr-1">
                  Explore Tracks:
                </span>
                {filterChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedFilter(chip.filter);
                      onNavigate(chip.route, chip.param);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      selectedFilter === chip.filter
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'bg-white/10 text-slate-200 hover:bg-white/20'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Layered Visual & Institutional Standing Card (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              {/* Main glass card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl text-white space-y-5 shadow-2xl relative overflow-hidden">
                {/* Subtle header inside card */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-serif font-bold text-xs">
                      EDX
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                        Institutional Benchmarks
                      </span>
                      <span className="text-[11px] text-slate-300">National Academic Standing</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    Tier 1 Ranking
                  </span>
                </div>

                {/* 2x2 Metric Matrix */}
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-black font-serif text-white block">
                      {config.employmentRate}
                    </span>
                    <span className="text-xs text-slate-300">Top-Tier University Matriculation</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-black font-serif text-amber-300 block">
                      7:1
                    </span>
                    <span className="text-xs text-slate-300">Student to Faculty Ratio</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-black font-serif text-white block">
                      40+
                    </span>
                    <span className="text-xs text-slate-300">AP, IB & Honors Courses</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-black font-serif text-amber-300 block">
                      $12M+
                    </span>
                    <span className="text-xs text-slate-300">Annual Scholarships Awarded</span>
                  </div>
                </div>

                {/* Video Experience Preview Box */}
                <div
                  onClick={() => setIsVideoModalOpen(true)}
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Watch "A Day at Edunexa"</span>
                      <span className="text-[10px] text-slate-300">2-Minute Campus Documentary</span>
                    </div>
                  </div>
                  <span className="text-xs text-amber-300 font-bold group-hover:underline">Play</span>
                </div>
              </div>

              {/* Floating Accent Badge: Next Open House */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 p-3 sm:p-4 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-xl backdrop-blur-md flex items-center gap-3 max-w-xs text-left">
                <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    Next Open House
                  </span>
                  <span className="text-xs font-bold text-white block">Saturday, 10:00 AM EST</span>
                  <span className="text-[10px] text-slate-400">Main Campus & Virtual Stream</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Simulation */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <span className="text-sm font-bold text-white font-serif">Edunexa — Campus Life & Academic Immersion</span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold"
              >
                Close (ESC)
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
                alt="Students collaborating in cleanroom laboratory"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl animate-pulse">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <h3 className="font-serif font-bold text-xl">Edunexa: The Pursuit of Truth & Innovation</h3>
                <p className="text-xs text-slate-300 max-w-md">
                  Experience our 120-acre waterfront campus, student quantum projects, robotics arenas, and arts conservatory in action.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};