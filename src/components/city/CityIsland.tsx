'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CityIsland() {
  const ringRef = useRef<THREE.Mesh>(null);
  const fountainParticlesRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.2;
    }
    if (fountainParticlesRef.current) {
      fountainParticlesRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Main Urban Island Deck (Top Surface) */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <cylinderGeometry args={[36, 36, 0.8, 64]} />
        <meshStandardMaterial
          color="#0b132b"
          roughness={0.7}
          metalness={0.25}
        />
      </mesh>

      {/* Island Outer Glowing Border Rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[35.8, 36.2, 64]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Middle Geological Layer (Retaining cyber-stone tiers) */}
      <mesh position={[0, -1.8, 0]} receiveShadow>
        <cylinderGeometry args={[36.5, 33, 2, 48]} />
        <meshStandardMaterial
          color="#1c2541"
          roughness={0.8}
          metalness={0.3}
        />
      </mesh>

      {/* Tier 2 Glowing Circuitry Groove */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <ringGeometry args={[34.8, 35.1, 48]} />
        <meshBasicMaterial color="#3a7bd5" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* 3. Deep Jagged Inverted Floating Rock Base */}
      <mesh position={[0, -8, 0]} receiveShadow>
        <coneGeometry args={[33, 14, 24]} />
        <meshStandardMaterial
          color="#090d16"
          roughness={0.9}
          metalness={0.15}
          flatShading
        />
      </mesh>

      {/* 4. Anti-Gravity Propulsion Ring / Levitation Emitter at the Island Base */}
      <group position={[0, -14, 0]}>
        <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[8, 0.6, 16, 48]} />
          <meshStandardMaterial
            color="#00d2ff"
            emissive="#00f2fe"
            emissiveIntensity={2.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Anti-gravity Core Crystal */}
        <mesh position={[0, -1, 0]}>
          <octahedronGeometry args={[3.5, 0]} />
          <meshStandardMaterial
            color="#7928ca"
            emissive="#a855f7"
            emissiveIntensity={1.8}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* 5. Central Island Plaza with Cyber Fountain */}
      <CentralPlaza fountainParticlesRef={fountainParticlesRef} />

      {/* 6. City District Pavement Pads for the 6 Major Interactive Hubs */}
      {/* About Me District Pad */}
      <BuildingDistrictPad position={[-16, 0.02, -12]} size={[12, 12]} color="#00d2ff" />
      {/* Projects Expo District Pad */}
      <BuildingDistrictPad position={[0, 0.02, -20]} size={[14, 12]} color="#ff0080" />
      {/* Technology District Pad */}
      <BuildingDistrictPad position={[18, 0.02, -10]} size={[12, 12]} color="#00f2fe" />
      {/* Career Plaza District Pad */}
      <BuildingDistrictPad position={[-18, 0.02, 10]} size={[12, 12]} color="#10b981" />
      {/* Enterprise Services District Pad */}
      <BuildingDistrictPad position={[16, 0.02, 12]} size={[12, 12]} color="#ec4899" />
      {/* Contact District Pad */}
      <BuildingDistrictPad position={[0, 0.02, 16]} size={[12, 12]} color="#38bdf8" />
    </group>
  );
}

function BuildingDistrictPad({
  position,
  size,
  color
}: {
  position: [number, number, number];
  size: [number, number];
  color: string;
}) {
  return (
    <group position={position}>
      {/* Base Foundation Slab */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={size} />
        <meshStandardMaterial color="#0f172a" roughness={0.65} metalness={0.3} />
      </mesh>
      {/* Glowing Border Trim */}
      <lineSegments position={[0, 0.03, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(size[0], 0.02, size[1])]} />
        <lineBasicMaterial color={color} transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
}

function CentralPlaza({
  fountainParticlesRef
}: {
  fountainParticlesRef: React.RefObject<THREE.Points | null>;
}) {
  const particleCount = 120;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1 + Math.random() * 1.8;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = 0.5 + Math.random() * 2.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Fountain Circular Basin */}
      <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[4.2, 4.5, 0.5, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Water pool inside the basin */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.45, 0]}>
        <circleGeometry args={[4, 32]} />
        <meshStandardMaterial
          color="#00f2fe"
          emissive="#00d2ff"
          emissiveIntensity={0.5}
          roughness={0.1}
        />
      </mesh>

      {/* Central Cyber Fountain Spire */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.7, 2.5, 8]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#00d2ff"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Glowing Fountain Water Mist / Particles */}
      <points ref={fountainParticlesRef} position={[0, 0.5, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          color="#67e8f9"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
