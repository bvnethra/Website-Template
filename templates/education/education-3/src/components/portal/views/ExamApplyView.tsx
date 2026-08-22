import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { SubjectExamItem } from '../../../types/auth';
import { INITIAL_EXAM_SUBJECTS } from '../../../data/portalMockData';
import { 
  CheckSquare, 
  Square, 
  CreditCard, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  DollarSign, 
  AlertCircle,
  Download,
  Calendar,
  Building,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const ExamApplyView: React.FC = () => {
  const { currentUser, examApplications, submitExamApplication } = useAuth();
  const { addToast } = useApp();

  const [subjectsList, setSubjectsList] = useState<SubjectExamItem[]>(INITIAL_EXAM_SUBJECTS);
  const [paymentMode, setPaymentMode] = useState<string>('Student Smart Account / Card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<any | null>(null);

  const toggleSubject = (code: string) => {
    setSubjectsList(prev =>
      prev.map(s => (s.code === code ? { ...s, selected: !s.selected } : s))
    );
  };

  const selectedSubjects = subjectsList.filter(s => s.selected);
  const regularSubjectsCount = selectedSubjects.filter(s => s.type === 'Regular' || s.type === 'Elective').length;
  const practicalCount = selectedSubjects.filter(s => s.type === 'Practical').length;
  const backlogCount = selectedSubjects.filter(s => s.type === 'Backlog').length;

  const totalFee = selectedSubjects.reduce((sum, s) => sum + s.fee, 0);

  const handleApplyAndPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubjects.length === 0) {
      addToast({
        type: 'error',
        title: 'Subject Selection Required',
        message: 'Please select at least one course for the examination cycle.'
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const record = submitExamApplication(selectedSubjects, paymentMode);
      setSuccessReceipt(record);
      setIsSubmitting(false);
      addToast({
        type: 'success',
        title: 'Exam Application Registered',
        message: `Registered for ${selectedSubjects.length} subjects. Total: $${totalFee}. Hall ticket generated.`
      });
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#0D2F2F]">
          End-Semester Examination Subject Registration
        </h2>
        <p className="text-xs sm:text-sm text-[#4A5D4E]">
          Select regular semester courses, elective papers, or arrear/backlog courses for Autumn 2026 examination sitting.
        </p>
      </div>

      {/* Main Grid: Subject Checklist & Fee Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Subject Checklist Form */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#E8EAE3]">
              <div>
                <h3 className="font-heading text-base font-bold text-[#0D2F2F]">
                  Curriculum Course Selection (Semester {currentUser.semester})
                </h3>
                <p className="text-xs text-[#4A5D4E]">
                  Academic Year: {currentUser.academicYear} • Branch: {currentUser.department}
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold self-start">
                Attendance: 94.2% (Eligible)
              </span>
            </div>

            {/* Subjects Table */}
            <div className="space-y-3">
              {subjectsList.map((subject) => (
                <div
                  key={subject.code}
                  onClick={() => toggleSubject(subject.code)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    subject.selected
                      ? 'bg-[#FDFBF7] border-[#0D2F2F] shadow-xs'
                      : 'bg-white border-[#E8EAE3] hover:border-[#DDD8CE] opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      type="button"
                      className="mt-0.5 text-[#0D2F2F]"
                      aria-label={subject.selected ? 'Deselect subject' : 'Select subject'}
                    >
                      {subject.selected ? (
                        <CheckSquare className="w-5 h-5 text-[#0D2F2F]" />
                      ) : (
                        <Square className="w-5 h-5 text-[#A7B3A2]" />
                      )}
                    </button>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0D2F2F] bg-[#F4F1EA] px-2 py-0.5 rounded">
                          {subject.code}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          subject.type === 'Practical'
                            ? 'bg-blue-100 text-blue-800'
                            : subject.type === 'Backlog'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-[#0D2F2F] text-white'
                        }`}>
                          {subject.type}
                        </span>
                        <span className="text-xs text-[#4A5D4E]">{subject.credits} Credits</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0D2F2F] mt-1">
                        {subject.name}
                      </h4>
                      <p className="text-[11px] text-[#4A5D4E] mt-0.5">
                        Faculty Lead: {subject.instructor}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-[#0D2F2F] font-mono">
                      ${subject.fee}.00
                    </div>
                    <span className="text-[10px] text-[#4A5D4E]">Exam Fee</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Eligibility Note */}
            <div className="mt-5 p-3.5 bg-[#F4F1EA] rounded-2xl border border-[#E0DCD3] flex items-center gap-3 text-xs text-[#4A5D4E]">
              <ShieldCheck className="w-5 h-5 text-[#0D2F2F] shrink-0" />
              <span>
                Hall Ticket admit cards are auto-generated upon fee receipt verification by the Finance Division.
              </span>
            </div>

          </div>

          {/* Past Exam Registrations History */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs">
            <h3 className="font-heading text-base font-bold text-[#0D2F2F] mb-3">
              Application Submission Ledger
            </h3>
            <div className="divide-y divide-[#E8EAE3]">
              {examApplications.map((app) => (
                <div key={app.applicationNo} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#0D2F2F]">{app.applicationNo}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {app.paymentStatus}
                      </span>
                    </div>
                    <p className="text-[#4A5D4E] mt-0.5">
                      Submitted on {app.appliedDate} • {app.subjects.length} registered subjects ({app.paymentMode})
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#0D2F2F] font-mono">${app.totalFee}.00 USD</span>
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                      Hall Ticket Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Fee Breakdown & Payment Gateway Simulation */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-5">
            <h3 className="font-heading text-base font-bold text-[#0D2F2F] pb-3 border-b border-[#E8EAE3]">
              Fee Assessment Summary
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-[#4A5D4E]">
                <span>Regular / Elective Theory ({regularSubjectsCount} papers)</span>
                <span className="font-mono font-bold text-[#0D2F2F]">
                  ${regularSubjectsCount * 25}.00
                </span>
              </div>
              <div className="flex justify-between text-[#4A5D4E]">
                <span>Practical & Viva Voce ({practicalCount} labs)</span>
                <span className="font-mono font-bold text-[#0D2F2F]">
                  ${practicalCount * 30}.00
                </span>
              </div>
              {backlogCount > 0 && (
                <div className="flex justify-between text-[#4A5D4E]">
                  <span>Arrear / Backlog Papers ({backlogCount})</span>
                  <span className="font-mono font-bold text-[#0D2F2F]">
                    ${backlogCount * 35}.00
                  </span>
                </div>
              )}
              <div className="flex justify-between text-[#4A5D4E]">
                <span>Central Valuation & Gazetting Levy</span>
                <span className="font-mono font-bold text-emerald-600">Waived (Scholar)</span>
              </div>

              <div className="pt-3 border-t border-[#E8EAE3] flex justify-between items-baseline">
                <span className="font-bold text-sm text-[#0D2F2F]">Total Payable Amount</span>
                <span className="text-xl font-heading font-extrabold text-[#0D2F2F] font-mono">
                  ${totalFee}.00
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-[#0D2F2F] uppercase tracking-wider">
                Payment Channel
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs font-medium text-[#0D2F2F] focus:outline-none focus:ring-2 focus:ring-[#0D2F2F]"
              >
                <option value="Student Smart Account / Card">Student Smart Account (Pre-authorized)</option>
                <option value="Online Credit / Debit Card">Credit / Debit Card (Visa/Mastercard)</option>
                <option value="Central Net Banking Portal">Eduvora Central Net Banking</option>
                <option value="Campus UPI FastPay">Instant UPI / QR Payment</option>
              </select>
            </div>

            <button
              type="button"
              id="btn-confirm-exam-application"
              onClick={handleApplyAndPay}
              disabled={isSubmitting || selectedSubjects.length === 0}
              className="w-full bg-[#0D2F2F] hover:bg-[#082020] text-white py-3.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Authorizing Bursar Transaction...</span>
              ) : (
                <>
                  <span>Confirm Registration & Pay (${totalFee}.00)</span>
                  <ArrowRight className="w-4 h-4 text-[#FF6B4A]" />
                </>
              )}
            </button>

            <div className="text-[11px] text-[#4A5D4E] text-center">
              Transactions are verified via Eduvora Bursar Gateway with instant receipt delivery.
            </div>

          </div>

          {/* Success Application Docket */}
          {successReceipt && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-xs text-emerald-900 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Registration Confirmed</span>
              </div>
              <p>
                Application Reference <strong>{successReceipt.applicationNo}</strong> has been registered. Transaction ID: <span className="font-mono">{successReceipt.paymentRef}</span>.
              </p>
              <div className="pt-2 border-t border-emerald-200 flex items-center justify-between">
                <span className="font-semibold">Hall Ticket Available</span>
                <span className="text-[11px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">Generated</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
