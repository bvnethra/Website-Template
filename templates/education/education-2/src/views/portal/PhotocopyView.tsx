import React, { useState } from 'react';
import {
  Copy,
  Download,
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Sparkles,
  ArrowRight,
  Eye,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PhotocopyView: React.FC = () => {
  const { examSubjects, photocopies, applyPhotocopy } = useAuth();
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>(examSubjects[0]?.code || 'CS601');
  const [isApplying, setIsApplying] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState<any>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);

    setTimeout(() => {
      applyPhotocopy(selectedSubjectCode);
      setIsApplying(false);
      alert(`Photocopy application logged successfully for ${selectedSubjectCode}. Script will be scanned and dispatched within 48 business hours.`);
    }, 600);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scanned & Dispatched':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Under Digitization':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      default:
        return 'bg-blue-100 text-blue-900 border-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F] text-white text-xs font-bold mb-2">
            <Copy className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Evaluated Answer Script Digitization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D2F2F]">
            Answer Script Photocopy Application
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Request official scanned PDF copy of your evaluated End-Semester answer scripts.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#EAE4D7]/60 px-4 py-2 rounded-2xl border border-[#DDD6C8] text-xs font-bold text-[#0D2F2F]">
          <span>Standard Fee: <strong>₹300 / Answer Script</strong></span>
        </div>
      </div>

      {/* Main Grid: Application Form (5 cols) & Active Photocopy Records (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (5 cols) */}
        <div className="lg:col-span-5 bg-[#FDFBF7] p-6 sm:p-7 rounded-3xl border border-[#EAE4D7] shadow-xs space-y-5">
          <div className="pb-3 border-b border-[#EAE4D7]">
            <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
              Submit New Request
            </h3>
            <p className="text-xs text-slate-500">
              Select the paper to retrieve high-resolution scanned evaluation pages.
            </p>
          </div>

          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1.5">
                Select Course Paper
              </label>
              <select
                value={selectedSubjectCode}
                onChange={(e) => setSelectedSubjectCode(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-white border border-[#DDD6C8] text-xs font-semibold text-[#0D2F2F] focus:ring-2 focus:ring-[#FF6B4A]"
              >
                {examSubjects.map((sub) => (
                  <option key={sub.code} value={sub.code}>
                    {sub.code} — {sub.name} ({sub.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D2F2F] text-white text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Fee per Answer Script:</span>
                <span className="font-mono text-white">₹300.00</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Scanning & Optical Watermarking:</span>
                <span className="font-mono text-emerald-400">Included</span>
              </div>
              <div className="pt-2 border-t border-[#1A4F4F] flex justify-between font-bold">
                <span>Total Remittance:</span>
                <span className="font-serif text-[#FF6B4A] text-base">₹300.00</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-1">
              <span className="font-bold block">Important Rule:</span>
              <p>
                Photocopies are issued exclusively for student verification prior to revaluation. Scans will contain examiner page-by-page marking annotations.
              </p>
            </div>

            <button
              type="submit"
              disabled={isApplying}
              className="w-full py-3.5 rounded-2xl bg-[#FF6B4A] hover:bg-[#E55535] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isApplying ? (
                <span>Lodging Application...</span>
              ) : (
                <>
                  <span>Apply & Pay ₹300</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Active Records (7 cols) */}
        <div className="lg:col-span-7 bg-[#FDFBF7] p-6 sm:p-7 rounded-3xl border border-[#EAE4D7] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D7]">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
                Photocopy Tracking & Archive
              </h3>
              <p className="text-xs text-slate-500">
                Real-time status of digitized script requests
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600">
              {photocopies.length} Active Records
            </span>
          </div>

          <div className="space-y-3.5">
            {photocopies.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-white border border-[#EAE4D7] space-y-3 hover:border-[#0D2F2F] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#0D2F2F]">
                        {req.subjectCode}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(
                          req.status
                        )}`}
                      >
                        {req.status}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">Ref: {req.id}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0D2F2F] mt-1">
                      {req.subjectName}
                    </h4>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs font-bold text-[#0D2F2F] block">₹{req.feePaid} Paid</span>
                    <span className="text-[10px] text-slate-400 font-mono">{req.trackingRef}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500 text-[11px]">
                    Applied Date: <strong>{req.appliedDate}</strong>
                  </span>

                  {req.downloadUrl ? (
                    <button
                      onClick={() => setShowPreviewModal(req)}
                      className="px-3 py-1.5 rounded-xl bg-[#0D2F2F] hover:bg-[#081E1E] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#FF6B4A]" />
                      <span>View Scanned Script</span>
                    </button>
                  ) : (
                    <span className="text-amber-800 text-[11px] font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Scanning in Progress (Estimated 24h)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Script Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-3xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EAE4D7] p-6 sm:p-8 animate-in zoom-in-95 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPreviewModal(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-[#0D2F2F] hover:bg-[#EAE4D7]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-[#EAE4D7]">
              <div className="w-10 h-10 rounded-2xl bg-[#0D2F2F] text-[#FF6B4A] flex items-center justify-center">
                <Copy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
                  Official Evaluated Answer Script (Digitized Copy)
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {showPreviewModal.subjectCode} — {showPreviewModal.subjectName} • Ref: {showPreviewModal.id}
                </p>
              </div>
            </div>

            {/* Simulated Scanned Sheet Canvas */}
            <div className="mt-5 p-6 rounded-2xl bg-white border-2 border-slate-300 space-y-4 relative overflow-hidden font-mono text-xs">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between text-slate-500">
                <span>Eduvora Central Evaluation Camp</span>
                <span>BARCODE: *EDV-EVAL-88942*</span>
                <span className="text-emerald-700 font-bold">VAL-PASSED</span>
              </div>

              {/* Sample Page Preview Body */}
              <div className="space-y-4 text-slate-800 leading-relaxed font-sans bg-amber-50/20 p-4 rounded-xl border border-amber-100">
                <div className="flex justify-between border-b pb-2 text-xs">
                  <span className="font-bold">Q1. (a) Explain Distributed Mutual Exclusion (Ricart-Agrawala):</span>
                  <span className="text-[#FF6B4A] font-bold font-mono">Mark: 08 / 10 (Evaluator 1)</span>
                </div>
                <p className="text-xs text-slate-600 italic">
                  "Candidate provided complete timestamp message exchange algorithm with correct message complexity 2(N-1)... Well illustrated timing diagram."
                </p>

                <div className="flex justify-between border-b pb-2 pt-2 text-xs">
                  <span className="font-bold">Q2. (b) Explain Consensus in Asynchronous Systems (FLP Impossibility):</span>
                  <span className="text-[#FF6B4A] font-bold font-mono">Mark: 12 / 15 (Evaluator 1)</span>
                </div>
                <p className="text-xs text-slate-600 italic">
                  "Formal proof structure present. Lemma 2 could be articulated with greater rigor."
                </p>
              </div>

              <div className="pt-3 border-t flex justify-between text-slate-500 text-[11px]">
                <span>Total External Evaluated Mark: <strong>44 / 60</strong></span>
                <span>Chief Examiner Seal Attested</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EAE4D7] flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Do you find total calculation errors? You may apply for <strong>Revaluation</strong>.
              </span>
              <button
                onClick={() => {
                  alert('Downloading full high-res PDF bundle...');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0D2F2F] hover:bg-[#081E1E] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#FF6B4A]" />
                <span>Download High-Res PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
