import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Procedural handheld gimbal rig fallback
function ProceduralGimbal({ scrollProgress = 0 }) {
  const gripRef = useRef();
  const panMotorRef = useRef();
  const rollMotorRef = useRef();
  const tiltMotorRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Stabilization micro-movements on Y, X, Z axes (sine waves)
    if (panMotorRef.current) {
      panMotorRef.current.rotation.y = Math.sin(t * 1.5) * 0.08;
    }
    if (rollMotorRef.current) {
      rollMotorRef.current.rotation.z = Math.cos(t * 1.8) * 0.05;
    }
    if (tiltMotorRef.current) {
      tiltMotorRef.current.rotation.x = Math.sin(t * 1.2) * 0.06;
    }

    // 2. Continuous slow Y-axis idle rotation for the entire assembly
    if (gripRef.current) {
      gripRef.current.rotation.y = t * 0.12;
    }
  });

  // Material properties for DJI-style premium matte/brushed metals
  const blackPlasticMat = new THREE.MeshStandardMaterial({
    color: '#121315', // Sleek near-black
    roughness: 0.65,
    metalness: 0.15
  });

  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: '#42454a', // Gunmetal grey
    roughness: 0.28,
    metalness: 0.9,
    envMapIntensity: 1.5
  });

  const copperAccentMat = new THREE.MeshStandardMaterial({
    color: '#e27b3e', // Hohem orange accent color
    roughness: 0.2,
    metalness: 0.95
  });

  const emissiveLedMat = new THREE.MeshBasicMaterial({
    color: '#ff3a1a' // Glowing red status LED
  });

  const screenLedMat = new THREE.MeshBasicMaterial({
    color: '#a0ffff' // Glowing cyan status screen
  });

  const cameraLensMat = new THREE.MeshPhysicalMaterial({
    color: '#1a1f26',
    roughness: 0.05,
    transmission: 0.9,
    thickness: 0.5,
    ior: 1.5
  });

  // Calculate folding animation angles based on scroll progress (0 to 1)
  const foldPanAngle = scrollProgress * Math.PI * 0.4;
  const foldRollAngle = scrollProgress * Math.PI * 0.3;
  const foldTiltAngle = scrollProgress * Math.PI * 0.25;

  return (
    <group ref={gripRef} position={[0, -0.6, 0]}>
      {/* A. Handheld Handle Grip (Base) */}
      <mesh castShadow receiveShadow material={blackPlasticMat}>
        <cylinderGeometry args={[0.16, 0.15, 1.4, 32]} />
      </mesh>

      {/* Ridged Rubber Grip details */}
      <mesh position={[0, -0.1, 0]} material={blackPlasticMat}>
        <cylinderGeometry args={[0.165, 0.155, 0.8, 32]} />
      </mesh>

      {/* OLED Status Screen on Grip */}
      <group position={[0, 0.45, 0.14]} rotation={[-0.15, 0, 0]}>
        {/* Screen bezel */}
        <mesh material={blackPlasticMat}>
          <boxGeometry args={[0.18, 0.32, 0.04]} />
        </mesh>
        {/* Screen light glow */}
        <mesh position={[0, 0.02, 0.025]} material={screenLedMat}>
          <planeGeometry args={[0.12, 0.22]} />
        </mesh>
      </group>

      {/* B. 3-Axis Stabilizer Arms Hierarchy */}
      
      {/* 1. Pan Motor Joint & Arm */}
      <group position={[0, 0.78, 0]} rotation={[0, foldPanAngle, 0]}>
        {/* Pan Motor Cylinder */}
        <mesh ref={panMotorRef} castShadow material={brushedMetalMat}>
          <cylinderGeometry args={[0.18, 0.18, 0.16, 24]} />
        </mesh>
        
        {/* Pan Arm extension */}
        <mesh position={[0, 0.15, -0.15]} rotation={[0.4, 0, 0]} castShadow material={brushedMetalMat}>
          <boxGeometry args={[0.08, 0.35, 0.08]} />
        </mesh>

        {/* 2. Roll Motor Joint & Arm */}
        <group position={[0, 0.3, -0.3]} rotation={[0, 0, foldRollAngle]}>
          {/* Roll Motor Cylinder */}
          <mesh ref={rollMotorRef} rotation={[0, 0, Math.PI / 2]} castShadow material={brushedMetalMat}>
            <cylinderGeometry args={[0.16, 0.16, 0.14, 24]} />
          </mesh>
          
          {/* Copper Accent Ring ring */}
          <mesh position={[0, 0, 0.08]} rotation={[0, 0, Math.PI / 2]} material={copperAccentMat}>
            <cylinderGeometry args={[0.165, 0.165, 0.02, 24]} />
          </mesh>
          
          {/* Roll Arm bracket */}
          <mesh position={[0.25, 0.1, 0]} rotation={[0, 0, -0.5]} castShadow material={brushedMetalMat}>
            <boxGeometry args={[0.42, 0.08, 0.08]} />
          </mesh>

          {/* 3. Tilt Motor Joint & Camera Mount */}
          <group position={[0.45, 0.22, 0]} rotation={[foldTiltAngle, 0, 0]}>
            {/* Tilt Motor Cylinder */}
            <mesh ref={tiltMotorRef} rotation={[Math.PI / 2, 0, 0]} castShadow material={brushedMetalMat}>
              <cylinderGeometry args={[0.15, 0.15, 0.14, 24]} />
            </mesh>

            {/* Red LED Status Dot dot */}
            <mesh position={[0.08, 0.08, 0.08]} material={emissiveLedMat}>
              <sphereGeometry args={[0.025, 12, 12]} />
            </mesh>

            {/* Camera Mounting Plate Cradle */}
            <mesh position={[-0.32, 0, 0]} castShadow material={blackPlasticMat}>
              <boxGeometry args={[0.5, 0.06, 0.4]} />
            </mesh>

            {/* Side Bracket Arm */}
            <mesh position={[-0.06, 0.08, 0]} rotation={[0, 0, 0.4]} castShadow material={brushedMetalMat}>
              <boxGeometry args={[0.16, 0.22, 0.06]} />
            </mesh>

            {/* C. Mounted Camera Asset */}
            <group position={[-0.32, 0.28, 0]}>
              {/* Camera Body block */}
              <mesh castShadow material={blackPlasticMat}>
                <boxGeometry args={[0.46, 0.32, 0.32]} />
              </mesh>
              {/* Camera Lens barrel */}
              <mesh position={[0, 0, 0.24]} rotation={[Math.PI / 2, 0, 0]} castShadow material={brushedMetalMat}>
                <cylinderGeometry args={[0.12, 0.12, 0.18, 20]} />
              </mesh>
              {/* Front glass reflections reflection */}
              <mesh position={[0, 0, 0.33]} rotation={[Math.PI / 2, 0, 0]} material={cameraLensMat}>
                <sphereGeometry args={[0.105, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default function GimbalModel({ glbPath = null, scrollProgress = 0 }) {
  // CRITICAL NOTE: Replace null/glbPath later to drop in a real Sony camera or Gimbal GLB asset
  // Example:
  // const { scene } = useGLTF(glbPath);
  // return <primitive object={scene} scale={[1, 1, 1]} />;

  if (glbPath) {
    try {
      const { scene } = useGLTF(glbPath);
      return <primitive object={scene} scale={[1.0, 1.0, 1.0]} />;
    } catch (e) {
      console.warn("Failed to load .glb asset, using procedural gimbal fallback.", e);
    }
  }

  return <ProceduralGimbal scrollProgress={scrollProgress} />;
}
