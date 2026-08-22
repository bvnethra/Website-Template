import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Plus, 
  X, 
  ShieldCheck, 
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initialRevaluations, RevaluationRecord } from '../../data/portalData';

export const RevaluationHub: React.FC = () => {
  const { currentUser } = useAuth();
  const [revaluations, setRevaluations] = useState<RevaluationRecord[]>(initialRevaluations);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState('CS502');
  const [reason, setReason] = useState('Rubric scoring discrepancy in Part C question 4.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eligibleForReval = [
    { code: 'CS502', name: 'Artificial Intelligence & Search Logic', sem: 5, curMarks: 89, curGrade: 'A+' },
    { code: 'CS503', name: 'Database Engineering & High-Scale SQL', sem: 5, curMarks: 93, curGrade: 'O' },
    { code: 'HS507', name: 'Engineering Economics & Tech Ethics', sem: 5, curMarks: 85, curGrade: 'A+' }
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const chosen = eligibleForReval.find(s => s.code === selectedSubject);
    if (!chosen) return;

    setTimeout(() => {
      const newRecord: RevaluationRecord = {
        id: `REV-2026-1${Math.floor(10 + Math.random() * 80)}`,
        subjectCode: chosen.code,
        subjectName: chosen.name,
        semester: chosen.sem,
        appliedDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        originalMarks: chosen.curMarks,
        originalGrade: chosen.curGrade,
        status: 'Under Evaluation',
        fee: 650,
        remarks: 'Assigned to Senior Independent Subject Scrutinizer. Verification underway.'
      };

      setRevaluations(prev => [newRecord, ...prev]);
      setIsSubmitting(false);
      setShowApplyModal(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F]/5 border border-[#0D2F2F]/10 text-xs font-bold text-[#0D2F2F] mb-1.5">
            <RotateCcw className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Independent Academic Scrutiny</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D2F2F] font-display tracking-tight">
            Revaluation Hub & Score Diff Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[#476666] mt-0.5">
            Submit answer scripts for secondary independent evaluation and monitor real-time score delta differences.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#FF6B4A]/25 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Revaluation</span>
        </button>
      </div>

      {/* Revaluation History & Diff Tracker */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#0D2F2F] uppercase tracking-wider">
          Revaluation Cases & Score Delta Audit ({revaluations.length})
        </h3>

        <div className="space-y-3.5">
          {revaluations.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DFD5] shadow-xs hover:border-[#D8D0C5] transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DFD5] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#FF6B4A] bg-[#FF6B4A]/10 px-2.5 py-0.5 rounded-full">
                    {item.id}
                  </span>
                  <span className="text-xs text-[#476666]">• Applied: {item.appliedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                    item.status === 'Grade Upgraded' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : item.status === 'No Change' 
                      ? 'bg-slate-100 text-slate-700' 
                      : 'bg-amber-100 text-amber-800 animate-pulse'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Subject & Score Diff Metric Card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Subject Details */}
                <div className="md:col-span-6 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#0D2F2F]">{item.subjectCode}</span>
                    <span className="text-xs text-[#476666] font-semibold">• Semester {item.semester}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0D2F2F]">
                    {item.subjectName}
                  </h4>
                  <p className="text-xs text-[#476666] leading-relaxed pt-1">
                    {item.remarks}
                  </p>
                </div>

                {/* Score Comparison Box */}
                <div className="md:col-span-6 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E5DFD5] flex items-center justify-between gap-4">
                  
                  {/* Original Score */}
                  <div className="text-center">
                    <span className="text-[10px] text-[#8A9E9E] uppercase font-bold block">Original Mark</span>
                    <div className="text-base font-bold text-[#0D2F2F] font-mono mt-0.5">
                      {item.originalMarks} <span className="text-xs font-normal">({item.originalGrade})</span>
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-[#8A9E9E]" />

                  {/* Revised Score */}
                  <div className="text-center">
                    <span className="text-[10px] text-[#8A9E9E] uppercase font-bold block">Revised Mark</span>
                    {item.revisedMarks !== undefined ? (
                      <div className="text-base font-bold text-emerald-700 font-mono mt-0.5">
                        {item.revisedMarks} <span className="text-xs font-normal">({item.revisedGrade})</span>
                      </div>
                    ) : (
                      <div className="text-xs font-bold text-amber-700 font-mono mt-1">Pending</div>
                    )}
                  </div>

                  {/* Delta Difference Tag */}
                  <div className="text-center pl-2 border-l border-[#D8D0C5]">
                    <span className="text-[10px] text-[#8A9E9E] uppercase font-bold block">Delta Difference</span>
                    {item.markDifference !== undefined ? (
                      <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full inline-block mt-0.5 ${
                        item.markDifference > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {item.markDifference > 0 ? `+${item.markDifference} Marks` : '0 (No Change)'}
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-700 font-bold">In Review</span>
                    )}
                  </div>

                </div>

              </div>

              {item.resolvedDate && (
                <div className="pt-2 text-[11px] text-[#8A9E9E] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Resolution Gazette approved on {item.resolvedDate}. Revised marks reflect in digital marksheet.</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Revaluation Application Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D2F2F]/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="w-full max-w-md bg-white rounded-3xl border border-[#E5DFD5] shadow-2xl p-6 sm:p-7 relative"
            >
              <button
                onClick={() => setShowApplyModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-[#476666] hover:text-[#0D2F2F] hover:bg-[#F7F4EE]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-[#FF6B4A]/10 text-[#FF6B4A] flex items-center justify-center mb-4">
                <RotateCcw className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-[#0D2F2F] font-display">
                Apply for Revaluation Scrutiny
              </h3>
              <p className="text-xs text-[#476666] mt-1">
                Your script will be masked and reassessed blindly by a dual-examiner committee.
              </p>

              <form onSubmit={handleApply} className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#0D2F2F] block mb-1.5">
                    Select Subject for Revaluation
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs font-bold text-[#0D2F2F] focus:outline-none focus:border-[#FF6B4A]"
                  >
                    {eligibleForReval.map(s => (
                      <option key={s.code} value={s.code}>
                        {s.code} - {s.name} (Current: {s.curMarks}/100 Grade {s.curGrade})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0D2F2F] block mb-1.5">
                    Specific Challenge Justification / Question References
                  </label>
                  <textarea
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs text-[#0D2F2F] focus:outline-none focus:border-[#FF6B4A]"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] text-xs flex justify-between">
                  <span className="text-[#476666]">Revaluation Administrative Fee</span>
                  <strong className="text-[#0D2F2F]">₹650.00</strong>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? 'Submitting to Examination Cell...' : 'Confirm & Pay ₹650'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
