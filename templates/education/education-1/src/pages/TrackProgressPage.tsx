import React, { useState } from 'react';
import { PageId } from '../types';
import { GradientText } from '../components/reactbits/GradientText';
import {
  BarChart3,
  Flame,
  Clock,
  Award,
  CheckCircle2,
  Play,
  Download,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TrackProgressPageProps {
  onNavigate: (page: PageId) => void;
}

export const TrackProgressPage: React.FC<TrackProgressPageProps> = ({ onNavigate }) => {
  const [coursesProgress, setCoursesProgress] = useState([
    {
      id: 'course-1',
      title: 'Data Science Essentials',
      category: 'Data & Analytics',
      progress: 68,
      lessonsCompleted: 8,
      totalLessons: 12,
      lastActive: 'Today, 2 hours ago',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'course-4',
      title: 'Introduction to UX Design',
      category: 'Design & UX',
      progress: 35,
      lessonsCompleted: 10,
      totalLessons: 30,
      lastActive: 'Yesterday',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'course-2',
      title: 'Digital Marketing Masterclass',
      category: 'Marketing',
      progress: 100,
      lessonsCompleted: 28,
      totalLessons: 28,
      lastActive: 'Aug 14, 2026',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
    },
  ]);

  const [activeQuizQuestion, setActiveQuizQuestion] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const quizQuestions = [
    {
      question: 'Which Python library is primarily used for tabular DataFrame manipulations in Data Science?',
      options: ['NumPy', 'Pandas', 'Flask', 'Matplotlib'],
      correctAnswer: 1,
    },
    {
      question: 'In UX Design, what is the primary purpose of low-fidelity wireframing?',
      options: [
        'Finalizing brand color palettes',
        'Testing information hierarchy and layout structure early',
        'Writing production CSS code',
        'Creating high-res vector marketing illustrations',
      ],
      correctAnswer: 1,
    },
  ];

  const handleUpdateProgress = (index: number) => {
    const updated = [...coursesProgress];
    if (updated[index].progress < 100) {
      updated[index].progress = Math.min(100, updated[index].progress + 15);
      if (updated[index].progress === 100) {
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        } catch (e) {}
      }
      setCoursesProgress(updated);
    }
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption !== null) {
      setQuizSubmitted(true);
      if (selectedQuizOption === quizQuestions[activeQuizQuestion].correctAnswer) {
        try {
          confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
        } catch (e) {}
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-mono font-bold uppercase tracking-wider border border-indigo-200">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>ACADEMIC & SKILL ANALYTICS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Track Your Learning{' '}
            <GradientText colors={['#4F46E5', '#7C3AED', '#2563EB', '#4F46E5']}>
              Journey
            </GradientText>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Stay consistent, monitor weekly study streaks, test retention with adaptive quizzes, and manage verified credentials.
          </p>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center font-bold">
              <Flame className="w-6 h-6 fill-orange-500 text-orange-500" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-extrabold text-slate-900 font-mono">14 Days</span>
              <p className="text-[10px] font-mono text-slate-500 font-bold uppercase">Daily Streak</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-extrabold text-indigo-600 font-mono">9.4 hrs</span>
              <p className="text-[10px] font-mono text-slate-500 font-bold uppercase">Weekly Study</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-extrabold text-cyan-700 font-mono">46 Lessons</span>
              <p className="text-[10px] font-mono text-slate-500 font-bold uppercase">Completed</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-extrabold text-purple-700 font-mono">1 Verified</span>
              <p className="text-[10px] font-mono text-slate-500 font-bold uppercase">Certificate</p>
            </div>
          </div>
        </div>
      </section>

      {/* In-Progress Courses & Quick Quiz Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Courses List (7 cols) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                My Enrolled Courses
              </h3>
              <button
                onClick={() => onNavigate('courses')}
                className="text-xs font-mono text-indigo-600 hover:text-indigo-700 font-bold cursor-pointer"
              >
                + Browse Catalog
              </button>
            </div>

            <div className="space-y-4">
              {coursesProgress.map((course, idx) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                          {course.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-indigo-600">
                          {course.progress}%
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate pt-1">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono">
                        {course.lessonsCompleted} of {course.totalLessons} lessons finished
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-[11px] text-slate-500">
                      Last studied: {course.lastActive}
                    </span>
                    {course.progress === 100 ? (
                      <button
                        onClick={() => setShowCertificate(true)}
                        className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer border border-emerald-200 hover:bg-emerald-100 transition-colors"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>View Certificate</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateProgress(idx)}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Continue Lesson</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Daily Knowledge Quiz Check (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Daily Concept Check
            </h3>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                  Adaptive Recall Quiz
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Question {activeQuizQuestion + 1} of {quizQuestions.length}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                {quizQuestions[activeQuizQuestion].question}
              </p>

              {/* Options */}
              <div className="space-y-2">
                {quizQuestions[activeQuizQuestion].options.map((option, optIdx) => {
                  let optStyle = 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700';
                  if (quizSubmitted) {
                    if (optIdx === quizQuestions[activeQuizQuestion].correctAnswer) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                    } else if (selectedQuizOption === optIdx) {
                      optStyle = 'border-rose-500 bg-rose-50 text-rose-800';
                    }
                  } else if (selectedQuizOption === optIdx) {
                    optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={quizSubmitted}
                      onClick={() => setSelectedQuizOption(optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${optStyle}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Quiz Submit Button */}
              <div>
                {quizSubmitted ? (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-emerald-600 text-center font-mono">
                      {selectedQuizOption === quizQuestions[activeQuizQuestion].correctAnswer
                        ? '✨ Correct! +25 Skill XP added to profile.'
                        : 'Review the module notes to reinforce this concept.'}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedQuizOption(null);
                        setQuizSubmitted(false);
                        setActiveQuizQuestion((prev) => (prev + 1) % quizQuestions.length);
                      }}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl cursor-pointer transition-colors border border-slate-200"
                    >
                      Next Question
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={selectedQuizOption === null}
                    onClick={handleQuizSubmit}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Submit Answer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Viewer Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full border border-slate-200 shadow-2xl text-center space-y-6 text-slate-900">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full inline-block">
                Official Verified Certificate
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Digital Marketing Masterclass
              </h2>
              <p className="text-xs text-slate-600">
                Awarded to <strong>Enrolled Scholar</strong> for mastering full-funnel acquisition, SEO optimization, and attribution modeling with distinction.
              </p>
            </div>

            <div className="py-3 px-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 font-mono flex justify-between">
              <span>Credential ID: <strong className="text-slate-900">SKILLORA-8849-VERIFIED</strong></span>
              <span>Issued: <strong className="text-slate-900">August 2026</strong></span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert('Certificate downloaded in high-resolution PDF format!');
                  setShowCertificate(false);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition-colors border border-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
