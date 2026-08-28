import { useState } from 'react';
import Intro from './components/Intro/Intro';
import Cursor from './components/Cursor/Cursor';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import Story from './components/Story/Story';
import Services from './components/Services/Services';
import Experiments from './components/Experiments/Experiments';
import Projects from './components/Projects/Projects';
import HoverReveal from './components/HoverReveal/HoverReveal';
import Process from './components/Process/Process';
import Team from './components/Team/Team';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);

  return (
    <>
      {!introCompleted ? (
        <Intro onComplete={() => setIntroCompleted(true)} />
      ) : (
        <div className="app-container" style={{ animation: 'fadeIn 0.8s forwards' }}>
          {/* Custom Desktop Cursor */}
          <Cursor />
          
          {/* Responsive Side Rail Navigation / Mobile Bottom Bar */}
          <Navigation />

          {/* Main Editorial Canvas content panels */}
          <main className="main-content">
            <Hero />
            <Marquee />
            <Story />
            <Services />
            <Experiments />
            <Projects />
            <HoverReveal />
            <Process />
            <Team />
            <Testimonials />
            <Contact />
            <Footer onReset={() => setIntroCompleted(false)} />
          </main>
        </div>
      )}

      {/* Global CSS declarations inside components to ensure smooth loads */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
