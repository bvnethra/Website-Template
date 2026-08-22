import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { 
  Award, 
  Download, 
  Printer, 
  TrendingUp, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  ChevronRight,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';

interface ExamResultsViewProps {
  onNavigate: (tab: string) => void;
}

export const ExamResultsView: React.FC<ExamResultsViewProps> = ({ onNavigate }) => {
  const { resultsData, currentUser } = useAuth();
  const { addToast } = useApp();

  const [selectedSemester, setSelectedSemester] = useState<number>(6);

  const currentResult = resultsData.find(r => r.semester === selectedSemester) || resultsData[0];

  const handleDownloadMarksheet = () => {
    addToast({
      type: 'success',
      title: 'Provisional Grade Sheet Exported',
      message: `Exported official digital transcript for Semester ${selectedSemester} (SGPA: ${currentResult.sgpa}).`
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header & Semester Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-[#E8EAE3] shadow-xs">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0D2F2F]">
            Autonomous Examination Grade Cards
          </h2>
          <p className="text-xs text-[#4A5D4E]">
            Verified semester-wise marksheet with Continuous Internal Evaluation (CIE 40) and Semester End Examination (SEE 60) marks.
          </p>
        </div>

        {/* Semester Selection Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-[#0D2F2F] uppercase">Select Term:</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(Number(e.target.value))}
            className="px-3.5 py-2 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs font-bold text-[#0D2F2F] focus:outline-none focus:ring-2 focus:ring-[#0D2F2F]"
          >
            {resultsData.map((r) => (
              <option key={r.semester} value={r.semester}>
                Semester {r.semester} {r.semester === 6 ? '(Latest)' : ''}
              </option>
            ))}
          </select>

          <button
            onClick={handleDownloadMarksheet}
            className="px-4 py-2 bg-[#0D2F2F] hover:bg-[#082020] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-[#FF6B4A]" />
            <span>Export Marksheet</span>
          </button>
        </div>
      </div>

      {/* Semester Academic Overview Card */}
      <div className="bg-[#0D2F2F] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-block px-3 py-1 bg-white/10 text-emerald-300 rounded-full text-xs font-bold mb-2">
              {currentResult.resultStatus}
            </div>
            <h3 className="font-heading text-2xl font-bold">
              {currentResult.semesterTitle}
            </h3>
            <p className="text-white/80 text-xs mt-1">
              Examination Held: {currentResult.examHeldMonthYear} • Gazette Published: {currentResult.publishedDate}
            </p>
          </div>

          <div className="flex items-center gap-6 self-start md:self-auto bg-white/10 px-6 py-4 rounded-2xl border border-white/10">
            <div>
              <span className="text-[10px] text-white/70 uppercase font-bold block">Semester SGPA</span>
              <span className="text-2xl sm:text-3xl font-heading font-black text-emerald-300">
                {currentResult.sgpa}
              </span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <span className="text-[10px] text-white/70 uppercase font-bold block">Cumulative CGPA</span>
              <span className="text-2xl sm:text-3xl font-heading font-black text-white">
                {currentResult.cgpa}
              </span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <span className="text-[10px] text-white/70 uppercase font-bold block">Credits Earned</span>
              <span className="text-xl sm:text-2xl font-heading font-bold text-white">
                {currentResult.earnedCredits} / {currentResult.totalCredits}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Marksheet Subject Breakdown Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-4">
        
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-[#0D2F2F]">
            Course-Wise Performance Ledger
          </h3>
          <span className="text-xs text-[#4A5D4E]">
            Evaluation Matrix: Internal Assessment (40) + Autonomous SEE (60) = 100 Marks
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#E8EAE3]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F4F1EA] text-[#0D2F2F] border-b border-[#E8EAE3]">
                <th className="py-3 px-3.5 font-bold">Course Code</th>
                <th className="py-3 px-3.5 font-bold">Course Title</th>
                <th className="py-3 px-3.5 font-bold text-center">Credits</th>
                <th className="py-3 px-3.5 font-bold text-center">Internal (40)</th>
                <th className="py-3 px-3.5 font-bold text-center">External (60)</th>
                <th className="py-3 px-3.5 font-bold text-center">Total (100)</th>
                <th className="py-3 px-3.5 font-bold text-center">Grade Point</th>
                <th className="py-3 px-3.5 font-bold text-center">Letter Grade</th>
                <th className="py-3 px-3.5 font-bold text-center">Result</th>
                <th className="py-3 px-3.5 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EAE3] bg-white">
              {currentResult.subjects.map((sub, idx) => (
                <tr key={sub.code} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FDFBF7]'}>
                  <td className="py-3 px-3.5 font-mono font-bold text-[#0D2F2F]">{sub.code}</td>
                  <td className="py-3 px-3.5 font-medium text-[#0D2F2F]">{sub.name}</td>
                  <td className="py-3 px-3.5 text-center font-semibold text-[#0D2F2F]">{sub.credits}</td>
                  <td className="py-3 px-3.5 text-center font-mono text-[#4A5D4E]">{sub.internalMarks} / 40</td>
                  <td className="py-3 px-3.5 text-center font-mono text-[#4A5D4E]">{sub.externalMarks} / 60</td>
                  <td className="py-3 px-3.5 text-center font-mono font-bold text-[#0D2F2F]">{sub.totalMarks} / 100</td>
                  <td className="py-3 px-3.5 text-center font-bold text-[#0D2F2F]">{sub.gradePoint}.0</td>
                  <td className="py-3 px-3.5 text-center">
                    <span className="px-2.5 py-0.5 rounded-md font-bold text-[11px] bg-[#0D2F2F] text-white">
                      {sub.letterGrade}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <span className="text-emerald-700 font-bold text-[11px]">
                      {sub.result}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onNavigate('photocopy')}
                        className="px-2 py-1 bg-[#F4F1EA] hover:bg-[#E8EAE3] text-[#0D2F2F] rounded text-[10px] font-bold"
                        title="Apply for Answer Script Photocopy"
                      >
                        Photocopy
                      </button>
                      <button
                        onClick={() => onNavigate('revaluation')}
                        className="px-2 py-1 bg-[#0D2F2F] hover:bg-[#082020] text-white rounded text-[10px] font-bold"
                        title="Apply for Revaluation"
                      >
                        Revalue
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* SGPA Historical Progression Chart Grid */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-4">
        <h3 className="font-heading text-base font-bold text-[#0D2F2F]">
          SGPA Performance Curve Across Semesters
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {resultsData.slice().reverse().map((sem) => (
            <div 
              key={sem.semester}
              onClick={() => setSelectedSemester(sem.semester)}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                selectedSemester === sem.semester
                  ? 'bg-[#0D2F2F] text-white border-[#0D2F2F] shadow-sm'
                  : 'bg-[#FDFBF7] text-[#0D2F2F] border-[#E8EAE3] hover:border-[#0D2F2F]'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase block ${selectedSemester === sem.semester ? 'text-white/70' : 'text-[#4A5D4E]'}`}>
                Semester {sem.semester}
              </span>
              <div className="text-xl font-heading font-extrabold mt-1">
                {sem.sgpa}
              </div>
              <span className={`text-[9px] block mt-0.5 ${selectedSemester === sem.semester ? 'text-emerald-300' : 'text-emerald-700'}`}>
                {sem.earnedCredits} Credits
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
