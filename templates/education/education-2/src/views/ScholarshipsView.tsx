import React from 'react';
import { Award, DollarSign, CheckCircle, Sparkles, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ScholarshipsViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const ScholarshipsView: React.FC<ScholarshipsViewProps> = ({ onNavigate }) => {
  const { theme, openTuitionCalc, openApplyModal } = useTheme();

  const scholarships = [
    {
      name: 'Presidential Horizon Full-Ride Scholarship',
      amount: 'Full Tuition + Room & Board ($68,000/yr)',
      type: 'Merit & Leadership',
      criteria: 'Top 1% of applicant pool with exceptional scholastic and civic leadership.',
      deadline: 'November 1, 2025 (Early Action)',
    },
    {
      name: 'Edunexa Endowed STEM Innovation Award',
      amount: '$25,000 per academic year',
      type: 'Departmental Merit',
      criteria: 'Scholars majoring in Quantum Computing, Biomedical Engineering, or Applied Mathematics.',
      deadline: 'January 10, 2026',
    },
    {
      name: 'Dean’s Academic Distinction Fellowship',
      amount: '$15,000 per academic year',
      type: 'Academic Merit',
      criteria: 'Cumulative unweighted high school GPA of 3.85+ and demonstrated scholarly distinction.',
      deadline: 'January 10, 2026',
    },
    {
      name: 'Global Humanities & Social Ethics Grant',
      amount: '$18,000 per academic year',
      type: 'Humanities Focus',
      criteria: 'Students pursuing Classical Studies, Philosophy, or International Human Rights Law.',
      deadline: 'December 1, 2025',
    },
    {
      name: 'First-Generation Scholar Endowment',
      amount: 'Full Tuition + $4,000 Annual Stipend',
      type: 'Need & First-Gen',
      criteria: 'First in family to attend a four-year college with demonstrated financial need.',
      deadline: 'February 15, 2026',
    },
    {
      name: 'Charles River Research Undergraduate Grant',
      amount: '$8,000 Summer Research Fellowship',
      type: 'Undergraduate Research',
      criteria: 'Funding for independent laboratory inquiry under a tenured faculty sponsor.',
      deadline: 'Rolling Applications',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Endowed Grants & Fellowships
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Scholarships & Institutional Financial Aid
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Edunexa commits over $185 Million annually in non-repayable grants and merit fellowships to ensure that every gifted student can study without financial hardship.
        </p>
      </div>

      {/* 100% Need-Met Guarantee Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5" />
            <span>Guaranteed Need-Blind Policy</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">
            100% of Demonstrated Financial Need Met
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            Edunexa packages financial aid entirely with university grants and work-study stipends. We do not include commercial loans in our financial aid packages.
          </p>
        </div>

        <button
          onClick={openTuitionCalc}
          style={{ backgroundColor: theme.accent }}
          className="px-6 py-3.5 rounded-2xl text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 shadow-md shrink-0 flex items-center gap-2"
        >
          <DollarSign className="w-4 h-4 text-slate-950" />
          <span>Calculate Your Financial Aid</span>
        </button>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((sch, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                  {sch.type}
                </span>
                <Award className="w-5 h-5 text-amber-700" />
              </div>

              <h3 className="text-base font-serif font-bold text-slate-900 leading-snug">{sch.name}</h3>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Award Value</span>
                <span className="text-sm font-black font-serif text-emerald-800 block mt-0.5">{sch.amount}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{sch.criteria}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="text-[11px] text-slate-500">
                Deadline: <strong>{sch.deadline}</strong>
              </div>
              <button
                onClick={() => openApplyModal()}
                style={{ backgroundColor: theme.primary }}
                className="w-full py-2 rounded-xl text-white font-bold text-xs hover:opacity-95"
              >
                Apply for Fellowship
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
