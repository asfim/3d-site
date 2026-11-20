'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AboutOffice3D({ position }: { position: [number, number, number] }) {
  const codeScreenRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (codeScreenRef.current) {
      codeScreenRef.current.emissiveIntensity = 1.0 + Math.sin(t * 3) * 0.2;
    }
  });

  return (
    <group position={[position[0], position[1] + 1.2, position[2]]}>
      {/* 1. Office Room Floor Platform */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[7, 0.1, 7]} />
        <meshStandardMaterial color="#0a0f1d" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* 2. Executive Desk */}
      <group position={[0, 0, 0]}>
        {/* Desktop Surface */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.1, 1.6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Left Metal Legs */}
        <mesh position={[-1.4, 0.6, 0]} castShadow>
          <boxGeometry args={[0.08, 1.2, 1.4]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        {/* Right Metal Legs */}
        <mesh position={[1.4, 0.6, 0]} castShadow>
          <boxGeometry args={[0.08, 1.2, 1.4]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>

        {/* 3. Dual Ultrawide Workstation Monitors */}
        {/* Main Center Monitor */}
        <group position={[0, 1.7, -0.3]}>
          {/* Monitor Stand */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.04, 0.08, 0.6, 8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          {/* Monitor Screen Frame */}
          <mesh castShadow>
            <boxGeometry args={[1.6, 0.8, 0.06]} />
            <meshStandardMaterial color="#020617" />
          </mesh>
          {/* Glowing Code Display */}
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[1.5, 0.7]} />
            <meshStandardMaterial
              ref={codeScreenRef}
              color="#0284c7"
              emissive="#00f2fe"
              emissiveIntensity={1.2}
            />
          </mesh>
        </group>

        {/* Secondary Vertical Code Screen */}
        <group position={[1.1, 1.8, -0.1]} rotation={[0, -Math.PI / 6, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.7, 1.1, 0.05]} />
            <meshStandardMaterial color="#020617" />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[0.62, 1.0]} />
            <meshStandardMaterial
              color="#7c3aed"
              emissive="#a855f7"
              emissiveIntensity={1.0}
            />
          </mesh>
        </group>

        {/* 4. Keyboard & Mousepad */}
        <mesh position={[0, 1.26, 0.3]}>
          <boxGeometry args={[0.9, 0.02, 0.3]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
        <mesh position={[0.6, 1.26, 0.3]}>
          <boxGeometry args={[0.2, 0.02, 0.25]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
      </group>

      {/* 5. Executive Swivel Office Chair */}
      <group position={[0, 0, 1.0]} rotation={[0, Math.PI, 0]}>
        {/* Seat Cushion */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[0.8, 0.12, 0.8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 1.3, -0.35]} castShadow>
          <boxGeometry args={[0.7, 0.9, 0.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        {/* Chair Central Column & Base */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.8, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
      </group>

      {/* 6. High-Tech Bookshelf on Side Wall */}
      <group position={[-2.8, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.4, 3.0, 0.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        {/* Shelves */}
        {[-0.8, 0, 0.8].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[2.3, 0.06, 0.46]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        ))}
      </group>

      {/* 7. Desk Lighting Accent */}
      <pointLight position={[0, 2.5, 0.2]} intensity={1.8} distance={5} color="#38bdf8" />
    </group>
  );
}
