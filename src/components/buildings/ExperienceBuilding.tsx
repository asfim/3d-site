'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Building } from './Building';

export function ExperienceBuilding() {
  const milestonePillarRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (milestonePillarRef.current) {
      milestonePillarRef.current.position.y = Math.sin(t * 1.8) * 0.1;
    }
  });

  return (
    <Building
      id="experience"
      name="Career & Experience Plaza"
      tagline="Milestones & Timeline"
      iconName="Briefcase"
      position={[-18, 0, 10]}
      rotation={[0, Math.PI / 3, 0]}
      color="#38ef7d"
      glowColor="#11998e"
      labelY={13}
    >
      {/* 1. Stepped Plaza Foundation Slab */}
      <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[9.5, 0.6, 9.5]} />
        <meshStandardMaterial color="#06281e" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* 2. Lower Level Corporate Wing (Year 2020-2022 Milestone) */}
      <mesh position={[-2.0, 1.8, -1.5]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 2.4, 4.4]} />
        <meshStandardMaterial color="#0f3d2e" roughness={0.2} metalness={0.8} />
      </mesh>
      <lineSegments position={[-2.0, 1.8, -1.5]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.42, 2.42, 4.42)]} />
        <lineBasicMaterial color="#38ef7d" transparent opacity={0.6} />
      </lineSegments>

      {/* 3. Mid Level Intermediate Tower (Year 2022-2023 Senior Developer Milestone) */}
      <mesh position={[1.5, 3.2, -1.0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 5.2, 4.2]} />
        <meshStandardMaterial color="#104e3b" roughness={0.2} metalness={0.8} />
      </mesh>
      <lineSegments position={[1.5, 3.2, -1.0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.22, 5.22, 4.22)]} />
        <lineBasicMaterial color="#34d399" transparent opacity={0.7} />
      </lineSegments>

      {/* 4. High Level Lead Architect Tower (2023 - Present: H Tech Provision IT) */}
      <mesh position={[-0.5, 5.6, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 7.8, 3.8]} />
        <meshStandardMaterial color="#047857" roughness={0.15} metalness={0.85} />
      </mesh>
      <lineSegments position={[-0.5, 5.6, 1.5]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.82, 7.82, 3.82)]} />
        <lineBasicMaterial color="#38ef7d" transparent opacity={0.9} />
      </lineSegments>

      {/* 5. Modern Glass Skybridge Connecting Wings */}
      <mesh position={[0.2, 3.8, 0.2]} castShadow>
        <boxGeometry args={[3.2, 1.2, 1.8]} />
        <meshStandardMaterial
          color="#064e3b"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 6. Stepped Timeline Glass Balconies */}
      <mesh position={[-0.5, 9.8, 1.5]} castShadow>
        <boxGeometry args={[5.2, 0.4, 4.2]} />
        <meshStandardMaterial color="#06281e" />
      </mesh>

      {/* 7. Illuminated Milestone Spire */}
      <group ref={milestonePillarRef} position={[-0.5, 10.6, 1.5]}>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.08, 0.16, 1.6, 8]} />
          <meshStandardMaterial color="#38ef7d" metalness={0.9} />
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#38ef7d"
            emissive="#10b981"
            emissiveIntensity={2.4}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Building>
  );
}
