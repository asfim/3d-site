'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Building } from './Building';

export function SkillsBuilding() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const cubesGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 1.0;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 1.3;
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.7;
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 1.5;
      crystalRef.current.position.y = 12.8 + Math.sin(t * 2) * 0.2;
    }
    if (cubesGroupRef.current) {
      cubesGroupRef.current.rotation.y = -t * 0.5;
    }
  });

  return (
    <Building
      id="skills"
      name="Technology Center"
      tagline="Backend, Frontend & Tools"
      iconName="Cpu"
      position={[18, 0, -10]}
      rotation={[0, -Math.PI / 4, 0]}
      color="#00f2fe"
      glowColor="#4facfe"
      labelY={15}
    >
      {/* 1. Hexagonal Stepped Cyber Foundation */}
      <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[4.8, 5.2, 0.6, 6]} />
        <meshStandardMaterial color="#0a192f" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* 2. Main High-Tech Core Cylinder Tower */}
      <mesh position={[0, 5.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.0, 3.4, 9.2, 16]} />
        <meshStandardMaterial
          color="#0d2137"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 3. Vertical Neon Energy Conduit Strips */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 3.12,
            5.2,
            Math.sin(angle) * 3.12
          ]}
        >
          <boxGeometry args={[0.2, 9.0, 0.2]} />
          <meshBasicMaterial color="#00f2fe" />
        </mesh>
      ))}

      {/* 4. Animated Neon Rings Around the Tower */}
      {/* Lower Neon Ring */}
      <mesh
        ref={ring1Ref}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 3.0, 0]}
      >
        <torusGeometry args={[3.8, 0.08, 12, 36]} />
        <meshBasicMaterial color="#00f2fe" />
      </mesh>

      {/* Mid Neon Ring */}
      <mesh
        ref={ring2Ref}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 6.2, 0]}
      >
        <torusGeometry args={[3.6, 0.08, 12, 36]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Upper Neon Ring */}
      <mesh
        ref={ring3Ref}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 9.0, 0]}
      >
        <torusGeometry args={[3.3, 0.08, 12, 36]} />
        <meshBasicMaterial color="#00f2fe" />
      </mesh>

      {/* 5. Orbiting Tech Cubes (Backend, Frontend, Database, Tools) */}
      <group ref={cubesGroupRef} position={[0, 7.5, 0]}>
        <TechFloatingCube position={[4.6, 0, 0]} color="#ff2d20" label="Laravel" />
        <TechFloatingCube position={[-4.6, 0, 0]} color="#61dafb" label="React" />
        <TechFloatingCube position={[0, 0, 4.6]} color="#00758f" label="MySQL" />
        <TechFloatingCube position={[0, 0, -4.6]} color="#06b6d4" label="Tailwind" />
      </group>

      {/* 6. Tower Crown Cap */}
      <mesh position={[0, 10.4, 0]} castShadow>
        <cylinderGeometry args={[2.2, 3.1, 1.2, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* 7. Quantum Core Spire & Floating Crystal */}
      <mesh position={[0, 11.6, 0]}>
        <cylinderGeometry args={[0.1, 0.4, 1.4, 8]} />
        <meshStandardMaterial color="#00f2fe" metalness={0.9} />
      </mesh>
      <mesh ref={crystalRef} position={[0, 12.8, 0]}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#00f2fe"
          emissive="#38bdf8"
          emissiveIntensity={3.0}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Building>
  );
}

function TechFloatingCube({
  position,
  color,
  label
}: {
  position: [number, number, number];
  color: string;
  label: string;
}) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.72, 0.72, 0.72)]} />
        <lineBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
}
