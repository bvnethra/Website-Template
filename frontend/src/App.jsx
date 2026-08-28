import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedProjects from './components/SelectedProjects';
import ScrollExperience from './components/ScrollExperience';
import MaterialLibrary from './components/MaterialLibrary';
import StudioSection from './components/StudioSection';
import ApproachSection from './components/ApproachSection';
import NumbersSection from './components/NumbersSection';
import JournalSection from './components/JournalSection';
import TestimonialSection from './components/TestimonialSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-charcoal text-soft-white selection:bg-deep-earth selection:text-soft-white font-sans overflow-x-hidden">
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Content Sections */}
      <main>
        <Hero onExploreWork={() => setIsContactOpen(true)} />
        <SelectedProjects />
        <ScrollExperience />
        <MaterialLibrary />
        <StudioSection />
        <ApproachSection />
        <NumbersSection />
        <JournalSection />
        <TestimonialSection />
        <ContactSection
          isOpenModal={isContactOpen}
          onCloseModal={() => setIsContactOpen(false)}
          onOpenModal={() => setIsContactOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />
    </div>
  );
}
