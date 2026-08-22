import React from 'react';
import { X, Sparkles, GraduationCap, Award, ShieldCheck, Heart, Users, Target } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-5 bg-gradient-to-r from-teal-50 via-white to-orange-50/40 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black">
              E
            </div>
            <div>
              <h2 className="text-lg font-black text-[#0e2942] uppercase tracking-wide font-display">
                About Eduvora
              </h2>
              <p className="text-xs text-slate-500">
                Empowering learners worldwide with practical, career-defining education.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-xs sm:text-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Our Mission</h3>
            <p className="leading-relaxed text-slate-600">
              Eduvora was founded on a simple principle: high-impact education should bridge the gap between academic theory and production-grade industry demands. We combine hands-on coding sandboxes, expert mentorship, and structured career paths so anyone can build their future with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-2">
                <Target className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Real-World Skills</div>
              <p className="text-xs text-slate-500 mt-1">Curriculums vetted by leads at OpenAI, Google, Stripe, and Microsoft.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center mb-2">
                <Users className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Active Community</div>
              <p className="text-xs text-slate-500 mt-1">Study circles, live code-alongs, and 24/7 peer feedback channels.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2">
                <Award className="w-4 h-4" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Verified Credentials</div>
              <p className="text-xs text-slate-500 mt-1">Accredited certifications easily exportable to LinkedIn and resumes.</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
          >
            Got it
          </button>
        </div>
      </motion.div>
    </div>
  );
};
