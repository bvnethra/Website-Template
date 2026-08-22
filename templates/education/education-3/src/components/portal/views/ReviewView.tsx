import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  FileCheck,
  Scale
} from 'lucide-react';

export const ReviewView: React.FC = () => {
  const { reviewRequests, submitReviewRequest } = useAuth();
  const { addToast } = useApp();

  const [subjectCode, setSubjectCode] = useState('MAT501');
  const [reason, setReason] = useState('Challenge valuation for Question 9 planar graph and Eulerian recurrence solution.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectCode.trim()) {
      addToast({ type: 'error', title: 'Code Required', message: 'Please enter the subject code.' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitReviewRequest(subjectCode, reason);
      setIsSubmitting(false);
      addToast({
        type: 'success',
        title: 'Board Challenge Lodged',
        message: `Registered challenge review for ${subjectCode}. Panel review hearing will convene shortly.`
      });
    }, 700);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#0D2F2F]">
          Autonomous Review Hub & Board Challenge Valuation
        </h2>
        <p className="text-xs sm:text-sm text-[#4A5D4E]">
          Apply for an apex 3-member Dean Review Committee if you seek a final challenge evaluation following standard revaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 6 Cols: Apply for Review */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-4">
            <h3 className="font-heading text-base font-bold text-[#0D2F2F]">
              Lodge Board Challenge Evaluation
            </h3>
            <p className="text-xs text-[#4A5D4E]">
              Fee: $75.00. Evaluated by two external Subject Matter Experts and the Academic Dean.
            </p>

            <form onSubmit={handleApplyReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                  Subject Code
                </label>
                <input
                  type="text"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value.toUpperCase())}
                  placeholder="e.g. MAT501"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs font-mono font-bold text-[#0D2F2F] focus:outline-none focus:ring-2 focus:ring-[#0D2F2F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                  Challenge Grounds & Technical Justification
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain why the current valuation warrants board scrutiny..."
                  required
                  className="w-full p-3 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F] focus:outline-none focus:ring-2 focus:ring-[#0D2F2F]"
                />
              </div>

              <div className="p-3 bg-[#F4F1EA] rounded-xl text-[11px] text-[#4A5D4E] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#FF6B4A] shrink-0" />
                <span>If score changes by ≥ 10%, the $75 fee is 100% reimbursed to your student account.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0D2F2F] hover:bg-[#082020] text-white py-3 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Lodging Challenge Review...</span>
                ) : (
                  <>
                    <span>Submit Board Challenge ($75.00)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF6B4A]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right 6 Cols: Active Review Cases */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-4">
            <h3 className="font-heading text-base font-bold text-[#0D2F2F]">
              Active Challenge Valuation Docket
            </h3>

            <div className="space-y-4">
              {reviewRequests.map((req) => (
                <div key={req.id} className="p-5 bg-[#FDFBF7] rounded-2xl border border-[#E8EAE3] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#0D2F2F] bg-[#F4F1EA] px-2.5 py-1 rounded">
                      {req.applicationNo}
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                      {req.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#0D2F2F]">{req.subjectCode} — {req.subjectName}</h4>
                    <p className="text-[11px] text-[#4A5D4E] mt-1">{req.reason}</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#E8EAE3] text-xs">
                    <span className="font-bold text-[#0D2F2F] block">Committee Status:</span>
                    <span className="text-[#4A5D4E]">{req.resolutionOutcome}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#4A5D4E] pt-1">
                    <span>Applied on {req.appliedDate}</span>
                    <span className="font-semibold text-emerald-700">Fee Refund: {req.feeRefundStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
