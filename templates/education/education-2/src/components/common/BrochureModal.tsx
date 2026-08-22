import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle, Mail, Sparkles, BookOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { mockPrograms } from '../../data/mockData';

export const BrochureModal: React.FC = () => {
  const { isBrochureModalOpen, closeBrochureModal, brochureProgramId, theme, addNotification } = useTheme();

  const [email, setEmail] = useState('');
  const [selectedProgramId, setSelectedProgramId] = useState(brochureProgramId || mockPrograms[0].id);
  const [downloaded, setDownloaded] = useState(false);

  if (!isBrochureModalOpen) return null;

  const currentProgram = mockPrograms.find((p) => p.id === selectedProgramId) || mockPrograms[0];

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addNotification('warning', 'Valid Email Required', 'Please enter your email to receive the digital prospectus.');
      return;
    }
    setDownloaded(true);
    addNotification('success', 'Prospectus Dispatched', `The official 32-page ${currentProgram.name} curriculum handbook was sent to ${email}.`);
  };

  const handleClose = () => {
    setDownloaded(false);
    setEmail('');
    closeBrochureModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ backgroundColor: theme.primary }} className="p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">
                Academic Publications
              </span>
              <h3 className="text-lg font-bold font-serif text-white">
                Download Degree Prospectus
              </h3>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5">
          {!downloaded ? (
            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Select Program Handbook</label>
                <select
                  value={selectedProgramId}
                  onChange={(e) => setSelectedProgramId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                >
                  {mockPrograms.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.level})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-700" />
                  What is included in this 32-page guide:
                </span>
                <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                  <li>Complete 4-year/2-year semester curriculum matrix and elective courses</li>
                  <li>Faculty research focus areas, laboratory facilities, and grant funding</li>
                  <li>Alumni salary benchmarks, hiring partners, and internship pipelines</li>
                  <li>Financial aid breakdown, need-met grants, and merit scholarship criteria</li>
                </ul>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: theme.primary }}
                className="w-full py-3 rounded-xl text-white font-bold text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Instant Download & Email Copy</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold font-serif text-slate-900">Prospectus Download Ready</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  A high-resolution PDF of <strong>{currentProgram.name}</strong> has been transmitted to <strong>{email}</strong>.
                </p>
              </div>

              <div className="flex gap-2 justify-center pt-2">
                <a
                  href="#downloaded"
                  onClick={(e) => {
                    e.preventDefault();
                    addNotification('info', 'PDF Generated', 'Local file downloaded to your device.');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Local PDF (8.4MB)</span>
                </a>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl bg-amber-800 text-white text-xs font-bold hover:bg-amber-900"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
