import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  GitFork, 
  Handshake, 
  TrendingUp, 
  Star,
  Users,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Layers,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onStartLearning: (searchQuery?: string) => void;
  onExploreCourses: () => void;
  onOpenLearningPath: () => void;
  onOpenCommunity: () => void;
  onTrackProgress: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onExploreCourses,
  onOpenLearningPath,
  onOpenCommunity,
  onTrackProgress,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartLearning(searchQuery);
  };

  const actionCards = [
    {
      id: 'explore-courses',
      title: 'EXPLORE COURSES',
      icon: (
        // Custom 3-book icon matching the orange graphic with exact brand orange
        <div className="flex items-center justify-center gap-1">
          <div className="w-2.5 h-9 bg-[#fa5a1e] rounded-sm transform -rotate-6 shadow-sm" />
          <div className="w-2.5 h-9 bg-[#fa5a1e] rounded-sm shadow-sm" />
          <div className="w-2.5 h-9 bg-[#fa5a1e] rounded-sm transform rotate-6 shadow-sm" />
        </div>
      ),
      action: onExploreCourses,
      badge: '500+ Courses'
    },
    {
      id: 'my-learning-path',
      title: 'MY LEARNING PATH',
      icon: (
        // Connected network / nodes with star matching picture
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-[#fa5a1e] flex items-center justify-center text-[8px] text-white font-bold">★</div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#fa5a1e] absolute bottom-0 left-0" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#fa5a1e] absolute bottom-0 right-1" />
          <svg className="w-9 h-9 text-[#fa5a1e] stroke-current stroke-2 fill-none" viewBox="0 0 36 36">
            <line x1="28" y1="8" x2="8" y2="28" stroke="currentColor" strokeWidth="2.5" />
            <line x1="28" y1="8" x2="28" y2="28" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        </div>
      ),
      action: onOpenLearningPath,
      badge: 'Career Tracks'
    },
    {
      id: 'connect-community',
      title: 'CONNECT COMMUNITY',
      icon: (
        // Handshake with gear matching picture with exact brand orange
        <div className="relative w-10 h-10 flex items-center justify-center text-[#fa5a1e]">
          <Handshake className="w-8 h-8 text-[#fa5a1e] stroke-[2.2]" />
          <div className="absolute -top-1 right-0 w-3 h-3 text-[#fa5a1e]">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </div>
        </div>
      ),
      action: onOpenCommunity,
      badge: '18k+ Active'
    },
    {
      id: 'track-progress',
      title: 'TRACK PROGRESS',
      icon: (
        // Bar chart with ascending arrow matching picture with exact brand orange
        <div className="relative w-10 h-10 flex items-end justify-center gap-1.5 pb-1">
          <div className="w-2.5 h-4 bg-[#fa5a1e]/80 rounded-sm" />
          <div className="w-2.5 h-6 bg-[#fa5a1e] rounded-sm" />
          <div className="w-2.5 h-8 bg-[#fa5a1e] rounded-sm" />
          <div className="absolute top-0 right-0 text-[#fa5a1e]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17l9.2-9.2M17 17V7H7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      ),
      action: onTrackProgress,
      badge: 'Analytics'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-white">
      
      {/* Main Hero Banner with Teal Gradient on Left & Students Collaborative Photo on Right */}
      <div className="relative pt-6 pb-20 md:pb-28 bg-gradient-to-r from-[#c8f5e9] via-[#e2f9f2] to-[#ffffff] border-b border-slate-100">
        
        {/* Soft decorative background glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 pt-4 sm:pt-8 text-left z-10">
              
              {/* Main Headline (All caps bold dark navy font as in picture) */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0e2942] font-display uppercase leading-[1.12]"
              >
                EMPOWER YOUR FUTURE WITH EDUVORA
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 font-medium max-w-lg leading-relaxed"
              >
                Expert-led courses and personalized learning paths for your career journey.
              </motion.p>

              {/* Integrated Search Box + START LEARNING Button (Exact style from screenshot) */}
              <motion.form
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={handleSearchSubmit}
                className="mt-8 p-1.5 sm:p-2 bg-white rounded-xl sm:rounded-2xl shadow-lg shadow-teal-900/5 border border-slate-200/90 flex items-center max-w-xl group focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100 transition-all"
              >
                <div className="pl-3 pr-2 text-slate-400">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
                </div>
                
                <input
                  id="hero-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search skills, software, or topics..."
                  className="flex-1 bg-transparent border-none text-xs sm:text-sm font-normal text-slate-800 placeholder-slate-400 focus:outline-none py-2 px-1"
                />

                <button
                  id="hero-start-learning-btn"
                  type="submit"
                  className="bg-[#fa5a1e] hover:bg-[#e04812] active:bg-[#c93f0d] text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow-md shadow-orange-500/25 transition-all duration-150 shrink-0 flex items-center gap-1.5"
                >
                  <span>START LEARNING</span>
                </button>
              </motion.form>

              {/* Quick Tags underneath search */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Popular:</span>
                {['Data Science', 'Python AI', 'Growth Marketing', 'React 19'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      onStartLearning(tag);
                    }}
                    className="px-2.5 py-1 rounded-full bg-white/70 hover:bg-white text-slate-600 hover:text-teal-700 text-[11px] font-medium border border-slate-200/60 shadow-2xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

            </div>

            {/* Right Column: Collaborative Students Image */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/60 border-4 border-white/80"
              >
                {/* Image of diverse collaborative students working around laptops */}
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80"
                  alt="Students collaborating and learning with Eduvora"
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] sm:h-[380px] object-cover object-center"
                />

                {/* Gradient overlay on bottom and sides */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />

                {/* Floating Interactive Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">140,000+ Graduates</div>
                    <div className="text-[10px] text-slate-500">Working at top tech firms</div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-slate-100 flex items-center gap-1 text-xs font-bold text-slate-800">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>4.9 / 5.0 Rating</span>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>

      {/* 4 Large Action Cards (Prominently positioned below hero banner as in screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {actionCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              onClick={card.action}
              id={`hero-card-${card.id}`}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl shadow-slate-200/70 border border-slate-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center group"
            >
              {/* Orange Icon Container */}
              <div className="h-14 flex items-center justify-center group-hover:scale-110 transition-transform">
                {card.icon}
              </div>

              {/* Card Title (Bold Uppercase Dark Font) */}
              <h3 className="mt-3 text-xs sm:text-sm font-extrabold tracking-wide text-slate-900 group-hover:text-orange-600 transition-colors uppercase">
                {card.title}
              </h3>

              {/* Sub-label */}
              <span className="mt-1 text-[11px] font-medium text-slate-400 group-hover:text-slate-600">
                {card.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
