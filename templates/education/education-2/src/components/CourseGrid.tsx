import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Star, 
  Clock, 
  BookOpen, 
  PlayCircle, 
  Bookmark, 
  SlidersHorizontal,
  GraduationCap,
  Layers,
  ArrowRight,
  Code2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Category, Course, Difficulty } from '../types';

interface CourseGridProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onOpenLessonSandbox: (course: Course) => void;
}

const CATEGORIES: Category[] = [
  'All',
  'Data Science',
  'Digital Marketing',
  'AI & ML',
  'Frontend Engineering',
  'Cloud & DevOps'
];

const DIFFICULTIES: Difficulty[] = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
];

export const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  onSelectCourse,
  onOpenLessonSandbox,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('All Levels');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['course-data-science-masterclass']);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All Levels' || c.difficulty === selectedDifficulty;
      const matchesSearch = 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [courses, selectedCategory, selectedDifficulty, searchQuery]);

  return (
    <section id="courses" className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: FEATURED LEARNING (Exact title & style from picture) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0e2942] font-display tracking-tight uppercase">
              FEATURED LEARNING
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
              Explore accredited certifications, hands-on code sandboxes, and expert mentor feedback.
            </p>
          </div>

          {/* Quick Category Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 whitespace-nowrap ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter featured courses..."
              className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 bg-slate-50/80 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <span className="text-xs text-slate-500 font-medium">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty)}
              className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              {DIFFICULTIES.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Cards Grid (Matching the clean white card layout with avatars & ratings in the screenshot) */}
        <AnimatePresence mode="popLayout">
          {filteredCourses.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCourses.map((course, index) => {
                const isBookmarked = bookmarkedIds.includes(course.id);
                return (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    whileHover={{ y: -4 }}
                    onClick={() => onSelectCourse(course)}
                    className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
                  >
                    {/* Course Thumbnail Image */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                        loading="lazy"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        {course.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-teal-600 text-white shadow-sm">
                            {course.badge}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                          {course.category}
                        </span>
                      </div>

                      {/* Bookmark Icon */}
                      <button
                        onClick={(e) => toggleBookmark(e, course.id)}
                        className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
                          isBookmarked 
                            ? 'bg-orange-500 text-white shadow-sm' 
                            : 'bg-white/80 text-slate-600 hover:text-slate-900'
                        }`}
                        title={isBookmarked ? 'Saved' : 'Save course'}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    {/* Course Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Course Title */}
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                          {course.title}
                        </h3>

                        {/* Instructor Row with Avatar (as shown in picture) */}
                        <div className="mt-2.5 flex items-center gap-2.5">
                          <img
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          />
                          <span className="text-xs font-semibold text-slate-700">
                            {course.instructor.name}
                          </span>
                        </div>
                      </div>

                      {/* Rating and Duration row (⭐ 4.8 Rating  🕒 45 Hours) */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <div className="flex items-center gap-1 font-bold text-slate-800">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>{course.rating} Rating</span>
                        </div>

                        <div className="flex items-center gap-1 font-medium text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      {/* Bottom Action Strip */}
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCourse(course);
                          }}
                          className="flex-1 py-2 px-3 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Course Syllabus</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenLessonSandbox(course);
                          }}
                          className="py-2 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1"
                          title="Open interactive code & video lab"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>Try Lab</span>
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No courses match your filter</h3>
              <p className="text-xs text-slate-500 mt-1">Try resetting the category or searching for another topic.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedDifficulty('All Levels');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-teal-600 text-white font-bold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
