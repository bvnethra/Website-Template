import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Download, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  courseTitle?: string;
  instructorName?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName = 'Alex Rivera',
  courseTitle = 'Modern Generative AI & Large Language Models: From Zero to Production',
  instructorName = 'Dr. Elena Rostova',
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const certId = 'EDV-2026-AI-849204';
  const issueDate = 'August 15, 2026';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://eduvora.io/verify/${certId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloading(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setDownloading(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/50 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Certificate Graphic Canvas */}
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 p-8 sm:p-12 border-2 border-indigo-500/40 shadow-2xl text-center overflow-hidden">
            
            {/* Subtle Guilloché Corner Accents */}
            <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-indigo-500/60 rounded-tl-xl" />
            <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-indigo-500/60 rounded-tr-xl" />
            <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-indigo-500/60 rounded-bl-xl" />
            <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-indigo-500/60 rounded-br-xl" />

            {/* Emblem */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 p-[1.5px] mx-auto mb-4 shadow-xl">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
            </div>

            <span className="text-[11px] font-mono tracking-widest uppercase text-indigo-400 font-bold block mb-1">
              Eduvora Institute of Technology
            </span>

            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider font-display mb-4">
              Certificate of Mastery & Completion
            </h2>

            <p className="text-xs text-slate-400 italic">This is to certify that</p>
            
            <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-cyan-200 font-display my-2">
              {studentName}
            </div>

            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              has successfully completed all lectures, laboratory code assignments, and final assessment for
            </p>

            <div className="text-sm sm:text-base font-bold text-cyan-300 mt-2 max-w-lg mx-auto">
              "{courseTitle}"
            </div>

            {/* Bottom Signatures & QR Hash */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 items-center text-left">
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Instructor Signature</div>
                <div className="font-display font-bold text-white text-xs mt-1">{instructorName}</div>
                <div className="text-[10px] text-indigo-400">Head of Curriculum</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Issue Date</div>
                <div className="font-mono text-slate-300 text-xs mt-1">{issueDate}</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Authenticated
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 text-right">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Credential ID</div>
                <div className="font-mono text-cyan-400 text-xs font-bold mt-1">{certId}</div>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verifiable cryptographic hash on Eduvora registry</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleCopyLink}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Share Credential'}</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'Generating PDF...' : 'Download PDF Certificate'}</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
