import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  FileText, 
  Calendar, 
  Clock, 
  Download, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  ShieldCheck,
  ChevronRight,
  BellRing
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { currentUser, hallTicket, resultsData, notices, examApplications } = useAuth();
  const latestResult = resultsData[0]; // Sem 6 provisional

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner with Exam Alert */}
      <div className="bg-[#0D2F2F] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Fall 2026 End-Semester Examination Cycle</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome, {currentUser.name}
            </h2>
            <p className="text-white/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {currentUser.degree} • {currentUser.specialization} • Semester {currentUser.semester} ({currentUser.section})
            </p>
          </div>

          {/* Quick Hall Ticket Button */}
          <button
            onClick={() => onNavigate('hall-ticket')}
            id="btn-dash-download-hallticket"
            className="self-start md:self-auto bg-[#FF6B4A] hover:bg-[#EB5E34] text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Hall Ticket</span>
          </button>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div>
            <span className="text-[10px] text-white/60 uppercase font-semibold block">University Roll No</span>
            <span className="text-sm sm:text-base font-mono font-bold text-white">{currentUser.studentId}</span>
          </div>
          <div>
            <span className="text-[10px] text-white/60 uppercase font-semibold block">Cumulative CGPA</span>
            <span className="text-sm sm:text-base font-bold text-emerald-300">{currentUser.cgpa} / 10.0</span>
          </div>
          <div>
            <span className="text-[10px] text-white/60 uppercase font-semibold block">Academic Standing</span>
            <span className="text-sm sm:text-base font-bold text-white">First Class with Distinction</span>
          </div>
          <div>
            <span className="text-[10px] text-white/60 uppercase font-semibold block">Exam Eligibility</span>
            <span className="text-sm sm:text-base font-bold text-emerald-400">Eligible (94.2% Attendance)</span>
          </div>
        </div>
      </div>

      {/* 4-Stat Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#4A5D4E] uppercase tracking-wider block">Credits Completed</span>
            <div className="text-2xl font-heading font-extrabold text-[#0D2F2F] mt-1">
              {currentUser.creditsEarned} <span className="text-xs font-normal text-[#4A5D4E]">/ {currentUser.totalCreditsRequired}</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">73.7% Degree Progress</span>
          </div>
          <div className="p-3 bg-[#F4F1EA] rounded-xl text-[#0D2F2F]">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#4A5D4E] uppercase tracking-wider block">Latest SGPA (Sem VI)</span>
            <div className="text-2xl font-heading font-extrabold text-[#0D2F2F] mt-1">
              {latestResult.sgpa} <span className="text-xs font-normal text-[#4A5D4E]">/ 10.0</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">+0.30 over previous term</span>
          </div>
          <div className="p-3 bg-[#F4F1EA] rounded-xl text-[#0D2F2F]">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#4A5D4E] uppercase tracking-wider block">Exam Application</span>
            <div className="text-sm font-heading font-bold text-[#0D2F2F] mt-1">
              {examApplications[0]?.paymentStatus === 'Paid' ? 'Registered & Paid' : 'Pending Action'}
            </div>
            <span className="text-[10px] text-[#4A5D4E] font-semibold mt-0.5 block">
              Ref: {examApplications[0]?.applicationNo || 'N/A'}
            </span>
          </div>
          <div className="p-3 bg-[#F4F1EA] rounded-xl text-[#0D2F2F]">
            <FileText className="w-5 h-5 text-[#0D2F2F]" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#4A5D4E] uppercase tracking-wider block">Faculty Advisor</span>
            <div className="text-sm font-heading font-bold text-[#0D2F2F] mt-1">
              {currentUser.advisor}
            </div>
            <span className="text-[10px] text-[#4A5D4E] font-semibold mt-0.5 block">{currentUser.advisorCabin}</span>
          </div>
          <div className="p-3 bg-[#F4F1EA] rounded-xl text-[#0D2F2F]">
            <GraduationCap className="w-5 h-5 text-[#0D2F2F]" />
          </div>
        </div>

      </div>

      {/* Middle Grid: Quick Actions & Examination Timetable */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Upcoming Examination Timetable (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0D2F2F]">
                  Upcoming End-Semester Exam Schedule
                </h3>
                <p className="text-xs text-[#4A5D4E]">Autumn 2026 Examination Roster & Room Allocations</p>
              </div>
              <button
                onClick={() => onNavigate('hall-ticket')}
                className="text-xs font-bold text-[#FF6B4A] hover:underline flex items-center gap-1"
              >
                View Admit Card <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#E8EAE3]">
              {hallTicket.timetable.map((slot, index) => (
                <div key={slot.subjectCode} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] text-[#0D2F2F] flex flex-col items-center justify-center font-bold shrink-0">
                      <span className="text-[9px] uppercase font-semibold text-[#4A5D4E]">NOV</span>
                      <span className="text-sm font-extrabold">{slot.examDate.split('-')[2]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0D2F2F] bg-[#F4F1EA] px-2 py-0.5 rounded">
                          {slot.subjectCode}
                        </span>
                        <h4 className="text-xs font-bold text-[#0D2F2F]">{slot.subjectName}</h4>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-[#4A5D4E] mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#4A5D4E]" /> {slot.session}
                        </span>
                        <span>•</span>
                        <span>Venue: <strong>{slot.hallNo}</strong> ({slot.seatNo})</span>
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block">
                      Reporting: {slot.reportingTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Examination Hub Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <button
              onClick={() => onNavigate('results')}
              id="dash-card-results"
              className="p-5 bg-[#FDFBF7] hover:bg-white rounded-2xl border border-[#E8EAE3] hover:border-[#0D2F2F] text-left transition-all shadow-xs group"
            >
              <div className="p-2.5 w-fit rounded-xl bg-[#0D2F2F] text-white mb-3 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5 text-[#FF6B4A]" />
              </div>
              <h4 className="font-heading text-sm font-bold text-[#0D2F2F]">Semester Marksheet</h4>
              <p className="text-[11px] text-[#4A5D4E] mt-1">
                View internal CIE (40) and external SEE (60) breakdowns for all terms.
              </p>
            </button>

            <button
              onClick={() => onNavigate('photocopy')}
              id="dash-card-photocopy"
              className="p-5 bg-[#FDFBF7] hover:bg-white rounded-2xl border border-[#E8EAE3] hover:border-[#0D2F2F] text-left transition-all shadow-xs group"
            >
              <div className="p-2.5 w-fit rounded-xl bg-[#0D2F2F] text-white mb-3 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 text-[#FF6B4A]" />
              </div>
              <h4 className="font-heading text-sm font-bold text-[#0D2F2F]">Photocopy Scrutiny</h4>
              <p className="text-[11px] text-[#4A5D4E] mt-1">
                Request evaluated answer sheet digital scans & examiner marks distribution.
              </p>
            </button>

            <button
              onClick={() => onNavigate('revaluation')}
              id="dash-card-reval"
              className="p-5 bg-[#FDFBF7] hover:bg-white rounded-2xl border border-[#E8EAE3] hover:border-[#0D2F2F] text-left transition-all shadow-xs group"
            >
              <div className="p-2.5 w-fit rounded-xl bg-[#0D2F2F] text-white mb-3 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#FF6B4A]" />
              </div>
              <h4 className="font-heading text-sm font-bold text-[#0D2F2F]">Revaluation Hub</h4>
              <p className="text-[11px] text-[#4A5D4E] mt-1">
                Track board review differentials, upgraded grades, and refund status.
              </p>
            </button>

          </div>
        </div>

        {/* Right Column: Notices & Grievances (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recent Circulars Widget */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold text-[#0D2F2F] flex items-center gap-2">
                <BellRing className="w-4 h-4 text-[#FF6B4A]" />
                Official Circulars
              </h3>
              <button
                onClick={() => onNavigate('notices')}
                className="text-[11px] font-bold text-[#0D2F2F] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {notices.slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => onNavigate('notices')}
                  className="p-3 bg-[#FDFBF7] hover:bg-[#F4F1EA] rounded-2xl border border-[#E8EAE3] transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0D2F2F] text-white">
                      {notice.category}
                    </span>
                    <span className="text-[10px] text-[#4A5D4E] font-medium">{notice.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#0D2F2F] line-clamp-2 leading-snug">
                    {notice.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Grievance Support Box */}
          <div className="bg-[#F4F1EA] rounded-3xl p-6 border border-[#E0DCD3] space-y-3">
            <h3 className="font-heading text-sm font-bold text-[#0D2F2F]">
              Examination Grievance Desk
            </h3>
            <p className="text-xs text-[#4A5D4E] leading-relaxed">
              Have an issue with hall ticket details, venue timing overlap, or grade card entry? Submit a ticket directly to the Controller of Examinations.
            </p>
            <button
              onClick={() => onNavigate('support')}
              className="w-full bg-[#0D2F2F] hover:bg-[#082020] text-white py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Open Support Ticket</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#FF6B4A]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
