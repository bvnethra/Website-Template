import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import GimbalModel from './GimbalModel';

// Container to handle mouse tilt parallax
function ModelContainer({ scrollProgress = 0, isMobile = false }) {
  const modelRef = useRef();

  useFrame((state) => {
    // Parallax values
    const targetX = state.pointer.x * 0.22;
    const targetY = state.pointer.y * 0.16;

    if (modelRef.current) {
      // Tilt gimbal model slightly towards mouse cursor
      modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetX, 0.05);
      modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetY, 0.05);
    }
  });

  return (
    <group ref={modelRef}>
      <GimbalModel scrollProgress={isMobile ? 0 : scrollProgress} />
    </group>
  );
}

export default function Hero3DScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = window.innerHeight;
      const progress = Math.min(Math.max(scrolled / height, 0), 1);
      setScrollProgress(progress);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      pointerEvents: 'none'
    }}>
      {/* Visual Stabilization Grid Guide Line (Center Screen) */}
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

      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        shadows
        style={{ pointerEvents: 'auto' }}
      >
        {/* Soft Ambient lighting */}
        <ambientLight intensity={0.25} />

        {/* 1. Strong Key Top-Back Rim Light */}
        <directionalLight 
          position={[0, 6, -3]} 
          intensity={4.0} 
          color="#ffffff"
          castShadow
        />

        {/* 2. Soft Front Fill Light */}
        <directionalLight 
          position={[0, 0, 4]} 
          intensity={0.6} 
          color="#a0c0ff" // Soft blue fill
        />

        {/* 3. Red Status LED pointlight reflection */}
        <pointLight position={[0.45, 0.3, 0.2]} intensity={0.8} color="#ff3a1a" />

        {/* Floating Model Container */}
        <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.15}>
          <ModelContainer scrollProgress={scrollProgress} isMobile={isMobile} />
        </Float>

        {/* Floor Contact Shadow */}
        <ContactShadows 
          position={[0, -1.3, 0]} 
          opacity={0.45} 
          scale={5.5} 
          blur={2.2} 
          far={3.0} 
        />

        {/* Gentle interactive Orbit Controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.2}
          maxAzimuthAngle={0.4}
          minAzimuthAngle={-0.4}
          dampingFactor={0.05}
          enableDamping
        />

        {/* Realistic Dark Warehouse Environment preset for metallic reflections */}
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  );
}
