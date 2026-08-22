import React from 'react';
import { useApp } from '../../context/AppContext';
import { COURSES_DATA } from '../../data/mockData';
import { X, Check, ArrowRight, Trash2, Award, BookOpen, Clock, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CourseCompareModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { comparedCourseIds, toggleCompareCourse, clearComparedCourses, setSelectedCourseForApply, setActiveCourseDetailModal } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const courses = COURSES_DATA.filter((c) => comparedCourseIds.includes(c.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-[#FDFBF7] w-full max-w-5xl rounded-3xl shadow-2xl border border-[#E8EAE3] overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-white border-b border-[#E8EAE3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-heading text-lg font-bold text-[#4A5D4E]">
                Side-by-Side Program Comparison
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#4A5D4E] text-white">
                {courses.length} / 3 Programs
              </span>
            </div>

            <div className="flex items-center gap-2">
              {courses.length > 0 && (
                <button
                  onClick={clearComparedCourses}
                  className="px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-[#A7B3A2] hover:bg-[#F4F1EA] hover:text-[#4A5D4E] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Matrix Content */}
          <div className="p-6 overflow-y-auto overflow-x-auto">
            {courses.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="text-base text-[#4A5D4E] font-medium">No programs selected for comparison yet.</p>
                <p className="text-xs text-[#A7B3A2]">
                  Click the compare icon on any course card in the catalogue to compare curriculums and tuition.
                </p>
              </div>
            ) : (
              <div className="min-w-[650px] divide-y divide-[#E8EAE3]">
                
                {/* Header Row */}
                <div className="grid grid-cols-4 gap-4 pb-4 items-end">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#A7B3A2]">
                    Criteria / Metrics
                  </div>
                  {courses.map((c) => (
                    <div key={c.id} className="space-y-2 relative bg-white p-4 rounded-2xl border border-[#E8EAE3]">
                      <button
                        onClick={() => toggleCompareCourse(c.id)}
                        className="absolute top-2 right-2 p-1 text-[#A7B3A2] hover:text-red-600 transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img
                        src={c.image}
                        alt={c.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-24 object-cover rounded-xl"
                      />
                      <span className="text-[11px] font-bold uppercase text-[#4A5D4E] block">
                        {c.degreeLevel} • {c.mode}
                      </span>
                      <h4 className="text-sm font-bold text-[#4A5D4E] leading-snug">
                        {c.title}
                      </h4>
                      <button
                        onClick={() => {
                          setSelectedCourseForApply(c);
                          onClose();
                          navigate('/admissions?step=1');
                        }}
                        className="w-full py-1.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 mt-2"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {Array.from({ length: 3 - courses.length }).map((_, i) => (
                    <div key={i} className="border-2 border-dashed border-[#E8EAE3] rounded-2xl flex flex-col items-center justify-center p-6 text-center text-xs text-[#A7B3A2]">
                      <span>+ Add Program from Courses catalog</span>
                    </div>
                  ))}
                </div>

                {/* Row: Department */}
                <div className="grid grid-cols-4 gap-4 py-3 text-xs">
                  <span className="font-bold text-[#4A5D4E]">Department</span>
                  {courses.map((c) => (
                    <span key={c.id} className="text-[#2D3436]">{c.department}</span>
                  ))}
                </div>

                {/* Row: Tuition */}
                <div className="grid grid-cols-4 gap-4 py-3 text-xs">
                  <span className="font-bold text-[#4A5D4E]">Tuition / Semester</span>
                  {courses.map((c) => (
                    <span key={c.id} className="font-bold text-[#4A5D4E]">
                      {c.tuitionPerSemester === 0 ? 'Fully Funded' : `$${c.tuitionPerSemester.toLocaleString()}`}
                    </span>
                  ))}
                </div>

                {/* Row: Duration & Credits */}
                <div className="grid grid-cols-4 gap-4 py-3 text-xs">
                  <span className="font-bold text-[#4A5D4E]">Duration & Credits</span>
                  {courses.map((c) => (
                    <span key={c.id} className="text-[#2D3436]">
                      {c.durationYears} Years ({c.totalCredits} Academic Credits)
                    </span>
                  ))}
                </div>

                {/* Row: Accreditations */}
                <div className="grid grid-cols-4 gap-4 py-3 text-xs">
                  <span className="font-bold text-[#4A5D4E]">Accreditations</span>
                  {courses.map((c) => (
                    <div key={c.id} className="flex flex-wrap gap-1">
                      {c.accreditation.map((acc, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-[#F4F1EA] text-[#4A5D4E] rounded text-[10px] font-medium border border-[#E8EAE3]">
                          {acc}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Row: Faculty Lead */}
                <div className="grid grid-cols-4 gap-4 py-3 text-xs">
                  <span className="font-bold text-[#4A5D4E]">Faculty Lead</span>
                  {courses.map((c) => (
                    <span key={c.id} className="text-[#2D3436] font-medium">
                      {c.facultyLead.name}
                    </span>
                  ))}
                </div>

                {/* Row: Key Outcomes */}
                <div className="grid grid-cols-4 gap-4 py-3 text-xs">
                  <span className="font-bold text-[#4A5D4E]">Key Career Outcomes</span>
                  {courses.map((c) => (
                    <div key={c.id} className="space-y-1">
                      {c.careerOutcomes.slice(0, 3).map((out, i) => (
                        <div key={i} className="flex items-center gap-1 text-[11px] text-[#2D3436]/70">
                          <span className="w-1 h-1 rounded-full bg-[#4A5D4E]" />
                          <span>{out}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
