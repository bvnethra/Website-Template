import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { COURSES_DATA } from '../data/mockData';
import { Course, DegreeLevel, Department, StudyMode } from '../types';
import { 
  Search, 
  SlidersHorizontal, 
  Filter, 
  BookOpen, 
  Award, 
  GraduationCap, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Layers, 
  Bookmark, 
  ArrowRight, 
  ChevronRight, 
  RotateCcw,
  LayoutGrid,
  List,
  Sparkles,
  User,
  Star
} from 'lucide-react';
import { CourseCompareModal } from '../components/common/CourseCompareModal';

export const CoursesPage: React.FC = () => {
  const { 
    setActiveCourseDetailModal, 
    setSelectedCourseForApply, 
    toggleCompareCourse, 
    comparedCourseIds,
    savedCourseIds,
    toggleSaveCourse,
    addToast
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDegrees, setSelectedDegrees] = useState<DegreeLevel[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([]);
  const [selectedModes, setSelectedModes] = useState<StudyMode[]>([]);
  const [maxTuition, setMaxTuition] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<'featured' | 'tuition-asc' | 'tuition-desc' | 'rating' | 'duration'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Parse query params on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const degreeParam = params.get('degree');
    const deptParam = params.get('department');
    const searchParam = params.get('search');
    const courseIdParam = params.get('id');

    if (degreeParam) {
      setSelectedDegrees([degreeParam as DegreeLevel]);
    }
    if (deptParam) {
      setSelectedDepartments([deptParam as Department]);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (courseIdParam) {
      const found = COURSES_DATA.find((c) => c.id === courseIdParam);
      if (found) {
        setActiveCourseDetailModal(found);
      }
    }
  }, [location.search]);

  // Degrees list
  const degreeOptions: DegreeLevel[] = ['Undergraduate', 'Postgraduate', 'Doctorate'];
  
  // Departments list
  const departmentOptions: Department[] = [
    'Computer Science & AI',
    'Business & Management',
    'BioTech & Health Sciences',
    'Design & Media',
    'Engineering & Robotics',
    'Humanities & Social Sciences'
  ];

  // Modes list
  const modeOptions: StudyMode[] = ['On-Campus', 'Hybrid', 'Online'];

  // Toggle helper
  const toggleDegree = (deg: DegreeLevel) => {
    setSelectedDegrees((prev) => 
      prev.includes(deg) ? prev.filter((d) => d !== deg) : [...prev, deg]
    );
  };

  const toggleDepartment = (dept: Department) => {
    setSelectedDepartments((prev) => 
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const toggleMode = (m: StudyMode) => {
    setSelectedModes((prev) => 
      prev.includes(m) ? prev.filter((item) => item !== m) : [...prev, m]
    );
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedDegrees([]);
    setSelectedDepartments([]);
    setSelectedModes([]);
    setMaxTuition(20000);
    setSortBy('featured');
    addToast({ type: 'info', title: 'Filters Reset', message: 'Displaying all academic programs.' });
  };

  // Filtered & Sorted Courses
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      // Search text match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesTagline = course.tagline.toLowerCase().includes(q);
        const matchesDept = course.department.toLowerCase().includes(q);
        const matchesFaculty = course.facultyLead.name.toLowerCase().includes(q);
        const matchesOutcome = course.careerOutcomes.some((o) => o.toLowerCase().includes(q));
        if (!matchesTitle && !matchesTagline && !matchesDept && !matchesFaculty && !matchesOutcome) {
          return false;
        }
      }

      // Degree filter
      if (selectedDegrees.length > 0 && !selectedDegrees.includes(course.degreeLevel)) {
        return false;
      }

      // Department filter
      if (selectedDepartments.length > 0 && !selectedDepartments.includes(course.department)) {
        return false;
      }

      // Mode filter
      if (selectedModes.length > 0 && !selectedModes.includes(course.mode)) {
        return false;
      }

      // Tuition max
      if (course.tuitionPerSemester > maxTuition) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      if (sortBy === 'tuition-asc') {
        return a.tuitionPerSemester - b.tuitionPerSemester;
      }
      if (sortBy === 'tuition-desc') {
        return b.tuitionPerSemester - a.tuitionPerSemester;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'duration') {
        return a.durationYears - b.durationYears;
      }
      return 0;
    });
  }, [searchQuery, selectedDegrees, selectedDepartments, selectedModes, maxTuition, sortBy]);

  const handleApplyClick = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCourseForApply(course);
    addToast({
      type: 'info',
      title: 'Program Selected',
      message: `${course.title} pre-filled in your Admissions Application.`,
    });
    navigate('/admissions?step=1');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D3436] pb-20">
      
      {/* Header Banner */}
      <section className="bg-white border-b border-[#E8EAE3] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1EA] text-[#4A5D4E] text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-[#4A5D4E]" />
              <span>Academic Curriculum & Degrees</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#4A5D4E]">
              Explore World-Class Programs
            </h1>
            <p className="text-base sm:text-lg text-[#2D3436]/70 leading-relaxed">
              Discover accredited undergraduate majors, specialized master's degrees, and funded doctoral fellowships taught by pioneering researchers.
            </p>
          </div>

          {/* Quick Search & Sort Bar */}
          <div className="mt-8 pt-6 border-t border-[#E8EAE3] flex flex-col sm:flex-row gap-4 items-center justify-between">
            
            {/* Search input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7B3A2]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs by name, department, or faculty..."
                className="w-full pl-11 pr-4 py-3 bg-[#FDFBF7] rounded-2xl border border-[#E8EAE3] text-sm text-[#2D3436] placeholder-[#A7B3A2] focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#A7B3A2] hover:text-[#4A5D4E]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#A7B3A2] uppercase tracking-wider hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#E8EAE3] rounded-xl px-3 py-2 text-xs font-bold text-[#4A5D4E] focus:outline-none focus:ring-1 focus:ring-[#4A5D4E]"
                >
                  <option value="featured">Featured Programs</option>
                  <option value="tuition-asc">Tuition: Low to High</option>
                  <option value="tuition-desc">Tuition: High to Low</option>
                  <option value="rating">Highest Rated (★)</option>
                  <option value="duration">Shortest Duration</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-[#F4F1EA] p-1 rounded-xl border border-[#E8EAE3]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-[#4A5D4E] shadow-xs' : 'text-[#A7B3A2] hover:text-[#4A5D4E]'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-[#4A5D4E] shadow-xs' : 'text-[#A7B3A2] hover:text-[#4A5D4E]'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center gap-1.5 bg-[#4A5D4E] text-white px-3 py-2 rounded-xl text-xs font-bold"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content: Sidebar Filters + Program Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (approx 3.5 cols) */}
          <aside className={`lg:col-span-3 space-y-6 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-5 rounded-3xl border border-[#E8EAE3] shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E8EAE3]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#4A5D4E]" />
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#4A5D4E]">
                    Refine Programs
                  </h3>
                </div>
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] font-bold text-[#4A5D4E] hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Filter 1: Degree Level */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] block">
                  Degree Level
                </label>
                <div className="space-y-1.5">
                  {degreeOptions.map((deg) => {
                    const isChecked = selectedDegrees.includes(deg);
                    return (
                      <label
                        key={deg}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F4F1EA] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleDegree(deg)}
                            className="w-4 h-4 rounded text-[#4A5D4E] focus:ring-[#4A5D4E] accent-[#4A5D4E]"
                          />
                          <span className="text-xs font-medium text-[#2D3436]">{deg}</span>
                        </div>
                        <span className="text-[10px] text-[#4A5D4E] bg-[#F4F1EA] px-2 py-0.5 rounded-full font-bold">
                          {COURSES_DATA.filter((c) => c.degreeLevel === deg).length}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Filter 2: Department */}
              <div className="space-y-2.5 pt-4 border-t border-[#E8EAE3]">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] block">
                  Academic Department
                </label>
                <div className="space-y-1.5">
                  {departmentOptions.map((dept) => {
                    const isChecked = selectedDepartments.includes(dept);
                    return (
                      <label
                        key={dept}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F4F1EA] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleDepartment(dept)}
                            className="w-4 h-4 rounded text-[#4A5D4E] focus:ring-[#4A5D4E] accent-[#4A5D4E] shrink-0"
                          />
                          <span className="text-xs font-medium text-[#2D3436] truncate">{dept}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Filter 3: Study Mode */}
              <div className="space-y-2.5 pt-4 border-t border-[#E8EAE3]">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] block">
                  Learning Mode
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {modeOptions.map((m) => {
                    const isChecked = selectedModes.includes(m);
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => toggleMode(m)}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                          isChecked
                            ? 'bg-[#4A5D4E] text-white border-[#4A5D4E]'
                            : 'bg-white text-[#2D3436] border-[#E8EAE3] hover:bg-[#F4F1EA]'
                        }`}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter 4: Max Tuition Slider */}
              <div className="space-y-2 pt-4 border-t border-[#E8EAE3]">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold uppercase tracking-wider text-[#4A5D4E]">
                    Max Tuition / Sem
                  </label>
                  <span className="font-bold text-[#4A5D4E] font-heading">
                    ${maxTuition.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="1000"
                  value={maxTuition}
                  onChange={(e) => setMaxTuition(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#E8EAE3] rounded-lg appearance-none cursor-pointer accent-[#4A5D4E]"
                />
                <div className="flex justify-between text-[10px] text-[#A7B3A2]">
                  <span>$0 (Funded)</span>
                  <span>$10,000</span>
                  <span>$20,000+</span>
                </div>
              </div>

            </div>

            {/* Quick Admissions Info Box */}
            <div className="bg-[#F9F7F2] p-5 rounded-3xl border border-[#E8EAE3] space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4A5D4E]" />
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                  Need Assistance?
                </h4>
              </div>
              <p className="text-xs text-[#2D3436]/70 leading-relaxed">
                Connect with our faculty admission counselors for course syllabus inquiries or scholarship evaluations.
              </p>
              <button
                onClick={() => navigate('/admissions')}
                className="w-full py-2 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold transition-colors"
              >
                Schedule Admissions Call
              </button>
            </div>
          </aside>

          {/* Main Results Grid (approx 8.5 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Active filter badges bar & Results count */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8EAE3]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#4A5D4E]">
                  Showing {filteredCourses.length} Academic Programs
                </span>
                {(selectedDegrees.length > 0 || selectedDepartments.length > 0 || selectedModes.length > 0 || searchQuery) && (
                  <span className="text-xs text-[#A7B3A2]">• Filtered</span>
                )}
              </div>

              {/* Active Badges */}
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedDegrees.map((deg) => (
                  <span
                    key={deg}
                    onClick={() => toggleDegree(deg)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#4A5D4E] text-white cursor-pointer hover:bg-[#3B4B3F] transition-colors"
                  >
                    <span>{deg}</span>
                    <span>×</span>
                  </span>
                ))}
                {selectedDepartments.map((dept) => (
                  <span
                    key={dept}
                    onClick={() => toggleDepartment(dept)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F4F1EA] text-[#4A5D4E] border border-[#E8EAE3] cursor-pointer hover:bg-[#E8EAE3] transition-colors"
                  >
                    <span className="truncate max-w-[120px]">{dept}</span>
                    <span>×</span>
                  </span>
                ))}
                {selectedModes.map((m) => (
                  <span
                    key={m}
                    onClick={() => toggleMode(m)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#4A5D4E] text-white cursor-pointer hover:bg-[#3B4B3F] transition-colors"
                  >
                    <span>{m}</span>
                    <span>×</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Courses Display */}
            {filteredCourses.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8EAE3] space-y-4">
                <BookOpen className="w-12 h-12 text-[#A7B3A2] mx-auto" />
                <h3 className="font-heading text-lg font-bold text-[#4A5D4E]">
                  No matching academic programs found
                </h3>
                <p className="text-sm text-[#2D3436]/70 max-w-md mx-auto">
                  Try adjusting your search criteria or resetting the applied filters to view more programs.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              
              /* GRID VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredCourses.map((course) => {
                  const isSaved = savedCourseIds.includes(course.id);
                  const isCompared = comparedCourseIds.includes(course.id);

                  return (
                    <div
                      key={course.id}
                      id={`course-card-${course.id}`}
                      onClick={() => setActiveCourseDetailModal(course)}
                      className="bg-white hover:bg-[#FDFBF7] rounded-[32px] border border-[#E8EAE3] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer group"
                    >
                      {/* Image & Badges */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                        
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#4A5D4E]/90 backdrop-blur-xs text-white">
                            {course.degreeLevel}
                          </span>
                          <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-[#4A5D4E]">
                            {course.mode}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3 flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveCourse(course.id);
                            }}
                            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                              isSaved ? 'bg-[#4A5D4E] text-white' : 'bg-black/40 text-white hover:bg-black/60'
                            }`}
                            aria-label="Save program"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCompareCourse(course.id);
                            }}
                            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                              isCompared ? 'bg-[#4A5D4E] text-white ring-2 ring-[#A7B3A2]' : 'bg-black/40 text-white hover:bg-black/60'
                            }`}
                            aria-label="Compare program"
                          >
                            <Layers className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] font-semibold text-[#A7B3A2] uppercase tracking-wider block">
                            {course.department}
                          </span>
                          <h3 className="text-base font-bold font-heading text-white leading-snug line-clamp-1">
                            {course.title}
                          </h3>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        
                        <p className="text-xs text-[#2D3436]/70 leading-relaxed line-clamp-2">
                          {course.tagline}
                        </p>

                        {/* Metrics bar: Tuition, Duration, Credits */}
                        <div className="grid grid-cols-3 gap-2 bg-[#F4F1EA] p-3 rounded-2xl border border-[#E8EAE3] text-center">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#A7B3A2] block">Tuition</span>
                            <span className="text-xs font-extrabold text-[#4A5D4E] font-heading">
                              {course.tuitionPerSemester === 0 ? 'Funded' : `$${course.tuitionPerSemester.toLocaleString()}`}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#A7B3A2] block">Duration</span>
                            <span className="text-xs font-extrabold text-[#4A5D4E] font-heading">
                              {course.durationYears} Years
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#A7B3A2] block">Credits</span>
                            <span className="text-xs font-extrabold text-[#4A5D4E] font-heading">
                              {course.totalCredits} Cr
                            </span>
                          </div>
                        </div>

                        {/* Faculty Lead preview */}
                        <div className="flex items-center justify-between text-xs text-[#2D3436]/70 pt-1">
                          <div className="flex items-center gap-2">
                            <img
                              src={course.facultyLead.avatar}
                              alt={course.facultyLead.name}
                              referrerPolicy="no-referrer"
                              className="w-6 h-6 rounded-full object-cover border border-[#E8EAE3]"
                            />
                            <span className="text-[11px] font-medium truncate max-w-[130px]">
                              {course.facultyLead.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-[#4A5D4E] bg-[#F4F1EA] px-2 py-0.5 rounded-md border border-[#E8EAE3]">
                            {course.accreditation[0]}
                          </span>
                        </div>

                      </div>

                      {/* Card Action Footer */}
                      <div className="px-5 py-3.5 bg-[#FDFBF7] border-t border-[#E8EAE3] flex items-center justify-between">
                        <button
                          onClick={() => setActiveCourseDetailModal(course)}
                          className="text-xs font-bold text-[#4A5D4E] hover:underline flex items-center gap-1 transition-colors"
                        >
                          <span>View Syllabus</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#A7B3A2]" />
                        </button>

                        <button
                          onClick={(e) => handleApplyClick(course, e)}
                          id={`apply-btn-${course.id}`}
                          className="px-4 py-1.5 rounded-xl bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1 active:scale-95"
                        >
                          <span>Apply</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

            ) : (

              /* LIST VIEW */
              <div className="space-y-4">
                {filteredCourses.map((course) => {
                  const isSaved = savedCourseIds.includes(course.id);
                  const isCompared = comparedCourseIds.includes(course.id);

                  return (
                    <div
                      key={course.id}
                      onClick={() => setActiveCourseDetailModal(course)}
                      className="bg-white hover:bg-[#FDFBF7] rounded-3xl border border-[#E8EAE3] p-5 shadow-xs transition-all flex flex-col sm:flex-row gap-5 items-center cursor-pointer group"
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        referrerPolicy="no-referrer"
                        className="w-full sm:w-48 h-36 rounded-2xl object-cover border border-[#E8EAE3] shrink-0"
                      />

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#4A5D4E] text-white">
                            {course.degreeLevel}
                          </span>
                          <span className="text-xs font-semibold text-[#A7B3A2]">
                            {course.department} • {course.mode}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold font-heading text-[#4A5D4E] group-hover:text-[#2C382E] transition-colors">
                          {course.title}
                        </h3>

                        <p className="text-xs text-[#2D3436]/70 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#4A5D4E] pt-1">
                          <span>Tuition: {course.tuitionPerSemester === 0 ? 'Funded' : `$${course.tuitionPerSemester.toLocaleString()}/sem`}</span>
                          <span>• Duration: {course.durationYears} Years</span>
                          <span>• Credits: {course.totalCredits}</span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0 justify-end">
                        <button
                          onClick={(e) => handleApplyClick(course, e)}
                          className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white text-xs font-bold transition-all text-center"
                        >
                          Apply Now
                        </button>
                        <button
                          onClick={() => setActiveCourseDetailModal(course)}
                          className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#F4F1EA] hover:bg-[#E8EAE3] text-[#4A5D4E] text-xs font-bold transition-colors text-center border border-[#E8EAE3]"
                        >
                          Syllabus
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            )}

          </main>

        </div>
      </section>

      {/* Floating Compare Drawer Bar when courses are selected */}
      {comparedCourseIds.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-[#4A5D4E] text-white px-6 py-3 rounded-2xl shadow-2xl border border-[#A7B3A2] flex items-center gap-4 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2 text-xs font-bold">
            <Layers className="w-4 h-4 text-[#A7B3A2]" />
            <span>{comparedCourseIds.length} Programs Selected to Compare</span>
          </div>

          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-4 py-1.5 bg-white hover:bg-[#F4F1EA] text-[#4A5D4E] rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            Compare Now
          </button>
        </div>
      )}

      {/* Compare Modal */}
      <CourseCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
      />

    </div>
  );
};
