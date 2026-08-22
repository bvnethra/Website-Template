import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Quote, Mail, Clock, Award, Building, BookOpen, ChevronRight } from 'lucide-react';
import { LeadershipMessage } from '../../types';

interface DeanMessageModalProps {
  dean: LeadershipMessage | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DeanMessageModal: React.FC<DeanMessageModalProps> = ({ dean, isOpen, onClose }) => {
  if (!isOpen || !dean) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dean-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2C382E]/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-[#FDFBF7] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8EAE3] overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-[#F4F1EA] border-b border-[#E8EAE3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4A5D4E] text-white flex items-center justify-center shadow-xs font-heading font-bold text-lg">
                <Quote className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#4A5D4E] uppercase tracking-wider block">
                  Faculty Leadership Address
                </span>
                <h3 id="dean-modal-title" className="text-xl font-bold font-heading text-[#2D3436]">
                  {dean.name}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#A7B3A2] hover:text-[#4A5D4E] hover:bg-[#E8EAE3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* Dean Profile Banner */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 rounded-2xl bg-white border border-[#E8EAE3] shadow-xs">
              <img
                src={dean.avatar}
                alt={dean.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-[#4A5D4E]/20 shadow-sm shrink-0"
              />
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#E8EAE3] text-xs font-semibold text-[#4A5D4E]">
                  <Building className="w-3.5 h-3.5" />
                  <span>{dean.department}</span>
                </div>
                <h4 className="text-lg font-bold text-[#2D3436] font-heading leading-tight">
                  {dean.role}
                </h4>
                <p className="text-xs font-medium text-[#4A5D4E] flex items-center justify-center sm:justify-start gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#4A5D4E] shrink-0" />
                  <span>{dean.credentials}</span>
                </p>
              </div>
            </div>

            {/* Quote Callout */}
            <div className="p-5 rounded-2xl bg-[#4A5D4E] text-white shadow-sm relative overflow-hidden">
              <Quote className="w-16 h-16 text-white/10 absolute -bottom-3 -right-3 pointer-events-none" />
              <p className="relative z-10 text-sm sm:text-base font-serif italic leading-relaxed text-[#FDFBF7]">
                "{dean.quote}"
              </p>
            </div>

            {/* Full Address */}
            <div className="space-y-3 bg-white p-5 rounded-2xl border border-[#E8EAE3]">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Executive Perspective & Academic Outlook</span>
              </h5>
              <p className="text-sm text-[#2D3436] leading-relaxed">
                {dean.fullMessage}
              </p>
            </div>

            {/* Academic Pedigree & Office Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F4F1EA] border border-[#E8EAE3] space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A5D4E] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Distinguished Career</span>
                </span>
                <p className="text-xs text-[#2D3436]/80 leading-normal">
                  {dean.priorPosts}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F4F1EA] border border-[#E8EAE3] space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A5D4E] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Dean's Open Office Hours</span>
                </span>
                <p className="text-xs text-[#2D3436]/80 leading-normal">
                  {dean.officeHours}
                </p>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-[#F4F1EA] border-t border-[#E8EAE3] flex items-center justify-between">
            <span className="text-xs text-[#2D3436]/70 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#4A5D4E]" />
              <span>Office of Faculty & Academic Dean</span>
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Done Reading</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
