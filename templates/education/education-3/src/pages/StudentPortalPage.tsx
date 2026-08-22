import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  Award, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  ShieldCheck, 
  Download, 
  FileText, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const StudentPortalPage: React.FC = () => {
  const { studentProfile, userRole, loginAsStudent, loginAsApplicant, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'academics' | 'financials' | 'schedule'>('academics');

  // Submit assignment mock handler
  const handleAssignmentSubmit = (title: string) => {
    addToast({
      type: 'success',
      title: 'Assignment Submitted',
      message: `"${title}" successfully uploaded to Eduvora Canvas LMS.`,
    });
  };

  const handlePayTuition = () => {
    addToast({
      type: 'success',
      title: 'Payment Gateway',
      message: 'Redirecting to Eduvora Secure Bursar Payment Gateway...',
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D3436] pb-24">
      
      {/* Top Banner with Student Info */}
      <section className="bg-white border-b border-[#E8EAE3] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Bar: Auth Switcher & Role Simulator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8EAE3]">
            <div className="flex items-center gap-3">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#4A5D4E]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#4A5D4E]">
                    {studentProfile.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F4F1EA] text-[#4A5D4E] border border-[#E8EAE3]">
                    {userRole === 'student' ? 'Active Student' : 'Prospective Applicant'}
                  </span>
                </div>
                <p className="text-xs text-[#2D3436]/70">
                  Student ID: <strong className="font-mono text-[#4A5D4E]">{studentProfile.studentId}</strong> • {studentProfile.major}
                </p>
              </div>
            </div>

            {/* Auth Simulator Toggle */}
            <div className="flex items-center gap-2 bg-[#F4F1EA] p-1 rounded-xl border border-[#E8EAE3] self-start sm:self-auto">
              <span className="text-[11px] font-bold text-[#2D3436]/70 px-2">Role:</span>
              <button
                onClick={() => {
                  loginAsStudent();
                  addToast({ type: 'info', title: 'Student View', message: 'Switched to Active Graduate Student role.' });
                }}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                  userRole === 'student' ? 'bg-[#4A5D4E] text-white' : 'text-[#2D3436]/70 hover:bg-[#E8EAE3]'
                }`}
              >
                Graduate Student
              </button>
              <button
                onClick={() => {
                  loginAsApplicant();
                  addToast({ type: 'info', title: 'Applicant View', message: 'Switched to Applicant role simulation.' });
                }}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                  userRole === 'applicant' ? 'bg-[#4A5D4E] text-white' : 'text-[#2D3436]/70 hover:bg-[#E8EAE3]'
                }`}
              >
                Applicant
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            
            <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E8EAE3] shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A7B3A2] block">
                Cumulative GPA
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold font-heading text-[#4A5D4E]">
                  {studentProfile.gpa}
                </span>
                <span className="text-xs text-[#4A5D4E] font-semibold">/ 4.00 (Summa)</span>
              </div>
            </div>

            <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E8EAE3] shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A7B3A2] block">
                Credits Earned
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold font-heading text-[#4A5D4E]">
                  {studentProfile.creditsEarned}
                </span>
                <span className="text-xs text-[#2D3436]/70">/ {studentProfile.totalCreditsNeeded} Credits</span>
              </div>
            </div>

            <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E8EAE3] shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A7B3A2] block">
                Tuition Due (Fall)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold font-heading text-[#4A5D4E]">
                  ${studentProfile.tuitionBalance.toLocaleString()}
                </span>
                <span className="text-xs text-[#2D3436]/70">USD</span>
              </div>
            </div>

            <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E8EAE3] shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A7B3A2] block">
                Academic Standing
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-sm font-bold text-[#4A5D4E] font-heading">
                  Dean's Honor Roll
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Portal Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Column: Enrolled Courses & Assignments (approx 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Section: Enrolled Courses */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8EAE3] shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#E8EAE3] pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#4A5D4E]" />
                  <h3 className="font-heading text-lg font-bold text-[#4A5D4E]">
                    Current Semester Enrolled Courses ({studentProfile.enrolledCourses.length})
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#2D3436]/70">Fall 2026</span>
              </div>

              <div className="space-y-4">
                {studentProfile.enrolledCourses.map((c) => (
                  <div
                    key={c.code}
                    className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#E8EAE3] shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#4A5D4E]">
                            {c.code}
                          </span>
                          <span className="text-xs text-[#A7B3A2]">• {c.credits} Credits</span>
                        </div>
                        <h4 className="text-sm font-bold font-heading text-[#4A5D4E]">
                          {c.title}
                        </h4>
                        <span className="text-xs text-[#2D3436]/70">Instructor: {c.instructor}</span>
                      </div>

                      <div className="text-right sm:self-center">
                        <span className="text-[10px] uppercase font-bold text-[#A7B3A2] block">Current Grade</span>
                        <span className="text-base font-extrabold text-[#4A5D4E] font-heading">{c.grade}</span>
                      </div>
                    </div>

                    {/* Progress Bar & Attendance */}
                    <div className="space-y-1 pt-2 border-t border-[#E8EAE3]">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#2D3436]/70">Course Progress ({c.progress}%)</span>
                        <span className="text-[#4A5D4E] font-semibold">Attendance: {c.attendance}%</span>
                      </div>
                      <div className="w-full bg-[#F4F1EA] rounded-full h-2 overflow-hidden border border-[#E8EAE3]">
                        <div
                          className="bg-[#4A5D4E] h-2 rounded-full transition-all"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Pending Assignments */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8EAE3] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8EAE3] pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#4A5D4E]" />
                  <h3 className="font-heading text-lg font-bold text-[#4A5D4E]">
                    Upcoming Assignments & Labs
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {studentProfile.upcomingAssignments.map((asgn) => (
                  <div
                    key={asgn.id}
                    className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E8EAE3] flex items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] font-bold text-[#4A5D4E]">
                        {asgn.courseCode}
                      </span>
                      <h4 className="text-xs font-bold text-[#4A5D4E]">
                        {asgn.title}
                      </h4>
                      <p className="text-[11px] text-[#2D3436]/70">
                        Due Date: <strong className="text-[#4A5D4E]">{asgn.dueDate}</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => handleAssignmentSubmit(asgn.title)}
                      className="px-4 py-2 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 shadow-xs"
                    >
                      Submit Lab
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Column: Bursar & Quick University Services (approx 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Financials & Tuition Box */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8EAE3] shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E8EAE3] pb-3">
                <CreditCard className="w-5 h-5 text-[#4A5D4E]" />
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#4A5D4E]">
                  Student Financial Account
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#2D3436]/70">
                  <span>Tuition Assessment (Fall 2026):</span>
                  <span>$11,800.00</span>
                </div>
                <div className="flex justify-between text-[#4A5D4E] font-semibold">
                  <span>Presidential Merit Fellowship:</span>
                  <span>-$7,500.00</span>
                </div>
                <div className="flex justify-between text-[#2D3436]/70">
                  <span>Campus Tech & Lab Fee:</span>
                  <span>$200.00</span>
                </div>
                <div className="pt-2 border-t border-[#E8EAE3] flex justify-between font-bold text-sm text-[#4A5D4E]">
                  <span>Net Outstanding Balance:</span>
                  <span className="text-[#4A5D4E] font-heading text-base font-extrabold">
                    ${studentProfile.tuitionBalance.toLocaleString()}.00
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayTuition}
                className="w-full py-2.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 text-center"
              >
                Pay Balance Online
              </button>
            </div>

            {/* Quick Campus Links & Tools */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8EAE3] shadow-xs space-y-3">
              <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                University Services
              </h4>

              <div className="space-y-2">
                {[
                  { name: 'Canvas LMS Portal', url: '#' },
                  { name: 'Eduvora Library & JSTOR Database', url: '#' },
                  { name: 'Official Transcript Request', url: '#' },
                  { name: 'Book Research Laboratory Slot', url: '#' },
                  { name: 'Campus Health & Counseling', url: '#' },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    onClick={(e) => {
                      e.preventDefault();
                      addToast({ type: 'info', title: 'Eduvora Services', message: `Navigating to ${item.name}...` });
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#FDFBF7] hover:bg-[#F4F1EA] border border-[#E8EAE3] text-xs font-semibold text-[#4A5D4E] transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#4A5D4E]" />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
