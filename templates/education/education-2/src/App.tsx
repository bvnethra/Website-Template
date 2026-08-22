import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { LoginView } from './views/LoginView';
import { PortalLayout } from './components/portal/PortalLayout';
import { UniversityWebsite } from './views/UniversityWebsite';

// Portal Feature Views
import { PortalOverviewView } from './views/portal/PortalOverviewView';
import { NoticesView } from './views/portal/NoticesView';
import { ExamApplyView } from './views/portal/ExamApplyView';
import { HallTicketView } from './views/portal/HallTicketView';
import { ResultsView } from './views/portal/ResultsView';
import { PhotocopyView } from './views/portal/PhotocopyView';
import { RevaluationView } from './views/portal/RevaluationView';
import { ReviewView } from './views/portal/ReviewView';
import { ProfileView } from './views/portal/ProfileView';
import { SupportView } from './views/portal/SupportView';
import { SecurityView } from './views/portal/SecurityView';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router basename="/templates/education/education-2">
          <Routes>
            {/* 1. Main Eduvora University Website (Public Catalog, Admissions, Departments, etc.) */}
            <Route path="/" element={<UniversityWebsite />} />

            {/* 2. Public Authentication Gateway */}
            <Route path="/login" element={<LoginView />} />

            {/* 3. Protected Student Academic & Examination Portal Module */}
            <Route
              path="/portal"
              element={
                <ProtectedRoute>
                  <PortalLayout />
                </ProtectedRoute>
              }
            >
              {/* Default Portal Dashboard Overview */}
              <Route index element={<PortalOverviewView />} />

              {/* Sub-modules */}
              <Route path="notices" element={<NoticesView />} />
              <Route path="exam-apply" element={<ExamApplyView />} />
              <Route path="hall-ticket" element={<HallTicketView />} />
              <Route path="results" element={<ResultsView />} />
              <Route path="photocopy" element={<PhotocopyView />} />
              <Route path="revaluation" element={<RevaluationView />} />
              <Route path="review" element={<ReviewView />} />
              <Route path="profile" element={<ProfileView />} />
              <Route path="support" element={<SupportView />} />
              <Route path="security" element={<SecurityView />} />
            </Route>

            {/* Fallback Catch-all -> Main University Website */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
