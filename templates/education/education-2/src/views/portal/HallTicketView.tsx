import React from 'react';
import {
  Printer,
  Download,
  QrCode,
  ShieldCheck,
  Building,
  Calendar,
  AlertTriangle,
  FileCheck,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HallTicketView: React.FC = () => {
  const { currentUser, hallTicket, examSubjects } = useAuth();

  const handlePrint = () => {
    window.print();
  };

  const registeredSubjects = examSubjects.filter((s) => s.isRegistered);

  return (
    <div className="space-y-6">
      {/* Top Action Bar (hidden during print) */}
      <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F] text-white text-xs font-bold mb-1.5">
            <FileCheck className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Official University Hall Ticket (Admit Card)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#0D2F2F]">
            Spring 2026 End-Semester Admit Card
          </h1>
          <p className="text-xs text-slate-600">
            Validated by Controller of Examinations • Issue Date: {hallTicket.issueDate}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-2xl bg-[#0D2F2F] hover:bg-[#081E1E] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#FF6B4A]" />
            <span>Print Admit Card</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl bg-[#FF6B4A] hover:bg-[#E55535] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Official Printable Hall Ticket Sheet */}
      <div
        id="hall-ticket-printable"
        className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 border-2 border-[#0D2F2F] shadow-lg max-w-4xl mx-auto space-y-6 relative overflow-hidden print:border-none print:shadow-none print:p-2 print:m-0 print:rounded-none"
      >
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
          <span className="font-serif font-black text-9xl text-[#0D2F2F] rotate-[-25deg]">
            EDUVORA
          </span>
        </div>

        {/* 1. UNIVERSITY EMBLEM & HEADER */}
        <div className="border-b-2 border-[#0D2F2F] pb-5 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0D2F2F] text-white flex items-center justify-center font-serif font-black text-2xl shadow-md border-2 border-[#FF6B4A] shrink-0">
                EV
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-[#0D2F2F] uppercase">
                  Eduvora University
                </h2>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                  Office of the Controller of Examinations
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  North Academic Complex, Boston, Massachusetts 02115 • Accredited NAAC A++
                </p>
              </div>
            </div>

            {/* Admit Card Label */}
            <div className="text-center sm:text-right border sm:border-0 p-2 sm:p-0 rounded-xl bg-slate-50 sm:bg-transparent">
              <span className="inline-block px-3 py-1 rounded-md bg-[#0D2F2F] text-white text-xs font-bold tracking-wider uppercase">
                Official Hall Ticket
              </span>
              <p className="text-xs font-mono font-bold text-[#0D2F2F] mt-1">
                Admit No: {hallTicket.admitCardNumber}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">
                Session: {hallTicket.academicYear}
              </p>
            </div>
          </div>
        </div>

        {/* 2. CANDIDATE PROFILE & VERIFICATION MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 bg-[#FAF7F2] p-5 rounded-2xl border border-[#EAE4D7]">
          {/* Candidate Details (9 cols) */}
          <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Candidate Name
              </span>
              <span className="font-bold text-slate-900 text-sm">{currentUser?.fullName}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Student ID / Roll No.
              </span>
              <span className="font-mono font-bold text-[#0D2F2F] text-sm">
                {currentUser?.studentId}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                University Reg. Number
              </span>
              <span className="font-mono font-bold text-slate-800 text-xs">
                {currentUser?.registrationNumber}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Degree & Branch</span>
              <span className="font-semibold text-slate-900">{currentUser?.program}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Semester / Year</span>
              <span className="font-semibold text-slate-900">Semester VI (3rd Year)</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Examination Centre</span>
              <span className="font-semibold text-slate-900">Main Campus (Block T)</span>
            </div>

            <div className="col-span-2 sm:col-span-3">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Venue Location</span>
              <span className="text-slate-700">{hallTicket.examinationCentre}</span>
            </div>
          </div>

          {/* Candidate Photo & Barcode (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-center justify-center text-center border-t md:border-t-0 md:border-l border-[#DDD6C8] pt-4 md:pt-0 md:pl-4 space-y-2">
            <img
              src={currentUser?.avatarUrl}
              alt={currentUser?.fullName}
              className="w-24 h-28 object-cover rounded-xl border-2 border-[#0D2F2F] shadow-xs"
            />
            <div className="text-[9px] font-bold text-slate-500 uppercase">Candidate Attested</div>
            <div className="font-mono text-[10px] tracking-widest font-black text-[#0D2F2F] bg-white px-2 py-0.5 rounded border border-slate-300">
              *EDV2026CS104*
            </div>
          </div>
        </div>

        {/* 3. EXAMINATION TIMETABLE MATRIX */}
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm text-[#0D2F2F] uppercase tracking-wide">
              Registered Examination Schedule
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              Total Subjects: {registeredSubjects.length}
            </span>
          </div>

          <div className="overflow-x-auto border border-[#0D2F2F] rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0D2F2F] text-white uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-2.5 px-3">Subject Code</th>
                  <th className="py-2.5 px-3">Subject Title</th>
                  <th className="py-2.5 px-3">Exam Date</th>
                  <th className="py-2.5 px-3">Session & Time</th>
                  <th className="py-2.5 px-3">Hall / Desk</th>
                  <th className="py-2.5 px-3 text-center">Invigilator Sign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {registeredSubjects.map((sub, idx) => (
                  <tr key={sub.code} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#0D2F2F]">{sub.code}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{sub.name}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-800 whitespace-nowrap">
                      {sub.examDate}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">{sub.session}</td>
                    <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                      {sub.hallNumber} ({sub.deskNumber})
                    </td>
                    <td className="py-2.5 px-3 text-center border-l border-slate-200 w-28">
                      <div className="h-6 border-b border-dashed border-slate-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. INSTRUCTIONS TO CANDIDATES */}
        <div className="relative z-10 p-4 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-700 space-y-1.5 leading-relaxed">
          <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase text-[11px]">
            <AlertTriangle className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Important Mandatory Instructions for Examination Hall</span>
          </div>
          <ol className="list-decimal list-inside space-y-0.5 text-slate-600">
            <li>Candidates must occupy designated seats 15 minutes before commencement (09:15 AM / 01:45 PM).</li>
            <li>No candidate will be allowed entry into the examination hall after 30 minutes of commencement.</li>
            <li>Possession of mobile phones, smart watches, digital storage, or unauthorized materials is strictly penalized.</li>
            <li>This Admit Card along with University Student Identity Card must be produced on demand.</li>
          </ol>
        </div>

        {/* 5. VALIDATION SEAL & SIGNATURES */}
        <div className="relative z-10 pt-4 border-t-2 border-[#0D2F2F] grid grid-cols-3 items-center text-center gap-4 text-xs">
          {/* QR Code Validation */}
          <div className="flex items-center gap-2 text-left">
            <div className="p-1.5 bg-white border border-slate-300 rounded-lg shrink-0">
              <QrCode className="w-12 h-12 text-[#0D2F2F]" />
            </div>
            <div className="text-[10px] text-slate-500">
              <span className="font-bold text-[#0D2F2F] block">COE QR SEAL</span>
              <span>Scan to verify candidate authentic registry status.</span>
            </div>
          </div>

          {/* Candidate Signature */}
          <div>
            <div className="h-10 flex items-end justify-center">
              <span className="font-serif italic text-sm text-slate-700">Alex Rivera</span>
            </div>
            <div className="border-t border-slate-400 pt-1 text-[10px] font-bold text-slate-600 uppercase">
              Signature of Candidate
            </div>
          </div>

          {/* Controller of Examinations */}
          <div>
            <div className="h-10 flex items-end justify-center">
              <span className="font-serif font-black text-sm text-[#0D2F2F]">Dr. Aris Thorne</span>
            </div>
            <div className="border-t border-[#0D2F2F] pt-1 text-[10px] font-bold text-[#0D2F2F] uppercase">
              Controller of Examinations
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
