import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './components/auth/LoginPage';
import { LandingView } from './components/LandingView';
import { PortalLayout } from './components/portal/PortalLayout';
import { PortalOverview } from './components/portal/PortalOverview';
import { NoticeBoard } from './components/portal/NoticeBoard';
import { ExamApplication } from './components/portal/ExamApplication';
import { HallTicketView } from './components/portal/HallTicketView';
import { ExamResults } from './components/portal/ExamResults';
import { PhotocopyHub } from './components/portal/PhotocopyHub';
import { RevaluationHub } from './components/portal/RevaluationHub';
import { ReviewHub } from './components/portal/ReviewHub';
import { StudentProfile } from './components/portal/StudentProfile';
import { GrievanceSupport } from './components/portal/GrievanceSupport';
import { SecurityLoginHistory } from './components/portal/SecurityLoginHistory';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/templates/education/education-4">
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingView />} />

          {/* Dedicated Dual-Role Authentication System */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected University Student & Faculty Portal */}
          <Route
            path="/portal"
            element={
              <ProtectedRoute>
                <PortalLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<PortalOverview />} />
            <Route path="overview" element={<PortalOverview />} />
            <Route path="notices" element={<NoticeBoard />} />
            <Route path="exam-apply" element={<ExamApplication />} />
            <Route path="hall-ticket" element={<HallTicketView />} />
            <Route path="results" element={<ExamResults />} />
            <Route path="photocopy" element={<PhotocopyHub />} />
            <Route path="revaluation" element={<RevaluationHub />} />
            <Route path="review" element={<ReviewHub />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="support" element={<GrievanceSupport />} />
            <Route path="security" element={<SecurityLoginHistory />} />
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
