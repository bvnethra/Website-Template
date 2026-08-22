import React, { useState } from 'react';
import { Sparkles, DollarSign, Award, BookOpen, Users, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockResearchProjects, mockDepartments } from '../data/mockData';

interface ResearchViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const ResearchView: React.FC<ResearchViewProps> = ({ onNavigate }) => {
  const { theme, config } = useTheme();
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredResearch = mockResearchProjects.filter(
    (r) => selectedDept === 'All' || r.departmentId === selectedDept
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Discovery & Commercialization
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          University Research Hubs & Sponsored Inventions
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          {config.name} invests {config.researchFunding} annually in foundational scientific inquiry, advancing quantum error mitigation, immunotherapy clinical pipelines, and global climate resilience.
        </p>
      </div>

      {/* Research Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900 text-white p-8 rounded-3xl shadow-xl divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        <div className="space-y-1 text-center">
          <span className="text-2xl sm:text-3xl font-black font-serif text-amber-300 block">{config.researchFunding}</span>
          <span className="text-xs text-slate-300">Annual External Grants</span>
        </div>
        <div className="space-y-1 text-center pt-4 sm:pt-0">
          <span className="text-2xl sm:text-3xl font-black font-serif text-white block">140+</span>
          <span className="text-xs text-slate-300">Dedicated Laboratories</span>
        </div>
        <div className="space-y-1 text-center pt-4 sm:pt-0">
          <span className="text-2xl sm:text-3xl font-black font-serif text-amber-300 block">480+</span>
          <span className="text-xs text-slate-300">Active Patents Filed</span>
        </div>
        <div className="space-y-1 text-center pt-4 sm:pt-0">
          <span className="text-2xl sm:text-3xl font-black font-serif text-white block">84%</span>
          <span className="text-xs text-slate-300">Undergrads in Research</span>
        </div>
      </div>

      {/* Department Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-serif font-bold text-slate-900">Featured Sponsored Projects</h2>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
        >
          <option value="All">All Academic Schools & Labs</option>
          {mockDepartments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Research Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResearch.map((res) => (
          <div
            key={res.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
                  {res.status}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700">{res.grantAmount}</span>
              </div>

              <h3 className="text-base font-serif font-bold text-slate-900 leading-snug">{res.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{res.summary}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div>
                Principal Investigator: <strong className="text-slate-900">{res.leadInvestigator}</strong>
              </div>
              <div>
                Funding Body: <strong className="text-amber-800">{res.fundingBody}</strong>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{res.impactMetrics}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
