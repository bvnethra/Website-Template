import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsCounter } from './components/StatsCounter';
import { AboutSection } from './components/AboutSection';
import { ValuesSection } from './components/ValuesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { ConstructionLifecycle } from './components/ConstructionLifecycle';
import { WhyUsAndSafety } from './components/WhyUsAndSafety';
import { SustainabilitySection } from './components/SustainabilitySection';
import { TechnologySection } from './components/TechnologySection';
import { ProgressDashboard } from './components/ProgressDashboard';
import { GallerySection } from './components/GallerySection';
import { LightboxModal } from './components/LightboxModal';
import { ProjectEstimator } from './components/ProjectEstimator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CareersSection } from './components/CareersSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { LocationMap } from './components/LocationMap';
import { Footer } from './components/Footer';
import { QuickConsultModal } from './components/QuickConsultModal';
import { Toast } from './components/Toast';
import { ArrowUp, X } from 'lucide-react';

export function App() {
  const [lightboxData, setLightboxData] = useState({ isOpen: false, image: '', title: '' });
  const [quickConsultModal, setQuickConsultModal] = useState({ isOpen: false, title: '', type: 'consultation' });
  const [legalModalTitle, setLegalModalTitle] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showBackTop, setShowBackTop] = useState(false);
  const [prefillContactData, setPrefillContactData] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenLightbox = (image, title) => {
    setLightboxData({ isOpen: true, image, title });
  };

  const handleCloseLightbox = () => {
    setLightboxData({ isOpen: false, image: '', title: '' });
  };

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartProject = () => {
    setQuickConsultModal({ isOpen: true, title: 'Bespoke Development', type: 'consultation' });
  };

  const handleEnquireProject = (projectTitle) => {
    setPrefillContactData({ projectType: 'Residential', timeline: 'Standard Handover', estimatedBudget: `Project Inquiry: ${projectTitle}` });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultService = (serviceTitle) => {
    setQuickConsultModal({ isOpen: true, title: serviceTitle, type: 'consultation' });
  };

  const handleOpenCareerModal = (jobTitle) => {
    setQuickConsultModal({ isOpen: true, title: jobTitle, type: 'career' });
  };

  const handleApplyEstimate = (estimateData) => {
    setPrefillContactData(estimateData);
    setToastMessage('Estimate parameters transferred to consultation dossier below!');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="auren-app-root">
      {/* Sticky Header Navigation */}
      <Navbar onOpenConsultation={() => setQuickConsultModal({ isOpen: true, title: 'Direct Partner Briefing', type: 'consultation' })} />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Cinematic Full-Screen Hero */}
        <Hero
          onExploreProjects={handleExploreProjects}
          onStartProject={handleStartProject}
        />

        {/* Live Counting Statistics Bar */}
        <StatsCounter />

        {/* Editorial About Section */}
        <AboutSection />

        {/* 4 Core Architectural & Civil Values */}
        <ValuesSection />

        {/* Signature Projects Showcase with Filters */}
        <ProjectsSection
          onEnquireProject={handleEnquireProject}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 6 Core Services & Capabilities */}
        <ServicesSection onConsultService={handleConsultService} />

        {/* 6-Step Structured Process Timeline */}
        <ProcessTimeline />

        {/* 9-Stage Construction Lifecycle */}
        <ConstructionLifecycle />

        {/* Why Auren & Dark Safety Section */}
        <div id="why-us">
          <WhyUsAndSafety />
        </div>

        {/* Sustainability & Environmental Pillars */}
        <SustainabilitySection />

        {/* Technology, BIM & Digital Construction Studio */}
        <div id="technology">
          <TechnologySection />
        </div>

        {/* Live Project Progress Dashboard */}
        <div id="progress">
          <ProgressDashboard />
        </div>

        {/* Architectural Masonry Gallery */}
        <GallerySection onOpenLightbox={handleOpenLightbox} />

        {/* Interactive Feasibility & Cost Estimator */}
        <ProjectEstimator onApplyEstimate={handleApplyEstimate} />

        {/* Testimonials & Endorsements */}
        <TestimonialsSection />

        {/* Careers & Talent */}
        <CareersSection onOpenApplicationModal={handleOpenCareerModal} />

        {/* Frequently Asked Questions */}
        <div id="faq">
          <FaqSection onContactClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} />
        </div>

        {/* Contact & Project Enquiry Form */}
        <ContactSection
          prefillData={prefillContactData}
          onShowToast={(msg) => setToastMessage(msg)}
        />

        {/* Location & Google Maps */}
        <LocationMap />
      </main>

      {/* Luxury Footer */}
      <Footer
        onOpenLegalModal={(title) => setLegalModalTitle(title)}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      {/* Floating Back-To-Top Button */}
      <button
        className={`floating-back-top ${showBackTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* Full-Screen Architectural Lightbox */}
      <LightboxModal
        isOpen={lightboxData.isOpen}
        image={lightboxData.image}
        title={lightboxData.title}
        onClose={handleCloseLightbox}
      />

      {/* Quick Consultation / Career Application Modal */}
      <QuickConsultModal
        isOpen={quickConsultModal.isOpen}
        initialTitle={quickConsultModal.title}
        type={quickConsultModal.type}
        onClose={() => setQuickConsultModal({ isOpen: false, title: '', type: 'consultation' })}
        onSuccess={(msg) => setToastMessage(msg)}
      />

      {/* Legal Disclosures Modal */}
      {legalModalTitle && (
        <div className="modal-backdrop-fixed" onClick={() => setLegalModalTitle(null)}>
          <div className="modal-dialog-shell" style={{ maxWidth: '750px', background: '#FFFFFF' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setLegalModalTitle(null)}>
              <X size={20} />
            </button>
            <div style={{ padding: '3.5rem 3rem' }}>
              <div className="section-tag">LEGAL & REGULATORY DISCLOSURE</div>
              <h3 className="section-heading-lg" style={{ fontSize: '2rem', color: '#12151B' }}>{legalModalTitle}</h3>
              <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>
                  All project blueprints, floor specifications, 3D renderings, and completion milestones presented by <strong>AUREN Build & Developments</strong> are registered under applicable TNRERA (Tamil Nadu Real Estate Regulatory Authority) regulations.
                </p>
                <p>
                  We comply strictly with the National Building Code of India (NBC 2016), CMDA master plan zoning laws, and the environmental guidelines set by the State Environmental Impact Assessment Authority (SEIAA).
                </p>
                <p>
                  For verified statutory registration numbers, title certificates, and audited escrow project accounts, please visit our registered office at 123 Architecture Avenue, Anna Salai, Chennai, India.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}

export default App;
