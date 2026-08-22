/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { CourseDetailDrawer } from './components/common/CourseDetailDrawer';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { CampusLifePage } from './pages/CampusLifePage';
import { AboutPage } from './pages/AboutPage';
import { ResearchPage } from './pages/ResearchPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { StudentPortalLayout } from './components/portal/StudentPortalLayout';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout wrapper for public university pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#2D3436] font-sans antialiased selection:bg-[#4A5D4E] selection:text-white">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CourseDetailDrawer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Institutional Pages */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/courses" element={<PublicLayout><CoursesPage /></PublicLayout>} />
            <Route path="/admissions" element={<PublicLayout><AdmissionsPage /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
            <Route path="/research" element={<PublicLayout><ResearchPage /></PublicLayout>} />
            <Route path="/campus-life" element={<PublicLayout><CampusLifePage /></PublicLayout>} />

            {/* Authentication Gateway */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Student Examination Portal Shell */}
            <Route 
              path="/portal" 
              element={
                <ProtectedRoute>
                  <StudentPortalLayout initialTab="dashboard" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/portal/:tab" 
              element={
                <ProtectedRoute>
                  <StudentPortalLayout />
                </ProtectedRoute>
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
