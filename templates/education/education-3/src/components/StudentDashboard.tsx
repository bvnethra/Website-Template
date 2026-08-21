import React, { useState } from 'react';
import { 
  Flame, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  Calendar, 
  Target, 
  Zap, 
  ShieldCheck, 
  Layers, 
  ChevronRight, 
  BarChart3,
  Cpu,
  Code2
} from 'lucide-react';
import { motion } from 'motion/react';
import { Course, UserProgress } from '../types';

interface StudentDashboardProps {
  userProgress: UserProgress;
  courses: Course[];
  onResumeCourse: (course: Course) => void;
  onOpenCertificate: () => void;
  onOpenAITutor: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  userProgress,
  courses,
  onResumeCourse,
  onOpenCertificate,
  onOpenAITutor,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // Thursday active by default
  const [selectedBadge, setSelectedBadge] = useState(userProgress.badges[0]);

  const activeDay = userProgress.weeklyActivity[selectedDayIndex];
  const maxHours = Math.max(...userProgress.weeklyActivity.map(d => d.hours));

  // Circular progress calculations
  const weeklyGoalTarget = 20; // hours
  const currentWeeklyTotal = userProgress.weeklyActivity.reduce((acc, curr) => acc + curr.hours, 0);
  const weeklyGoalPercentage = Math.min(Math.round((currentWeeklyTotal / weeklyGoalTarget) * 100), 100);

  // SVG circle math
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (weeklyGoalPercentage / 100) * circumference;

