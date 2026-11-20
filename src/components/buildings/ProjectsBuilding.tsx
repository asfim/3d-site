'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Building } from './Building';

export function ProjectsBuilding() {
  const holoCoreRef = useRef<THREE.Mesh>(null);
  const screenPulseRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (holoCoreRef.current) {
      holoCoreRef.current.rotation.y = t * 0.9;
      holoCoreRef.current.rotation.x = Math.sin(t * 1.5) * 0.2;
    }
    if (screenPulseRef.current) {
      screenPulseRef.current.emissiveIntensity = 1.2 + Math.sin(t * 2.5) * 0.4;
    }
  });

  return (
    <Building
      id="projects"
      name="Project Showcase Expo"
      tagline="Enterprise Systems & Web Apps"
      iconName="FolderGit2"
      position={[0, 0, -20]}
      rotation={[0, 0, 0]}
      color="#ff0080"
      glowColor="#7928ca"
      labelY={13}
    >
      {/* 1. Grand Expo Foundation Podium */}
      <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[11, 0.6, 9]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* 2. Main Curved Exhibition Hall Body */}
      <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[9.5, 5.2, 7.5]} />
        <meshStandardMaterial color="#170c2e" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* 3. Massive Front Digital Media Screen */}
      <mesh position={[0, 3.6, 3.78]} castShadow>
        <planeGeometry args={[7.8, 3.4]} />
        <meshStandardMaterial
          ref={screenPulseRef}
          color="#ff0080"
          emissive="#7928ca"
          emissiveIntensity={1.4}
          roughness={0.1}
        />
      </mesh>
      {/* Digital Screen Glowing Bezel */}
      <lineSegments position={[0, 3.6, 3.8]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(7.82, 3.42)]} />
        <lineBasicMaterial color="#ff0080" />
      </lineSegments>

      {/* 4. Left Digital Display Screen */}
      <mesh position={[-4.78, 3.6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[5.5, 3.2]} />
        <meshStandardMaterial
          color="#7928ca"
          emissive="#ff0080"
          emissiveIntensity={1.0}
          roughness={0.2}
        />
      </mesh>

      {/* 5. Right Digital Display Screen */}
      <mesh position={[4.78, 3.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[5.5, 3.2]} />
        <meshStandardMaterial
          color="#7928ca"
          emissive="#ff0080"
          emissiveIntensity={1.0}
          roughness={0.2}
        />
      </mesh>

      {/* 6. Grand Entrance Canopy with Glowing Pillars */}
      <mesh position={[0, 1.4, 4.4]} castShadow>
        <boxGeometry args={[4.2, 0.25, 1.6]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>
      {/* Left Pillar */}
      <mesh position={[-1.8, 0.7, 4.8]}>
        <cylinderGeometry args={[0.1, 0.1, 1.4, 8]} />
        <meshStandardMaterial color="#ff0080" emissive="#ff0080" emissiveIntensity={0.8} />
      </mesh>
      {/* Right Pillar */}
      <mesh position={[1.8, 0.7, 4.8]}>
        <cylinderGeometry args={[0.1, 0.1, 1.4, 8]} />
        <meshStandardMaterial color="#ff0080" emissive="#ff0080" emissiveIntensity={0.8} />
      </mesh>

      {/* 7. Stepped Rooftop Expo Roof with Architectural Arches */}
      <mesh position={[0, 6.2, 0]} castShadow>
        <boxGeometry args={[8.0, 0.8, 6.2]} />
        <meshStandardMaterial color="#1e1035" roughness={0.4} />
      </mesh>

      {/* 8. Rooftop Holographic Showcase Sphere */}
      <group position={[0, 7.8, 0]}>
        {/* Support Tripod Base */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[1.2, 1.6, 0.6, 8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} />
        </mesh>
        {/* Holographic Rotating Projector Core */}
        <mesh ref={holoCoreRef}>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial
            color="#ff0080"
            emissive="#a855f7"
            emissiveIntensity={2.2}
            wireframe
          />
        </mesh>
      </group>
    </Building>
  );
}
