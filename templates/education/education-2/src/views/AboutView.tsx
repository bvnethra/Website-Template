import React from 'react';
import { GraduationCap, ShieldCheck, Award, Users, BookOpen, Sparkles, Building } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockRankings } from '../data/mockData';

interface AboutViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const { theme, config } = useTheme();

  const timeline = [
    { year: 2001, title: 'Founding Charter on Boston Waterfront', desc: 'Edunexa was chartered as an independent academy uniting classical liberal arts and scientific inquiry.' },
    { year: 2008, title: 'Inauguration of Rutherford Innovation Commons', desc: 'Opened dedicated STEM laboratories, robotics arena, and computational physics studio.' },
    { year: 2014, title: 'International Baccalaureate (IB) World Accreditation', desc: 'Authorized as an IB World School offering the prestigious IB Diploma Programme.' },
    { year: 2019, title: '100% Need-Met Financial Aid Pledge', desc: 'Adopted comprehensive need-blind and need-met financial endowments for all deserving scholars.' },
    { year: 2026, title: 'Quantum Science & AI Literacy Pavilion', desc: 'Opened the state-of-the-art $18M interdisciplinary cleanroom and artificial intelligence laboratory.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Identity & Heritage
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          About {config.name}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Founded in {config.established}, {config.name} is dedicated to the pursuit of truth, moral inquiry, and groundbreaking scholarship in service of global society.
        </p>
      </div>

      {/* Motto & Seal Banner */}
      <div
        style={{ backgroundColor: theme.primary }}
        className="rounded-3xl p-8 sm:p-12 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
      >
        <div className="md:col-span-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Institutional Motto & Vision
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white italic">
            "{config.motto}"
          </h2>
          <p className="text-sm text-amber-200 font-serif">
            Translation: "{config.mottoTranslation}"
          </p>
          <p className="text-xs text-slate-200 leading-relaxed max-w-2xl font-light pt-2">
            For over 25 years, our scholars have pushed the boundaries of human knowledge — from deciphering molecular genetics and robotics to authoring foundational philosophical essays.
          </p>
        </div>

        <div className="md:col-span-4 bg-white/10 p-6 rounded-2xl border border-white/20 text-center space-y-2">
          <GraduationCap className="w-12 h-12 text-amber-300 mx-auto" />
          <div className="text-lg font-serif font-bold text-white">Trustee Governance</div>
          <p className="text-xs text-slate-300">Led by President Dr. Eleanor Vance and the Board of Overseers.</p>
        </div>
      </div>

      {/* Global Rankings */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-200 pb-2">
          Global Rankings & Academic Standing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockRankings.map((r, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-2xl sm:text-3xl font-black font-serif text-amber-800 block">{r.rank}</span>
              <h4 className="text-sm font-bold text-slate-900">{r.organization}</h4>
              <span className="text-xs text-slate-500 block">{r.highlight} ({r.year})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Heritage Timeline */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-200 pb-2">
          Institutional Milestones (2001 – Present)
        </h3>
        <div className="space-y-4">
          {timeline.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row gap-4 items-start">
              <span className="font-mono text-lg font-black text-amber-800 shrink-0 sm:w-20">{item.year}</span>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 font-serif">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
