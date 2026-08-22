import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  FileText,
  Award,
  Sparkles
} from 'lucide-react';

export const RevaluationView: React.FC = () => {
  const { revaluationRequests, resultsData, submitRevaluationRequest } = useAuth();
  const { addToast } = useApp();

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [reason, setReason] = useState('Discrepancy observed in Step Marks of Section B & Section C.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available subjects for revaluation from Semester 5
  const sem5Subjects = resultsData.find(r => r.semester === 5)?.subjects || [];

  const toggleSubject = (code: string) => {
    if (selectedSubjects.includes(code)) {
      setSelectedSubjects(selectedSubjects.filter(c => c !== code));
    } else {
      setSelectedSubjects([...selectedSubjects, code]);
    }
  };

  const handleApplyRevaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubjects.length === 0) {
      addToast({
        type: 'error',
        title: 'Subject Selection Required',
        message: 'Please choose at least one subject for revaluation scrutiny.'
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitRevaluationRequest(selectedSubjects, reason);
      setSelectedSubjects([]);
      setIsSubmitting(false);
      addToast({
        type: 'success',
        title: 'Revaluation Application Submitted',
        message: `Registered ${selectedSubjects.length} subjects for Board Revaluation. Results published within 14 working days.`
      });
    }, 750);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#0D2F2F]">
          Autonomous Revaluation Hub & Score Differential Tracker
        </h2>
        <p className="text-xs sm:text-sm text-[#4A5D4E]">
          Apply for independent valuation by a senior examiner committee and monitor real-time grade differential upgrades.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 6 Cols: Apply for Revaluation */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-4">
            <h3 className="font-heading text-base font-bold text-[#0D2F2F]">
              Submit Revaluation Application (Semester V)
            </h3>
            <p className="text-xs text-[#4A5D4E]">
              Fee: $50.00 per subject paper. If revaluation results in a mark change ≥ 15%, the valuation fee is 100% reimbursed.
            </p>

            <form onSubmit={handleApplyRevaluation} className="space-y-4">
              <div className="space-y-2">
                {sem5Subjects.map((sub) => {
                  const isChecked = selectedSubjects.includes(sub.code);
                  return (
                    <div
                      key={sub.code}
                      onClick={() => toggleSubject(sub.code)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-[#FDFBF7] border-[#0D2F2F] shadow-xs'
                          : 'bg-white border-[#E8EAE3] hover:border-[#DDD8CE]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-[#0D2F2F] focus:ring-[#0D2F2F]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#0D2F2F] bg-[#F4F1EA] px-2 py-0.5 rounded">
                              {sub.code}
                            </span>
                            <span className="text-xs font-bold text-[#0D2F2F]">{sub.name}</span>
                          </div>
                          <span className="text-[11px] text-[#4A5D4E] mt-0.5 block">
                            Current Score: <strong>{sub.totalMarks}/100</strong> (Grade: {sub.letterGrade})
                          </span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-xs text-[#0D2F2F]">$50.00</span>
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                  Reason for Revaluation Scrutiny
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Specify specific questions or discrepancies observed in photocopy..."
                  className="w-full p-3 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F] focus:outline-none focus:ring-2 focus:ring-[#0D2F2F]"
                />
              </div>

              <div className="pt-2 border-t border-[#E8EAE3] flex items-center justify-between">
                <span className="text-xs font-bold text-[#0D2F2F]">
                  Total: ${selectedSubjects.length * 50}.00
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting || selectedSubjects.length === 0}
                  className="bg-[#0D2F2F] hover:bg-[#082020] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit for Revaluation (${selectedSubjects.length * 50}.00)</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FF6B4A]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right 6 Cols: Revaluation Results Diff Tracker */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-[#0D2F2F]">
                Revaluation Differential Ledger (Diff Tracker)
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Grade Upgraded
              </span>
            </div>

            <div className="space-y-4">
              {revaluationRequests.flatMap(req => req.subjects).map((rev) => (
                <div
                  key={rev.code}
                  className="p-5 bg-[#FDFBF7] rounded-2xl border border-[#E8EAE3] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold bg-[#0D2F2F] text-white px-2.5 py-0.5 rounded">
                      {rev.code}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {rev.diffStatus}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-[#0D2F2F]">{rev.name}</h4>

                  {/* Diff Comparison Box */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-xl border border-[#E0DCD3] text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-[#4A5D4E] font-bold block">Original Valuation</span>
                      <div className="text-sm font-bold text-[#0D2F2F] mt-0.5">
                        {rev.originalMarks}/100
                      </div>
                      <span className="text-[10px] text-[#4A5D4E]">{rev.originalGrade}</span>
                    </div>

                    <div className="border-l border-[#E8EAE3] pl-3">
                      <span className="text-[10px] uppercase text-emerald-700 font-bold block">Board Revaluated</span>
                      <div className="text-sm font-extrabold text-emerald-700 mt-0.5">
                        {rev.revaluedMarks ? `${rev.revaluedMarks}/100` : 'Under Evaluation'}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700">
                        {rev.revaluedGrade || 'Pending Gazette'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#4A5D4E] pt-1">
                    <span>Status: <strong>{rev.status}</strong></span>
                    <span>Updated: {rev.updatedAt}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Revaluation Policy Strip */}
            <div className="p-4 bg-[#F4F1EA] rounded-2xl border border-[#E0DCD3] text-xs text-[#4A5D4E] space-y-1">
              <span className="font-bold text-[#0D2F2F] block">Central Revaluation Norms:</span>
              <p>
                1. Best of two valuations (Original vs. Revalued) is awarded to the candidate.
              </p>
              <p>
                2. Revised marksheets are synchronized with DigiLocker and the University Transcript Repository within 7 days of gazetting.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
