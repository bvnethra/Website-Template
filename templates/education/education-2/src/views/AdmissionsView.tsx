import React from 'react';
import {
  GraduationCap,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  DollarSign,
  HelpCircle,
  Compass,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AdmissionsViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const AdmissionsView: React.FC<AdmissionsViewProps> = ({ onNavigate }) => {
  const { theme, config, openApplyModal, openTourModal, openTuitionCalc } = useTheme();

  const deadlines = [
    {
      term: 'Early Action (Non-Binding)',
      date: 'November 1, 2025',
      notification: 'Mid-December 2025',
      deposit: 'May 1, 2026',
      badge: 'Priority Consideration',
    },
    {
      term: 'Early Decision (Binding)',
      date: 'November 15, 2025',
      notification: 'Late December 2025',
      deposit: 'January 15, 2026',
      badge: 'First Choice Candidates',
    },
    {
      term: 'Regular Decision',
      date: 'January 10, 2026',
      notification: 'Late March 2026',
      deposit: 'May 1, 2026',
      badge: 'Standard Cohort',
    },
    {
      term: 'Transfer Admissions (Fall Entry)',
      date: 'March 1, 2026',
      notification: 'Early May 2026',
      deposit: 'June 1, 2026',
      badge: 'College Transfers',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div
        style={{ backgroundColor: theme.primary }}
        className="rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-4 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Admissions & Financial Aid
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
            Join the Next Generation of Global Scholars
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
            We seek curious minds, original thinkers, and passionate problem-solvers from every background. {config.name} practices holistic admissions and guarantees 100% demonstrated financial need.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => openApplyModal()}
              style={{ backgroundColor: theme.accent }}
              className="px-6 py-3 rounded-2xl text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Launch Quick Application</span>
            </button>
            <button
              onClick={openTourModal}
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-xs transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Book Campus Visit</span>
            </button>
          </div>
        </div>

        <div className="bg-white/10 p-6 rounded-3xl border border-white/20 backdrop-blur-md text-white text-xs space-y-3 w-full md:w-72 shrink-0">
          <h4 className="font-bold text-amber-300 uppercase tracking-wider">Class Profile At A Glance</h4>
          <div className="space-y-1.5 border-t border-white/10 pt-2">
            <div className="flex justify-between">
              <span className="text-slate-300">Acceptance Rate:</span>
              <span className="font-bold">{config.acceptanceRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Mid 50% SAT:</span>
              <span className="font-bold">1460–1560</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Mid 50% ACT:</span>
              <span className="font-bold">33–35</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">First-Gen Scholars:</span>
              <span className="font-bold">22.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Intl Students:</span>
              <span className="font-bold">18.6%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deadlines Section */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
            Important Dates
          </span>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Admissions Rounds & Deadlines
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deadlines.map((dl, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                  {dl.badge}
                </span>
                <h3 className="text-base font-serif font-bold text-slate-900">{dl.term}</h3>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                <div>
                  <span className="text-slate-500 block">Application Deadline:</span>
                  <span className="font-bold text-slate-900 text-sm">{dl.date}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Decision Release:</span>
                  <span className="font-semibold text-slate-800">{dl.notification}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Candidate Reply Date:</span>
                  <span className="font-semibold text-slate-800">{dl.deposit}</span>
                </div>
              </div>

              <button
                onClick={() => openApplyModal()}
                style={{ backgroundColor: theme.primary }}
                className="w-full py-2 rounded-xl text-white font-bold text-xs hover:opacity-95"
              >
                Apply for {dl.term.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Admissions Process */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
            How to Apply
          </span>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Four Steps to Complete Your Application
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Select Your Degree',
              desc: 'Browse our 60+ majors or select exploratory undecided track within our undergraduate colleges.',
            },
            {
              step: '02',
              title: 'Submit Documentation',
              desc: 'Submit transcripts, letters of recommendation, and personal essay via the online portal.',
            },
            {
              step: '03',
              title: 'File for Financial Aid',
              desc: 'Complete the FAFSA and CSS Profile. Over 68% of admitted students receive institutional grants.',
            },
            {
              step: '04',
              title: 'Admissions Decision',
              desc: 'Receive your official committee decision, merit scholarship award, and welcome enrollment package.',
            },
          ].map((item) => (
            <div key={item.step} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-2xl font-serif font-black text-amber-800 block">{item.step}</span>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tuition & Financial Aid Guarantee Banner */}
      <div className="p-8 rounded-3xl bg-amber-50 border border-amber-300 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            {config.name} Need-Blind & 100% Need-Met Pledge
          </span>
          <h3 className="text-xl font-serif font-bold text-amber-950">
            Education Grounded in Equal Opportunity
          </h3>
          <p className="text-xs text-slate-700 max-w-2xl leading-relaxed">
            Financial circumstance is never a barrier. Tuition is completely free for admitted families earning under $85,000 annually.
          </p>
        </div>

        <button
          onClick={openTuitionCalc}
          className="px-6 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs sm:text-sm shadow-md shrink-0 flex items-center gap-2"
        >
          <DollarSign className="w-4 h-4 text-amber-300" />
          <span>Launch Net Price Calculator</span>
        </button>
      </div>
    </div>
  );
};
