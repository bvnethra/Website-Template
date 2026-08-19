import React, { useEffect } from 'react';
import Navbar from '../components/isteady/Navbar';
import Scene3D from '../components/isteady/Scene3D';
import AboutSection from '../components/isteady/AboutSection';
import HeroGrid from '../components/isteady/HeroGrid';
import ServicesSection from '../components/isteady/ServicesSection';
import ContactSection from '../components/isteady/ContactSection';
import Footer from '../components/isteady/Footer';

export default function ISteadyGimbal() {
  // Update document title for SEO
  useEffect(() => {
    document.title = "iSteady MT3 Pro — AI Stabilizer Portfolio";
  }, []);

  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Fixed transparent/blur header */}
      <Navbar />

      {/* R3F spotlight hero section */}
      <Scene3D />

      {/* Feature details section */}
      <AboutSection />

      {/* Active action grid gallery */}
      <HeroGrid />

      {/* Creative shooting modes features */}
      <ServicesSection />

      {/* Form booking section */}
      <ContactSection />

      {/* Footer copyright */}
      <Footer />
    </div>
  );
}
