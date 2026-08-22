import React, { useState } from 'react';
import {
  Scale,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  FileCheck2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ReviewView: React.FC = () => {
  const { examSubjects, reviews, applyReview } = useAuth();
  const [selectedSubjectCode, setSelectedSubjectCode] = useState(examSubjects[0]?.code || 'CS601');
  const [grounds, setGrounds] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grounds.trim()) {
      alert('Please state formal grounds for Review Board petition.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      applyReview(selectedSubjectCode, grounds);
      setIsSubmitting(false);
      setGrounds('');
      alert(`Special Board of Review petition logged for ${selectedSubjectCode}. The Academic Appellate Committee will schedule a hearing.`);
    }, 600);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verdict Published':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
      case 'Hearing Scheduled':
        return 'bg-blue-100 text-blue-900 border-blue-300 font-bold';
      case 'Committee Constituted':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      default:
        return 'bg-slate-100 text-slate-900 border-slate-300 font-bold';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F] text-white text-xs font-bold mb-2">
            <Scale className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Academic Appellate & Examination Review Board</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D2F2F]">
            Examination Review Hub (Board of Appeals)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Formal institutional tribunal for challenging evaluation anomalies or syllabus deviations.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#EAE4D7]/60 px-4 py-2 rounded-2xl border border-[#DDD6C8] text-xs font-bold text-[#0D2F2F]">
          <span>Appellate Fee: <strong>₹1,200 / Course Petition</strong></span>
        </div>
      </div>

      {/* Main Grid: Petition Submission Form vs Review Hearings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (5 cols) */}
        <div className="lg:col-span-5 bg-[#FDFBF7] p-6 sm:p-7 rounded-3xl border border-[#EAE4D7] shadow-xs space-y-5">
          <div className="pb-3 border-b border-[#EAE4D7]">
            <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
              Petition the Review Board
            </h3>
            <p className="text-xs text-slate-500">
              Submit formal grounds for Examination Appellate hearing.
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
                Detailed Grounds for Appellate Review
              </label>
              <textarea
                required
                rows={4}
                value={grounds}
                onChange={(e) => setGrounds(e.target.value)}
                placeholder="State specific discrepancy (e.g. out-of-syllabus questions in Section C, revaluation arithmetic miscalculation, or evaluation procedural anomaly)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs text-[#0D2F2F] focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#0D2F2F] text-white text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Tribunal Registry Fee:</span>
                <span className="font-mono text-white">₹1,200.00</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Appellate Bench:</span>
                <span className="text-emerald-400">3 Senior Professors + Dean</span>
              </div>
              <div className="pt-2 border-t border-[#1A4F4F] flex justify-between font-bold">
                <span>Total Remittance:</span>
                <span className="font-serif text-[#FF6B4A] text-base">₹1,200.00</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-[#FF6B4A] hover:bg-[#E55535] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Registering Appellate Case...</span>
              ) : (
                <>
                  <span>File Review Petition (₹1,200)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Active Review Hearings (7 cols) */}
        <div className="lg:col-span-7 bg-[#FDFBF7] p-6 sm:p-7 rounded-3xl border border-[#EAE4D7] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D7]">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
                Active Review Board Petitions
              </h3>
              <p className="text-xs text-slate-500">
                Live proceedings of candidate appeals
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600">
              {reviews.length} Cases Filed
            </span>
          </div>

          <div className="space-y-4">
            {reviews.map((rev) => (
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
                      Filed: {rev.appliedDate}
                    </span>
                    <span className="text-[10px] text-slate-500">Fee: ₹{rev.feePaid} Remitted</span>
                  </div>
                </div>

                {/* Hearing & Bench Details */}
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE4D7] text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Appellate Chair:</span>
                    <span className="font-bold text-[#0D2F2F]">{rev.boardChair}</span>
                  </div>
                  {rev.hearingDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Scheduled Hearing Date:</span>
                      <span className="font-bold text-[#FF6B4A]">{rev.hearingDate}</span>
                    </div>
                  )}
                </div>

                {/* Final Verdict / Finding */}
                <div className="text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-[#0D2F2F] text-[11px] block uppercase">
                    Board Findings / Ruling:
                  </span>
                  <p className="text-[11px] leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {rev.finalVerdict}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
