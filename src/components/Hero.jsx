import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles, Send } from 'lucide-react';
import FloatingCard from './FloatingCard';
import './Hero.css';

const roles = [
  'Creative Visual Designer',
  'Brand Identity Strategist',
  'UI/UX Architecture Lead',
  'Motion & Digital Director'
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentRole) {
      typingSpeed = 2200; // Pause at full word
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      typingSpeed = 400;
    }

    const timer = setTimeout(() => {
      setDisplayText((prev) => {
        if (!isDeleting) {
          return currentRole.substring(0, prev.length + 1);
        } else {
          return currentRole.substring(0, prev.length - 1);
        }
      });

      if (!isDeleting && displayText === currentRole) {
        setIsDeleting(true);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section section">
      <div className="container hero-container">
        {/* Left Column: Text & CTAs */}
        <div className="hero-content">
          {/* Tag badge with role typing animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-badge"
          >
            <Sparkles size={15} className="hero-badge-icon" />
            <span className="typewriter-text">{displayText}</span>
            <span className="cursor-blink">|</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hero-headline"
          >
            Turning Ideas Into<br />
            <span className="text-accent hero-gradient-text">Visual Experiences</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="hero-paragraph"
          >
            I design thoughtful digital experiences, visual identities, and creative systems that help modern brands communicate with clarity and personality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="hero-actions"
          >
            <button
              onClick={() => scrollToSection('work')}
              className="btn-primary hero-btn-main"
            >
              Explore My Work
              <ArrowRight size={18} className="btn-arrow" />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="btn-secondary hero-btn-sub"
            >
              Let's Connect
              <Send size={16} />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Hero Visual & Floating Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="hero-visual-wrapper"
        >
          {/* Ambient Radial Glow behind image */}
          <div className="hero-image-glow" />

          {/* Main Hero Image Frame */}
          <div className="hero-image-frame">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
              alt="Arjun Dev - Creative Visual Designer"
              className="hero-portrait-img"
            />
            <div className="hero-image-overlay" />
          </div>

          {/* Floating Cards (Card 1: Branding, Card 2: Motion, Card 3: Strategy) */}
          <FloatingCard
            title="Branding"
            subtitle="Identity & Systems"
            iconName="Sparkles"
            floatDistance={8}
            duration={4.2}
            delay={0.8}
            className="card-pos-1"
          />

          <FloatingCard
            title="Motion"
            subtitle="Micro-interactions"
            iconName="Zap"
            floatDistance={12}
            duration={5.4}
            delay={1.0}
            className="card-pos-2"
          />

          <FloatingCard
            title="Strategy"
            subtitle="Creative Direction"
            iconName="Compass"
            floatDistance={10}
            duration={4.8}
            delay={1.2}
            className="card-pos-3"
          />
        </motion.div>
      </div>
    </section>
  );
}
