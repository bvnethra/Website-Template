import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { CourseGrid } from './CourseGrid';
import { LearningPathsSection } from './LearningPathsSection';
import { TestimonialsSection } from './TestimonialsSection';
import { InstructorsSection } from './InstructorsSection';
import { PricingSection } from './PricingSection';
import { CallToAction } from './CallToAction';
import { Footer } from './Footer';
import { CourseDetailModal } from './CourseDetailModal';
import { InteractiveLearningExperience } from './InteractiveLearningExperience';
import { StudentDashboard } from './StudentDashboard';
import { AITutorModal } from './AITutorModal';
import { CertificateModal } from './CertificateModal';
import { SearchModal } from './SearchModal';
import { AuthModal } from './AuthModal';
import { CommunityModal } from './CommunityModal';
import { ResourcesModal } from './ResourcesModal';
import { AboutModal } from './AboutModal';
import { COURSES, INITIAL_USER_PROGRESS } from '../data/coursesData';
import { Course, LearningPath, Instructor, UserProgress } from '../types';
import confetti from 'canvas-confetti';

export const LandingView: React.FC = () => {
  // Navigation & Tab state
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Selected course for detail modal or active sandbox
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeSandboxCourse, setActiveSandboxCourse] = useState<Course>(COURSES[0]);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certDetails, setCertDetails] = useState<{ courseTitle: string; instructorName: string }>({
    courseTitle: COURSES[0].title,
    instructorName: COURSES[0].instructor.name,
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // User Profile & Progress State
  const [userProgress, setUserProgress] = useState<UserProgress>(INITIAL_USER_PROGRESS);

  // Handlers
  const handleOpenCourseDetail = (course: Course) => {
    setSelectedCourse(course);
    setIsDetailModalOpen(true);
  };

  const handleEnrollCourse = (course: Course) => {
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 },
    });
    setUserProgress((prev) => ({
      ...prev,
      enrolledCoursesCount: prev.enrolledCoursesCount + 1,
      currentXP: prev.currentXP + 100,
    }));
  };

  const handleOpenLessonSandbox = (course: Course) => {
    setActiveSandboxCourse(course);
    setIsDetailModalOpen(false);
    setActiveTab('sandbox');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLessonCompleted = (xpGain: number) => {
    setUserProgress((prev) => ({
      ...prev,
      currentXP: prev.currentXP + xpGain,
      completedLessonsCount: prev.completedLessonsCount + 1,
      totalHours: Math.round((prev.totalHours + 0.4) * 10) / 10,
    }));
  };

  const handleOpenCertificate = (course?: Course) => {
    const targetCourse = course || selectedCourse || activeSandboxCourse;
    setCertDetails({
      courseTitle: targetCourse.title,
      instructorName: targetCourse.instructor.name,
    });
    setIsCertModalOpen(true);
  };

  const handleSelectPath = (path: LearningPath) => {
    const matched = COURSES.find((c) => c.tags.some((t) => path.skills.includes(t))) || COURSES[0];
    handleOpenCourseDetail(matched);
  };

  const handleSelectInstructor = (instructor: Instructor) => {
    const courseByInstructor = COURSES.find((c) => c.instructor.id === instructor.id) || COURSES[0];
    handleOpenCourseDetail(courseByInstructor);
  };

  const handleAuthSuccess = (name: string) => {
    setUserProgress((prev) => ({ ...prev, name }));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home' || tab === 'dashboard' || tab === 'sandbox') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'courses') {
      const el = document.getElementById('courses');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setActiveTab('home');
        setTimeout(() => {
          document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (tab === 'paths') {
      const el = document.getElementById('paths');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setActiveTab('home');
        setTimeout(() => {
          document.getElementById('paths')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-teal-500 selection:text-white font-sans antialiased">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCommunity={() => setIsCommunityOpen(true)}
        onOpenResources={() => setIsResourcesOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        studentXP={userProgress.currentXP}
        streak={userProgress.streakDays}
      />

      {/* Main Content Areas */}
      <main className="pt-16 sm:pt-20 bg-white">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onStartLearning={(query) => {
                if (query) {
                  const el = document.getElementById('courses');
                  el?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveSandboxCourse(COURSES[0]);
                  setActiveTab('sandbox');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onExploreCourses={() => {
                const el = document.getElementById('courses');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenLearningPath={() => {
                const el = document.getElementById('paths');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenCommunity={() => setIsCommunityOpen(true)}
              onTrackProgress={() => {
                setActiveTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Core Features & Sandboxes */}
            <FeaturesSection
              onOpenAITutor={() => setIsAITutorOpen(true)}
              onOpenCertificate={() => handleOpenCertificate(COURSES[0])}
              onOpenLiveLab={() => {
                setActiveSandboxCourse(COURSES[0]);
                setActiveTab('sandbox');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExplorePaths={() => {
                const el = document.getElementById('paths');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Filterable Course Grid */}
            <CourseGrid
              courses={COURSES}
              onSelectCourse={handleOpenCourseDetail}
              onOpenLessonSandbox={handleOpenLessonSandbox}
            />

            {/* Curated Career Paths */}
            <LearningPathsSection
              onSelectPath={handleSelectPath}
              onExploreCourses={() => {
                const el = document.getElementById('courses');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Student Reviews & Outcomes */}
            <TestimonialsSection />

            {/* Faculty & Mentors */}
            <InstructorsSection onSelectInstructor={handleSelectInstructor} />

            {/* Transparent Pricing Plans */}
            <PricingSection onSelectPlan={() => setIsAuthModalOpen(true)} />

            {/* Final Call to Action */}
            <CallToAction
              onStartLearning={() => {
                setActiveSandboxCourse(COURSES[0]);
                setActiveTab('sandbox');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {/* Student Learning Dashboard View */}
        {activeTab === 'dashboard' && (
          <StudentDashboard
            userProgress={userProgress}
            courses={COURSES}
            onResumeCourse={(course) => handleOpenLessonSandbox(course)}
            onOpenCertificate={() => handleOpenCertificate()}
            onOpenAITutor={() => setIsAITutorOpen(true)}
          />
        )}

        {/* Live Interactive Code/Video Sandbox View */}
        {activeTab === 'sandbox' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <InteractiveLearningExperience
              currentCourse={activeSandboxCourse}
              onLessonCompleted={handleLessonCompleted}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onExploreCourses={() => {
          setActiveTab('home');
          setTimeout(() => {
            document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenAITutor={() => setIsAITutorOpen(true)}
        onOpenLiveLab={() => {
          setActiveSandboxCourse(COURSES[0]);
          setActiveTab('sandbox');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCommunity={() => setIsCommunityOpen(true)}
        onOpenResources={() => setIsResourcesOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEnroll={handleEnrollCourse}
        onOpenLessonSandbox={handleOpenLessonSandbox}
      />

      {/* 24/7 AI Study Buddy Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
      />

      {/* Verifiable Certificate Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        studentName={userProgress.name}
        courseTitle={certDetails.courseTitle}
        instructorName={certDetails.instructorName}
      />

      {/* Cmd+K Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        courses={COURSES}
        onSelectCourse={handleOpenCourseDetail}
      />

      {/* Community Modal */}
      <CommunityModal
        isOpen={isCommunityOpen}
        onClose={() => setIsCommunityOpen(false)}
        studentName={userProgress.name}
      />

      {/* Resources Modal */}
      <ResourcesModal
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

    </div>
  );
};
