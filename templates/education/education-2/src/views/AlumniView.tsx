import React from 'react';
import { Users, Award, MapPin, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockTestimonials } from '../data/mockData';

interface AlumniViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const AlumniView: React.FC<AlumniViewProps> = ({ onNavigate }) => {
  const { theme, addNotification } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Global Alumni Network
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Edunexa Alumni Association & Giving
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Over 90,000 active alumni leading multinational enterprises, scientific laboratories, civic institutions, and cultural foundations across 120 countries.
        </p>
      </div>

      {/* Hero Giving Banner */}
      <div
        style={{ backgroundColor: theme.primary }}
        className="rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Philanthropy & Endowment
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Support the Next Century of Scholars
          </h2>
          <p className="text-xs text-slate-200 leading-relaxed font-light">
            Alumni annual giving powers 100% need-met undergraduate scholarships, endowed professorships, and undergraduate laboratory fellowships.
          </p>
        </div>

        <button
          onClick={() => addNotification('success', 'Pledge Recorded', 'Thank you for your generous commitment to the Edunexa Annual Fund.')}
          style={{ backgroundColor: theme.accent }}
          className="px-6 py-3 rounded-2xl text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 shadow-lg shrink-0 flex items-center gap-2"
        >
          <Heart className="w-4 h-4 text-slate-950 fill-slate-950" />
          <span>Make an Annual Fund Gift</span>
        </button>
      </div>

      {/* Notable Alumni Profiles */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-200 pb-2">
          Featured Alumni Spotlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTestimonials.map((t) => (
            <div key={t.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <p className="text-xs text-slate-700 italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <span className="text-[11px] text-slate-500 block">{t.currentRole}, <strong>{t.company}</strong></span>
                  <span className="text-[10px] text-amber-800 font-semibold">{t.degree} ({t.gradYear})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
