import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ClipboardCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Printer,
  Sparkles,
  QrCode,
  ShieldCheck,
  Layers,
  ArrowRight,
  BookOpen,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ExamSubject } from '../../types';

export const ExamApplyView: React.FC = () => {
  const {
    currentUser,
    examSubjects,
    toggleSubjectRegistration,
    completeExamRegistration,
    isExamRegistered,
    examReceipt,
  } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('alex.rivera@okaxis');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4892');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<any>(examReceipt);

  const selectedSubjects = examSubjects.filter((s) => s.isRegistered);
  const totalCredits = selectedSubjects.reduce((sum, s) => sum + s.credits, 0);
  const totalFee = selectedSubjects.reduce((sum, s) => sum + s.fee, 0);

  const handleStartPayment = () => {
    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject to proceed with examination registration.');
      return;
    }
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const receipt = completeExamRegistration(
        paymentMethod === 'upi'
          ? `UPI (${upiId})`
          : paymentMethod === 'card'
          ? `Credit Card (Ending in 4892)`
          : 'NetBanking (Eduvora Campus Bank)'
      );
      setSuccessReceipt(receipt);
      setIsProcessing(false);
      setShowPaymentModal(false);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0D2F2F', '#FF6B4A', '#F7F4EE', '#10B981'],
      });
    }, 1500);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F] text-white text-xs font-bold mb-2">
            <ClipboardCheck className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Semester Examination Subject Registration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D2F2F]">
            End-Semester Exam Application (Spring 2026)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Candidate: <strong>{currentUser?.fullName}</strong> ({currentUser?.studentId}) • {currentUser?.program}
          </p>
        </div>

        {isExamRegistered && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Registration Form Remitted & Confirmed</span>
          </div>
        )}
      </div>

      {/* Main Grid: Subject Checklist (8 Cols) vs Fee Summary (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Subject Checklist */}
        <div className="lg:col-span-8 bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#EAE4D7] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D7]">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
                Curriculum Subjects Checklist
              </h3>
              <p className="text-xs text-slate-500">
                Tick the subjects you intend to register for in this examination cycle.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600">
              {selectedSubjects.length} of {examSubjects.length} selected
            </span>
          </div>

          {/* Subjects Table / List */}
          <div className="space-y-3">
            {examSubjects.map((subject) => {
              const isSelected = subject.isRegistered;
              return (
                <div
                  key={subject.code}
                  onClick={() => toggleSubjectRegistration(subject.code)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-white border-[#0D2F2F] shadow-xs ring-1 ring-[#0D2F2F]/20'
                      : 'bg-[#FAF7F2] border-[#EAE4D7] opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}} // Handled by container onClick
                      className="w-5 h-5 mt-0.5 sm:mt-0 rounded text-[#FF6B4A] focus:ring-[#FF6B4A] border-[#DDD6C8] cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-xs text-[#0D2F2F]">
                          {subject.code}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            subject.type === 'Theory'
                              ? 'bg-blue-100 text-blue-900'
                              : subject.type === 'Practical'
                              ? 'bg-emerald-100 text-emerald-900'
                              : subject.type === 'Elective'
                              ? 'bg-purple-100 text-purple-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {subject.type}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {subject.credits} Credits
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0D2F2F] mt-1">
                        {subject.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Slot: {subject.examDate} • {subject.session}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-[#0D2F2F] block">
                      ₹{subject.fee}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Exam Fee</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 4 Cols: Live Computed Fee & Remittance Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0D2F2F] text-white rounded-3xl p-6 border border-[#1A4F4F] shadow-lg space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B4A] block">
                Official Fee Assessment
              </span>
              <h3 className="font-serif font-bold text-xl text-white mt-0.5">
                Registration Summary
              </h3>
            </div>

            <div className="space-y-3 pt-2 text-xs border-t border-[#1A4F4F]">
              <div className="flex items-center justify-between text-slate-300">
                <span>Selected Subjects:</span>
                <span className="font-bold text-white">{selectedSubjects.length} Papers</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Total Registered Credits:</span>
                <span className="font-bold text-white">{totalCredits} Credits</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Theory Subjects (₹450 ea):</span>
                <span className="font-mono text-white">
                  ₹{selectedSubjects.filter((s) => s.type === 'Theory' || s.type === 'Elective').length * 450}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Practicals / Labs (₹600 ea):</span>
                <span className="font-mono text-white">
                  ₹{selectedSubjects.filter((s) => s.type === 'Practical').length * 600}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Mark Sheet / Grade Card Fee:</span>
                <span className="font-mono text-emerald-400">Included (₹0)</span>
              </div>

              <div className="pt-3 border-t border-[#1A4F4F] flex items-baseline justify-between">
                <span className="text-xs uppercase font-bold text-slate-300">Net Remittance:</span>
                <span className="text-2xl font-serif font-black text-[#FF6B4A]">
                  ₹{totalFee.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={handleStartPayment}
              className="w-full py-4 rounded-2xl bg-[#FF6B4A] hover:bg-[#E55535] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isExamRegistered ? 'Update & Pay Remittance' : 'Proceed to Remittance'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Instant Digital Receipt & Admit Card Sync</span>
            </div>
          </div>

          {/* Active Receipt Card if Registered */}
          {successReceipt && (
            <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#EAE4D7] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-serif font-bold text-sm text-[#0D2F2F]">
                    Digital Exam Fee Receipt
                  </h4>
                </div>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">
                  PAID
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#EAE4D7] text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction Ref:</span>
                  <span className="font-mono font-bold text-[#0D2F2F]">{successReceipt.txId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timestamp:</span>
                  <span className="text-slate-700">{successReceipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Remitted:</span>
                  <span className="font-bold text-emerald-700">₹{successReceipt.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Channel:</span>
                  <span className="text-slate-700">{successReceipt.paymentMethod}</span>
                </div>
              </div>

              <button
                onClick={handlePrintReceipt}
                className="w-full py-2.5 rounded-xl border border-[#0D2F2F] hover:bg-[#0D2F2F] hover:text-white text-[#0D2F2F] font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Receipt</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Gateway Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EAE4D7] p-6 sm:p-8 animate-in zoom-in-95 relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-[#0D2F2F] hover:bg-[#EAE4D7]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#0D2F2F] text-[#FF6B4A] flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
                  Examination Fee Gateway
                </h3>
                <p className="text-xs text-slate-500">Eduvora Central Bursar Remittance</p>
              </div>
            </div>

            {/* Total Due Banner */}
            <div className="p-4 rounded-2xl bg-[#0D2F2F] text-white flex items-center justify-between mb-5">
              <div>
                <span className="text-[10px] text-slate-300 uppercase block">Total Amount Due</span>
                <span className="text-xs text-slate-200">{selectedSubjects.length} Registered Courses</span>
              </div>
              <span className="text-2xl font-serif font-bold text-[#FF6B4A]">
                ₹{totalFee.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Payment Method Selector */}
            <form onSubmit={handleConfirmPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-2">
                  Select Remittance Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-[#0D2F2F] text-white border-[#0D2F2F]'
                        : 'bg-white text-slate-700 border-[#DDD6C8]'
                    }`}
                  >
                    UPI FastPay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-[#0D2F2F] text-white border-[#0D2F2F]'
                        : 'bg-white text-slate-700 border-[#DDD6C8]'
                    }`}
                  >
                    Debit / Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'bg-[#0D2F2F] text-white border-[#0D2F2F]'
                        : 'bg-white text-slate-700 border-[#DDD6C8]'
                    }`}
                  >
                    NetBanking
                  </button>
                </div>
              </div>

              {paymentMethod === 'upi' ? (
                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] mb-1">
                    Virtual Payment Address (UPI ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@bank"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-mono font-bold"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    A collect request will be sent to your UPI App (GPay, PhonePe, Paytm).
                  </p>
                </div>
              ) : paymentMethod === 'card' ? (
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-bold text-[#0D2F2F] mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-mono font-bold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      defaultValue="08/29"
                      className="px-3.5 py-2 rounded-xl bg-white border border-[#DDD6C8] text-xs font-mono"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      defaultValue="892"
                      className="px-3.5 py-2 rounded-xl bg-white border border-[#DDD6C8] text-xs font-mono"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] mb-1">Select Bank</label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-medium">
                    <option>Eduvora Campus Student Bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank NetBanking</option>
                    <option>ICICI Bank</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-[#FF6B4A] hover:bg-[#E55535] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-75"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Remittance...</span>
                  </div>
                ) : (
                  <>
                    <span>Confirm & Remit ₹{totalFee.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
