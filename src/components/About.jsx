import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Briefcase, Users, Star, ArrowUpRight } from 'lucide-react';
import './About.css';

const statsData = [
  { label: 'Years Creating', target: 8, suffix: '+', icon: Briefcase },
  { label: 'Projects Delivered', target: 42, suffix: '', icon: Star },
  { label: 'Brands Collaborated', target: 18, suffix: '', icon: Users },
  { label: 'Creative Awards', target: 6, suffix: '', icon: Award },
];

function AnimatedCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500; // ms
    const increment = Math.ceil(target / (duration / 30));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="stat-number">
      {count < 10 ? `0${count}` : count}{suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <div className="section-tag">About Me</div>
          <h2 className="section-title">
            A little about <span className="text-accent">what I do</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="about-grid">
          {/* Main Description Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card about-card-main"
          >
            <h3 className="about-card-title">
              Crafting digital products with clarity, intention, and aesthetic discipline.
            </h3>
            <p className="about-card-text">
              I’m <strong>Arjun Dev</strong>, a multidisciplinary creative visual designer based at the intersection of design, technology, and brand storytelling. Over the past decade, I've partnered with forward-thinking tech startups, luxury studios, and global enterprises to craft immersive visual identities and digital tools.
            </p>
            <p className="about-card-text">
              My philosophy centers around stripping away unnecessary noise to elevate core brand messages. Whether defining a multi-platform design system or orchestrating fluid motion graphics, I build work that feels refined, intuitive, and timeless.
            </p>

            <div className="about-disciplines">
              <span className="discipline-tag">Brand Identity</span>
              <span className="discipline-tag">Digital Design</span>
              <span className="discipline-tag">Motion Systems</span>
              <span className="discipline-tag">Creative Direction</span>
              <span className="discipline-tag">UI/UX Architecture</span>
            </div>
          </motion.div>

          {/* Right Column: Visual Accent + Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="about-side-wrapper"
          >
            <div className="glass-card about-quote-card">
              <div className="quote-icon">“</div>
              <p className="quote-text">
                Design is not just what it looks like and feels like. Design is how seamlessly it communicates personality and purpose.
              </p>
              <div className="quote-author">— Arjun Dev</div>
            </div>

            <div className="about-feature-box">
              <div className="feature-box-content">
                <h4>Have a project in mind?</h4>
                <p>Let's collaborate on your next visual transformation.</p>
              </div>
              <a href="#contact" className="feature-box-btn" aria-label="Go to contact section">
                <ArrowUpRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Statistics Counter Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="stats-grid"
        >
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="glass-card stat-card">
                <div className="stat-icon-wrapper">
                  <Icon size={22} />
                </div>
                <div className="stat-content">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} inView={isInView} />
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
