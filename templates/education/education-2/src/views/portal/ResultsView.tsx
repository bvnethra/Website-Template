import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  Download,
  Printer,
  FileCheck2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  BarChart3,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ResultsView: React.FC = () => {
  const { currentUser, results, selectedSemester, setSelectedSemester } = useAuth();

  const currentResult =
    results.find((r) => r.semester === selectedSemester) || results[0];

  const handlePrint = () => {
    window.print();
  };

  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'O':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-black';
      case 'A+':
        return 'bg-blue-100 text-blue-900 border-blue-300 font-bold';
      case 'A':
        return 'bg-teal-100 text-teal-900 border-teal-300 font-bold';
      case 'B+':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      case 'B':
        return 'bg-orange-100 text-orange-900 border-orange-300 font-bold';
      default:
        return 'bg-red-100 text-red-900 border-red-300 font-bold';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner (hidden in print) */}
      <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F] text-white text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Official Examination Grade Sheets & Transcripts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D2F2F]">
            Semester Examination Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Certified Marks Record for <strong>{currentUser?.fullName}</strong> ({currentUser?.studentId})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-2xl bg-[#0D2F2F] hover:bg-[#081E1E] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#FF6B4A]" />
            <span>Print Marksheet</span>
          </button>
        </div>
      </div>

      {/* Semester Switcher Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 print:hidden">
        {[5, 4, 3, 2, 1].map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSemester(sem)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              selectedSemester === sem
                ? 'bg-[#0D2F2F] text-white shadow-md'
                : 'bg-[#FDFBF7] hover:bg-[#EAE4D7] text-[#0D2F2F] border border-[#EAE4D7]'
            }`}
          >
            <Award className={`w-3.5 h-3.5 ${selectedSemester === sem ? 'text-[#FF6B4A]' : 'text-slate-400'}`} />
            <span>Semester 0{sem} Marksheet</span>
          </button>
        ))}
      </div>

      {/* SGPA & CGPA KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:hidden">
        <div className="bg-[#0D2F2F] text-white p-5 rounded-3xl border border-[#1A4F4F] shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B4A]">
            Semester SGPA (Term {currentResult.semester})
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-black text-white">
              {currentResult.sgpa}
            </span>
            <span className="text-xs text-slate-400">/ 10.0</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-bold mt-1">Outstanding Performance</span>
        </div>

        <div className="bg-[#FDFBF7] p-5 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Cumulative CGPA
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-black text-[#0D2F2F]">
              {currentResult.cgpa}
            </span>
            <span className="text-xs text-slate-500">/ 10.0</span>
          </div>
          <span className="text-[11px] text-[#0D2F2F] font-bold mt-1">First Class with Distinction</span>
        </div>

        <div className="bg-[#FDFBF7] p-5 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Credits Earned (Sem {currentResult.semester})
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-serif font-black text-[#0D2F2F]">
              {currentResult.totalCreditsEarned}
            </span>
            <span className="text-xs text-slate-500">/ {currentResult.totalCreditsRegistered}</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold mt-1">100% Clearance Rate</span>
        </div>

        <div className="bg-[#FDFBF7] p-5 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Result Publication
          </span>
          <div className="mt-2">
            <span className="text-sm font-bold text-[#0D2F2F] block">
              {currentResult.publishedDate}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block font-mono">
              Session: {currentResult.monthYear}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Passed in First Attempt</span>
          </div>
        </div>
      </div>

      {/* Official Marksheet Table & Document Canvas */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0D2F2F] shadow-lg space-y-6 max-w-5xl mx-auto print:border-none print:shadow-none print:p-2 print:m-0">
        {/* Document Header */}
        <div className="border-b-2 border-[#0D2F2F] pb-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#0D2F2F] text-white flex items-center justify-center font-serif font-black text-xl shadow-md border-2 border-[#FF6B4A] shrink-0">
                EV
              </div>
              <div>
                <h2 className="text-xl font-serif font-black tracking-tight text-[#0D2F2F] uppercase">
                  Eduvora University
                </h2>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Provisional Statement of Grades & Marksheet
                </p>
                <p className="text-[11px] text-slate-500">
                  Semester 0{currentResult.semester} Examination • Session: {currentResult.monthYear}
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right text-xs">
              <span className="inline-block px-3 py-1 rounded bg-[#0D2F2F] text-white font-bold uppercase text-[10px]">
                Grade Card
              </span>
              <p className="font-mono text-[#0D2F2F] font-bold mt-1">
                Ref: EDV-GC-SEM{currentResult.semester}-8842
              </p>
            </div>
          </div>
        </div>

        {/* Student Meta Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE4D7] text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Student Name</span>
            <span className="font-bold text-slate-900">{currentUser?.fullName}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Student ID</span>
            <span className="font-mono font-bold text-[#0D2F2F]">{currentUser?.studentId}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Program</span>
            <span className="font-semibold text-slate-900">{currentUser?.program}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Academic Status</span>
            <span className="font-bold text-emerald-700">PROMOTED / ALL CLEARED</span>
          </div>
        </div>

        {/* Course Grades Table */}
        <div className="overflow-x-auto border border-[#0D2F2F] rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0D2F2F] text-white uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3 px-3">Course Code</th>
                <th className="py-3 px-3">Course Title</th>
                <th className="py-3 px-3 text-center">Credits</th>
                <th className="py-3 px-3 text-center">CIA (Internal)</th>
                <th className="py-3 px-3 text-center">End-Sem (External)</th>
                <th className="py-3 px-3 text-center">Total (100)</th>
                <th className="py-3 px-3 text-center">Grade Point</th>
                <th className="py-3 px-3 text-center">Letter Grade</th>
                <th className="py-3 px-3 text-center">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {currentResult.courses.map((course, idx) => (
                <tr key={course.courseCode} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="py-3 px-3 font-mono font-bold text-[#0D2F2F]">
                    {course.courseCode}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{course.courseName}</td>
                  <td className="py-3 px-3 text-center font-bold text-slate-800">{course.credits}</td>
                  <td className="py-3 px-3 text-center text-slate-700">{course.internalMarks}</td>
                  <td className="py-3 px-3 text-center text-slate-700">{course.externalMarks}</td>
                  <td className="py-3 px-3 text-center font-bold text-slate-900">{course.totalMarks}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-[#0D2F2F]">
                    {course.gradePoint}.0
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md border text-[11px] ${getGradeBadge(
                        course.grade
                      )}`}
                    >
                      {course.grade}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-700">
                    {course.resultStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grade Legend & Calculations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">Grading Scale Reference:</span>
            <p>O: Outstanding (90–100) • A+: Excellent (80–89) • A: Very Good (70–79)</p>
            <p>B+: Good (60–69) • B: Above Average (50–59) • RA: Reappear (&lt;50)</p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE4D7] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Semester 0{currentResult.semester} SGPA
              </span>
              <span className="text-2xl font-serif font-black text-[#0D2F2F]">
                {currentResult.sgpa}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Cumulative CGPA
              </span>
              <span className="text-2xl font-serif font-black text-[#FF6B4A]">
                {currentResult.cgpa}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Seal */}
        <div className="pt-6 border-t-2 border-[#0D2F2F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-slate-600 text-[11px]">
              Electronically verified digital grade record generated from Central Academic Server.
            </span>
          </div>

          <div className="text-center sm:text-right">
            <span className="font-serif font-black text-sm text-[#0D2F2F] block">
              Dr. Aris Thorne, Ph.D.
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-bold">
              Controller of Examinations
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
