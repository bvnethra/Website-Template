import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Award, 
  Calendar, 
  Ticket, 
  FileCheck2, 
  RotateCcw, 
  Bell, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  BookOpen, 
  GraduationCap,
  Sparkles,
  TrendingUp,
  Building,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initialNotices, initialAvailableSubjects, sampleSemestersMarks } from '../../data/portalData';

export const PortalOverview: React.FC = () => {
  const { currentUser } = useAuth();
  const latestMarksheet = sampleSemestersMarks[0];

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-[#0D2F2F] via-[#113C3C] to-[#0A2626] text-white p-6 sm:p-8 relative overflow-hidden shadow-lg border border-[#184E4E]"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6B4A]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B4A]" />
              <span>Spring Term 2026 • End-Semester Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
              Welcome back, {currentUser?.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {currentUser?.program} • Roll No: <span className="font-mono text-[#FF6B4A] font-bold">{currentUser?.studentId}</span>
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <Link
              to="/portal/hall-ticket"
              className="px-4 py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Print Hall Ticket</span>
            </Link>

            <Link
              to="/portal/exam-apply"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border border-white/20"
            >
              <FileCheck2 className="w-4 h-4 text-[#FFA07A]" />
              <span>Exam Registration</span>
            </Link>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-white/10">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 block font-medium">Cumulative GPA</span>
            <div className="text-xl sm:text-2xl font-black text-[#FF6B4A] font-display mt-0.5">
              {currentUser?.cgpa} <span className="text-xs text-slate-400 font-normal">/ 10.0</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 block font-medium">Credits Cleared</span>
            <div className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
              {currentUser?.creditsEarned} <span className="text-xs text-slate-400 font-normal">/ {currentUser?.totalCredits}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 block font-medium">Attendance Rate</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-display mt-0.5">
              {currentUser?.attendancePercentage}%
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 block font-medium">Academic Standing</span>
            <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Regular Good</span>
            </div>
          </div>
        </div>

      </motion.div>

      {/* Grid: Upcoming Exams & Quick Services */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Upcoming Exam Timetable Snapshot */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#E5DFD5] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#0D2F2F] font-display flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#FF6B4A]" />
                  End-Semester Exam Schedule (Spring 2026)
                </h3>
                <p className="text-xs text-[#476666] mt-0.5">Exam Venue: Sir C.V. Raman Examination Complex</p>
              </div>

              <Link
                to="/portal/hall-ticket"
                className="text-xs font-bold text-[#FF6B4A] hover:underline flex items-center gap-1"
              >
                <span>Full Timetable</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Timetable List */}
            <div className="space-y-2.5">
              {initialAvailableSubjects.slice(0, 4).map((sub, idx) => (
                <div
                  key={sub.code}
                  className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] hover:border-[#D8D0C5] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#0D2F2F] text-[#FFA07A] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0D2F2F]">{sub.code}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0D2F2F]/10 text-[#0D2F2F] font-bold">
                          {sub.credits} Credits
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-[#0D2F2F] mt-0.5">
                        {sub.title}
                      </h5>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0 bg-white sm:bg-transparent p-2 sm:p-0 rounded-xl border sm:border-0 border-[#E5DFD5]">
                    <div className="text-xs font-bold text-[#0D2F2F] flex items-center gap-1.5 sm:justify-end">
                      <Clock className="w-3.5 h-3.5 text-[#FF6B4A]" />
                      <span>{sub.examDate}</span>
                    </div>
                    <span className="text-[10px] text-[#476666] block">
                      {sub.session.split(' ')[0]} Session
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Recent Marksheet Summary */}
          <div className="bg-white rounded-3xl p-6 border border-[#E5DFD5] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#0D2F2F] font-display flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Latest Marksheet: {latestMarksheet.semesterName}
                </h3>
                <p className="text-xs text-[#476666] mt-0.5">Published on {latestMarksheet.resultDate}</p>
              </div>

              <Link
                to="/portal/results"
                className="text-xs font-bold text-[#FF6B4A] hover:underline flex items-center gap-1"
              >
                <span>Full Marksheet</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D2F2F] text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-300">Semester Grade Point Average (SGPA)</span>
                <div className="text-2xl font-black text-[#FF6B4A] font-display mt-0.5">
                  {latestMarksheet.sgpa} <span className="text-xs text-slate-300 font-normal">/ 10.0</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-300 block">Overall Result</span>
                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  {latestMarksheet.status} WITH DISTINCTION
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Circulars & Quick Shortcuts */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Hub Shortcuts */}
          <div className="bg-white rounded-3xl p-6 border border-[#E5DFD5] shadow-xs">
            <h3 className="text-sm font-bold text-[#0D2F2F] uppercase tracking-wider mb-3">
              Examination Services
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/portal/hall-ticket"
                className="p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#F3EFE6] border border-[#E5DFD5] transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#0D2F2F] text-white flex items-center justify-center mb-2">
                  <Ticket className="w-4 h-4 text-[#FF6B4A]" />
                </div>
                <h5 className="text-xs font-bold text-[#0D2F2F] group-hover:text-[#FF6B4A] transition-colors">
                  Hall Ticket
                </h5>
                <p className="text-[10px] text-[#476666] mt-0.5">Admit card & QR</p>
              </Link>

              <Link
                to="/portal/exam-apply"
                className="p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#F3EFE6] border border-[#E5DFD5] transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#0D2F2F] text-white flex items-center justify-center mb-2">
                  <FileCheck2 className="w-4 h-4 text-[#FFA07A]" />
                </div>
                <h5 className="text-xs font-bold text-[#0D2F2F] group-hover:text-[#FF6B4A] transition-colors">
                  Exam Apply
                </h5>
                <p className="text-[10px] text-[#476666] mt-0.5">Registration fee</p>
              </Link>

              <Link
                to="/portal/photocopy"
                className="p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#F3EFE6] border border-[#E5DFD5] transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#0D2F2F] text-white flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h5 className="text-xs font-bold text-[#0D2F2F] group-hover:text-[#FF6B4A] transition-colors">
                  Photocopy
                </h5>
                <p className="text-[10px] text-[#476666] mt-0.5">Answer scripts</p>
              </Link>

              <Link
                to="/portal/revaluation"
                className="p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#F3EFE6] border border-[#E5DFD5] transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#0D2F2F] text-white flex items-center justify-center mb-2">
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                </div>
                <h5 className="text-xs font-bold text-[#0D2F2F] group-hover:text-[#FF6B4A] transition-colors">
                  Revaluation
                </h5>
                <p className="text-[10px] text-[#476666] mt-0.5">Score diff audit</p>
              </Link>
            </div>
          </div>

          {/* Urgent Circulars Panel */}
          <div className="bg-white rounded-3xl p-6 border border-[#E5DFD5] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0D2F2F] font-display flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#FF6B4A]" />
                Important Circulars
              </h3>
              <Link to="/portal/notices" className="text-xs font-bold text-[#FF6B4A] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {initialNotices.slice(0, 3).map((notice) => (
                <Link
                  key={notice.id}
                  to="/portal/notices"
                  className="p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-[#F3EFE6] border border-[#E5DFD5] block transition-all group"
                >
                  <div className="flex items-center justify-between text-[10px] text-[#476666] mb-1">
                    <span className={`px-2 py-0.5 rounded-md font-extrabold uppercase ${
                      notice.isUrgent ? 'bg-red-100 text-red-700' : 'bg-[#0D2F2F]/10 text-[#0D2F2F]'
                    }`}>
                      {notice.category}
                    </span>
                    <span>{notice.date}</span>
                  </div>
                  <h5 className="text-xs font-bold text-[#0D2F2F] group-hover:text-[#FF6B4A] transition-colors line-clamp-2">
                    {notice.title}
                  </h5>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
