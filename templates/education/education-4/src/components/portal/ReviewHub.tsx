import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SearchCheck, 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Award,
  Users,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initialReviews, ReviewRecord } from '../../data/portalData';

export const ReviewHub: React.FC = () => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState<ReviewRecord[]>(initialReviews);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const [subjectCode, setSubjectCode] = useState('CS501');
  const [justification, setJustification] = useState('Request for Board Level Scrutiny regarding algorithm complexity proof scoring.');
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);

    setTimeout(() => {
      const newReview: ReviewRecord = {
        id: `BR-2026-0${Math.floor(20 + Math.random() * 30)}`,
        subjectCode: subjectCode,
        subjectName: subjectCode === 'CS501' ? 'Design and Analysis of Algorithms' : 'Computer Networks & Socket Protocol',
        semester: 5,
        appliedDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        boardChair: 'Prof. Dr. Arvind Krishnamurthy (Dean of Academic Affairs)',
        status: 'Committee Assigned',
        initialOutcome: 'Revaluation completed. Forwarded to 3-Member Academic Review Panel.',
        finalDecision: 'Under Active Evaluation by Standing Review Board.',
        remarks: 'Hearing scheduled in Board Session #45.'
      };

      setReviews(prev => [newReview, ...prev]);
      setIsApplying(false);
      setShowApplyModal(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F]/5 border border-[#0D2F2F]/10 text-xs font-bold text-[#0D2F2F] mb-1.5">
            <SearchCheck className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Academic Council Standing Committee</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D2F2F] font-display tracking-tight">
            Board Review & Challenge Valuation Hub
          </h1>
          <p className="text-xs sm:text-sm text-[#476666] mt-0.5">
            Escalate post-revaluation evaluation disagreements to the University Board of Studies and Standing Scrutiny Council.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#FF6B4A]/25 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Board Review</span>
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#0D2F2F] uppercase tracking-wider">
          Board Challenge Applications ({reviews.length})
        </h3>

        <div className="space-y-4">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 border border-[#E5DFD5] shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DFD5] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#FF6B4A] bg-[#FF6B4A]/10 px-2.5 py-0.5 rounded-full">
                    {rev.id}
                  </span>
                  <span className="text-xs text-[#476666]">• Lodged on {rev.appliedDate}</span>
                </div>

                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                  rev.status === 'Board Decision Finalized'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-100 text-amber-800 animate-pulse'
                }`}>
                  {rev.status}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#0D2F2F]">{rev.subjectCode}</span>
                  <span className="text-xs text-[#476666] font-semibold">• Semester {rev.semester}</span>
                </div>
                <h4 className="text-base font-bold text-[#0D2F2F] mt-0.5">
                  {rev.subjectName}
                </h4>
              </div>

              {/* Committee Panel Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] text-xs space-y-1">
                  <span className="text-[10px] font-bold text-[#8A9E9E] uppercase block flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#FF6B4A]" />
                    Assigned Board Chair
                  </span>
                  <div className="font-bold text-[#0D2F2F]">{rev.boardChair}</div>
                  <p className="text-[#476666] pt-1">
                    Initial Case Context: {rev.initialOutcome}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0D2F2F] text-white text-xs space-y-1">
                  <span className="text-[10px] font-bold text-[#FFA07A] uppercase block flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Final Council Ruling
                  </span>
                  <div className="font-bold text-slate-100 leading-snug">{rev.finalDecision}</div>
                  <p className="text-slate-300 text-[11px] pt-1">
                    {rev.remarks}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#8A9E9E]">
                <span>Standing Academic Regulation 2023 - Clause 14.8</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Legally Binding University Gazette
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Apply Modal */}
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
                <SearchCheck className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-[#0D2F2F] font-display">
                Lodge Board Review Challenge
              </h3>
              <p className="text-xs text-[#476666] mt-1">
                Board Review applications are adjudicated by a 3-member Professorial Review Committee.
              </p>

              <form onSubmit={handleApply} className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#0D2F2F] block mb-1.5">
                    Course for Board Challenge
                  </label>
                  <select
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs font-bold text-[#0D2F2F] focus:outline-none focus:border-[#FF6B4A]"
                  >
                    <option value="CS501">CS501 - Design and Analysis of Algorithms</option>
                    <option value="CS504">CS504 - Computer Networks & Socket Protocol</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0D2F2F] block mb-1.5">
                    Statement of Grounds & Academic Challenge
                  </label>
                  <textarea
                    rows={3}
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs text-[#0D2F2F] focus:outline-none focus:border-[#FF6B4A]"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] text-xs flex justify-between">
                  <span className="text-[#476666]">Board Hearing & Council Fee</span>
                  <strong className="text-[#0D2F2F]">₹1,200.00</strong>
                </div>

                <button
                  type="submit"
                  disabled={isApplying}
                  className="w-full py-3 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isApplying ? 'Submitting to Academic Council...' : 'Submit Challenge & Pay ₹1,200'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
