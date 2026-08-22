import React, { useState } from 'react';
import {
  RotateCcw,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  Search,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RevaluationView: React.FC = () => {
  const { examSubjects, revaluations, applyRevaluation } = useAuth();
  const [selectedSubjectCode, setSelectedSubjectCode] = useState(examSubjects[0]?.code || 'CS601');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Please provide a specific academic ground or remark for revaluation.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      applyRevaluation(selectedSubjectCode, reason);
      setIsSubmitting(false);
      setReason('');
      alert(`Revaluation application successfully submitted for ${selectedSubjectCode}. The answer script will be reassigned to the Second Board of Examiners.`);
    }, 600);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Marks Upgraded & Published':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
      case 'Under Evaluation':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      default:
        return 'bg-slate-100 text-slate-900 border-slate-300 font-bold';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F] text-white text-xs font-bold mb-2">
            <RotateCcw className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Blind Second-Examiner Re-Evaluation System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D2F2F]">
            Revaluation Hub & Mark Difference Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Independent reassessment of evaluated answer scripts by senior subject board examiners.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#EAE4D7]/60 px-4 py-2 rounded-2xl border border-[#DDD6C8] text-xs font-bold text-[#0D2F2F]">
          <span>Revaluation Fee: <strong>₹650 / Course</strong></span>
        </div>
      </div>

      {/* Main Grid: Application Form vs History Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Application Panel (5 cols) */}
        <div className="lg:col-span-5 bg-[#FDFBF7] p-6 sm:p-7 rounded-3xl border border-[#EAE4D7] shadow-xs space-y-5">
          <div className="pb-3 border-b border-[#EAE4D7]">
            <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
              Apply for Subject Revaluation
            </h3>
            <p className="text-xs text-slate-500">
              Submit paper for complete blind reassessment.
            </p>
          </div>

          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1.5">
                Target Subject Paper
              </label>
              <select
                value={selectedSubjectCode}
                onChange={(e) => setSelectedSubjectCode(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-white border border-[#DDD6C8] text-xs font-semibold text-[#0D2F2F] focus:ring-2 focus:ring-[#FF6B4A]"
              >
                {examSubjects.map((sub) => (
                  <option key={sub.code} value={sub.code}>
                    {sub.code} — {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1.5">
                Specific Grounds / Question Concerns
              </label>
              <textarea
                required
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Question 4(b) theoretical derivation appears undervalued despite complete mathematical proof..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs text-[#0D2F2F] focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#0D2F2F] text-white text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Subject Evaluation Remittance:</span>
                <span className="font-mono text-white">₹650.00</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Evaluation Policy:</span>
                <span className="text-emerald-400">Blind Dual Re-Check</span>
              </div>
              <div className="pt-2 border-t border-[#1A4F4F] flex justify-between font-bold">
                <span>Net Payable:</span>
                <span className="font-serif text-[#FF6B4A] text-base">₹650.00</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">By-Law Note:</span>
              <p>
                If the variation in marks exceeds ±15%, the script is referred to a 3rd Expert Examiner whose score is deemed final. If marks increase by ≥10 marks, ₹300 of the fee is refunded.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-[#FF6B4A] hover:bg-[#E55535] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Submitting Revaluation Order...</span>
              ) : (
                <>
                  <span>Submit Revaluation (₹650)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Tracker Records (7 cols) */}
        <div className="lg:col-span-7 bg-[#FDFBF7] p-6 sm:p-7 rounded-3xl border border-[#EAE4D7] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D7]">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
                Revaluation Status & Mark Diff Audit
              </h3>
              <p className="text-xs text-slate-500">
                Transparent log of previous & updated scores
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600">
              {revaluations.length} Active Audits
            </span>
          </div>

          <div className="space-y-4">
            {revaluations.map((rev) => {
              const hasRevision = rev.revisedTotal !== undefined;
              const markDiff = hasRevision ? (rev.revisedTotal || 0) - rev.originalTotal : null;

              return (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-white border border-[#EAE4D7] space-y-4 hover:border-[#0D2F2F] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#0D2F2F]">
                          {rev.subjectCode}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] border ${getStatusBadge(
                            rev.status
                          )}`}
                        >
                          {rev.status}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">Ref: {rev.id}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0D2F2F] mt-1">
                        {rev.subjectName}
                      </h4>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs font-bold text-[#0D2F2F] block">
                        Applied: {rev.appliedDate}
                      </span>
                      <span className="text-[10px] text-slate-500">Fee: ₹{rev.feePaid} Paid</span>
                    </div>
                  </div>

                  {/* Mark Difference Comparison Box */}
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE4D7] grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">
                        Original Total
                      </span>
                      <span className="text-sm font-serif font-black text-slate-700">
                        {rev.originalTotal} / 100
                      </span>
                      <span className="text-[10px] text-slate-500 block font-mono">
                        {rev.originalGrade}
                      </span>
                    </div>

                    <div className="border-x border-[#EAE4D7]">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">
                        Revised Total
                      </span>
                      <span className="text-sm font-serif font-black text-[#0D2F2F]">
                        {hasRevision ? `${rev.revisedTotal} / 100` : 'Pending'}
                      </span>
                      <span className="text-[10px] text-slate-600 block font-mono">
                        {rev.revisedGrade || 'In Review'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">
                        Mark Variance
                      </span>
                      {hasRevision ? (
                        <span
                          className={`text-sm font-serif font-black block ${
                            (markDiff || 0) > 0
                              ? 'text-emerald-700'
                              : (markDiff || 0) < 0
                              ? 'text-red-700'
                              : 'text-slate-700'
                          }`}
                        >
                          {(markDiff || 0) > 0 ? `+${markDiff}` : markDiff} Marks
                        </span>
                      ) : (
                        <span className="text-xs text-amber-700 font-bold block mt-1">
                          Evaluating
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 block">
                        {hasRevision && (markDiff || 0) > 0 ? 'Upgraded' : 'Standing'}
                      </span>
                    </div>
                  </div>

                  {/* Remarks & Examiner Note */}
                  <div className="pt-1 text-xs text-slate-600 space-y-1">
                    <span className="font-bold text-[#0D2F2F] text-[11px] block">
                      Board Evaluation Remarks:
                    </span>
                    <p className="text-[11px] leading-relaxed italic bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      "{rev.remarks}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
