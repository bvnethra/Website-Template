import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';

// Views
import { HomeView } from './HomeView';
import { ProgramsView } from './ProgramsView';
import { ProgramDetailView } from './ProgramDetailView';
import { DepartmentsView } from './DepartmentsView';
import { DepartmentDetailView } from './DepartmentDetailView';
import { FacultyView } from './FacultyView';
import { FacultyDetailView } from './FacultyDetailView';
import { ResearchView } from './ResearchView';
import { AdmissionsView } from './AdmissionsView';
import { ScholarshipsView } from './ScholarshipsView';
import { FacilitiesView } from './FacilitiesView';
import { CampusLifeView } from './CampusLifeView';
import { EventsView } from './EventsView';
import { EventDetailView } from './EventDetailView';
import { NewsView } from './NewsView';
import { NewsDetailView } from './NewsDetailView';
import { PlacementsView } from './PlacementsView';
import { AboutView } from './AboutView';
import { AlumniView } from './AlumniView';
import { GalleryView } from './GalleryView';
import { FaqView } from './FaqView';
import { ContactView } from './ContactView';
import { LegalView } from './LegalView';
import { DocumentationView } from './DocumentationView';

// Common Modals
import { QuickApplyModal } from '../components/common/QuickApplyModal';
import { BrochureModal } from '../components/common/BrochureModal';
import { CampusTourModal } from '../components/common/CampusTourModal';
import { TuitionCalculatorModal } from '../components/common/TuitionCalculatorModal';
import { DownloadProspectusModal } from '../components/common/DownloadProspectusModal';
import { CompareProgramsModal } from '../components/common/CompareProgramsModal';
import { CommandSearch } from '../components/common/CommandSearch';
import { NotificationDrawer } from '../components/common/NotificationDrawer';
import { NotificationToast } from '../components/common/NotificationToast';
import { ThemeCustomizerModal } from '../components/common/ThemeCustomizerModal';
import { CookieConsentBanner } from '../components/common/CookieConsentBanner';
import { ParentPortalModal } from '../components/common/ParentPortalModal';
import { StudentPortalModal } from '../components/common/StudentPortalModal';

export const UniversityWebsite: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParam, setRouteParam] = useState<string | undefined>(undefined);

  const handleNavigate = (route: string, param?: string) => {
    // If the user clicks student portal / login, navigate to portal routes
    if (route === 'portal' || route === 'student-portal') {
      navigate('/portal');
      return;
    }
    if (route === 'login') {
      navigate('/login');
      return;
    }

    // Otherwise switch university views internally
    setCurrentRoute(route);
    setRouteParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'programs':
        return <ProgramsView initialLevel={routeParam} onNavigate={handleNavigate} />;
      case 'program-detail':
        return <ProgramDetailView programId={routeParam} onNavigate={handleNavigate} />;
      case 'departments':
        return <DepartmentsView onNavigate={handleNavigate} />;
      case 'department-detail':
        return <DepartmentDetailView departmentId={routeParam} onNavigate={handleNavigate} />;
      case 'faculty':
        return <FacultyView onNavigate={handleNavigate} />;
      case 'faculty-detail':
        return <FacultyDetailView facultyId={routeParam} onNavigate={handleNavigate} />;
      case 'research':
        return <ResearchView onNavigate={handleNavigate} />;
      case 'admissions':
        return <AdmissionsView onNavigate={handleNavigate} />;
      case 'scholarships':
        return <ScholarshipsView onNavigate={handleNavigate} />;
      case 'facilities':
        return <FacilitiesView onNavigate={handleNavigate} />;
      case 'campus-life':
        return <CampusLifeView onNavigate={handleNavigate} />;
      case 'events':
        return <EventsView onNavigate={handleNavigate} />;
      case 'event-detail':
        return <EventDetailView eventId={routeParam} onNavigate={handleNavigate} />;
      case 'news':
        return <NewsView onNavigate={handleNavigate} />;
      case 'news-detail':
        return <NewsDetailView newsId={routeParam} onNavigate={handleNavigate} />;
      case 'placements':
        return <PlacementsView onNavigate={handleNavigate} />;
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      case 'alumni':
        return <AlumniView onNavigate={handleNavigate} />;
      case 'gallery':
        return <GalleryView onNavigate={handleNavigate} />;
      case 'faq':
        return <FaqView onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactView onNavigate={handleNavigate} />;
      case 'legal':
        return <LegalView onNavigate={handleNavigate} />;
      case 'documentation':
        return <DocumentationView onNavigate={handleNavigate} />;
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div
      style={{ backgroundColor: theme.bg || '#ffffff', fontFamily: theme.font || 'sans-serif' }}
      className="min-h-screen flex flex-col text-slate-900 selection:bg-amber-200 selection:text-slate-900"
    >
      {/* Institutional Header */}
      <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Dynamic Main View */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* University Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Institutional Modals & Portals */}
      <QuickApplyModal />
      <BrochureModal />
      <CampusTourModal />
      <TuitionCalculatorModal />
      <DownloadProspectusModal />
      <CompareProgramsModal />
      <CommandSearch />
      <NotificationDrawer />
      <NotificationToast />
      <ThemeCustomizerModal />
      <CookieConsentBanner />
      <ParentPortalModal />
      <StudentPortalModal />
    </div>
  );
};
