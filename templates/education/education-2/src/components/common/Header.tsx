import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Search,
  Menu,
  X,
  ChevronDown,
  Users,
  Bell,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string, param?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const {
    theme,
    config,
    openSearch,
    openCustomizer,
    openApplyModal,
    openTuitionCalc,
    openStudentPortal,
    openParentPortal,
    openNotificationsDrawer,
    openProspectusModal,
    openCompareModal,
    compareProgramIds,
    savedPrograms,
    notifications,
  } = useTheme();

  const { currentUser, isAuthenticated } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navGroups = [
    {
      id: 'academics',
      label: 'Academics',
      featured: {
        title: 'Academic Excellence',
        desc: 'Rigorous STEM, International Baccalaureate, Arts & Honors curriculum designed for global leadership.',
        actionLabel: 'Explore All 25+ Programs',
        route: 'programs',
      },
      columns: [
        {
          heading: 'Academic Catalog',
          items: [
            { label: 'All Programs & Tracks', route: 'programs', desc: 'Primary, Middle, High School & Honors' },
            { label: 'High School Honors & AP', route: 'programs', param: 'High School', desc: 'Rigorous collegiate preparation' },
            { label: 'STEM & Quantum Computing', route: 'programs', param: 'STEM', desc: 'AI, robotics & aerospace engineering' },
            { label: 'Fine Arts & Humanities', route: 'programs', param: 'Arts', desc: 'Studio design, orchestra & theater' },
          ],
        },
        {
          heading: 'Faculty & Curriculum',
          items: [
            { label: 'Academic Departments', route: 'departments', desc: '7 specialized schools & learning hubs' },
            { label: 'Faculty Directory & Chairs', route: 'faculty', desc: '150+ distinguished educators & scholars' },
            { label: 'Curriculum & Syllabi', route: 'programs', desc: 'Interactive course sequences & outcomes' },
            { label: 'Compare Programs', action: openCompareModal, desc: 'Side-by-side degree matrix evaluation' },
          ],
        },
      ],
    },
    {
      id: 'admissions',
      label: 'Admissions',
      featured: {
        title: '2026–2027 Admissions Open',
        desc: 'Begin your journey with Edunexa. Scholarships, merit aid, and holistic portfolio evaluation available.',
        actionLabel: 'Start Online Application',
        action: () => openApplyModal(),
      },
      columns: [
        {
          heading: 'Application & Process',
          items: [
            { label: 'Admission Process & Steps', route: 'admissions', desc: '5-stage interactive enrollment journey' },
            { label: 'Requirements & Eligibility', route: 'admissions', desc: 'Transcripts, exams & portfolio guidelines' },
            { label: 'Tuition & Fee Structure', action: openTuitionCalc, desc: 'Interactive attendance & aid calculator' },
            { label: 'Scholarships & Merit Grants', route: 'scholarships', desc: 'Full-tuition fellowships & assistance' },
          ],
        },
        {
          heading: 'Advising & Guidance',
          items: [
            { label: 'Download 2026 Prospectus', action: openProspectusModal, desc: 'Get our comprehensive academic guide' },
            { label: 'Book Campus Tour', route: 'contact', desc: 'Guided family visits & lab walk-throughs' },
            { label: 'Admissions FAQ', route: 'faq', desc: 'Answers to common questions and timelines' },
            { label: 'Contact Admissions Office', route: 'contact', desc: 'Direct counselor chat & consultations' },
          ],
        },
      ],
    },
    {
      id: 'campus',
      label: 'Campus',
      featured: {
        title: 'Waterfront Smart Campus',
        desc: '120 acres of high-tech cleanrooms, athletic arenas, botanical gardens, and creative studios in Boston.',
        actionLabel: 'Take Interactive Campus Tour',
        route: 'facilities',
      },
      columns: [
        {
          heading: 'Facilities & Labs',
          items: [
            { label: 'Campus Facilities & Labs', route: 'facilities', desc: 'Cleanrooms, libraries & maker studios' },
            { label: 'Sports & Aquatics Complex', route: 'facilities', desc: 'Olympic-grade athletic amenities' },
            { label: 'Centennial Library & Media', route: 'facilities', desc: 'Digital research commons & archives' },
            { label: 'Campus Photo Gallery', route: 'gallery', desc: 'High-res photos of academy spaces' },
          ],
        },
        {
          heading: 'Student Experience',
          items: [
            { label: 'Student Life Dashboard', route: 'campus-life', desc: 'Housing, dining & community culture' },
            { label: 'Clubs & Student Guilds', route: 'campus-life', desc: '40+ student-led organizations' },
            { label: 'Athletics & Varsity', route: 'campus-life', desc: 'Championship teams & wellness programs' },
            { label: 'Arts & Cultural Guilds', route: 'campus-life', desc: 'Theater productions & galleries' },
          ],
        },
      ],
    },
    {
      id: 'discover',
      label: 'Discover',
      featured: {
        title: 'Innovation & Impact',
        desc: 'Pioneering student research, global university placements, and a thriving worldwide alumni network.',
        actionLabel: 'Read Academy Gazette',
        route: 'news',
      },
      columns: [
        {
          heading: 'Research & News',
          items: [
            { label: 'Events & Masterclasses', route: 'events', desc: 'Upcoming lectures, open houses & games' },
            { label: 'News & Press Gazette', route: 'news', desc: 'Institutional breakthroughs & features' },
            { label: 'Research & Innovation Labs', route: 'research', desc: 'Patents, papers & STEM incubators' },
            { label: 'Student Achievements', route: 'about', desc: 'Olympiad medals & national awards' },
          ],
        },
        {
          heading: 'Community & Legacy',
          items: [
            { label: 'About Edunexa', route: 'about', desc: 'Our 25-year legacy, mission & leadership' },
            { label: 'Alumni Network & Pathways', route: 'alumni', desc: 'Global graduates in tech, law & medicine' },
            { label: 'Career & College Placements', route: 'placements', desc: '98.4% top-tier university acceptance' },
            { label: 'Institutional Documentation', route: 'documentation', desc: 'Architecture & technical roadmap' },
          ],
        },
      ],
    },
  ];

  return (
    <div ref={navContainerRef} className="w-full relative z-40">
      {/* 1. TOP INSTITUTIONAL BAR */}
      <div className="bg-[#0D2F2F] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-[#1A4F4F]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-slate-300 text-[11px]">
            <span className="font-semibold text-amber-300 hidden sm:inline">2026–2027 Admissions Open</span>
            <span className="hidden md:inline text-slate-400">• NAAC A++ / ABET Accredited</span>
            <span className="hidden lg:inline text-slate-400">• Office of Controller of Examinations</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Direct Student Portal CTA */}
            <button
              onClick={() => onNavigate('portal')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FF6B4A] hover:bg-[#E55535] text-white text-[11px] font-bold transition-all shadow-xs"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{isAuthenticated && currentUser ? `Student Portal (${currentUser.fullName.split(' ')[0]})` : 'Student Portal / ERP'}</span>
            </button>
            <button
              onClick={openParentPortal}
              className="text-slate-300 hover:text-white text-[11px] hidden sm:inline"
            >
              Parent Portal
            </button>
            <button
              onClick={() => onNavigate('documentation')}
              className="text-slate-400 hover:text-white text-[11px] hidden md:inline"
            >
              ERP Docs
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Distinctive Edunexa Crest & Brand */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div
              style={{ backgroundColor: theme.primary }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300 relative overflow-hidden shrink-0 border border-white/10"
            >
              <GraduationCap className="w-6 h-6 text-amber-400 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black tracking-tight text-xl sm:text-2xl text-slate-950 leading-none">
                  {config.name.toUpperCase()}
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 uppercase tracking-wider">
                  Est. 2001
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">
                Premier Academic & STEM Institution • Boston
              </p>
            </div>
          </div>

          {/* Desktop Navigation Groups */}
          <nav className="hidden lg:flex items-center gap-1">
            {navGroups.map((group) => {
              const isOpen = activeMegaMenu === group.id;
              return (
                <div key={group.id} className="relative">
                  <button
                    onClick={() => setActiveMegaMenu(isOpen ? null : group.id)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all ${
                      isOpen
                        ? 'bg-slate-100 text-slate-950 shadow-xs'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-800' : ''
                      }`}
                    />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-12 gap-6">
                        {/* Featured Sidebar Box */}
                        <div
                          style={{ backgroundColor: theme.surface }}
                          className="col-span-4 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                              Featured Highlight
                            </span>
                            <h4 className="font-serif font-bold text-slate-900 text-base mb-2">
                              {group.featured.title}
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {group.featured.desc}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setActiveMegaMenu(null);
                              if (group.featured.action) {
                                group.featured.action();
                              } else if (group.featured.route) {
                                onNavigate(group.featured.route);
                              }
                            }}
                            style={{ backgroundColor: theme.primary }}
                            className="mt-4 w-full py-2.5 px-3 rounded-xl text-white font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <span>{group.featured.actionLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Navigation Columns */}
                        <div className="col-span-8 grid grid-cols-2 gap-6">
                          {group.columns.map((col, idx) => (
                            <div key={idx} className="space-y-3">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                {col.heading}
                              </h5>
                              <div className="space-y-1">
                                {col.items.map((item, itemIdx) => (
                                  <button
                                    key={itemIdx}
                                    onClick={() => {
                                      setActiveMegaMenu(null);
                                      if (item.action) {
                                        item.action();
                                      } else if (item.route) {
                                        onNavigate(item.route, item.param);
                                      }
                                    }}
                                    className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors group/item"
                                  >
                                    <span className="text-xs font-bold text-slate-800 group-hover/item:text-amber-800 block">
                                      {item.label}
                                    </span>
                                    <span className="text-[11px] text-slate-500 leading-tight block">
                                      {item.desc}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors relative"
              title="Search Catalog & Resources (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notification Drawer Trigger */}
            <button
              onClick={openNotificationsDrawer}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors relative"
              title="Notifications & Campus Bulletins"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
              )}
            </button>

            {/* Compare programs shortcut if active */}
            {compareProgramIds.length > 0 && (
              <button
                onClick={openCompareModal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors"
                title="Compare Selected Programs"
              >
                <Layers className="w-3.5 h-3.5 text-amber-800" />
                <span>Compare ({compareProgramIds.length})</span>
              </button>
            )}

            {/* Contact / Inquiry CTA */}
            <button
              onClick={() => onNavigate('contact')}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <span>Enquire</span>
            </button>

            {/* Student Portal CTA Button */}
            <button
              onClick={() => onNavigate('portal')}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0D2F2F] text-white hover:bg-[#1A4F4F] font-bold text-xs shadow-xs transition-all border border-[#1A4F4F]"
              title="Access Student Academic & Examination Portal"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#FF6B4A]" />
              <span>{isAuthenticated && currentUser ? 'My Portal' : 'Student Portal'}</span>
            </button>

            {/* Apply Now Primary CTA */}
            <button
              onClick={() => openApplyModal()}
              style={{ backgroundColor: theme.primary }}
              className="px-4 sm:px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 hover:shadow-lg transition-all flex items-center gap-2 shrink-0 group"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* 3. MOBILE RESPONSIVE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-200">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                style={{ backgroundColor: theme.primary }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-serif font-bold text-sm"
              >
                EDX
              </div>
              <span className="font-serif font-bold text-lg text-slate-900">Edunexa</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-500 hover:text-slate-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Quick Mobile Action Bar */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('portal');
                }}
                className="p-3 rounded-xl bg-[#0D2F2F] text-white border border-[#1A4F4F] text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <GraduationCap className="w-4 h-4 text-[#FF6B4A]" />
                <span>Student Portal</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openParentPortal();
                }}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4 text-amber-800" />
                <span>Parent Portal</span>
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-4">
              {navGroups.map((group) => (
                <div key={group.id} className="space-y-2 border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                    {group.label}
                  </span>
                  <div className="space-y-1">
                    {group.columns.flatMap((c) => c.items).map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (item.action) {
                            item.action();
                          } else if (item.route) {
                            onNavigate(item.route, item.param);
                          }
                        }}
                        className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 text-sm font-semibold text-slate-800 flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openApplyModal();
                }}
                style={{ backgroundColor: theme.primary }}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md"
              >
                Apply to Edunexa
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openProspectusModal();
                }}
                className="w-full py-3 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50"
              >
                Download 2026 Prospectus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};