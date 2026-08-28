import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppointmentProvider } from './context/AppointmentContext';
import { ToastProvider } from './context/ToastContext';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Doctors } from './pages/Doctors';
import { DoctorDetail } from './pages/DoctorDetail';
import { Departments } from './pages/Departments';
import { DepartmentDetail } from './pages/DepartmentDetail';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Appointments } from './pages/Appointments';
import { AppointmentConfirmation } from './pages/AppointmentConfirmation';
import { Timetable } from './pages/Timetable';
import { HealthLibrary } from './pages/HealthLibrary';
import { ArticleDetail } from './pages/ArticleDetail';
import { HealthTools } from './pages/HealthTools';
import { Gallery } from './pages/Gallery';
import { Locations } from './pages/Locations';
import { Contact } from './pages/Contact';
import { FaqPage } from './pages/FaqPage';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppointmentProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-background text-dark font-sans">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:slug" element={<DoctorDetail />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/departments/:slug" element={<DepartmentDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/appointments/confirmation" element={<AppointmentConfirmation />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/health-library" element={<HealthLibrary />} />
                <Route path="/health-library/:slug" element={<ArticleDetail />} />
                <Route path="/health-tools" element={<HealthTools />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                {/* Fallback route */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AppointmentProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
