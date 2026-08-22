import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Calendar, 
  Clock, 
  Award, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  Share2, 
  Bookmark, 
  Layers,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CourseDetailDrawer: React.FC = () => {
  const { 
    activeCourseDetailModal: course, 
    setActiveCourseDetailModal,
    setSelectedCourseForApply,
    toggleCompareCourse,
    comparedCourseIds,
    savedCourseIds,
    toggleSaveCourse,
    addToast
  } = useApp();

  const [expandedSemester, setExpandedSemester] = useState<number>(1);
  const navigate = useNavigate();

  if (!course) return null;

  const isSaved = savedCourseIds.includes(course.id);
  const isCompared = comparedCourseIds.includes(course.id);

  const handleApplyClick = () => {
    setSelectedCourseForApply(course);
    setActiveCourseDetailModal(null);
    addToast({
      type: 'info',
      title: 'Program Selected',
      message: `${course.title} has been pre-selected for your application dossier.`,
    });
    navigate('/admissions?step=1');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + `/courses?id=${course.id}`);
    addToast({
      type: 'success',
      title: 'Link Copied',
      message: `Course link for "${course.title}" copied to clipboard.`,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveCourseDetailModal(null)}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        {/* Slide-over Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-2xl bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#E8EAE3] overflow-hidden"
          >
            
            {/* Header bar */}
            <div className="px-6 py-4 bg-white border-b border-[#E8EAE3] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#4A5D4E] text-white">
                  {course.degreeLevel}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F4F1EA] text-[#4A5D4E] border border-[#E8EAE3]">
                  {course.mode} Mode
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveCourse(course.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isSaved ? 'text-[#4A5D4E] bg-[#F4F1EA]' : 'text-[#A7B3A2] hover:bg-[#F4F1EA] hover:text-[#4A5D4E]'
                  }`}
                  title={isSaved ? 'Bookmarked' : 'Save program'}
                  aria-label="Bookmark course"
                >
                  <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={() => toggleCompareCourse(course.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isCompared ? 'text-white bg-[#4A5D4E]' : 'text-[#A7B3A2] hover:bg-[#F4F1EA] hover:text-[#4A5D4E]'
                  }`}
                  title={isCompared ? 'In Compare List' : 'Add to Compare'}
                  aria-label="Compare course"
                >
                  <Layers className="w-5 h-5" />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg text-[#A7B3A2] hover:bg-[#F4F1EA] hover:text-[#4A5D4E] transition-colors"
                  title="Share program"
                  aria-label="Share course"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveCourseDetailModal(null)}
                  className="p-2 rounded-lg text-[#A7B3A2] hover:bg-[#F4F1EA] hover:text-[#4A5D4E] transition-colors ml-1"
                  aria-label="Close drawer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              
              {/* Program Banner & Title */}
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden h-48 sm:h-56 shadow-sm border border-[#E8EAE3]">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-xs font-semibold text-[#E8EAE3] uppercase tracking-wider">
                      {course.department}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-heading text-white leading-tight">
                      {course.title}
                    </h2>
                  </div>
                </div>

                <p className="text-base text-[#2D3436]/80 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Key Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-[#E8EAE3]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A7B3A2] block">
                    Tuition / Sem
                  </span>
                  <span className="text-lg font-bold text-[#4A5D4E] font-heading">
                    {course.tuitionPerSemester === 0 ? 'Fully Funded' : `$${course.tuitionPerSemester.toLocaleString()}`}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#E8EAE3]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A7B3A2] block">
                    Duration
                  </span>
                  <span className="text-lg font-bold text-[#4A5D4E] font-heading">
                    {course.durationYears} {course.durationYears === 1 ? 'Year' : 'Years'}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#E8EAE3]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A7B3A2] block">
                    Total Credits
                  </span>
                  <span className="text-lg font-bold text-[#4A5D4E] font-heading">
                    {course.totalCredits} Credits
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#E8EAE3]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A7B3A2] block">
                    Deadline
                  </span>
                  <span className="text-xs font-bold text-[#4A5D4E] font-heading block mt-1">
                    {course.applicationDeadline}
                  </span>
                </div>
              </div>

              {/* Accreditation Badges */}
              <div className="flex flex-wrap gap-2 items-center bg-[#F4F1EA] p-3 rounded-xl border border-[#E8EAE3]">
                <Award className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                <span className="text-xs font-semibold text-[#4A5D4E]">Accreditations:</span>
                {course.accreditation.map((acc, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-white text-[#4A5D4E] text-xs font-medium border border-[#E8EAE3]">
                    {acc}
                  </span>
                ))}
              </div>

              {/* Semester-by-Semester Syllabus Accordion */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#4A5D4E] font-heading flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#4A5D4E]" />
                    <span>Comprehensive Curriculum & Syllabus</span>
                  </h3>
                  <span className="text-xs text-[#A7B3A2]">
                    {course.syllabus.length} Academic Semesters
                  </span>
                </div>

                <div className="space-y-2.5">
                  {course.syllabus.map((sem) => {
                    const isExpanded = expandedSemester === sem.semester;
                    return (
                      <div
                        key={sem.semester}
                        className="rounded-xl border border-[#E8EAE3] bg-white overflow-hidden shadow-xs"
                      >
                        <button
                          onClick={() => setExpandedSemester(isExpanded ? 0 : sem.semester)}
                          className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-[#F9F7F2] hover:bg-[#F4F1EA] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full bg-[#4A5D4E] text-white flex items-center justify-center text-xs font-bold">
                              S{sem.semester}
                            </span>
                            <div>
                              <h4 className="text-sm font-bold text-[#4A5D4E]">
                                Semester {sem.semester}: {sem.title}
                              </h4>
                              <p className="text-xs text-[#A7B3A2]">
                                {sem.modules.length} Specialized Modules
                              </p>
                            </div>
                          </div>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-[#4A5D4E]" /> : <ChevronDown className="w-4 h-4 text-[#A7B3A2]" />}
                        </button>

                        {isExpanded && (
                          <div className="p-4 space-y-3 border-t border-[#E8EAE3] bg-white divide-y divide-[#E8EAE3]">
                            {sem.modules.map((mod) => (
                              <div key={mod.code} className="pt-3 first:pt-0 space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#F4F1EA] text-[#4A5D4E]">
                                      {mod.code}
                                    </span>
                                    <span className="text-sm font-semibold text-[#2D3436]">
                                      {mod.name}
                                    </span>
                                  </div>
                                  <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-[#F4F1EA] text-[#4A5D4E] border border-[#E8EAE3]">
                                    {mod.credits} cr • {mod.type}
                                  </span>
                                </div>
                                <p className="text-xs text-[#2D3436]/70 leading-relaxed pl-1">
                                  {mod.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Faculty Lead Spotlight */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8EAE3] space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#4A5D4E] font-heading flex items-center gap-2">
                  <User className="w-4 h-4 text-[#4A5D4E]" />
                  <span>Program Faculty Chair</span>
                </h3>

                <div className="flex items-start gap-4">
                  <img
                    src={course.facultyLead.avatar}
                    alt={course.facultyLead.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#E8EAE3] shadow-xs shrink-0"
                  />
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#4A5D4E]">
                      {course.facultyLead.name}
                    </h4>
                    <p className="text-xs font-medium text-[#A7B3A2]">
                      {course.facultyLead.role}
                    </p>
                    <p className="text-xs text-[#2D3436]/70 leading-relaxed">
                      {course.facultyLead.bio}
                    </p>
                    <div className="pt-1 flex items-center gap-3 text-xs text-[#4A5D4E] font-medium">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#A7B3A2]" />
                        {course.facultyLead.email}
                      </span>
                      <span>• {course.facultyLead.publicationsCount} Publications</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prerequisites & Career Outcomes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Prerequisites */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8EAE3] space-y-2.5">
                  <h4 className="text-sm font-bold text-[#4A5D4E] flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#4A5D4E]" />
                    <span>Admission Prerequisites</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#2D3436]/70">
                    {course.prerequisites.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4A5D4E] mt-0.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Career Outcomes */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8EAE3] space-y-2.5">
                  <h4 className="text-sm font-bold text-[#4A5D4E] flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#4A5D4E]" />
                    <span>Career Pathways</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#2D3436]/70">
                    {course.careerOutcomes.map((career, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-[#4A5D4E] shrink-0" />
                        <span className="font-medium text-[#2D3436]">{career}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Bottom Action Footer */}
            <div className="px-6 py-4 bg-white border-t border-[#E8EAE3] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#A7B3A2] block">Admissions Status</span>
                <span className="text-sm font-bold text-[#4A5D4E] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#4A5D4E] animate-pulse" />
                  Applications Open (Fall 2026)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveCourseDetailModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#E8EAE3] text-[#2D3436] font-medium text-sm hover:bg-[#F4F1EA] transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleApplyClick}
                  id="drawer-apply-program-btn"
                  className="px-6 py-2.5 rounded-xl bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>Apply for this Program</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
