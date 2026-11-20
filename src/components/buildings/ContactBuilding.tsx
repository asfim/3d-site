'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Building } from './Building';

export function ContactBuilding() {
  const dishRef = useRef<THREE.Group>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (dishRef.current) {
      dishRef.current.rotation.y = Math.sin(t * 0.5) * 0.6;
    }
    if (pulseRingRef.current) {
      const s = 1 + (t * 1.5) % 2;
      pulseRingRef.current.scale.set(s, s, s);
      const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = Math.max(0, 1 - (s - 1) / 2);
      }
    }
  });

  return (
    <Building
      id="contact"
      name="Communication HQ"
      tagline="Connect & Inquire"
      iconName="Send"
      position={[0, 0, 16]}
      rotation={[0, Math.PI, 0]}
      color="#43e97b"
      glowColor="#38f9d7"
      labelY={12}
    >
      {/* 1. Circular Communication Base Platform */}
      <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[5.2, 5.8, 0.6, 32]} />
        <meshStandardMaterial color="#08201a" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* 2. Main High-Tech Cylindrical Command Hub */}
      <mesh position={[0, 2.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[4.2, 4.8, 4.0, 32]} />
        <meshStandardMaterial color="#0c382e" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Circumferential Glowing Signal Bands */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.8, 0]}>
        <ringGeometry args={[4.45, 4.55, 32]} />
        <meshBasicMaterial color="#38f9d7" side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 3.4, 0]}>
        <ringGeometry args={[4.35, 4.45, 32]} />
        <meshBasicMaterial color="#43e97b" side={THREE.DoubleSide} />
      </mesh>

      {/* 3. Hemispherical Glass Observation Observatory Dome */}
      <mesh position={[0, 4.6, 0]} castShadow>
        <sphereGeometry args={[3.2, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#0f4d3f"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 4. Glowing Signal Array Tower & Satellite Dish */}
      <group position={[0, 6.2, 0]}>
        {/* Mast */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.22, 2.4, 8]} />
          <meshStandardMaterial color="#38f9d7" metalness={0.9} />
        </mesh>

        {/* Steerable Dish Mount */}
        <group ref={dishRef} position={[0, 2.4, 0]}>
          {/* Dish Bowl */}
          <mesh rotation={[Math.PI / 3, 0, 0]} castShadow>
            <cylinderGeometry args={[1.5, 0.2, 0.4, 16, 1, true]} />
            <meshStandardMaterial
              color="#0c382e"
              roughness={0.3}
              metalness={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Receiver Sub-reflector Horn */}
          <mesh position={[0, 0.6, 0.5]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial
              color="#43e97b"
              emissive="#38f9d7"
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>

        {/* Pulse Emission Wave Ring */}
        <mesh
          ref={pulseRingRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 2.4, 0]}
        >
          <ringGeometry args={[0.8, 1.0, 32]} />
          <meshBasicMaterial
            color="#38f9d7"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 5. Front Communication Portal Entrance */}
      <mesh position={[0, 1.2, 4.6]}>
        <boxGeometry args={[2.4, 1.8, 0.6]} />
        <meshStandardMaterial
          color="#00f2fe"
          emissive="#43e97b"
          emissiveIntensity={0.8}
        />
      </mesh>
    </Building>
  );
}
