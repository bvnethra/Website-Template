import React, { useState } from 'react';
import {
  ArrowLeft,
  GraduationCap,
  Clock,
  DollarSign,
  Bookmark,
  Sparkles,
  FileText,
  Building,
  CheckCircle,
  Users,
  Briefcase,
  Calendar,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockPrograms, mockFaculty } from '../data/mockData';

interface ProgramDetailViewProps {
  programId?: string;
  onNavigate: (route: string, param?: string) => void;
}

export const ProgramDetailView: React.FC<ProgramDetailViewProps> = ({ programId, onNavigate }) => {
  const { theme, openApplyModal, openBrochureModal, openTuitionCalc, savedPrograms, toggleSaveProgram } = useTheme();

  const program = mockPrograms.find((p) => p.id === programId) || mockPrograms[0];
  const isSaved = savedPrograms.includes(program.id);

  const [activeTab, setActiveTab] = useState<'curriculum' | 'careers' | 'faculty' | 'admissions'>('curriculum');
  const [expandedSemester, setExpandedSemester] = useState<string | null>(program.curriculum[0]?.yearOrSem || null);

  const programFaculty = mockFaculty.filter((f) => f.departmentId === program.departmentId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('programs')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Academic Programs</span>
        </button>
      </div>

      {/* Hero Degree Header */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
        <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
          <img
            src={program.image}
            alt={program.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400 text-slate-950">
                {program.level}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white">
                {program.school}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Accredited Academic Program
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight leading-tight">
              {program.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-2 line-clamp-2">
              {program.shortDescription}
            </p>
          </div>
        </div>

        {/* Quick Spec Metrics Bar */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-700" />
              Program Duration
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 block">{program.duration} ({program.credits} Credits)</span>
          </div>
          <div className="space-y-1 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-700" />
              Annual Tuition
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 block">${program.annualTuition.toLocaleString()} / year</span>
          </div>
          <div className="space-y-1 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-700" />
              Application Deadline
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 block">{program.applicationDeadline}</span>
          </div>
          <div className="space-y-1 pt-3 sm:pt-0 sm:pl-4 flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => openApplyModal(program.id)}
                style={{ backgroundColor: theme.primary }}
                className="flex-1 py-2 px-3 rounded-xl text-white font-bold text-xs hover:opacity-95 shadow-sm text-center"
              >
                Apply Now
              </button>
              <button
                onClick={() => toggleSaveProgram(program.id)}
                className="p-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700"
                title={isSaved ? 'Remove from saved' : 'Save degree'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Detail Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left / Main Content Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
            {[
              { id: 'curriculum', label: 'Curriculum & Courses', icon: FileText },
              { id: 'careers', label: 'Career Outcomes & Hiring', icon: Briefcase },
              { id: 'faculty', label: 'Program Faculty & Mentors', icon: Users },
              { id: 'admissions', label: 'Admissions & Prerequisites', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap flex items-center gap-2 transition-all ${
                    isActive
                      ? 'border-amber-700 text-amber-900 bg-amber-50/50'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Curriculum & Coursework */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Comprehensive Academic Syllabus
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The {program.name} curriculum bridges computational rigor, laboratory synthesis, and real-world capstone engineering. Explore standard semester sequencing below:
                </p>
              </div>

              {/* Semester Breakdown */}
              <div className="space-y-3">
                {program.curriculum.map((sem, idx) => {
                  const isOpen = expandedSemester === sem.yearOrSem;

                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        onClick={() => setExpandedSemester(isOpen ? null : sem.yearOrSem)}
                        className="w-full p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
                      >
                        <div>
                          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                            Academic Sequencing
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">{sem.yearOrSem}</h4>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 divide-y divide-slate-100 space-y-3">
                          {sem.courses.map((c) => (
                            <div key={c.code} className="pt-3 first:pt-0 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                                  {c.code}
                                </span>
                                <span className="text-xs font-bold text-slate-600">{c.credits} Credit Hours ({c.type})</span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-900">{c.title}</h5>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Career Outcomes */}
          {activeTab === 'careers' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-xl font-serif font-bold text-slate-900">Graduate Career Trajectory</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 block">Placement / Employment Rate</span>
                    <span className="text-2xl font-black font-serif text-slate-900 block mt-1">{program.careerProspects.placementRate}</span>
                    <span className="text-[11px] text-emerald-700 font-semibold">Employed or in graduate school within 6 months</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 block">Average First-Year Starting Compensation</span>
                    <span className="text-2xl font-black font-serif text-emerald-700 block mt-1">{program.careerProspects.averageSalary}</span>
                    <span className="text-[11px] text-slate-500">Based on recent class surveys</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Premier Hiring Partners:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.careerProspects.topEmployers.map((emp, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
                        {emp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Typical Alumni Job Titles:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.careerProspects.roles.map((role, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Faculty */}
          {activeTab === 'faculty' && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-xl font-serif font-bold text-slate-900">Faculty Chairs & Laboratory Directors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {programFaculty.map((fac) => (
                  <div
                    key={fac.id}
                    onClick={() => onNavigate('faculty-detail', fac.id)}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex gap-3.5 items-center group"
                  >
                    <img
                      src={fac.avatar}
                      alt={fac.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                    <div className="space-y-0.5 flex-1">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                        {fac.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 block line-clamp-1">{fac.title}</span>
                      <span className="text-[10px] text-amber-800 font-semibold">{fac.office}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Admissions & Prerequisites */}
          {activeTab === 'admissions' && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-xl font-serif font-bold text-slate-900">Prerequisites & Admission Benchmarks</h3>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Required Academic Qualifications:</h4>
                  <ul className="space-y-2 text-xs text-slate-600 pl-4 list-disc">
                    {program.admissionRequirements.map((req, i) => (
                      <li key={i} className="leading-relaxed">{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block">Application Deadline:</span>
                    <span className="font-bold text-slate-900">{program.applicationDeadline}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Study Mode:</span>
                    <span className="font-bold text-slate-900">{program.studyMode}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right / Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Card */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
              Admissions Actions
            </span>
            <h3 className="text-lg font-serif font-bold text-white">
              Enroll in {program.name}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complete the online quick application or request an official academic prospectus.
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => openApplyModal(program.id)}
                style={{ backgroundColor: theme.accent }}
                className="w-full py-3 rounded-2xl text-slate-950 font-bold text-xs hover:brightness-110 shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Start Direct Application</span>
              </button>

              <button
                onClick={() => openBrochureModal(program.id)}
                className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>Download Program Syllabus PDF</span>
              </button>

              <button
                onClick={openTuitionCalc}
                className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Calculate Net Price & Aid</span>
              </button>
            </div>
          </div>

          {/* Department Contact Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Departmental Oversight
            </span>
            <h4
              onClick={() => onNavigate('department-detail', program.departmentId)}
              className="text-sm font-bold font-serif text-slate-900 hover:text-amber-800 cursor-pointer"
            >
              {program.departmentName}
            </h4>
            <div className="text-xs text-slate-600 space-y-1">
              <div><strong>School:</strong> {program.school}</div>
              <div><strong>Program Chair:</strong> Dr. David Chen, Ph.D.</div>
              <div><strong>Office:</strong> Maxwell Tower, Floor 4</div>
              <div><strong>Inquiries:</strong> {program.departmentId}@edunexa.edu</div>
            </div>
            <button
              onClick={() => onNavigate('department-detail', program.departmentId)}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              View Department Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
