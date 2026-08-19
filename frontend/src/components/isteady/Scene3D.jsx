import React, { useRef } from 'react';
import ProductBackdrop from './ProductBackdrop';
import HeroContent from './HeroContent';
import ParticleField from './ParticleField';

export default function Scene3D() {
  const containerRef = useRef(null);

  return (
    <section id="home" ref={containerRef} style={{
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
      {/* 1. Dust Speck Particles (z-index: 0) */}
      <ParticleField />

      {/* 2. Visual Stabilization Grid Guide Line (Center Screen) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(160, 255, 255, 0.35) 20%, rgba(160, 255, 255, 0.35) 80%, transparent)',
        boxShadow: '0 0 8px rgba(160, 255, 255, 0.5)',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '10px',
        color: 'rgba(160, 255, 255, 0.7)',
        fontFamily: "'Space Mono', monospace",
        letterSpacing: '1px',
        padding: '0 20px',
        boxSizing: 'border-box'
      }}>
        <span>GRID ACTIVE</span>
        <span>STABILIZER: 100% ONLINE</span>
      </div>

      {/* 3. Product Photo Backdrop (z-index: 1) */}
      <ProductBackdrop containerRef={containerRef} />

      {/* 4. Headline Overlay (z-index: 2) */}
      <HeroContent />
    </section>
  );
}
