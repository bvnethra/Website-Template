import React from 'react';
import Hero3DScene from './Hero3DScene';
import HeroContent from './HeroContent';

export default function Scene3D() {
  return (
    <section id="home" style={{
      width: '100%',
      height: '100vh',
      background: 'radial-gradient(circle at center, #141518 0%, #000000 75%)', // Dark grey to pure black radial spotlight vignette
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      {/* 1. Interactive 3D Stabilizer Rig (z-index: 1) */}
      <Hero3DScene />

      {/* 2. Headline Overlay (z-index: 2) */}
      <HeroContent />
    </section>
  );
}
