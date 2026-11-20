'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Water() {
  const meshRef = useRef<THREE.Mesh>(null);
  const foamRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      // Gentle water ripple rotation / pulsing effect
      const geom = meshRef.current.geometry;
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        // Subtle wave calculation
        const z = Math.sin(u * 0.15 + t * 1.2) * 0.25 + Math.cos(v * 0.15 + t * 1.5) * 0.25;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
    }

    if (foamRef.current) {
      foamRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group position={[0, -2.8, 0]}>
      {/* Dynamic Main Water Surface */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[160, 160, 36, 36]} />
        <meshStandardMaterial
          color="#002b4d"
          emissive="#001428"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Island Shoreline Glowing Foam / Energy Ring */}
      <mesh ref={foamRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[37, 43, 64]} />
        <meshBasicMaterial
          color="#00d2ff"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Deep Ocean Bed */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#020612" roughness={0.9} />
      </mesh>
    </group>
  );
}
