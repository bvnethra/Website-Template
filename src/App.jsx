import React, { useState } from 'react';
import BackgroundGlow from './components/BackgroundGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Solutions from './components/Solutions';
import DashboardShowcase from './components/DashboardShowcase';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import DemoModal from './components/DemoModal';
import TargetCursor from './components/TargetCursor';

export default function App() {
  const [demoOpen, setDemoOpen] = useState(false);

  const handleOpenDemo = () => {
    setDemoOpen(true);
  };

  const handleCloseDemo = () => {
    setDemoOpen(false);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* TargetCursor in matching Aurevyn Yellow Theme */}
      <TargetCursor 
        targetSelector="button, a, .aurevyn-card, .dashboard-box, .glass-badge, .cursor-target"
        spinDuration={2.5}
        hideDefaultCursor={true}
        parallaxOn={true}
        cursorColor="#D99B00"
        cursorColorOnTarget="#B87F00"
      />

      {/* Atmosphere Lighting Layer */}
      <BackgroundGlow />

      {/* Main Navigation */}
      <Navbar onOpenDemo={handleOpenDemo} />

      {/* Main Landing Page Sections */}
      <main>
        <Hero onOpenDemo={handleOpenDemo} />
        <About />
        <Features onOpenDemo={handleOpenDemo} />
        <Solutions onOpenDemo={handleOpenDemo} />
        <DashboardShowcase onOpenDemo={handleOpenDemo} />
        <Pricing onOpenDemo={handleOpenDemo} />
        <Testimonials />
        <FAQ />
        <CTA onOpenDemo={handleOpenDemo} />
      </main>

      {/* Footer */}
      <Footer onOpenDemo={handleOpenDemo} />

      {/* Floating Back to Top Button */}
      <ScrollToTop />

      {/* Interactive Demo Sandbox Modal */}
      <DemoModal isOpen={demoOpen} onClose={handleCloseDemo} />
    </div>
  );
}
