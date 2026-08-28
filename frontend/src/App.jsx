import { useState } from 'react';
import Splash from './components/Splash';
import CustomCursor from './components/CustomCursor';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import About from './sections/About';
import Features from './sections/Features';
import Services from './sections/Services';
import Process from './sections/Process';
import Showcase from './sections/Showcase';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Splash onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      {/* Custom Glowing Lag Cursor */}
      <CustomCursor />

      {/* Global Background Grid Mesh */}
      <div className="bg-grid-mesh" />

      {/* Sticky Floating Navbar */}
      <Navbar />

      {/* Main Sections Stack */}
      <main style={{ width: '100%' }}>
        <Hero />
        <Stats />
        <About />
        <Features />
        <Services />
        <Process />
        <Showcase />
        <Testimonials />
        <CTA />
        <Contact />
      </main>

      {/* Sticky Scroll Progress Footer */}
      <Footer />
    </>
  );
}

export default App;
