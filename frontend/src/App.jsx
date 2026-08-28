import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import About from './components/About';
import Features from './components/Features';
import Services from './components/Services';
import Statistics from './components/Statistics';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-navy flex flex-col font-sans selection:bg-accent-indigo selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustSection />
        <About />
        <Features />
        <Services />
        <Statistics />
        <HowItWorks />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
