'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Building } from './Building';

export function ServicesBuilding() {
  const serviceBeaconRef = useRef<THREE.Mesh>(null);
  const cantileverRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (serviceBeaconRef.current) {
      serviceBeaconRef.current.rotation.y = -t * 1.1;
      serviceBeaconRef.current.rotation.z = Math.sin(t) * 0.2;
    }
    if (cantileverRef.current) {
      cantileverRef.current.position.y = Math.sin(t * 1.6) * 0.08;
    }
  });

  return (
    <Building
      id="services"
      name="Enterprise Service Hub"
      tagline="Custom Software & ERPs"
      iconName="Layers"
      position={[16, 0, 12]}
      rotation={[0, -Math.PI / 3, 0]}
      color="#f857a6"
      glowColor="#ff5858"
      labelY={13}
    >
      {/* 1. Base Foundation Podium */}
      <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[9.5, 0.6, 9.5]} />
        <meshStandardMaterial color="#200d1b" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* 2. Central Structural Core */}
      <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 8.0, 4.8]} />
        <meshStandardMaterial color="#3b1029" roughness={0.3} metalness={0.7} />
      </mesh>
      <lineSegments position={[0, 4.5, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.82, 8.02, 4.82)]} />
        <lineBasicMaterial color="#f857a6" transparent opacity={0.6} />
      </lineSegments>

      {/* 3. Lower Cantilevered Service Pod (East Wing - Custom Web & E-Commerce) */}
      <mesh position={[2.6, 3.2, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 2.6, 4.0]} />
        <meshStandardMaterial color="#4a1534" roughness={0.2} metalness={0.8} />
      </mesh>
      <lineSegments position={[2.6, 3.2, 0.5]}>
        <edgesGeometry args={[new THREE.BoxGeometry(3.82, 2.62, 4.02)]} />
        <lineBasicMaterial color="#ff5858" transparent opacity={0.7} />
      </lineSegments>

      {/* 4. Upper Cantilevered Service Pod (West Wing - Enterprise ERP & Management) */}
      <group ref={cantileverRef}>
        <mesh position={[-2.6, 6.0, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[3.8, 2.8, 4.0]} />
          <meshStandardMaterial color="#611b43" roughness={0.15} metalness={0.85} />
        </mesh>
        <lineSegments position={[-2.6, 6.0, -0.5]}>
          <edgesGeometry args={[new THREE.BoxGeometry(3.82, 2.82, 4.02)]} />
          <lineBasicMaterial color="#f857a6" transparent opacity={0.8} />
        </lineSegments>
      </group>

      {/* 5. Glass Front Service Consultation Pavilion */}
      <mesh position={[0, 1.4, 3.2]} castShadow>
        <boxGeometry args={[5.2, 1.8, 2.4]} />
        <meshStandardMaterial
          color="#3b1029"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Illuminated Entrance Strip */}
      <mesh position={[0, 1.2, 4.42]}>
        <planeGeometry args={[2.8, 1.4]} />
        <meshBasicMaterial color="#f857a6" />
      </mesh>

      {/* 6. Rooftop Service Antenna Spire & Floating Polyhedron */}
      <mesh position={[0, 8.8, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.2, 2.0, 8]} />
        <meshStandardMaterial color="#f857a6" metalness={0.9} />
      </mesh>
      <mesh ref={serviceBeaconRef} position={[0, 10.4, 0]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#ff5858"
          emissive="#f857a6"
          emissiveIntensity={2.2}
          wireframe
        />
      </mesh>
    </Building>
  );
}