  return (
    <section id="dashboard" className="py-12 sm:py-20 bg-slate-50/70 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Student Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={userProgress.avatar}
                alt={userProgress.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-200 shadow-md"
              />
              <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-[#fa5a1e] text-[10px] font-black text-white shadow-md">
                LVL {userProgress.level}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0e2942] font-display">
                  Welcome back, {userProgress.name}!
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
                  Pro Scholar
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                You're on track to complete your weekly learning goal. Keep the momentum going!
              </p>
            </div>
          </div>

          {/* Quick Action Hub */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              id="dashboard-open-ai-tutor-btn"
              onClick={onOpenAITutor}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-teal-700 border border-slate-200 text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
            >
              <Cpu className="w-4 h-4 text-teal-600 animate-pulse" />
              <span>Ask AI Study Buddy</span>
            </button>

            <button
              id="dashboard-view-cert-btn"
              onClick={onOpenCertificate}
              className="px-4 py-2.5 rounded-xl bg-[#fa5a1e] hover:bg-[#e04812] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-white" />
              <span>View Verified Certificates ({userProgress.certificatesEarned})</span>
            </button>
          </div>
        </div>

        {/* 4 Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          
          {/* Streak Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Current Streak</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              </div>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 font-display flex items-baseline gap-1.5">
              {userProgress.streakDays} <span className="text-sm font-medium text-slate-500">Days</span>
            </div>
            <p className="text-[11px] text-amber-600 mt-1 font-medium">Top 5% most consistent learner!</p>
          </motion.div>

          {/* XP & Level Progress */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Experience</span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {userProgress.currentXP.toLocaleString()} <span className="text-sm font-medium text-slate-500">XP</span>
            </div>
            <div className="mt-2 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                style={{ width: `${(userProgress.currentXP / userProgress.nextLevelXP) * 100}%` }}
              />
            </div>
          </motion.div>

          {/* Total Study Hours */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Study Time</span>
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#fa5a1e] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {userProgress.totalHours} <span className="text-sm font-medium text-slate-500">Hours</span>
            </div>
            <p className="text-[11px] text-teal-700 mt-1 font-medium">+{currentWeeklyTotal.toFixed(1)} hrs this week</p>
          </motion.div>

          {/* Completed Lessons */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Completed Modules</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              {userProgress.completedLessonsCount} <span className="text-sm font-medium text-slate-500">Lessons</span>
            </div>
            <p className="text-[11px] text-emerald-700 mt-1 font-medium">2 Verified Certs Ready</p>
          </motion.div>

        </div>

        {/* Middle Section: Weekly Activity Bar Chart + Circular Target */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Weekly Interactive Bar Chart (8 Cols) */}
          <div className="lg:col-span-8 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-teal-600" />
                  Weekly Learning Velocity
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any day column to view detailed lesson and XP statistics.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                <span>+24% vs. Last Week</span>
              </div>
            </div>

            {/* Interactive Bar Chart */}
            <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-52 pt-6 pb-2 px-2 border-b border-slate-100">
              {userProgress.weeklyActivity.map((day, idx) => {
                const heightPercent = Math.max((day.hours / maxHours) * 100, 15);
                const isSelected = selectedDayIndex === idx;

                return (
                  <div 
                    key={day.day}
                    onClick={() => setSelectedDayIndex(idx)}
                    className="flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                  >
                    {/* Tooltip hover */}
                    <div className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-opacity ${
                      isSelected ? 'bg-[#0e2942] text-white font-bold opacity-100' : 'text-slate-500 opacity-0 group-hover:opacity-100'
                    }`}>
                      {day.hours}h
                    </div>

                    {/* Bar Pill */}
                    <div className="w-full max-w-[38px] bg-slate-100 rounded-xl overflow-hidden p-1 flex items-end h-full">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${heightPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.08 }}
                        className={`w-full rounded-lg transition-all ${
                          isSelected
                            ? 'bg-[#fa5a1e] shadow-md shadow-orange-500/30'
                            : 'bg-teal-600/70 group-hover:bg-teal-600'
                        }`}
                      />
                    </div>

                    {/* Day label */}
                    <span className={`text-xs font-medium transition-colors ${
                      isSelected ? 'text-slate-900 font-bold' : 'text-slate-500'
                    }`}>
                      {day.shortDay}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Active Day Detail Card */}
            <div className="mt-4 pt-2 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                Selected: <span className="text-teal-700">{activeDay.day}</span>
              </span>
              <div className="flex items-center gap-4 text-slate-500">
                <span>⏱ <strong>{activeDay.hours}</strong> Hours Logged</span>
                <span>📚 <strong>{activeDay.lessonsCompleted}</strong> Lessons</span>
                <span className="text-teal-700">✨ <strong>+{activeDay.xpEarned}</strong> XP</span>
              </div>
            </div>

          </div>

          {/* Weekly Goal Circular Progress Ring (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Target className="w-4 h-4 text-teal-600" />
                  Weekly Target
                </h3>
                <span className="text-xs font-mono text-teal-700 font-bold">{currentWeeklyTotal.toFixed(1)} / {weeklyGoalTarget} hrs</span>
              </div>

              {/* Animated SVG Circle */}
              <div className="relative w-40 h-40 mx-auto my-3 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-slate-100"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Indicator */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-[#fa5a1e] transition-all duration-1000 ease-out"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold text-slate-900 font-display">{weeklyGoalPercentage}%</span>
                  <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Completed</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Only {(weeklyGoalTarget - currentWeeklyTotal).toFixed(1)} hrs to target
              </div>
              <p className="text-[11px] text-slate-500">
                Hitting your weekly goal awards the <strong>Weekly Champion</strong> XP multiplier boost.
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Split: Enrolled Courses (6 Cols) + Achievement Badges (6 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Enrolled Courses in Progress */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-600" />
                Active Courses in Progress
              </h3>
              <span className="text-xs text-slate-500">3 of 4 in progress</span>
            </div>

            <div className="space-y-3">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors line-clamp-1">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {course.instructor.name} • {course.duration}
                      </p>
                      
                      {/* Mini progress bar */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="w-28 sm:w-36 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-teal-500 to-[#fa5a1e] rounded-full"
                            style={{ width: `${course.progress || 35}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-teal-700 font-bold">{course.progress || 35}%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onResumeCourse(course)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#fa5a1e] hover:bg-[#e04812] text-white text-xs font-bold shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>Resume</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges Showcase */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Achievement Badges
                </h3>
                <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">4 of 6 Unlocked</span>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-3 gap-3 my-4">
                {userProgress.badges.map((badge) => {
                  const isSelected = selectedBadge.id === badge.id;
                  return (
                    <button
                      key={badge.id}
                      onClick={() => setSelectedBadge(badge)}
                      className={`p-3 rounded-2xl border flex flex-col items-center text-center transition-all ${
                        isSelected
                          ? 'bg-teal-50 border-teal-500 shadow-md scale-105'
                          : badge.unlocked
                          ? 'bg-slate-50 border-slate-200 hover:border-slate-300'
                          : 'bg-slate-50/50 border-slate-200 opacity-40'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                        badge.unlocked ? 'bg-amber-100 text-amber-700 shadow-xs' : 'bg-slate-200 text-slate-400'
                      }`}>
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 line-clamp-1">{badge.title}</span>
                      <span className="text-[9px] text-slate-500 uppercase mt-0.5">{badge.rarity}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Badge Detail Box */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <h5 className="text-xs font-bold text-slate-900">{selectedBadge.title}</h5>
                <span className="text-[10px] px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-bold font-mono">
                  +{selectedBadge.xp} XP
                </span>
              </div>
              <p className="text-xs text-slate-600">{selectedBadge.description}</p>
              <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1.5">
                {selectedBadge.unlocked ? (
                  <span className="text-emerald-700 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Unlocked ({selectedBadge.unlockedAt})
                  </span>
                ) : (
                  <span className="text-slate-400">🔒 Locked • Complete task to earn</span>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
