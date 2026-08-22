import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Download, 
  Printer, 
  CheckCircle2, 
  TrendingUp, 
  FileText, 
  GraduationCap, 
  ShieldCheck, 
  Calendar,
  Sparkles,
  ArrowRight,
  BookOpen,
  Filter
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { sampleSemestersMarks, SemesterMarksheet } from '../../data/portalData';

export const ExamResults: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedSemester, setSelectedSemester] = useState<number>(5);

  const activeMarksheet = sampleSemestersMarks.find(s => s.semester === selectedSemester) || sampleSemestersMarks[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTranscript = () => {
    const textData = `EDUVORA UNIVERSITY OF TECHNOLOGY
OFFICIAL PROVISIONAL STATEMENT OF MARKS
Candidate: ${currentUser?.name} (${currentUser?.studentId})
Program: ${currentUser?.program}
Semester: ${activeMarksheet.semesterName}
Exam Date: ${activeMarksheet.examMonthYear}
SGPA: ${activeMarksheet.sgpa} | CGPA: ${activeMarksheet.cgpaCumulative}
Result: ${activeMarksheet.status} WITH DISTINCTION
Total Credits: ${activeMarksheet.totalCredits}

SUBJECTS:
${activeMarksheet.subjects.map(s => `${s.code} - ${s.name} | Credits: ${s.credits} | Internal: ${s.internalMarks} | External: ${s.externalMarks} | Total: ${s.totalMarks} | Grade: ${s.grade} (${s.gradePoint} GP)`).join('\n')}

Issued on: ${activeMarksheet.resultDate}
Controller of Examinations, Eduvora University.`;

    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Eduvora_Marksheet_Sem${selectedSemester}_${currentUser?.studentId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F]/5 border border-[#0D2F2F]/10 text-xs font-bold text-[#0D2F2F] mb-1.5">
            <Award className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Academic Performance Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D2F2F] font-display tracking-tight">
            End-Semester Results & Marksheets
          </h1>
          <p className="text-xs sm:text-sm text-[#476666] mt-0.5">
            View comprehensive internal and external score breakdowns, SGPA calculations, and verified grade points.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownloadTranscript}
            className="px-4 py-2.5 rounded-xl bg-[#0D2F2F] hover:bg-[#184E4E] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-[#FF6B4A]" />
            <span>Download Marksheet</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Semester Selector Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5DFD5] shadow-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#0D2F2F] flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#FF6B4A]" />
            Select Semester:
          </span>
          {sampleSemestersMarks.map((sem) => (
            <button
              key={sem.semester}
              onClick={() => setSelectedSemester(sem.semester)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSemester === sem.semester
                  ? 'bg-[#0D2F2F] text-white shadow-xs'
                  : 'bg-[#FAF8F5] hover:bg-[#EFECE4] text-[#2D4F4F] border border-[#E5DFD5]'
              }`}
            >
              Sem {sem.semester} ({sem.examMonthYear})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#476666]">Result Published: <strong>{activeMarksheet.resultDate}</strong></span>
        </div>
      </div>

      {/* Official Marksheet Document Container */}
      <motion.div
        key={selectedSemester}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD5] shadow-xl space-y-6 print:border-none print:shadow-none print:p-0"
      >
        {/* Document Header */}
        <div className="border-b-2 border-[#0D2F2F] pb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#0D2F2F] text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-7 h-7 text-[#FF6B4A]" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF6B4A]">
                  Eduvora University • Office of the Registrar
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#0D2F2F] font-display uppercase tracking-wide">
                  Provisional Statement of Grades
                </h2>
                <p className="text-xs text-[#476666]">
                  {activeMarksheet.semesterName} • Examination held in {activeMarksheet.examMonthYear}
                </p>
              </div>
            </div>

            {/* GPA Card */}
            <div className="flex items-center gap-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#E5DFD5]">
              <div className="text-center px-2">
                <span className="text-[10px] text-[#8A9E9E] block uppercase font-bold">SGPA</span>
                <span className="text-lg font-black text-[#FF6B4A] font-display">{activeMarksheet.sgpa}</span>
              </div>
              <div className="w-px h-8 bg-[#D8D0C5]" />
              <div className="text-center px-2">
                <span className="text-[10px] text-[#8A9E9E] block uppercase font-bold">Cumulative CGPA</span>
                <span className="text-lg font-black text-[#0D2F2F] font-display">{activeMarksheet.cgpaCumulative}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Student Meta Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] text-xs">
          <div>
            <span className="text-[#8A9E9E] block">Candidate Name</span>
            <strong className="text-[#0D2F2F] text-sm">{currentUser?.name}</strong>
          </div>
          <div>
            <span className="text-[#8A9E9E] block">University ID / Roll No</span>
            <strong className="font-mono text-[#0D2F2F] text-sm">{currentUser?.studentId}</strong>
          </div>
          <div>
            <span className="text-[#8A9E9E] block">Branch & Specialization</span>
            <span className="text-[#0D2F2F] font-semibold">{currentUser?.department}</span>
          </div>
          <div>
            <span className="text-[#8A9E9E] block">Total Credits Registered</span>
            <span className="text-[#0D2F2F] font-bold">{activeMarksheet.totalCredits} Credits Cleared</span>
          </div>
        </div>

        {/* Detailed Marksheet Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E5DFD5]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0D2F2F] text-white font-bold">
              <tr>
                <th className="p-3">Course Code</th>
                <th className="p-3">Course Title</th>
                <th className="p-3 text-center">Credits</th>
                <th className="p-3 text-center">Internal (40)</th>
                <th className="p-3 text-center">External (60)</th>
                <th className="p-3 text-center">Total (100)</th>
                <th className="p-3 text-center">Grade</th>
                <th className="p-3 text-center">Grade Point</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFD5]">
              {activeMarksheet.subjects.map((sub, idx) => (
                <tr key={sub.code} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}>
                  <td className="p-3 font-mono font-bold text-[#0D2F2F]">{sub.code}</td>
                  <td className="p-3 font-semibold text-[#0D2F2F]">{sub.name}</td>
                  <td className="p-3 text-center font-bold text-[#0D2F2F]">{sub.credits}</td>
                  <td className="p-3 text-center font-mono text-[#476666]">{sub.internalMarks}</td>
                  <td className="p-3 text-center font-mono text-[#476666]">{sub.externalMarks}</td>
                  <td className="p-3 text-center font-mono font-bold text-[#0D2F2F]">{sub.totalMarks}</td>
                  <td className="p-3 text-center font-bold">
                    <span className={`px-2 py-0.5 rounded text-[11px] ${
                      sub.grade === 'O' ? 'bg-emerald-100 text-emerald-800' :
                      sub.grade === 'A+' ? 'bg-teal-100 text-teal-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {sub.grade}
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-[#FF6B4A]">{sub.gradePoint}</td>
                  <td className="p-3 text-center">
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold text-[10px]">
                      {sub.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grading Scale Reference */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] text-[11px] text-[#476666] space-y-1">
          <div className="font-bold text-[#0D2F2F]">Grading System Reference:</div>
          <p>
            O (Outstanding: 10 GP | 90-100) • A+ (Excellent: 9 GP | 80-89) • A (Very Good: 8 GP | 70-79) • B+ (Good: 7 GP | 60-69) • B (Above Average: 6 GP | 55-59) • RA (Re-Appearance / Fail).
          </p>
        </div>

        {/* Verification Footer & Signatures */}
        <div className="pt-4 border-t border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between text-xs text-[#476666] gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Digital Cryptographic Signature Verified by Eduvora Registry.</span>
          </div>

          <div className="text-right">
            <div className="font-serif italic font-bold text-[#0D2F2F]">Dr. R. Sundaresan</div>
            <div className="text-[10px] text-[#8A9E9E]">Controller of Examinations</div>
          </div>
        </div>

      </motion.div>

    </div>
  );
};
