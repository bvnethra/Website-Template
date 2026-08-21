import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileCheck2, 
  CheckSquare, 
  Square, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Printer, 
  Download, 
  ShieldCheck, 
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initialAvailableSubjects, SubjectRegistration } from '../../data/portalData';

export const ExamApplication: React.FC = () => {
  const { currentUser } = useAuth();
  
  const [subjects, setSubjects] = useState<SubjectRegistration[]>(initialAvailableSubjects);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('REG-2026-SEM6-99381');

  // Arrear option
  const [includeArrear, setIncludeArrear] = useState(false);
  const arrearSubject: SubjectRegistration = {
    code: 'MA404-ARR',
    title: 'Probability & Stochastic Process (Optional Improvement)',
    credits: 4,
    type: 'Arrear',
    fee: 550,
    examDate: '30 Sep 2026',
    session: 'Morning (09:30 AM - 12:30 PM)',
    selected: true,
    internalMarks: 32,
    maxInternal: 40
  };

  const toggleSubject = (code: string) => {
    setSubjects(prev => prev.map(sub => 
      sub.code === code ? { ...sub, selected: !sub.selected } : sub
    ));
  };

  const selectedSubjects = subjects.filter(s => s.selected);
  const totalSubjectFee = selectedSubjects.reduce((acc, curr) => acc + curr.fee, 0) + (includeArrear ? arrearSubject.fee : 0);
  const marksheetFee = 150;
  const processingFee = 100;
  const grandTotal = totalSubjectFee + marksheetFee + processingFee;

  const handlePaymentAndSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setReceiptNumber(`REG-2026-SEM6-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F]/5 border border-[#0D2F2F]/10 text-xs font-bold text-[#0D2F2F] mb-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Semester 6 Exam Enrollment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D2F2F] font-display tracking-tight">
            End-Semester Examination Registration
          </h1>
          <p className="text-xs sm:text-sm text-[#476666] mt-0.5">
            Select regular and backlog courses, verify internal marks eligibility, and remit examination fees.
          </p>
        </div>

        {isSubmitted && (
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-[#0D2F2F] hover:bg-[#184E4E] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-[#FF6B4A]" />
            <span>Print Registration Slip</span>
          </button>
        )}
      </div>

      {isSubmitted ? (
        /* Success Registration Slip */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD5] shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5DFD5] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Registration Confirmed & Verified
                </span>
                <h2 className="text-xl font-bold text-[#0D2F2F] font-display mt-1">
                  Examination Acknowledgement Slip
                </h2>
              </div>
            </div>

            <div className="text-right font-mono text-xs text-[#476666]">
              <div>Receipt No: <span className="font-bold text-[#0D2F2F]">{receiptNumber}</span></div>
              <div>Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>

          {/* Student Meta Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] text-xs">
            <div>
              <span className="text-[#8A9E9E] block">Student Name</span>
              <span className="font-bold text-[#0D2F2F]">{currentUser?.name}</span>
            </div>
            <div>
              <span className="text-[#8A9E9E] block">Student ID</span>
              <span className="font-mono font-bold text-[#0D2F2F]">{currentUser?.studentId}</span>
            </div>
            <div>
              <span className="text-[#8A9E9E] block">Program</span>
              <span className="font-bold text-[#0D2F2F]">{currentUser?.program}</span>
            </div>
            <div>
              <span className="text-[#8A9E9E] block">Total Fee Remitted</span>
              <span className="font-bold text-[#FF6B4A]">₹{grandTotal.toLocaleString()} Paid (Online)</span>
            </div>
          </div>

          {/* Registered Subjects Table */}
          <div>
            <h3 className="text-sm font-bold text-[#0D2F2F] uppercase tracking-wider mb-3">
              Registered Papers & Timetable Schedule
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-[#E5DFD5]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] text-[#0D2F2F] font-bold border-b border-[#E5DFD5]">
                  <tr>
                    <th className="p-3">Code</th>
                    <th className="p-3">Subject Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Exam Date</th>
                    <th className="p-3">Session</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DFD5]">
                  {selectedSubjects.map(sub => (
                    <tr key={sub.code} className="hover:bg-[#F7F4EE]">
                      <td className="p-3 font-mono font-bold text-[#0D2F2F]">{sub.code}</td>
                      <td className="p-3 font-semibold text-[#0D2F2F]">{sub.title}</td>
                      <td className="p-3 text-[#476666]">{sub.type}</td>
                      <td className="p-3 font-bold text-[#0D2F2F]">{sub.examDate}</td>
                      <td className="p-3 text-[#476666]">{sub.session.split(' ')[0]}</td>
                      <td className="p-3">
                        <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold text-[10px]">
                          Approved
                        </span>
                      </td>
                    </tr>
                  ))}
                  {includeArrear && (
                    <tr className="bg-amber-50/60">
                      <td className="p-3 font-mono font-bold text-amber-900">{arrearSubject.code}</td>
                      <td className="p-3 font-semibold text-amber-900">{arrearSubject.title}</td>
                      <td className="p-3 text-amber-800">Improvement Arrear</td>
                      <td className="p-3 font-bold text-amber-900">{arrearSubject.examDate}</td>
                      <td className="p-3 text-amber-800">Morning</td>
                      <td className="p-3">
                        <span className="text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full font-bold text-[10px]">
                          Arrear Cleared
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-[#476666] border-t border-[#E5DFD5]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Digital Security Verification Complete. Proceed to Hall Ticket section.</span>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs font-bold text-[#FF6B4A] hover:underline"
            >
              Modify Application
            </button>
          </div>
        </motion.div>
      ) : (
        /* Examination Registration Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 8 Cols: Subject Checklist */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-[#E5DFD5] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#0D2F2F] font-display">
                    Semester 6 Regular Prescribed Subjects
                  </h2>
                  <p className="text-xs text-[#476666]">
                    Internal marks benchmark cleared (Min 50% required to register)
                  </p>
                </div>
                <span className="text-xs font-bold text-[#FF6B4A] bg-[#FF6B4A]/10 px-2.5 py-1 rounded-full">
                  {selectedSubjects.length} Selected
                </span>
              </div>

              {/* Subject Cards */}
              <div className="space-y-3 pt-1">
                {subjects.map((sub) => {
                  const isSelected = sub.selected;
                  const isEligible = sub.internalMarks >= (sub.maxInternal * 0.5);

                  return (
                    <div
                      key={sub.code}
                      onClick={() => toggleSubject(sub.code)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected 
                          ? 'bg-[#FAF8F5] border-[#FF6B4A]/50 shadow-xs' 
                          : 'bg-white border-[#E5DFD5] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          className="mt-0.5 text-[#0D2F2F]"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 text-[#FF6B4A]" />
                          ) : (
                            <Square className="w-5 h-5 text-[#8A9E9E]" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#0D2F2F]">{sub.code}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0D2F2F]/10 text-[#0D2F2F] font-bold">
                              {sub.type} ({sub.credits} Credits)
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-[#0D2F2F] mt-1">
                            {sub.title}
                          </h4>

                          <div className="flex items-center gap-3 text-[11px] text-[#476666] mt-1">
                            <span>Exam: <strong className="text-[#0D2F2F]">{sub.examDate}</strong></span>
                            <span>•</span>
                            <span>Internal Score: <strong className="text-emerald-700">{sub.internalMarks}/{sub.maxInternal}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-[#0D2F2F]">₹{sub.fee}</div>
                        <span className="text-[10px] text-[#8A9E9E]">Exam Fee</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Optional Arrear Improvement Checklist */}
              <div className="pt-4 border-t border-[#E5DFD5]">
                <div
                  onClick={() => setIncludeArrear(!includeArrear)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    includeArrear
                      ? 'bg-amber-50/70 border-amber-300'
                      : 'bg-[#FAF8F5] border-[#E5DFD5]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button type="button" className="mt-0.5 text-amber-800">
                      {includeArrear ? (
                        <CheckSquare className="w-5 h-5 text-amber-600" />
                      ) : (
                        <Square className="w-5 h-5 text-[#8A9E9E]" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-900">{arrearSubject.code}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">
                          Optional Backlog / Improvement
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-amber-900 mt-1">{arrearSubject.title}</h4>
                      <p className="text-[11px] text-amber-700 mt-0.5">Attempt to upgrade Semester 4 Grade (Exam: 30 Sep 2026)</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-amber-900">₹{arrearSubject.fee}</div>
                    <span className="text-[10px] text-amber-700">Arrear Fee</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right 4 Cols: Fee Calculator & Remittance Card */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-[#E5DFD5] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#0D2F2F] font-display flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#FF6B4A]" />
                Fee Breakdown & Payment
              </h3>

              {/* Breakdown List */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-[#476666]">
                  <span>Regular Papers ({selectedSubjects.length} subjects)</span>
                  <span className="font-bold text-[#0D2F2F]">₹{totalSubjectFee - (includeArrear ? arrearSubject.fee : 0)}</span>
                </div>

                {includeArrear && (
                  <div className="flex items-center justify-between text-amber-800">
                    <span>Arrear / Improvement Paper (1)</span>
                    <span className="font-bold">₹{arrearSubject.fee}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[#476666]">
                  <span>Statement of Marks & Transcript Fee</span>
                  <span className="font-bold text-[#0D2F2F]">₹{marksheetFee}</span>
                </div>

                <div className="flex items-center justify-between text-[#476666]">
                  <span>Portal Processing & Security Fee</span>
                  <span className="font-bold text-[#0D2F2F]">₹{processingFee}</span>
                </div>

                <div className="pt-3 border-t border-[#E5DFD5] flex items-center justify-between text-sm">
                  <span className="font-bold text-[#0D2F2F]">Total Amount Due</span>
                  <span className="text-lg font-black text-[#FF6B4A] font-display">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div className="pt-3 border-t border-[#E5DFD5]">
                <label className="text-xs font-bold text-[#0D2F2F] block mb-2">
                  Select Remittance Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('upi')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      paymentMode === 'upi'
                        ? 'bg-[#0D2F2F] text-white border-[#0D2F2F]'
                        : 'bg-[#FAF8F5] text-[#2D4F4F] border-[#E5DFD5]'
                    }`}
                  >
                    UPI / QR
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('card')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      paymentMode === 'card'
                        ? 'bg-[#0D2F2F] text-white border-[#0D2F2F]'
                        : 'bg-[#FAF8F5] text-[#2D4F4F] border-[#E5DFD5]'
                    }`}
                  >
                    Debit Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('netbanking')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      paymentMode === 'netbanking'
                        ? 'bg-[#0D2F2F] text-white border-[#0D2F2F]'
                        : 'bg-[#FAF8F5] text-[#2D4F4F] border-[#E5DFD5]'
                    }`}
                  >
                    NetBanking
                  </button>
                </div>
              </div>

              {/* Submit & Pay Button */}
              <button
                type="button"
                disabled={selectedSubjects.length === 0 || isProcessing}
                onClick={handlePaymentAndSubmit}
                className="w-full py-3.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#FF6B4A]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing University Remittance...</span>
                  </div>
                ) : (
                  <>
                    <span>Confirm & Pay ₹{grandTotal.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#8A9E9E] text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Eduvora Central Finance Registry Encrypted</span>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
