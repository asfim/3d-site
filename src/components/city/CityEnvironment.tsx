'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export function CityEnvironment() {
  const cloudsRef = useRef<THREE.Group>(null);
  const billboardsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.015;
    }
    if (billboardsRef.current) {
      // Gentle floating shimmer for holographic signs
      billboardsRef.current.position.y = Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <group>
      {/* 1. Deep Space Cyber Stars */}
      <Stars radius={120} depth={60} count={4000} factor={4} saturation={0.6} fade speed={1.2} />

      {/* 2. Floating Animated Stylized Clouds */}
      <group ref={cloudsRef} position={[0, 26, 0]}>
        <LowPolyCloud position={[35, 0, 25]} scale={2.8} />
        <LowPolyCloud position={[-38, 3, 30]} scale={3.2} />
        <LowPolyCloud position={[25, 4, -40]} scale={2.5} />
        <LowPolyCloud position={[-35, 1, -35]} scale={3.0} />
        <LowPolyCloud position={[45, 2, -10]} scale={2.2} />
      </group>

      {/* 3. Distant Mountain Ring Silhouettes on the Horizon */}
      <DistantMountainRing />

      {/* 4. Background Secondary Metropolis Skyscrapers (Skyline Density) */}
      <MetropolisSkylineBackdrop />

      {/* 5. Holographic City Floating Billboards & Identity Signage */}
      <group ref={billboardsRef}>
        <HoloSign
          position={[0, 14, -28]}
          text="H TECH PROVISION IT"
          color="#00d2ff"
          width={14}
          height={2.2}
        />
        <HoloSign
          position={[-24, 12, 0]}
          text="MOHAMMAD HASAN PARVEZ"
          color="#a855f7"
          width={16}
          height={2.0}
        />
        <HoloSign
          position={[24, 12, 0]}
          text="LARAVEL SPECIALIST"
          color="#06b6d4"
          width={15}
          height={2.0}
        />
      </group>

      {/* 6. Cyber Holographic Energy Particles */}
      <CyberFloatingParticles />
    </group>
  );
}

function LowPolyCloud({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={[scale, scale * 0.55, scale]}>
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} transparent opacity={0.65} />
      </mesh>
      <mesh position={[1.4, -0.2, 0]}>
        <dodecahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} transparent opacity={0.65} />
      </mesh>
      <mesh position={[-1.3, -0.1, 0.4]}>
        <dodecahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

function DistantMountainRing() {
  const mountainCount = 20;
  const mountains = useMemo(() => {
    return Array.from({ length: mountainCount }).map((_, i) => {
      const angle = (i / mountainCount) * Math.PI * 2;
      const radius = 95 + (i % 3) * 10;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const height = 18 + (i % 5) * 8;
      const width = 16 + (i % 4) * 6;
      return { x, z, height, width, rotation: angle };
    });
  }, []);

  return (
    <group position={[0, -6, 0]}>
      {mountains.map((m, i) => (
        <mesh
          key={i}
          position={[m.x, m.height / 2, m.z]}
          rotation={[0, m.rotation, 0]}
        >
          <coneGeometry args={[m.width, m.height, 5]} />
          <meshStandardMaterial
            color="#080e1e"
            roughness={0.95}
            metalness={0.1}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

function MetropolisSkylineBackdrop() {
  // Secondary background buildings that give the city urban density
  const skylineBuildings = [
    // Outer Northeast Cluster
    { pos: [24, 0, -22] as [number, number, number], size: [5, 14, 5] as [number, number, number], color: '#0f172a' },
    { pos: [29, 0, -18] as [number, number, number], size: [4, 18, 4] as [number, number, number], color: '#131e3a' },
    { pos: [20, 0, -26] as [number, number, number], size: [4.5, 10, 4.5] as [number, number, number], color: '#0f172a' },

    // Outer Northwest Cluster
    { pos: [-24, 0, -22] as [number, number, number], size: [5, 16, 5] as [number, number, number], color: '#131e3a' },
    { pos: [-29, 0, -17] as [number, number, number], size: [4, 12, 4] as [number, number, number], color: '#0f172a' },
    { pos: [-20, 0, -26] as [number, number, number], size: [4.5, 9, 4.5] as [number, number, number], color: '#131e3a' },

    // Outer Southeast Cluster
    { pos: [25, 0, 20] as [number, number, number], size: [5, 11, 5] as [number, number, number], color: '#0f172a' },
    { pos: [21, 0, 24] as [number, number, number], size: [4, 15, 4] as [number, number, number], color: '#131e3a' },

    // Outer Southwest Cluster
    { pos: [-25, 0, 20] as [number, number, number], size: [5, 12, 5] as [number, number, number], color: '#131e3a' },
    { pos: [-21, 0, 24] as [number, number, number], size: [4, 14, 4] as [number, number, number], color: '#0f172a' },
  ];

  return (
    <group>
      {skylineBuildings.map((b, i) => (
        <group key={i} position={b.pos}>
          {/* Main Tower Mass */}
          <mesh position={[0, b.size[1] / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={b.size} />
            <meshStandardMaterial color={b.color} roughness={0.6} metalness={0.4} />
          </mesh>
          {/* Glowing Window Strips */}
          <mesh position={[0, b.size[1] / 2, b.size[2] / 2 + 0.02]}>
            <planeGeometry args={[b.size[0] * 0.7, b.size[1] * 0.75]} />
            <meshStandardMaterial
              color="#002b4d"
              emissive="#00f2fe"
              emissiveIntensity={0.3}
              roughness={0.2}
            />
          </mesh>
          {/* Rooftop Cyber Antenna Spire */}
          <mesh position={[0, b.size[1] + 1.5, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 3, 6]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function HoloSign({
  position,
  text,
  color,
  width,
  height
}: {
  position: [number, number, number];
  text: string;
  color: string;
  width: number;
  height: number;
}) {
  return (
    <group position={position}>
      {/* Hologram Sign Frame */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Frame Wireframe Edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial color={color} transparent opacity={0.8} />
      </lineSegments>

      {/* Projection Beams from Base Ground */}
      <mesh position={[0, -height / 2 - 2, 0]}>
        <cylinderGeometry args={[0.1, 0.4, 4, 8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}

function CyberFloatingParticles() {
  const count = 180;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = 1 + Math.random() * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 70;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#38bdf8"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
