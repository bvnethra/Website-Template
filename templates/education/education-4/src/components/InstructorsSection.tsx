import React from 'react';
import { 
  Star, 
  Users, 
  BookOpen, 
  Award, 
  Sparkles, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { INSTRUCTORS } from '../data/coursesData';
import { Instructor } from '../types';

interface InstructorsSectionProps {
  onSelectInstructor: (instructor: Instructor) => void;
}

export const InstructorsSection: React.FC<InstructorsSectionProps> = ({
  onSelectInstructor,
}) => {
  return (
    <section id="instructors" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
              <span>World-Class Mentorship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e2942] font-display tracking-tight">
              Learn from Industry Practitioners
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Our faculty lead research and build production infrastructure at the world's most innovative tech giants.
            </p>
          </div>
        </div>

        {/* 4 Instructor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTRUCTORS.map((inst, idx) => (
            <motion.div
              key={inst.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => onSelectInstructor(inst)}
              className="rounded-3xl bg-white border border-slate-200/90 hover:border-teal-300 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all group cursor-pointer"
            >
              <div>
                <div className="relative mb-5">
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-100 group-hover:border-teal-400 transition-colors"
                  />
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] text-amber-700 font-bold flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" /> {inst.rating}
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-lg group-hover:text-teal-700 transition-colors">
                  {inst.name}
                </h3>
                <p className="text-xs text-teal-700 font-medium">{inst.role}</p>
                <p className="text-[11px] text-slate-500 font-medium">{inst.company}</p>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {inst.bio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-teal-600" /> {(inst.studentsCount / 1000).toFixed(0)}k Students
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-orange-500" /> {inst.coursesCount} Courses
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
