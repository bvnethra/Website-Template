import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CollegePortal from './pages/CollegePortal';
import MySchoolPortal from './pages/MySchoolPortal';
import Admin from './pages/Admin';
import Education1Portal from './pages/Education1Portal';
import EducationCatalog from './pages/EducationCatalog';

function MainApp() {
  return (
    <Router>
      <main style={{ minHeight: '100vh', position: 'relative' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/college" element={<CollegePortal />} />
          <Route path="/myschool" element={<MySchoolPortal />} />
          <Route path="/education-1" element={<Education1Portal />} />
          <Route path="/templates/education" element={<EducationCatalog />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  );
}

export default MainApp;
