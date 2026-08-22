import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Ticket, 
  Printer, 
  Download, 
  QrCode, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  Clock, 
  MapPin, 
  GraduationCap, 
  CheckCircle2,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initialHallTicket } from '../../data/portalData';

export const HallTicketView: React.FC = () => {
  const { currentUser } = useAuth();
  const ticket = initialHallTicket;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F]/5 border border-[#0D2F2F]/10 text-xs font-bold text-[#0D2F2F] mb-1.5">
            <Ticket className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Official Examination Admit Card</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D2F2F] font-display tracking-tight">
            Download & Verify Hall Ticket
          </h1>
          <p className="text-xs sm:text-sm text-[#476666] mt-0.5">
            End-Semester Spring 2026 Examination Hall Ticket with seat allocation and security barcode.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#FF6B4A]/25 transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Admit Card</span>
          </button>
        </div>
      </div>

      {/* Printable Admit Card Document Container */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0D2F2F] shadow-xl relative overflow-hidden font-sans print:border-none print:shadow-none print:p-0 print:m-0"
      >
        {/* University Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <GraduationCap className="w-[450px] h-[450px] text-[#0D2F2F]" />
        </div>

        {/* Top Header of Hall Ticket */}
        <div className="border-b-2 border-[#0D2F2F] pb-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0D2F2F] text-white flex items-center justify-center shadow-sm shrink-0">
                <GraduationCap className="w-8 h-8 text-[#FF6B4A]" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#FF6B4A] font-bold block uppercase">
                  Learnora University of Engineering & Applied Sciences
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#0D2F2F] uppercase tracking-wide font-display">
                  Official Examination Hall Ticket (Admit Card)
                </h2>
                <p className="text-xs text-[#476666] mt-0.5">
                  Office of the Controller of Examinations • End-Semester Assessments (Spring 2026)
                </p>
              </div>
            </div>

            {/* Hall Ticket Meta Number */}
            <div className="text-center sm:text-right bg-[#FAF8F5] p-3 rounded-2xl border border-[#E5DFD5]">
              <span className="text-[10px] text-[#8A9E9E] uppercase font-bold block">Admit Card No.</span>
              <span className="text-sm font-mono font-black text-[#0D2F2F]">{ticket.hallTicketNumber}</span>
              <div className="text-[10px] text-emerald-700 font-bold mt-0.5 flex items-center justify-center sm:justify-end gap-1">
                <CheckCircle2 className="w-3 h-3" /> Valid for Entry
              </div>
            </div>
          </div>
        </div>

        {/* Student Credential & Photo Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-[#E5DFD5] items-center">
          
          {/* Student Photo */}
          <div className="md:col-span-3 flex flex-col items-center">
            <div className="w-28 h-36 rounded-2xl bg-[#FAF8F5] border-2 border-[#0D2F2F] overflow-hidden p-1 shadow-xs">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                alt={currentUser?.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <span className="text-[10px] font-mono text-[#8A9E9E] mt-1.5 uppercase font-bold">Biometric Verified</span>
          </div>

          {/* Student Metadata Table */}
          <div className="md:col-span-6 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#8A9E9E] block text-[11px]">Candidate Name</span>
              <strong className="text-sm text-[#0D2F2F] block">{currentUser?.name}</strong>
            </div>
            <div>
              <span className="text-[#8A9E9E] block text-[11px]">Student Roll / Reg ID</span>
              <strong className="text-sm font-mono text-[#0D2F2F] block">{currentUser?.studentId}</strong>
            </div>
            <div>
              <span className="text-[#8A9E9E] block text-[11px]">Program & Department</span>
              <span className="text-[#0D2F2F] font-semibold block">{currentUser?.department}</span>
            </div>
            <div>
              <span className="text-[#8A9E9E] block text-[11px]">Academic Term & Batch</span>
              <span className="text-[#0D2F2F] font-semibold block">Sem {currentUser?.semester} ({currentUser?.batch})</span>
            </div>
            <div>
              <span className="text-[#8A9E9E] block text-[11px]">Assigned Exam Center</span>
              <span className="text-[#0D2F2F] font-semibold block">{ticket.examCenter}</span>
            </div>
            <div>
              <span className="text-[#8A9E9E] block text-[11px]">Center Code & Allocated Seat</span>
              <span className="font-mono font-bold text-[#FF6B4A] block">{ticket.centerCode} • {ticket.seatNumber}</span>
            </div>
          </div>

          {/* QR Code & Barcode Section */}
          <div className="md:col-span-3 flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] text-center">
            <div className="w-20 h-20 bg-white p-2 rounded-xl border border-[#D8D0C5] flex items-center justify-center mb-1">
              <QrCode className="w-full h-full text-[#0D2F2F]" />
            </div>
            <span className="text-[9px] font-mono text-[#476666] tracking-wider uppercase font-bold">
              SCAN TO VERIFY SEAT
            </span>
            {/* Mock CSS Barcode lines */}
            <div className="mt-2 flex items-center justify-center gap-0.5 h-6">
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1].map((w, i) => (
                <div key={i} className="bg-[#0D2F2F] h-full" style={{ width: `${w * 1.5}px` }} />
              ))}
            </div>
            <span className="text-[8px] font-mono text-[#8A9E9E] mt-0.5">{ticket.hallTicketNumber}</span>
          </div>

        </div>

        {/* Timetable Table */}
        <div className="py-6 border-b border-[#E5DFD5]">
          <h3 className="text-xs font-bold text-[#0D2F2F] uppercase tracking-wider mb-3">
            Scheduled Examination Dates & Hall Allocations
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-[#0D2F2F]/20">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0D2F2F] text-white font-bold">
                <tr>
                  <th className="p-3">Paper Code</th>
                  <th className="p-3">Course Title</th>
                  <th className="p-3">Exam Date & Day</th>
                  <th className="p-3">Time Slot</th>
                  <th className="p-3">Assigned Hall</th>
                  <th className="p-3 text-center">Invigilator Sign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD5]">
                {ticket.timetable.map((item, idx) => (
                  <tr key={item.subjectCode} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}>
                    <td className="p-3 font-mono font-bold text-[#0D2F2F]">{item.subjectCode}</td>
                    <td className="p-3 font-semibold text-[#0D2F2F]">{item.subjectName}</td>
                    <td className="p-3 text-[#0D2F2F]">
                      <span className="font-bold">{item.date}</span> ({item.day})
                    </td>
                    <td className="p-3 text-[#476666] font-mono">{item.time}</td>
                    <td className="p-3 font-bold text-[#FF6B4A]">{item.hallNo}</td>
                    <td className="p-3 text-center">
                      <div className="w-16 h-6 border-b border-dashed border-[#8A9E9E] mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Candidate Rules & Guidelines */}
        <div className="py-6 border-b border-[#E5DFD5]">
          <h4 className="text-xs font-bold text-[#0D2F2F] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-[#FF6B4A]" />
            Mandatory Examination Hall Instructions
          </h4>
          <ol className="list-decimal list-inside text-xs text-[#476666] space-y-1.5 leading-relaxed">
            {ticket.instructions.map((inst, i) => (
              <li key={i}>{inst}</li>
            ))}
          </ol>
        </div>

        {/* Official Signatures Row */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 items-end text-center text-xs">
          <div>
            <div className="h-10 border-b border-dashed border-[#0D2F2F] flex items-center justify-center">
              <span className="font-serif italic text-sm text-[#0D2F2F]">{currentUser?.name || 'Candidate Signature'}</span>
            </div>
            <span className="text-[10px] text-[#8A9E9E] uppercase font-bold mt-1 block">Candidate's Signature</span>
          </div>

          <div className="hidden sm:block">
            <div className="w-16 h-16 rounded-full border-2 border-[#0D2F2F]/30 mx-auto flex items-center justify-center text-[9px] font-bold text-[#0D2F2F]/40 uppercase tracking-widest text-center leading-tight p-1">
              Learnora Registry Seal
            </div>
          </div>

          <div>
            <div className="h-10 border-b border-dashed border-[#0D2F2F] flex items-center justify-center">
              <span className="font-serif italic font-bold text-sm text-[#0D2F2F]">{ticket.controllerOfExams}</span>
            </div>
            <span className="text-[10px] text-[#8A9E9E] uppercase font-bold mt-1 block">Controller of Examinations</span>
          </div>
        </div>

      </motion.div>

    </div>
  );
};
