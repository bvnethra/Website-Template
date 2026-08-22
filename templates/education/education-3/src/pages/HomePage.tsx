import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { COURSES_DATA, EVENTS_DATA, FACULTY_MEMBERS } from '../data/mockData';
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Award, 
  Calendar, 
  Users, 
  BookOpen, 
  MapPin, 
  TrendingUp, 
  GraduationCap, 
  Info, 
  CheckCircle2, 
  ArrowUpRight,
  Compass,
  Trophy,
  Flame,
  Activity,
  Music,
  Globe2
} from 'lucide-react';
import { ScholarshipCalculatorModal } from '../components/common/ScholarshipCalculatorModal';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setActiveCourseDetailModal, setSelectedCourseForApply } = useApp();
  const [isScholarshipModalOpen, setIsScholarshipModalOpen] = useState(false);
  const [facultyIndex, setFacultyIndex] = useState(0);

  // Top featured courses
  const featuredCourses = COURSES_DATA.slice(0, 4);

  // Upcoming top events
  const upcomingEvents = EVENTS_DATA.slice(0, 4);

  const handleNextFaculty = () => {
    setFacultyIndex((prev) => (prev + 1) % FACULTY_MEMBERS.length);
  };

  const handlePrevFaculty = () => {
    setFacultyIndex((prev) => (prev - 1 + FACULTY_MEMBERS.length) % FACULTY_MEMBERS.length);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D3436] pb-16 space-y-12">
      
      {/* Top Main Hero Section matching exact screenshot layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Hero Typography & Actions (approx 4.5 cols) */}
          <div className="lg:col-span-4 bg-white rounded-[32px] p-6 sm:p-8 border border-[#E8EAE3] flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1EA] text-[#4A5D4E] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
                <span>Admissions Open • Fall 2026</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl xl:text-5xl font-extrabold uppercase tracking-tight text-[#4A5D4E] leading-[1.08]">
                EMPOWERING FUTURE LEADERS
              </h1>

              <p className="text-base sm:text-lg text-[#2D3436]/70 leading-relaxed font-normal">
                Explore a world of academic possibilities and personalized growth.
              </p>
            </div>

            <div className="pt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/courses')}
                id="hero-explore-degrees-btn"
                className="px-5 py-3 rounded-2xl bg-[#4A5D4E] hover:bg-[#3B4B3F] active:scale-95 text-white font-bold text-sm shadow-xs transition-all flex items-center gap-2"
              >
                <span>Explore Degrees</span>
                <ChevronRight className="w-4 h-4 text-[#A7B3A2]" />
              </button>

              <button
                onClick={() => navigate('/admissions')}
                id="hero-start-application-btn"
                className="px-5 py-3 rounded-2xl bg-[#F4F1EA] hover:bg-[#E8EAE3] border border-[#E8EAE3] active:scale-95 text-[#4A5D4E] font-bold text-sm transition-all flex items-center gap-2"
              >
                <span>Start Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Column: Hero Campus Photograph (approx 5 cols) */}
          <div className="lg:col-span-5 relative rounded-[32px] overflow-hidden min-h-[300px] lg:min-h-[420px] shadow-xs border border-[#E8EAE3] group">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
              alt="Eduvora University Students Collaborating"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A7B3A2] animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A7B3A2]">
                  Main Campus Quad • Cambridge & Boston
                </span>
              </div>
              <p className="text-sm font-medium text-white/95 mt-1">
                Collaborative research and vibrant student life across 45+ state-of-the-art facilities.
              </p>
            </div>
          </div>

          {/* Right Column: Scholarship Estimator & Application Summary Cards (approx 3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Top Right Card: Scholarship Estimator */}
            <div 
              onClick={() => setIsScholarshipModalOpen(true)}
              id="hero-scholarship-widget"
              className="bg-white hover:bg-[#F9F7F2] p-5 rounded-[32px] border border-[#E8EAE3] shadow-xs cursor-pointer transition-all hover:scale-[1.01] flex-1 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#4A5D4E] font-heading flex items-center gap-1 group-hover:text-[#2C382E] transition-colors">
                    SCHOLARSHIP ESTIMATOR
                    <ChevronRight className="w-3.5 h-3.5 text-[#A7B3A2] ml-0.5" />
                  </span>
                  <Info className="w-3.5 h-3.5 text-[#A7B3A2]" />
                </div>
                <p className="text-xs text-[#2D3436]/60 mt-1">
                  Estimated merit-based aid amount
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[#E8EAE3] flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold font-heading text-[#4A5D4E] tracking-tight">
                  $15,000
                </span>
                <span className="text-xs font-bold text-[#4A5D4E] bg-[#F4F1EA] px-2.5 py-1 rounded-full border border-[#E8EAE3]">
                  Calculate ➔
                </span>
              </div>
            </div>

            {/* Bottom Right Card: Active Application matching the Natural Tones design theme */}
            <div className="bg-[#4A5D4E] text-white p-5 rounded-[32px] shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#A7B3A2] uppercase tracking-widest">
                    ACTIVE APPLICATION
                  </span>
                  <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                    Ref: EDV-2026-X8R2
                  </span>
                </div>

                <div className="mt-2 space-y-2">
                  <h4 className="text-base font-serif italic text-white leading-tight">
                    M.S. in Data Science & Machine Learning
                  </h4>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] opacity-80">
                      <span>Dossier Progress</span>
                      <span className="font-bold">65%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[65%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[11px] text-[#A7B3A2]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Faculty Review</span>
                </div>
                <button
                  onClick={() => navigate('/admissions')}
                  className="px-3 py-1.5 bg-white hover:bg-[#F4F1EA] text-[#4A5D4E] font-bold rounded-xl text-xs transition-colors"
                >
                  Track Status
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Second Row: FEATURED PROGRAMS + CAMPUS LIFE + UPCOMING EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Section 1: FEATURED PROGRAMS (approx 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-black uppercase tracking-wider text-[#4A5D4E]">
                FEATURED PROGRAMS
              </h2>
              <Link 
                to="/courses" 
                className="text-xs font-bold text-[#4A5D4E] hover:underline flex items-center gap-1"
              >
                <span>View All ({COURSES_DATA.length})</span>
                <ChevronRight className="w-3 h-3 text-[#A7B3A2]" />
              </Link>
            </div>

            {/* 2x2 Grid of Course Cards matching Natural Tones styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {featuredCourses.map((prog) => (
                <div
                  key={prog.id}
                  id={`featured-prog-${prog.id}`}
                  onClick={() => setActiveCourseDetailModal(prog)}
                  className="bg-white hover:bg-[#FDFBF7] p-4 rounded-2xl border border-[#E8EAE3] shadow-xs cursor-pointer transition-all hover:shadow-md flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-[#E8EAE3] shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="bg-[#F4F1EA] text-[#4A5D4E] text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {prog.degreeLevel}
                        </span>
                        <span className="text-[#A7B3A2] text-[10px] font-medium">
                          {prog.mode}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#4A5D4E] leading-tight line-clamp-2 group-hover:text-[#2C382E] transition-colors">
                        {prog.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#2D3436]/60 line-clamp-2 leading-relaxed">
                    {prog.tagline}
                  </p>

                  <div className="pt-2 border-t border-[#E8EAE3] flex items-center justify-between text-xs">
                    <span className="font-bold text-[#4A5D4E]">
                      ${prog.tuitionPerSemester.toLocaleString()} <span className="font-normal text-[#A7B3A2]">/ sem</span>
                    </span>
                    <button className="text-[#4A5D4E] font-bold text-xs group-hover:underline">
                      View Syllabus →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: CAMPUS LIFE Spotlight (approx 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-black uppercase tracking-wider text-[#4A5D4E]">
                CAMPUS LIFE
              </h2>
              <Link 
                to="/campus-life" 
                className="text-xs font-bold text-[#4A5D4E] hover:underline flex items-center gap-1"
              >
                <span>Explore Campus</span>
                <ChevronRight className="w-3 h-3 text-[#A7B3A2]" />
              </Link>
            </div>

            {/* Campus Life Card */}
            <div className="bg-[#F9F7F2] rounded-[32px] p-4 sm:p-5 border border-[#E8EAE3] shadow-xs space-y-4">
              
              <div className="relative rounded-2xl overflow-hidden h-36 border border-[#E8EAE3]">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800"
                  alt="Eduvora Student Center & Campus Green"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#2C382E]/90 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <h4 className="text-sm font-bold text-white">Eduvora Student Commons</h4>
                  <p className="text-[11px] text-[#A7B3A2]">Modern center of collegiate community & arts</p>
                </div>
              </div>

              {/* 3 Categories Pills/Cards: Campus Life, Sports, Culture */}
              <div className="grid grid-cols-3 gap-2 text-left">
                
                <Link
                  to="/campus-life"
                  className="bg-white hover:bg-[#F4F1EA] p-2.5 rounded-xl border border-[#E8EAE3] transition-colors"
                >
                  <Users className="w-4 h-4 text-[#4A5D4E] mb-1" />
                  <h5 className="text-xs font-bold text-[#4A5D4E] leading-tight">Campus Life</h5>
                  <p className="text-[10px] text-[#2D3436]/60 line-clamp-2 mt-0.5">
                    120+ clubs & student associations.
                  </p>
                </Link>

                <Link
                  to="/campus-life"
                  className="bg-white hover:bg-[#F4F1EA] p-2.5 rounded-xl border border-[#E8EAE3] transition-colors"
                >
                  <Trophy className="w-4 h-4 text-[#4A5D4E] mb-1" />
                  <h5 className="text-xs font-bold text-[#4A5D4E] leading-tight">Sports</h5>
                  <p className="text-[10px] text-[#2D3436]/60 line-clamp-2 mt-0.5">
                    Olympic complex & varsity athletics.
                  </p>
                </Link>

                <Link
                  to="/campus-life"
                  className="bg-white hover:bg-[#F4F1EA] p-2.5 rounded-xl border border-[#E8EAE3] transition-colors"
                >
                  <Music className="w-4 h-4 text-[#4A5D4E] mb-1" />
                  <h5 className="text-xs font-bold text-[#4A5D4E] leading-tight">Culture</h5>
                  <p className="text-[10px] text-[#2D3436]/60 line-clamp-2 mt-0.5">
                    Art festivals, hackathons & theater.
                  </p>
                </Link>

              </div>

            </div>
          </div>

          {/* Section 3: UPCOMING EVENTS Side Card (approx 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-black uppercase tracking-wider text-[#4A5D4E] flex items-center gap-1">
                UPCOMING EVENTS
                <ChevronRight className="w-4 h-4 text-[#A7B3A2]" />
              </h2>
              <Link 
                to="/campus-life" 
                className="text-xs font-bold text-[#4A5D4E] hover:underline"
              >
                All
              </Link>
            </div>

            <div className="bg-white rounded-[32px] p-4 border border-[#E8EAE3] shadow-xs divide-y divide-[#E8EAE3]">
              {upcomingEvents.map((evt) => {
                const dateParts = evt.date.split(' ');
                const month = dateParts[0];
                const day = dateParts[1]?.replace(',', '');

                return (
                  <div 
                    key={evt.id}
                    onClick={() => navigate('/campus-life')}
                    className="py-3 first:pt-0 last:pb-0 flex items-center gap-3 cursor-pointer hover:bg-[#F9F7F2] -mx-2 px-2 rounded-xl transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#F4F1EA] text-[#4A5D4E] border border-[#E8EAE3] flex flex-col items-center justify-center shrink-0 leading-none">
                      <span className="text-[10px] font-bold text-[#A7B3A2] uppercase">{month}</span>
                      <span className="text-lg font-serif text-[#4A5D4E] -mt-1">{day}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-[#4A5D4E] group-hover:text-[#2C382E] transition-colors truncate">
                        {evt.title}
                      </h4>
                      <p className="text-[11px] text-[#2D3436]/60 truncate">
                        {evt.category} • {evt.location.split('&')[0]}
                      </p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-[#A7B3A2] shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Row 3: Live News Marquee & Faculty Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* News & Events Marquee Ticker Bar (approx 8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-3 border border-[#E8EAE3] flex items-center gap-3 overflow-hidden shadow-xs">
            <span className="px-3 py-1 rounded-xl bg-[#4A5D4E] text-white text-xs font-black uppercase tracking-wider font-heading shrink-0 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#A7B3A2]" />
              NEWS & EVENTS
            </span>

            <div className="overflow-hidden whitespace-nowrap flex-1 text-xs font-semibold text-[#2D3436]">
              <div className="animate-marquee inline-flex gap-8">
                <span>▶ Eduvora Ranks #12 in Global Innovation & Sustainable Technology</span>
                <span>▶ Fall 2026 Applications Open: Priority Deadline Oct 30</span>
                <span>▶ Dr. Evelyn Vance Awarded $4.2M NSF Grant for Foundation Model Alignment</span>
                <span>▶ New BioTech Genomic Cleanroom Complex Inauguration this Friday</span>
                <span>▶ Campus Job Fair: 90+ Fortune 500 Companies Recruiting Live on Nov 18</span>
              </div>
            </div>
          </div>

          {/* Meet Our Faculty Carousel Bar (approx 4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-3 border border-[#E8EAE3] flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#4A5D4E] font-heading">
                MEET OUR FACULTY
              </span>

              {/* Faculty Avatars */}
              <div className="flex -space-x-2">
                {FACULTY_MEMBERS.map((fac, idx) => (
                  <img
                    key={fac.id}
                    src={fac.avatar}
                    alt={fac.name}
                    referrerPolicy="no-referrer"
                    onClick={() => setFacultyIndex(idx)}
                    className={`w-8 h-8 rounded-full object-cover border-2 transition-all cursor-pointer ${
                      facultyIndex === idx ? 'border-[#4A5D4E] scale-110 z-10' : 'border-white'
                    }`}
                    title={`${fac.name} (${fac.role})`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevFaculty}
                className="p-1.5 rounded-lg hover:bg-[#F4F1EA] text-[#4A5D4E] transition-colors"
                aria-label="Previous faculty"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextFaculty}
                className="p-1.5 rounded-lg hover:bg-[#F4F1EA] text-[#4A5D4E] transition-colors"
                aria-label="Next faculty"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* University Excellence Key Pillars Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] text-center shadow-xs">
            <span className="text-3xl font-black font-heading text-[#4A5D4E]">98.4%</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A7B3A2] block mt-1">
              Graduate Employment Rate
            </span>
            <p className="text-[11px] text-[#2D3436]/60 mt-0.5">Within 6 months of graduation</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] text-center shadow-xs">
            <span className="text-3xl font-black font-heading text-[#4A5D4E]">$45M+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A7B3A2] block mt-1">
              Annual Research Grants
            </span>
            <p className="text-[11px] text-[#2D3436]/60 mt-0.5">NSF, NIH & Industry Fellowships</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] text-center shadow-xs">
            <span className="text-3xl font-black font-heading text-[#4A5D4E]">140+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A7B3A2] block mt-1">
              Global University Partners
            </span>
            <p className="text-[11px] text-[#2D3436]/60 mt-0.5">International exchange & dual degrees</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] text-center shadow-xs">
            <span className="text-3xl font-black font-heading text-[#4A5D4E]">12:1</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A7B3A2] block mt-1">
              Student-Faculty Ratio
            </span>
            <p className="text-[11px] text-[#2D3436]/60 mt-0.5">Close mentorship & lab research</p>
          </div>

        </div>
      </section>

      {/* Scholarship Modal */}
      <ScholarshipCalculatorModal
        isOpen={isScholarshipModalOpen}
        onClose={() => setIsScholarshipModalOpen(false)}
      />

    </div>
  );
};
