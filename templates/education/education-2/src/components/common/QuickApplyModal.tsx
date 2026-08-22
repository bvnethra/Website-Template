import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ArrowLeft, Sparkles, GraduationCap, ShieldCheck, Upload, FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { mockPrograms } from '../../data/mockData';

export const QuickApplyModal: React.FC = () => {
  const { isApplyModalOpen, closeApplyModal, applyProgramId, theme, config, addNotification } = useTheme();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedProgramId, setSelectedProgramId] = useState(applyProgramId || mockPrograms[0].id);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    citizenship: 'US Citizen / Permanent Resident',
    entryTerm: 'Fall 2025 (Priority)',
    priorSchool: '',
    gpa: '3.85',
    testScore: 'SAT 1490 / ACT 34',
    statement: '',
    honorCode: false,
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (!isApplyModalOpen) return null;

  const currentProgram = mockPrograms.find((p) => p.id === selectedProgramId) || mockPrograms[0];

  const handleNext = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        addNotification('warning', 'Missing Details', 'Please complete your name and contact email.');
        return;
      }
    }
    if (step === 3) {
      if (!formData.honorCode) {
        addNotification('warning', 'Honor Code Required', 'Please accept the Academic Integrity declaration.');
        return;
      }
    }
    setStep((prev) => (prev < 4 ? ((prev + 1) as any) : prev));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appRef = `CR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedId(appRef);
    setStep(4);
    addNotification('success', 'Application Submitted', `Your official admissions application ref #${appRef} has been recorded.`);
  };

  const handleClose = () => {
    setStep(1);
    setSubmittedId(null);
    closeApplyModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ backgroundColor: theme.primary }} className="p-6 text-white flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">
                Edunexa Admissions Portal
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                Undergraduate & Graduate Application
              </h3>
            </div>
          </div>

          <button onClick={handleClose} className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Tracker */}
        {step < 4 && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-500">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-800 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-amber-800 text-white' : 'bg-slate-200'}`}>1</span>
              <span>Degree & Info</span>
            </div>
            <div className="w-8 h-px bg-slate-200"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-800 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-amber-800 text-white' : 'bg-slate-200'}`}>2</span>
              <span>Academics</span>
            </div>
            <div className="w-8 h-px bg-slate-200"></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-amber-800 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-amber-800 text-white' : 'bg-slate-200'}`}>3</span>
              <span>Statement & Review</span>
            </div>
          </div>
        )}

        {/* Modal Form Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Select Intended Degree Program</label>
                <select
                  value={selectedProgramId}
                  onChange={(e) => setSelectedProgramId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                >
                  {mockPrograms.map((prog) => (
                    <option key={prog.id} value={prog.id}>
                      {prog.name} ({prog.level}) — ${prog.annualTuition.toLocaleString()}/yr
                    </option>
                  ))}
                </select>
                <div className="mt-2 p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs text-slate-700">
                  <span className="font-bold text-amber-900 block">{currentProgram.name}</span>
                  <span className="text-slate-600 block mt-0.5">{currentProgram.shortDescription}</span>
                  <span className="text-amber-800 font-semibold block mt-1">Application Deadline: {currentProgram.applicationDeadline}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">First Legal Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. John"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Last Legal Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Citizenship Status</label>
                  <select
                    value={formData.citizenship}
                    onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option>US Citizen / Permanent Resident</option>
                    <option>International Applicant (F-1 / J-1 Visa Required)</option>
                    <option>Undocumented / DACA Scholar</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Desired Entry Term</label>
                  <select
                    value={formData.entryTerm}
                    onChange={(e) => setFormData({ ...formData, entryTerm: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option>Fall 2025 (Priority Cohort)</option>
                    <option>Spring 2026</option>
                    <option>Fall 2026 (Early Action)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Current / Prior Academic Institution</label>
                <input
                  type="text"
                  value={formData.priorSchool}
                  onChange={(e) => setFormData({ ...formData, priorSchool: e.target.value })}
                  placeholder="e.g. Cambridge Preparatory Academy or University of Michigan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Cumulative GPA (Unweighted 4.0 scale)</label>
                  <input
                    type="text"
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    placeholder="3.85"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Standardized Test Scores (Optional)</label>
                  <input
                    type="text"
                    value={formData.testScore}
                    onChange={(e) => setFormData({ ...formData, testScore: e.target.value })}
                    placeholder="SAT / ACT / GRE / GMAT or Test-Optional"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Test-Optional Policy & Holistic Admissions
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Edunexa evaluates applications holistically. Standardized test submissions are purely optional and will never disadvantage candidates who opt out.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Personal Statement of Academic Purpose (200–500 words)
                </label>
                <textarea
                  rows={4}
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  placeholder="Describe your academic interests, foundational experiences, and why Edunexa University is the ideal catalyst for your scholarly goals..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-2 hover:border-amber-400 transition-colors bg-slate-50/50">
                <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                <div className="text-xs font-semibold text-slate-700">
                  Upload Transcripts & Letters of Recommendation
                </div>
                <p className="text-[11px] text-slate-400">PDF, DOCX up to 25MB (Can also be emailed by your school counselor)</p>
                <button
                  type="button"
                  onClick={() => addNotification('info', 'File Staged', 'Sample academic transcript attached.')}
                  className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50"
                >
                  Choose File
                </button>
              </div>

              <label className="flex items-start gap-2.5 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.honorCode}
                  onChange={(e) => setFormData({ ...formData, honorCode: e.target.checked })}
                  className="mt-1 rounded text-amber-800 focus:ring-amber-500 w-4 h-4"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I hereby certify that all information submitted is true, accurate, and represents my own authentic academic work under the Edunexa University Honor Code.
                </span>
              </label>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block">
                  Application Officially Logged
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-900">
                  Welcome to the Edunexa Community!
                </h3>
              </div>
              <div className="p-4 max-w-md mx-auto rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-bold text-slate-900">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Program:</span>
                  <span className="font-bold text-amber-800">{currentProgram.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Reference ID:</span>
                  <span className="font-mono font-bold text-slate-900">{submittedId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Decision:</span>
                  <span className="font-bold text-slate-800">Within 3–4 Weeks</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                An admissions verification email and your applicant portal credentials have been transmitted to <strong className="text-slate-800">{formData.email || 'your email'}</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep((prev) => ((prev - 1) as any))}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              style={{ backgroundColor: theme.primary }}
              className="px-6 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm hover:opacity-95 flex items-center gap-1.5 ml-auto shadow-sm"
            >
              <span>Continue Step {step + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : step === 3 ? (
            <button
              onClick={handleSubmit}
              style={{ backgroundColor: theme.accent }}
              className="px-6 py-2.5 rounded-xl text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 flex items-center gap-1.5 ml-auto shadow-md"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Submit Official Application</span>
            </button>
          ) : (
            <button
              onClick={handleClose}
              style={{ backgroundColor: theme.primary }}
              className="px-6 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm hover:opacity-95 mx-auto shadow-sm"
            >
              Close & Return to Campus Portal
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
