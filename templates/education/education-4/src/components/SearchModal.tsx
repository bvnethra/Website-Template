import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  Star, 
  ArrowRight, 
  Clock, 
  TrendingUp,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Course } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  courses,
  onSelectCourse,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchResults = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const suggestedTopics = ['Generative AI', 'React 19', 'PyTorch', 'Data Science', 'Figma UX', 'Kubernetes'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-indigo-400 shrink-0" />
            <input
              id="global-search-modal-input"
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses, concepts, frameworks, instructors..."
              className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Topics Tags */}
          <div className="px-5 py-3 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-slate-500 shrink-0 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Popular:
            </span>
            {suggestedTopics.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => setSearchTerm(topic)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 whitespace-nowrap transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
            {searchResults.length > 0 ? (
              searchResults.map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    onSelectCourse(course);
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-800"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                          {course.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {course.difficulty}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors line-clamp-1 mt-0.5">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {course.instructor.name} • {course.duration}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400">
                <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm">No matching courses found for "{searchTerm}"</p>
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300">ESC</kbd> to exit</span>
            <span>{searchResults.length} courses found</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
