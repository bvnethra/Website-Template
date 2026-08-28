import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="app-main-wrapper">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Atmospheric Ambient Glow Background */}
      <div className="bg-atmosphere">
        <div className="glow-orb-top-right" />
        <div className="glow-orb-bottom-left" />
        <div className="glow-orb-center" />
        <div className="grid-overlay" />
      </div>

      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Sections */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
