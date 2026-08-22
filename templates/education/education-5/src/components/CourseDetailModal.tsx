import React from 'react';
import { 
  X, 
  Star, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  PlayCircle, 
  Users, 
  Award, 
  ArrowRight,
  Shield,
  Layers,
  Code2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Course } from '../types';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (course: Course) => void;
  onOpenLessonSandbox: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onEnroll,
  onOpenLessonSandbox,
}) => {
  if (!course) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            id="close-course-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/50 backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner & Header */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold">
                    {course.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                    {course.difficulty}
                  </span>
                  {course.badge && (
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                      ★ {course.badge}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display">
                  {course.title}
                </h2>
              </div>

              <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-400 font-display">${course.price}</div>
                  <div className="text-xs text-slate-500 line-through">${course.originalPrice}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
            
            {/* Meta Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
              <div>
                <div className="text-xs text-slate-400">Rating</div>
                <div className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {course.rating} <span className="text-xs text-slate-500">({course.reviewsCount})</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Duration</div>
                <div className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                  <Clock className="w-4 h-4 text-indigo-400" /> {course.duration}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Lessons</div>
                <div className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                  <BookOpen className="w-4 h-4 text-cyan-400" /> {course.lessonsCount} Modules
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Enrolled</div>
                <div className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                  <Users className="w-4 h-4 text-emerald-400" /> {course.studentsCount.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Subtitle / Overview */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">About this Course</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {course.subtitle}
              </p>
            </div>

            {/* What you'll learn */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> What You Will Master
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Curriculum Preview */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-violet-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Curriculum Outline
                </h3>
                <span className="text-xs text-slate-400">{course.chapters.length} Modules • {course.lessonsCount} Interactive Lessons</span>
              </div>

              <div className="space-y-3">
                {course.chapters.map((chapter, cIdx) => (
                  <div key={chapter.id} className="rounded-xl bg-slate-950/50 border border-slate-800 p-4">
                    <div className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-indigo-600/30 text-indigo-300 text-xs flex items-center justify-center font-mono">
                        0{cIdx + 1}
                      </span>
                      {chapter.title}
                    </div>

                    <div className="space-y-2 mt-2">
                      {chapter.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 text-xs text-slate-300 hover:bg-slate-900 transition-colors">
                          <div className="flex items-center gap-2.5">
                            {lesson.type === 'code' ? (
                              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                            ) : lesson.type === 'quiz' ? (
                              <Award className="w-3.5 h-3.5 text-amber-400" />
                            ) : (
                              <PlayCircle className="w-3.5 h-3.5 text-indigo-400" />
                            )}
                            <span className={lesson.completed ? 'line-through text-slate-500' : ''}>
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-slate-500 font-mono">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Bio Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/40" 
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-base">{course.instructor.name}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-medium">
                    Instructor
                  </span>
                </div>
                <p className="text-xs text-slate-400">{course.instructor.role} • {course.instructor.company}</p>
                <p className="text-xs text-slate-300 mt-1.5 line-clamp-2">{course.instructor.bio}</p>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer */}
          <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>30-Day Money-Back Guarantee • Lifetime Access</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenLessonSandbox(course);
                }}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Launch Interactive Lab</span>
              </button>

              <button
                onClick={() => {
                  onEnroll(course);
                  onClose();
                }}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Enroll in Course (${course.price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
