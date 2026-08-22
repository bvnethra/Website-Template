import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  X, 
  ShieldCheck,
  ChevronRight,
  Plus,
  BookOpen,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initialPhotocopies, PhotocopyRequest } from '../../data/portalData';

export const PhotocopyHub: React.FC = () => {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState<PhotocopyRequest[]>(initialPhotocopies);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [activeViewerScript, setActiveViewerScript] = useState<PhotocopyRequest | null>(null);

  // New application state
  const [selectedSubjectCode, setSelectedSubjectCode] = useState('CS502');
  const [isApplying, setIsApplying] = useState(false);

  const eligibleSubjects = [
    { code: 'CS502', name: 'Artificial Intelligence & Search Logic', sem: 5, fee: 350 },
    { code: 'CS503', name: 'Database Engineering & High-Scale SQL', sem: 5, fee: 350 },
    { code: 'HS507', name: 'Engineering Economics & Tech Ethics', sem: 5, fee: 350 }
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    const chosen = eligibleSubjects.find(s => s.code === selectedSubjectCode);
    if (!chosen) return;

    setTimeout(() => {
      const newReq: PhotocopyRequest = {
        id: `PC-2026-0${Math.floor(50 + Math.random() * 40)}`,
        subjectCode: chosen.code,
        subjectName: chosen.name,
        semester: chosen.sem,
        appliedDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        feePaid: chosen.fee,
        status: 'Submitted',
        evaluatorRemarks: 'Answer book retrieved from central physical repository. Scanning in progress.',
        totalPages: 22,
        marksObtained: 89
      };

      setRequests(prev => [newReq, ...prev]);
      setIsApplying(false);
      setShowApplyModal(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F]/5 border border-[#0D2F2F]/10 text-xs font-bold text-[#0D2F2F] mb-1.5">
            <FileText className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Answer Book Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D2F2F] font-display tracking-tight">
            Evaluated Answer Script Photocopies
          </h1>
          <p className="text-xs sm:text-sm text-[#476666] mt-0.5">
            Apply for digitized, examiner-marked answer scripts and review question-by-question scoring rubrics.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#FF6B4A]/25 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for New Answer Script</span>
        </button>
      </div>

      {/* Application Status List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#0D2F2F] uppercase tracking-wider">
          Requested Answer Books ({requests.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 border border-[#E5DFD5] shadow-xs hover:border-[#D8D0C5] transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#FF6B4A] bg-[#FF6B4A]/10 px-2.5 py-0.5 rounded-full">
                    {req.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    req.status === 'Ready to View' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#0D2F2F]">{req.subjectCode}</span>
                  <span className="text-xs text-[#476666]">• Sem {req.semester}</span>
                </div>

                <h4 className="text-sm font-bold text-[#0D2F2F] mt-1">
                  {req.subjectName}
                </h4>

                <p className="text-xs text-[#476666] mt-2 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#E5DFD5]">
                  {req.evaluatorRemarks}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5DFD5] flex items-center justify-between text-xs">
                <span className="text-[#8A9E9E]">Fee Remitted: <strong className="text-[#0D2F2F]">₹{req.feePaid}</strong></span>

                {req.status === 'Ready to View' ? (
                  <button
                    onClick={() => setActiveViewerScript(req)}
                    className="px-4 py-2 rounded-xl bg-[#0D2F2F] hover:bg-[#184E4E] text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#FF6B4A]" />
                    <span>View Digitized Script</span>
                  </button>
                ) : (
                  <span className="text-amber-700 font-semibold flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    Scanning Script...
                  </span>
                )}
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
                <FileText className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-[#0D2F2F] font-display">
                Apply for Answer Script Photocopy
              </h3>
              <p className="text-xs text-[#476666] mt-1">
                Select from your evaluated semester courses to generate a high-resolution watermarked PDF.
              </p>

              <form onSubmit={handleApply} className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#0D2F2F] block mb-1.5">
                    Select Subject for Photocopy
                  </label>
                  <select
                    value={selectedSubjectCode}
                    onChange={(e) => setSelectedSubjectCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs font-bold text-[#0D2F2F] focus:outline-none focus:border-[#FF6B4A]"
                  >
                    {eligibleSubjects.map(s => (
                      <option key={s.code} value={s.code}>
                        {s.code} - {s.name} (₹{s.fee})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD5] text-xs space-y-1.5">
                  <div className="flex justify-between text-[#476666]">
                    <span>Digitization & Scanning Fee</span>
                    <strong className="text-[#0D2F2F]">₹350.00</strong>
                  </div>
                  <div className="flex justify-between text-[#476666]">
                    <span>Watermark Cryptographic Hash</span>
                    <span className="text-emerald-700 font-bold">Included</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isApplying}
                  className="w-full py-3 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isApplying ? 'Processing Remittance...' : 'Confirm Application & Pay ₹350'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Watermarked Digital Script Viewer Modal */}
      <AnimatePresence>
        {activeViewerScript && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D2F2F]/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl bg-white rounded-3xl border border-[#E5DFD5] shadow-2xl p-6 sm:p-8 relative max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0D2F2F] text-white flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#FF6B4A]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0D2F2F]">
                      {activeViewerScript.subjectCode}: {activeViewerScript.subjectName}
                    </h3>
                    <p className="text-xs text-[#476666]">
                      Candidate: {currentUser?.name} ({currentUser?.studentId}) • Total Score: <strong className="text-emerald-700">{activeViewerScript.marksObtained}/100</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveViewerScript(null)}
                  className="p-2 rounded-xl text-[#476666] hover:text-[#0D2F2F] hover:bg-[#F7F4EE]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Script Viewer Container with Watermark */}
              <div className="flex-1 overflow-y-auto my-4 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] relative font-mono text-xs text-[#0D2F2F] space-y-6 select-none">
                
                {/* Diagonal Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 rotate-[-25deg] text-3xl font-black text-[#0D2F2F] tracking-widest text-center">
                  LEARNORA OFFICIAL SCRIPT • {currentUser?.studentId} • CONFIDENTIAL
                </div>

                {/* Score Rubric Summary */}
                <div className="bg-white p-4 rounded-xl border border-[#E5DFD5] shadow-xs relative z-10 font-sans">
                  <h4 className="font-bold text-xs text-[#0D2F2F] uppercase mb-2">Examiner Rubric Breakdown</h4>
                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    <div className="p-2 bg-[#FAF8F5] rounded-lg">
                      <span className="text-[10px] text-[#8A9E9E]">Q1 (Part A)</span>
                      <div className="font-bold text-[#0D2F2F]">18/20</div>
                    </div>
                    <div className="p-2 bg-[#FAF8F5] rounded-lg">
                      <span className="text-[10px] text-[#8A9E9E]">Q2 (Part B)</span>
                      <div className="font-bold text-[#0D2F2F]">16/20</div>
                    </div>
                    <div className="p-2 bg-[#FAF8F5] rounded-lg">
                      <span className="text-[10px] text-[#8A9E9E]">Q3 (Part B)</span>
                      <div className="font-bold text-[#0D2F2F]">17/20</div>
                    </div>
                    <div className="p-2 bg-[#FAF8F5] rounded-lg">
                      <span className="text-[10px] text-[#8A9E9E]">Q4 (Part C)</span>
                      <div className="font-bold text-[#FF6B4A]">14/20</div>
                    </div>
                    <div className="p-2 bg-[#FAF8F5] rounded-lg">
                      <span className="text-[10px] text-[#8A9E9E]">Q5 (Part C)</span>
                      <div className="font-bold text-[#0D2F2F]">18/20</div>
                    </div>
                  </div>
                </div>

                {/* Simulated Script Page 1 */}
                <div className="bg-white p-6 rounded-xl border border-[#D8D0C5] shadow-xs space-y-4 relative z-10 leading-relaxed font-serif">
                  <div className="flex justify-between border-b pb-2 text-[11px] font-sans text-[#8A9E9E]">
                    <span>Page 01 of {activeViewerScript.totalPages}</span>
                    <span>Examiner Code: EX-882</span>
                  </div>
                  <h5 className="font-sans font-bold text-sm text-[#0D2F2F]">Answer 1: Socket Architecture & TCP Sliding Window</h5>
                  <p className="text-slate-700 italic">
                    "The Transmission Control Protocol ensures reliable, ordered, and error-checked delivery of a stream of octets between applications. The sliding window protocol allows sender to transmit multiple packets before receiving an acknowledgement..."
                  </p>
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-sans font-semibold flex items-center justify-between">
                    <span>Evaluator Remark: Correct derivation of throughput and delay-bandwidth product.</span>
                    <span className="font-bold">+18 Marks</span>
                  </div>
                </div>

                {/* Simulated Script Page 2 (Q4 with low marks) */}
                <div className="bg-white p-6 rounded-xl border border-[#D8D0C5] shadow-xs space-y-4 relative z-10 leading-relaxed font-serif">
                  <div className="flex justify-between border-b pb-2 text-[11px] font-sans text-[#8A9E9E]">
                    <span>Page 14 of {activeViewerScript.totalPages}</span>
                    <span>Section: Part C (High Complexity)</span>
                  </div>
                  <h5 className="font-sans font-bold text-sm text-[#0D2F2F]">Answer 4: Three-Way Handshake & SYN Flooding Defense</h5>
                  <p className="text-slate-700 italic">
                    "SYN cookies mitigate SYN floods by using cryptographic hashing on the initial sequence number without allocating memory state on the server until final ACK is received..."
                  </p>
                  <div className="p-2.5 rounded-lg bg-amber-50 text-amber-800 text-[11px] font-sans font-semibold flex items-center justify-between">
                    <span>Evaluator Remark: Diagram sequence lacked timestamp calculation details.</span>
                    <span className="font-bold text-[#FF6B4A]">14/20 (Candidate may challenge via Revaluation)</span>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-[#E5DFD5] flex items-center justify-between">
                <span className="text-xs text-[#476666]">
                  Verified Digital Copy • Learnora Examination Repository
                </span>
                <button
                  onClick={() => setActiveViewerScript(null)}
                  className="px-5 py-2 rounded-xl bg-[#0D2F2F] text-white text-xs font-bold"
                >
                  Close Viewer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
