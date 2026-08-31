import React from 'react';
import AgencyLandingPage from './AgencyLandingPage';
import { ThemeProvider } from './context/ThemeContext';
import './styles/theme.css';

export default function App() {
  return (
    <ThemeProvider>
      <AgencyLandingPage />
    </ThemeProvider>
  );
}
