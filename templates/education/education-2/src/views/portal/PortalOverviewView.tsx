import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Calendar,
  ClipboardList,
  FileCheck,
  RotateCcw,
  Sparkles,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  Bell,
  BookOpen,
  HelpCircle,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PortalOverviewView: React.FC = () => {
  const { currentUser, role, examSubjects, notices, isExamRegistered, revaluations } = useAuth();
  const navigate = useNavigate();

  const registeredSubjects = examSubjects.filter((s) => s.isRegistered);
  const nextExam = registeredSubjects[0];

  return (
    <div className="space-y-6">
      {/* 1. WELCOME HERO BANNER */}
      <div className="bg-[#0D2F2F] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#1A4F4F] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6B4A]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#1A4F4F]/40 rounded-full blur-3xl -mb-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A4F4F] border border-[#286B6B] text-xs font-semibold text-[#FF6B4A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academic Year 2026–2027 • Even Semester (Term VI)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Welcome, {currentUser?.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {currentUser?.program} • Roll: <span className="font-mono font-bold text-[#FF6B4A]">{currentUser?.studentId}</span>
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 bg-[#081E1E] px-2.5 py-1 rounded-lg border border-[#1A4F4F]">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B4A]" />
                <span>Centre: Eduvora North Campus (EDV-CAMBRIDGE-01)</span>
              </span>
              <span className="flex items-center gap-1.5 bg-[#081E1E] px-2.5 py-1 rounded-lg border border-[#1A4F4F]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Candidate Status: Verified & Eligible</span>
              </span>
            </div>
          </div>

          {/* Quick Admit Card Action Box */}
          <div className="bg-[#081E1E] p-4 sm:p-5 rounded-2xl border border-[#1A4F4F] flex flex-col justify-between gap-4 shrink-0 md:w-72">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Admit Card Status
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Issued
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Spring 2026 Hall Ticket</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {registeredSubjects.length} Examination papers scheduled
              </p>
            </div>
            <button
              onClick={() => navigate('/portal/hall-ticket')}
              className="w-full py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E55535] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 group"
            >
              <FileCheck className="w-4 h-4" />
              <span>View & Print Hall Ticket</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. ACADEMIC KPI STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CGPA */}
        <div className="bg-[#FDFBF7] p-5 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cumulative CGPA
            </span>
            <div className="w-9 h-9 rounded-2xl bg-[#0D2F2F] text-[#FF6B4A] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-black text-[#0D2F2F]">
                {currentUser?.cgpa}
              </span>
              <span className="text-xs text-slate-500 font-semibold">/ 10.0</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Top 5% Cohort (First Class with Distinction)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Credits */}
        <div className="bg-[#FDFBF7] p-5 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Credits Completed
            </span>
            <div className="w-9 h-9 rounded-2xl bg-[#0D2F2F] text-[#FF6B4A] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-black text-[#0D2F2F]">
                {currentUser?.totalCredits}
              </span>
              <span className="text-xs text-slate-500 font-semibold">/ 160 Required</span>
            </div>
            <div className="mt-2 w-full bg-[#EAE4D7] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#0D2F2F] h-full rounded-full"
                style={{ width: `${((currentUser?.totalCredits || 0) / 160) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Exam Registration */}
        <div className="bg-[#FDFBF7] p-5 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Exam Fee & Registration
            </span>
            <div className="w-9 h-9 rounded-2xl bg-[#0D2F2F] text-[#FF6B4A] flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif font-black text-[#0D2F2F]">
                {isExamRegistered ? 'Registered' : 'Action Due'}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>6 Subjects Confirmed (Receipt Active)</span>
            </div>
          </div>
        </div>

        {/* Card 4: Upcoming Exam */}
        <div className="bg-[#FDFBF7] p-5 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Next Scheduled Paper
            </span>
            <div className="w-9 h-9 rounded-2xl bg-[#FF6B4A] text-white flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm font-bold text-[#0D2F2F] block truncate">
              {nextExam ? nextExam.code : 'CS601'}: Distributed Systems
            </span>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-[#FF6B4A] font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{nextExam ? nextExam.examDate : '10 Sep 2026'} (FN Session)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CORE TWO-COLUMN CONTENT: TIMETABLE MATRIX & QUICK LAUNCHPAD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Upcoming Examination Timetable Matrix */}
        <div className="lg:col-span-8 bg-[#FDFBF7] rounded-3xl p-6 sm:p-7 border border-[#EAE4D7] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
                Upcoming Semester Examination Timetable
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Semester 6 End-Semester Examinations (Spring 2026 Session)
              </p>
            </div>
            <button
              onClick={() => navigate('/portal/hall-ticket')}
              className="text-xs font-bold text-[#FF6B4A] hover:text-[#E55535] flex items-center gap-1"
            >
              <span>Full Hall Ticket</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EAE4D7] text-slate-500 font-bold uppercase text-[10px]">
                  <th className="pb-3 pr-3">Subject Code & Title</th>
                  <th className="pb-3 px-3">Date & Slot</th>
                  <th className="pb-3 px-3">Venue / Hall</th>
                  <th className="pb-3 pl-3 text-right">Credits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE4D7]/70">
                {registeredSubjects.map((sub) => (
                  <tr key={sub.code} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-3.5 pr-3">
                      <div className="font-mono font-bold text-[#0D2F2F] text-xs">{sub.code}</div>
                      <div className="text-slate-700 font-medium text-xs mt-0.5">{sub.name}</div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold bg-[#0D2F2F]/10 text-[#0D2F2F]">
                        {sub.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-[#0D2F2F]">{sub.examDate}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{sub.session}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-slate-800">{sub.hallNumber}</div>
                      <div className="text-[11px] text-slate-500">{sub.deskNumber}</div>
                    </td>
                    <td className="py-3.5 pl-3 text-right font-bold text-[#0D2F2F]">
                      {sub.credits} Credits
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4 Cols: Quick Actions & Revaluation Tracker Widget */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Action Grid */}
          <div className="bg-[#FDFBF7] rounded-3xl p-6 border border-[#EAE4D7] shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-[#0D2F2F]">
              Academic Action Hub
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={() => navigate('/portal/results')}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#FAF7F2] border border-[#EAE4D7] flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0D2F2F] text-[#FF6B4A] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0D2F2F] block">View Marksheet</span>
                    <span className="text-[11px] text-slate-500">Internal CIA + External grades</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF6B4A] group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => navigate('/portal/revaluation')}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#FAF7F2] border border-[#EAE4D7] flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FF6B4A] text-white flex items-center justify-center shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0D2F2F] block">Revaluation Diff Tracker</span>
                    <span className="text-[11px] text-slate-500">Apply & check mark revisions</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF6B4A] group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => navigate('/portal/photocopy')}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#FAF7F2] border border-[#EAE4D7] flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0D2F2F] text-white flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0D2F2F] block">Photocopy Request</span>
                    <span className="text-[11px] text-slate-500">Download digitized answer sheet</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF6B4A] group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => navigate('/portal/support')}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#FAF7F2] border border-[#EAE4D7] flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#EAE4D7] text-[#0D2F2F] flex items-center justify-center shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0D2F2F] block">Examination Grievance</span>
                    <span className="text-[11px] text-slate-500">Raise query or ticket to Exam Cell</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF6B4A] group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

          {/* Active Revaluation Status Callout */}
          <div className="bg-[#0D2F2F] text-white rounded-3xl p-5 border border-[#1A4F4F] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B4A]">
                Active Revaluation Case
              </span>
              <span className="text-[10px] text-slate-400">REV-2026-042</span>
            </div>
            <h4 className="text-xs font-bold text-white">CS503: Compiler Design</h4>
            <div className="p-2.5 rounded-xl bg-[#081E1E] border border-[#1A4F4F] text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Old Score:</span>
                <span className="font-mono text-slate-300">76 (A)</span>
              </div>
              <div className="flex items-center justify-between font-bold">
                <span className="text-emerald-400">Revised Score:</span>
                <span className="font-mono text-emerald-300">82 (A+) (+6 Marks)</span>
              </div>
              <div className="text-[10px] text-emerald-300 pt-1 border-t border-[#1A4F4F]">
                Status: <strong>Marks Upgraded & Published</strong>
              </div>
            </div>
            <button
              onClick={() => navigate('/portal/revaluation')}
              className="w-full py-2 rounded-xl bg-[#1A4F4F] hover:bg-[#286B6B] text-xs font-bold text-white text-center transition-colors"
            >
              Open Full Revaluation Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
