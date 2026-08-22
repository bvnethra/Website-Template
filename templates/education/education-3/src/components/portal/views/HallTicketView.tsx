import React, { useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { 
  Printer, 
  Download, 
  QrCode, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  AlertTriangle,
  Building,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export const HallTicketView: React.FC = () => {
  const { hallTicket, currentUser } = useAuth();
  const { addToast } = useApp();
  const printableRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    addToast({
      type: 'success',
      title: 'Hall Ticket PDF Exported',
      message: `Official signed Admit Card for ${hallTicket.studentId} downloaded with verification barcode.`
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-[#E8EAE3] shadow-xs">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0D2F2F]">
            Autonomous Examination Hall Ticket
          </h2>
          <p className="text-xs text-[#4A5D4E]">
            Official Admit Card for Autumn 2026 End-Semester Examinations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            id="btn-print-hall-ticket"
            onClick={handlePrint}
            className="px-4 py-2.5 bg-[#F4F1EA] hover:bg-[#E8EAE3] text-[#0D2F2F] font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#0D2F2F]" />
            <span>Print Admit Card</span>
          </button>

          <button
            type="button"
            id="btn-download-hall-ticket-pdf"
            onClick={handleDownloadPdf}
            className="px-4 py-2.5 bg-[#0D2F2F] hover:bg-[#082020] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#FF6B4A]" />
            <span>Download Official PDF</span>
          </button>
        </div>
      </div>

      {/* Official Admit Card Document Card (Print Optimized) */}
      <div 
        ref={printableRef}
        id="official-hall-ticket-document"
        className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0D2F2F] shadow-lg space-y-6 relative overflow-hidden"
      >
        {/* Subtle Watermark Seal */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none font-heading font-black text-9xl text-[#0D2F2F]">
          EDUVORA
        </div>

        {/* Institution Letterhead */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#0D2F2F]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0D2F2F] text-white flex items-center justify-center font-heading font-extrabold text-3xl shadow-sm shrink-0">
              E
            </div>
            <div>
              <span className="font-heading text-xl sm:text-2xl font-black text-[#0D2F2F] tracking-tight block leading-tight">
                EDUVORA UNIVERSITY
              </span>
              <span className="text-xs font-bold text-[#4A5D4E] tracking-wider uppercase block">
                Office of the Controller of Examinations • Autonomous Faculty Roster
              </span>
              <span className="text-[11px] text-[#4A5D4E] italic block">
                Established under State Legislative Charter Act • Accredited NAAC 'A++' Grade
              </span>
            </div>
          </div>

          {/* Right Header Metadata */}
          <div className="sm:text-right text-xs space-y-1">
            <span className="inline-block px-3 py-1 bg-[#0D2F2F] text-white font-bold text-xs rounded-lg">
              HALL TICKET / ADMIT CARD
            </span>
            <div className="font-mono text-xs text-[#0D2F2F] font-bold">
              Doc Ref: {hallTicket.hallTicketNo}
            </div>
            <div className="text-[11px] text-[#4A5D4E]">
              Session: {hallTicket.examSession}
            </div>
          </div>
        </div>

        {/* Candidate Information & Biometrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 bg-[#FDFBF7] rounded-2xl border border-[#E8EAE3]">
          
          {/* Candidate Photo & Barcode (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-center sm:items-start gap-3">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-28 h-32 object-cover rounded-xl border-2 border-[#0D2F2F] shadow-xs"
              />
              <span className="absolute bottom-1 right-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                VERIFIED
              </span>
            </div>
            
            {/* Simulated Candidate Barcode */}
            <div className="text-center font-mono text-[10px] text-[#0D2F2F] font-bold tracking-widest bg-white px-3 py-1 rounded border border-[#DDD8CE]">
              ||| | |||| | || ||| | |||
              <div className="text-[8px] text-[#4A5D4E] tracking-normal">{currentUser.studentId}</div>
            </div>
          </div>

          {/* Candidate Details (6 cols) */}
          <div className="md:col-span-6 grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
            <div>
              <span className="text-[10px] text-[#4A5D4E] uppercase font-bold block">Candidate Name</span>
              <span className="font-bold text-sm text-[#0D2F2F]">{currentUser.name}</span>
            </div>

            <div>
              <span className="text-[10px] text-[#4A5D4E] uppercase font-bold block">Student ID / Roll No</span>
              <span className="font-bold text-sm font-mono text-[#0D2F2F]">{currentUser.studentId}</span>
            </div>

            <div>
              <span className="text-[10px] text-[#4A5D4E] uppercase font-bold block">Degree & Program</span>
              <span className="font-medium text-[#0D2F2F]">{currentUser.degree}</span>
            </div>

            <div>
              <span className="text-[10px] text-[#4A5D4E] uppercase font-bold block">Specialization</span>
              <span className="font-medium text-[#0D2F2F]">{currentUser.specialization}</span>
            </div>

            <div>
              <span className="text-[10px] text-[#4A5D4E] uppercase font-bold block">Current Semester</span>
              <span className="font-medium text-[#0D2F2F]">Semester {currentUser.semester} ({currentUser.section})</span>
            </div>

            <div>
              <span className="text-[10px] text-[#4A5D4E] uppercase font-bold block">Examination Center</span>
              <span className="font-medium text-[#0D2F2F]">{hallTicket.centerName}</span>
            </div>
          </div>

          {/* QR Verification & Signature (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-[#E8EAE3] text-center space-y-2">
            <div className="w-20 h-20 bg-[#F4F1EA] p-1 rounded-xl flex items-center justify-center border border-[#DDD8CE]">
              <QrCode className="w-16 h-16 text-[#0D2F2F]" />
            </div>
            <span className="text-[9px] text-[#4A5D4E] font-medium leading-tight">
              Scan to verify biometric token at Hall Checkpoint
            </span>
          </div>

        </div>

        {/* Timetable of Allotted Examinations */}
        <div className="space-y-2">
          <h3 className="font-heading text-sm font-bold text-[#0D2F2F] uppercase tracking-wider">
            Allotted Examination Schedule & Seating Arrangement
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-[#E8EAE3]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0D2F2F] text-white">
                  <th className="py-3 px-3.5 font-bold">Course Code</th>
                  <th className="py-3 px-3.5 font-bold">Course Title</th>
                  <th className="py-3 px-3.5 font-bold">Exam Date</th>
                  <th className="py-3 px-3.5 font-bold">Session & Timings</th>
                  <th className="py-3 px-3.5 font-bold">Hall / Room</th>
                  <th className="py-3 px-3.5 font-bold">Seat No.</th>
                  <th className="py-3 px-3.5 font-bold text-center">Invigilator Sign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAE3] bg-white">
                {hallTicket.timetable.map((slot, index) => (
                  <tr key={slot.subjectCode} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FDFBF7]'}>
                    <td className="py-3 px-3.5 font-mono font-bold text-[#0D2F2F]">{slot.subjectCode}</td>
                    <td className="py-3 px-3.5 font-medium text-[#0D2F2F]">{slot.subjectName}</td>
                    <td className="py-3 px-3.5 font-bold text-[#0D2F2F] whitespace-nowrap">{slot.examDate}</td>
                    <td className="py-3 px-3.5 text-[#4A5D4E] whitespace-nowrap">{slot.session}</td>
                    <td className="py-3 px-3.5 font-semibold text-[#0D2F2F] whitespace-nowrap">{slot.hallNo}</td>
                    <td className="py-3 px-3.5 font-mono font-bold text-[#0D2F2F] whitespace-nowrap">{slot.seatNo}</td>
                    <td className="py-3 px-3.5 text-center text-[#DDD8CE] font-mono select-none">
                      [ ________ ]
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Examination Rules & Instructions */}
        <div className="p-4 bg-[#F4F1EA] rounded-2xl border border-[#E0DCD3] space-y-2">
          <span className="text-xs font-bold text-[#0D2F2F] uppercase flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#FF6B4A]" />
            Rules for Candidates & Code of Conduct
          </span>
          <ul className="text-[11px] text-[#4A5D4E] space-y-1 list-disc list-inside">
            {hallTicket.instructions.map((inst, idx) => (
              <li key={idx}>{inst}</li>
            ))}
          </ul>
        </div>

        {/* Digital Signature & Seal Strip */}
        <div className="pt-6 border-t-2 border-[#0D2F2F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-center sm:text-left">
            <span className="font-mono text-[10px] text-[#4A5D4E] block">Candidate Digital Attestation</span>
            <span className="font-heading font-bold text-[#0D2F2F] italic">Alex Morgan</span>
            <span className="text-[9px] text-[#4A5D4E] block">Electronically verified via Student Portal</span>
          </div>

          <div className="text-center sm:text-right">
            <span className="font-mono text-[10px] text-[#4A5D4E] block">Issued under Autonomous Seal</span>
            <span className="font-heading font-bold text-[#0D2F2F] block">
              {hallTicket.controllerSignUrl}
            </span>
            <span className="text-[9px] text-[#4A5D4E] block">Autonomous Examination Council</span>
          </div>
        </div>

      </div>

    </div>
  );
};
