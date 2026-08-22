import React from 'react';
import { BookOpen, Sparkles, Sliders, Code, CheckCircle, Palette, Layers, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DocumentationViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const DocumentationView: React.FC<DocumentationViewProps> = ({ onNavigate }) => {
  const { theme, openCustomizer } = useTheme();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Developer & Template Handbook
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Edunexa Collegiate Architecture & Customization Guide
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Comprehensive documentation for configuring collegiate branding themes, updating academic curricula data, and tailoring institutional admissions flows.
        </p>
      </div>

      {/* Quick Launch Customizer CTA */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <h3 className="text-base font-bold font-serif text-white">Live White-Label Theme Customizer</h3>
          <p className="text-xs text-slate-300">Switch color palettes (Navy, Crimson, Forest, Plum, Slate, Terracotta) in real time.</p>
        </div>
        <button
          onClick={openCustomizer}
          style={{ backgroundColor: theme.accent }}
          className="px-5 py-2.5 rounded-xl text-slate-950 font-bold text-xs hover:brightness-110 shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <Sliders className="w-4 h-4 text-slate-950" />
          <span>Open Customizer</span>
        </button>
      </div>

      {/* Guide Sections */}
      <div className="space-y-8">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-800" />
            <h3 className="text-base font-serif font-bold text-slate-900">1. Institutional Color Engine</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The portal is powered by a dynamic React Context (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">ThemeContext.tsx</code>) that manages CSS color tokens across primary headers, navigation accents, buttons, and badges. You can add new color schemes in <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">src/config/templateConfig.ts</code>.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-800" />
            <h3 className="text-base font-serif font-bold text-slate-900">2. Data Model & Academic Schema</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            All mock entities (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">Program</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">Department</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">FacultyMember</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">ResearchProject</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">UniversityEvent</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">NewsArticle</code>) are fully typed in <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">src/types.ts</code> and populated in <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">src/data/mockData.ts</code>.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-800" />
            <h3 className="text-base font-serif font-bold text-slate-900">3. Interactive Admissions & Financial Calculators</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The Quick Apply modal features a 4-step wizard with GPA validation and honor code certification. The Net Price Calculator dynamically computes need-based grants based on household income and academic merit tiers.
          </p>
        </div>
      </div>
    </div>
  );
};
