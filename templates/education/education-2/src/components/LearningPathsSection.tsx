import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  BookOpen, 
  CheckCircle2, 
  Briefcase,
  ChevronRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';
import { LEARNING_PATHS } from '../data/coursesData';
import { LearningPath } from '../types';

interface LearningPathsSectionProps {
  onSelectPath: (path: LearningPath) => void;
  onExploreCourses: () => void;
}

export const LearningPathsSection: React.FC<LearningPathsSectionProps> = ({
  onSelectPath,
  onExploreCourses,
}) => {
  const [activePathIndex, setActivePathIndex] = useState(0);
  const activePath = LEARNING_PATHS[activePathIndex];

  return (
    <section id="paths" className="py-20 bg-slate-50/70 border-t border-slate-100 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            <span>Career Roadmaps</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e2942] font-display tracking-tight leading-tight">
            Curated Paths for High-Growth Roles
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Stop guessing what to learn next. Follow verified progression tracks designed with hiring managers from top technology leaders.
          </p>
        </div>

        {/* Path Selectors Tabs */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-12 flex-wrap">
          {LEARNING_PATHS.map((path, idx) => {
            const isSelected = activePathIndex === idx;
            return (
              <button
                key={path.id}
                onClick={() => setActivePathIndex(idx)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#0e2942] text-white shadow-lg shadow-slate-900/20 scale-105'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-teal-700 hover:bg-slate-50'
                }`}
              >
                <Layers className={`w-4 h-4 ${isSelected ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{path.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Path Showcase Box */}
        <motion.div
          key={activePath.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Path Info & Benchmarks (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-teal-600 font-bold">
                  {activePath.role}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
                  {activePath.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {activePath.description}
                </p>
              </div>

              {/* Stats pill group */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" /> Timeline
                  </span>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    ~{activePath.estimatedMonths} Months
                  </div>
                  <span className="text-[10px] text-slate-500">6-8 hrs/week</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Avg Compensation
                  </span>
                  <div className="text-base font-bold text-emerald-600 mt-1 font-display">
                    {activePath.avgSalary}
                  </div>
                  <span className="text-[10px] text-slate-500">Verified Glassdoor 2026</span>
                </div>
              </div>

              {/* Key Skills Chip List */}
              <div>
                <h5 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2.5">
                  Core Skills Acquired
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activePath.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectPath(activePath)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#fa5a1e] hover:bg-[#e04812] text-white font-bold text-xs shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>Start This Roadmap ({activePath.coursesCount} Courses Included)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Step-by-Step Milestones Timeline (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Phase Progression Roadmap
              </h4>

              <div className="space-y-3">
                {activePath.steps.map((step, stepIdx) => (
                  <div
                    key={stepIdx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-teal-200 transition-all flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                      0{stepIdx + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-bold text-slate-900">{step.title}</h5>
                        <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
