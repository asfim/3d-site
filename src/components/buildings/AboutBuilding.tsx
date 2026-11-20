'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Building } from './Building';
import { AboutOffice3D } from '../interior/AboutOffice3D';

export function AboutBuilding() {
  const beaconRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (beaconRef.current) {
      beaconRef.current.rotation.y = t * 1.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.8;
    }
  });

  return (
    <Building
      id="about"
      name="About Me Tower"
      tagline="Profile & Career Journey"
      iconName="User"
      position={[-16, 0, -12]}
      rotation={[0, Math.PI / 4, 0]}
      color="#00d2ff"
      glowColor="#3a7bd5"
      labelY={14}
    >
      {/* 1. Base Plaza Pedestal with Granite steps */}
      <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[8.5, 0.6, 8.5]} />
        <meshStandardMaterial color="#0b132b" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* 2. Glass Entrance Lobby (Ground Floor) */}
      <AboutOffice3D position={[0, 0.4, 0]} />
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.8, 1.6, 6.8]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Glowing Lobby Entrance Portico */}
      <mesh position={[0, 1.2, 3.5]}>
        <boxGeometry args={[2.8, 1.4, 0.4]} />
        <meshStandardMaterial
          color="#00f2fe"
          emissive="#00d2ff"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* 3. Lower Corporate Glass Tower Body */}
      <mesh position={[0, 4.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.6, 4.4, 5.6]} />
        <meshStandardMaterial
          color="#03254c"
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>
      {/* Structural Glowing Edge Ribs - Lower */}
      <lineSegments position={[0, 4.4, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(5.62, 4.42, 5.62)]} />
        <lineBasicMaterial color="#00d2ff" transparent opacity={0.8} />
      </lineSegments>

      {/* 4. Mid Skybridge & Transition Terrace */}
      <mesh position={[0, 6.8, 0]} castShadow>
        <boxGeometry args={[6.2, 0.4, 6.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* 5. Upper Executive Glass Tower (Stepped in) */}
      <mesh position={[0, 9.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 4.4, 4.2]} />
        <meshStandardMaterial
          color="#0b3c6d"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Structural Glowing Edge Ribs - Upper */}
      <lineSegments position={[0, 9.2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.22, 4.42, 4.22)]} />
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.9} />
      </lineSegments>

      {/* 6. Executive Sky Lounge Deck with Glass Perimeter */}
      <mesh position={[0, 11.6, 0]} castShadow>
        <boxGeometry args={[4.8, 0.4, 4.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>

      {/* 7. Crown Architectural Spire & Pulsing Hologram */}
      <group position={[0, 12.2, 0]}>
        {/* Needle Mast */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.18, 2.4, 8]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} />
        </mesh>

        {/* Floating Rotating Energy Ring */}
        <mesh ref={ringRef} position={[0, 2.0, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.7, 0.05, 12, 32]} />
          <meshBasicMaterial color="#00f2fe" />
        </mesh>

        {/* Corporate Diamond Beacon */}
        <mesh ref={beaconRef} position={[0, 2.6, 0]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#00d2ff"
            emissive="#00f2fe"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Building>
  );
}
