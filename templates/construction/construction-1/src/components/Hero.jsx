import React, { useRef, useEffect } from 'react';
import CraneSimulation from './CraneSimulation';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const enablePlay = () => videoRef.current?.play();
          document.addEventListener('click', enablePlay, { once: true });
          document.addEventListener('scroll', enablePlay, { once: true });
        });
      }
    }
  }, []);

  return (
    <section className="hero-section" id="hero">
      {/* Background Video */}
      <div className="hero-video-wrapper">
        <video
          ref={videoRef}
          id="heroVideo"
          autoPlay
          loop
          muted
          playsInline
          poster="assets/images/crane-sunset-hero.jpg"
        >
          <source src="assets/videos/crane-working.webm" type="video/webm" />
          <source src="assets/videos/crane-working.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay-gradient"></div>
        <div className="hero-grid-overlay"></div>
      </div>

      {/* Live Crane Canvas Physics Simulation */}
      <CraneSimulation />

      {/* Hero Foreground Content */}
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-tagline">
            <span className="dot-orange">•</span> HEAVY CIVIL & INFRASTRUCTURE EPC OPERATIONS
          </div>

          <h1 className="hero-title-main">
            MASTERING SCALE <br />
            WITH HEAVY <br />
            MACHINERY
          </h1>

          <p className="hero-description">
            Advanced Construction coordinates multi-crane industrial erection, high-rise seismic moment frames, and highway viaduct civil engineering powered by our dedicated 20-ton Liebherr crane fleet.
          </p>

          <div className="hero-actions">
            <a href="#calculator" className="btn-orange-dispatch">
              <span>LAUNCH OPERATIONS COCKPIT</span>
              <span className="arrow">→</span>
            </a>
            <a href="#services" className="btn-ghost-white">
              <span>RUN LOAD STRESS TEST</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
