import React from 'react';
import { Briefcase, TrendingUp, Building, Award, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface PlacementsViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const PlacementsView: React.FC<PlacementsViewProps> = ({ onNavigate }) => {
  const { theme, config } = useTheme();

  const industries = [
    { name: 'Software, AI & Deep Tech', pct: '32%', companies: ['Google DeepMind', 'Microsoft Quantum', 'NVIDIA', 'Apple'] },
    { name: 'Biotech & Health Systems', pct: '26%', companies: ['Dana-Farber', 'Moderna', 'Pfizer', 'Mass General'] },
    { name: 'Finance, Private Equity & Consulting', pct: '22%', companies: ['Goldman Sachs', 'McKinsey & Co', 'BlackRock', 'Bain'] },
    { name: 'Law, Public Policy & Diplomacy', pct: '12%', companies: ['United Nations', 'US Supreme Court Clerkships', 'ACLU'] },
    { name: 'Academia & National Laboratories', pct: '8%', companies: ['MIT Lincoln Lab', 'CERN', 'Brookhaven', 'Stanford'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Post-Graduation Pathways
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Career Outcomes & Employer Recruitment
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Edunexa graduates are among the most sought-after innovators in the world, with a 96.8% placement rate within six months of commencement.
        </p>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900 text-white p-8 rounded-3xl shadow-xl divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        <div className="space-y-1 text-center">
          <span className="text-3xl font-black font-serif text-emerald-400 block">{config.employmentRate}</span>
          <span className="text-xs text-slate-300">Employed or Grad School in 6 Mo</span>
        </div>
        <div className="space-y-1 text-center pt-4 sm:pt-0">
          <span className="text-3xl font-black font-serif text-amber-300 block">$114,500</span>
          <span className="text-xs text-slate-300">Median Starting Base Salary</span>
        </div>
        <div className="space-y-1 text-center pt-4 sm:pt-0">
          <span className="text-3xl font-black font-serif text-white block">980+</span>
          <span className="text-xs text-slate-300">On-Campus Employer Visits</span>
        </div>
        <div className="space-y-1 text-center pt-4 sm:pt-0">
          <span className="text-3xl font-black font-serif text-amber-300 block">4,200+</span>
          <span className="text-xs text-slate-300">Funded Summer Internships</span>
        </div>
      </div>

      {/* Industry Distribution */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-200 pb-2">
          Graduate Placement by Industry Sector
        </h3>

        <div className="space-y-4">
          {industries.map((ind, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-900">{ind.name}</h4>
                <span className="font-mono text-sm font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md">{ind.pct}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500 font-semibold">Featured Recruiters:</span>
                {ind.companies.map((c, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
