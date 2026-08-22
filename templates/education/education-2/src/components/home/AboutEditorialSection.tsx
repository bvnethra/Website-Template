import React from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle,
  Users,
  Compass,
  Building,
  Quote,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface AboutEditorialSectionProps {
  onNavigate: (route: string, param?: string) => void;
}

export const AboutEditorialSection: React.FC<AboutEditorialSectionProps> = ({ onNavigate }) => {
  const { theme, config } = useTheme();

  const pillars = [
    {
      title: 'Intellectual Rigor & Inquiry',
      desc: 'Socratic seminars, advanced AP/IB curricula, and student-driven primary research starting from early middle grades.',
      icon: <GraduationCap className="w-5 h-5 text-amber-800" />,
    },
    {
      title: 'Applied STEM & Innovation',
      desc: 'Hands-on cleanrooms, autonomous robotics arenas, quantum computing concepts, and AI literacy embedded across disciplines.',
      icon: <Sparkles className="w-5 h-5 text-amber-800" />,
    },
    {
      title: 'Ethical Character & Leadership',
      desc: 'Civic engagement, community honor codes, and leadership initiatives that foster empathy, integrity, and social accountability.',
      icon: <ShieldCheck className="w-5 h-5 text-amber-800" />,
    },
    {
      title: 'Global Perspective & Exchange',
      desc: 'Multilingual immersion, international model UN delegations, and global scientific symposiums connecting scholars worldwide.',
      icon: <Compass className="w-5 h-5 text-amber-800" />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Visual Layer with Head of School Quote (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative">
            {/* Primary Campus & Scholar Photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/5] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
                alt="Edunexa Scholars collaborating in the Rutherford Innovation Commons"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Rutherford Innovation Commons
                </span>
                <span className="font-serif font-bold text-lg text-white">
                  Where Scholarly Curiosity Meets Collaborative Invention
                </span>
              </div>
            </div>

            {/* Overlapping Leadership Quote Card */}
            <div className="sm:absolute -bottom-8 -right-6 sm:max-w-xs bg-white p-5 rounded-3xl shadow-xl border border-slate-200/90 text-slate-800 mt-4 sm:mt-0">
              <Quote className="w-6 h-6 text-amber-800 mb-2 opacity-60" />
              <p className="text-xs italic text-slate-700 leading-relaxed">
                "Our mission is not merely to prepare scholars for premier universities, but to ignite a lifelong commitment to truth, ethical leadership, and transformative discovery."
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-serif font-bold text-xs flex items-center justify-center">
                  EV
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Dr. Eleanor Vance, Ph.D.</span>
                  <span className="text-[10px] text-slate-500">Head of Academy & Senior Scholar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Narrative & Pillars (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 block">
              25-Year Institutional Legacy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 leading-tight">
              An Academic Community Rooted in Rigor, Purpose, and Distinction.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Founded in 2001 on the Boston waterfront, Edunexa was established to transcend conventional educational boundaries. We synthesize classical liberal arts inquiry with advanced STEM discovery, giving students the analytical mastery and moral clarity required to lead in an interconnected global society.
          </p>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1.5 hover:bg-amber-50/50 hover:border-amber-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-100/80">
                    {pillar.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footer CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate('about')}
              style={{ backgroundColor: theme.primary }}
              className="px-5 py-3 rounded-xl text-white font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
            >
              <span>Explore Our Full History & Leadership</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('faculty')}
              className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors"
            >
              Meet Our Faculty Deans & Chairs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};