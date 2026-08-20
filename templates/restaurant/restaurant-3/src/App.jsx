import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import FloatingDishPreview from './components/FloatingDishPreview';
import Navbar from './components/Navbar';
import FullscreenNav from './components/FullscreenNav';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Story from './components/Story';
import Menu from './components/Menu';
import Signature from './components/Signature';
import Kitchen from './components/Kitchen';
import Experience from './components/Experience';
import Chef from './components/Chef';
import Gallery from './components/Gallery';
import Journal from './components/Journal';
import Reservation from './components/Reservation';
import ReservationModal from './components/ReservationModal';
import InfoModal from './components/InfoModal';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeDishImg, setActiveDishImg] = useState(null);
  const [isDishHoverActive, setIsDishHoverActive] = useState(false);
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [resDetails, setResDetails] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState(null);

  // Manage body scroll locking when overlays/modals are open
  useEffect(() => {
    if (isNavOpen || isResModalOpen || isInfoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isNavOpen, isResModalOpen, isInfoModalOpen]);

  // Global Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsNavOpen(false);
        setIsResModalOpen(false);
        setIsInfoModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const animatableElements = document.querySelectorAll('.reveal-on-scroll');
    animatableElements.forEach(el => revealObserver.observe(el));

    return () => {
      animatableElements.forEach(el => revealObserver.unobserve(el));
    };
  }, []);

  // Modal Triggers
  const openEssayModal = (article) => {
    setInfoModalContent({
      tag: 'FIELD NOTES',
      title: article.title,
      meta: `${article.formattedDate} · ${article.readTime}`,
      bodyHtml: `<p><strong>${article.snippet}</strong></p><p>${article.content}</p>`
    });
    setIsInfoModalOpen(true);
  };

  const openLegalModal = (type) => {
    if (type === 'privacy') {
      setInfoModalContent({
        tag: 'LEGAL',
        title: 'Privacy Policy',
        meta: 'LAST UPDATED: 2026',
        bodyHtml: '<p>Lumière is committed to protecting your privacy. We store reservation details strictly for table booking, guest preferences, and dietary notifications. Your information will never be shared with third parties.</p>'
      });
    } else if (type === 'terms') {
      setInfoModalContent({
        tag: 'LEGAL',
        title: 'Terms of Dining',
        meta: 'POLICY',
        bodyHtml: '<p>Reservations are held for up to 15 minutes past the scheduled booking time. For parties of 6 or more, please contact our concierge directly at least 24 hours prior. We accommodate dietary preferences with advance notice.</p>'
      });
    } else if (type === 'press') {
      setInfoModalContent({
        tag: 'PRESS',
        title: 'Press & Media Kit',
        meta: 'MEDIA INQUIRIES',
        bodyHtml: '<p>High-resolution architectural photography, chef biographies, menu previews, and press releases are available for culinary publications. Please contact <strong>press@lumierechennai.com</strong>.</p>'
      });
    }
    setIsInfoModalOpen(true);
  };

  const handleReserve = (details) => {
    setResDetails(details);
    setIsResModalOpen(true);
  };

  return (
    <>
      <CustomCursor />
      <FloatingDishPreview activeImg={activeDishImg} isActive={isDishHoverActive} />
      <Navbar onOpenNav={() => setIsNavOpen(true)} />
      <FullscreenNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <main>
        <Hero />
        <Intro />
        <Story />
        <Menu
          onDishHover={(img) => {
            setActiveDishImg(img);
            setIsDishHoverActive(true);
          }}
          onDishLeave={() => setIsDishHoverActive(false)}
        />
        <Signature />
        <Kitchen />
        <Experience />
        <Chef />
        <Gallery />
        <Journal onOpenEssay={openEssayModal} />
        <Reservation onReserve={handleReserve} />
        <Contact />
      </main>

      <Footer onOpenLegal={openLegalModal} />

      <ReservationModal
        isOpen={isResModalOpen}
        onClose={() => setIsResModalOpen(false)}
        resDetails={resDetails}
      />

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        modalContent={infoModalContent}
      />
    </>
  );
}
