import React from 'react';
import { X, BookOpen, Download, FileText, Code2, ExternalLink, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResourcesModal: React.FC<ResourcesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const resources = [
    {
      title: 'Python for AI Cheat Sheet & Code Templates',
      type: 'PDF Guide',
      category: 'AI & Python',
      size: '2.4 MB',
      description: 'Comprehensive syntax guide covering NumPy tensors, async client handling, vector math, and OpenAI API streaming.',
      downloads: '14,200+'
    },
    {
      title: 'Data Science & Feature Engineering Handbook',
      type: 'eBook',
      category: 'Data Science',
      size: '5.1 MB',
      description: 'Step-by-step statistical formulas, Z-score transformations, outlier detection rules, and ROC-AUC evaluation curves.',
      downloads: '9,800+'
    },
    {
      title: 'Growth Marketing Unit Economics Spreadsheet',
      type: 'Interactive Sheet',
      category: 'Marketing',
      size: '1.1 MB',
      description: 'Pre-formatted LTV/CAC calculators, retention cohort matrices, and multi-channel ad spend budget models.',
      downloads: '18,500+'
    },
    {
      title: 'React 19 & TypeScript Production Boilerplate',
      type: 'GitHub Repo',
      category: 'Frontend',
      size: 'Code Repo',
      description: 'Enterprise starter with Tailwind CSS, Server Actions, error boundaries, and optimistic UI hooks.',
      downloads: '22,400+'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-4 sm:p-5 bg-gradient-to-r from-teal-50 to-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Eduvora Learning Resources & Cheat Sheets
              </h2>
              <p className="text-xs text-slate-500">
                Free developer cheat sheets, spreadsheets, and open-source project boilerplates.
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

        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {resources.map((res, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-teal-100 text-teal-800 uppercase">
                    {res.type}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{res.category} • {res.size}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-normal">
                  {res.description}
                </p>
              </div>

              <button
                onClick={() => alert(`Downloaded: ${res.title}`)}
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>

        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-teal-600" /> Free to use for all registered Eduvora students
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
