'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Vehicles() {
  const roundCar1Ref = useRef<THREE.Group>(null);
  const roundCar2Ref = useRef<THREE.Group>(null);
  const roundCar3Ref = useRef<THREE.Group>(null);
  const nsCar1Ref = useRef<THREE.Group>(null);
  const nsCar2Ref = useRef<THREE.Group>(null);
  const ewCar1Ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Roundabout vehicle 1 (Clockwise)
    if (roundCar1Ref.current) {
      const angle = t * 0.45;
      const radius = 7.3;
      roundCar1Ref.current.position.set(Math.cos(angle) * radius, 0.25 + Math.sin(t * 3) * 0.04, Math.sin(angle) * radius);
      roundCar1Ref.current.rotation.y = -angle + Math.PI / 2;
    }

    // Roundabout vehicle 2 (Clockwise, offset)
    if (roundCar2Ref.current) {
      const angle = t * 0.45 + (Math.PI * 2) / 3;
      const radius = 7.3;
      roundCar2Ref.current.position.set(Math.cos(angle) * radius, 0.25 + Math.cos(t * 3) * 0.04, Math.sin(angle) * radius);
      roundCar2Ref.current.rotation.y = -angle + Math.PI / 2;
    }

    // Outer Ring vehicle 3 (Counter-Clockwise)
    if (roundCar3Ref.current) {
      const angle = -t * 0.3;
      const radius = 22.0;
      roundCar3Ref.current.position.set(Math.cos(angle) * radius, 0.25 + Math.sin(t * 2.5) * 0.04, Math.sin(angle) * radius);
      roundCar3Ref.current.rotation.y = -angle - Math.PI / 2;
    }

    // North-South Avenue Car 1 (heading North)
    if (nsCar1Ref.current) {
      const z = ((t * 8) % 50) - 25;
      nsCar1Ref.current.position.set(1.2, 0.25 + Math.sin(t * 4) * 0.03, z);
      nsCar1Ref.current.rotation.y = 0;
    }

    // North-South Avenue Car 2 (heading South)
    if (nsCar2Ref.current) {
      const z = 25 - ((t * 7 + 10) % 50);
      nsCar2Ref.current.position.set(-1.2, 0.25 + Math.sin(t * 3.8) * 0.03, z);
      nsCar2Ref.current.rotation.y = Math.PI;
    }

    // East-West Avenue Car 1 (heading East)
    if (ewCar1Ref.current) {
      const x = ((t * 7.5 + 5) % 50) - 25;
      ewCar1Ref.current.position.set(x, 0.25 + Math.sin(t * 3.5) * 0.03, 1.2);
      ewCar1Ref.current.rotation.y = Math.PI / 2;
    }
  });

  return (
    <group>
      <group ref={roundCar1Ref}>
        <FuturisticCar color="#00d2ff" headlightColor="#67e8f9" />
      </group>
      <group ref={roundCar2Ref}>
        <FuturisticCar color="#ff0080" headlightColor="#f472b6" />
      </group>
      <group ref={roundCar3Ref}>
        <FuturisticCar color="#38ef7d" headlightColor="#86efac" />
      </group>
      <group ref={nsCar1Ref}>
        <FuturisticCar color="#f59e0b" headlightColor="#fde047" />
      </group>
      <group ref={nsCar2Ref}>
        <FuturisticCar color="#8b5cf6" headlightColor="#c4b5fd" />
      </group>
      <group ref={ewCar1Ref}>
        <FuturisticCar color="#06b6d4" headlightColor="#a5f3fc" />
      </group>
    </group>
  );
}

function FuturisticCar({ color, headlightColor }: { color: string; headlightColor: string }) {
  return (
    <group scale={[0.7, 0.7, 0.7]}>
      {/* Aerodynamic Body Chassis */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.1, 0.35, 2.0]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Cyber Glass Canopy */}
      <mesh position={[0, 0.42, -0.1]} castShadow>
        <boxGeometry args={[0.9, 0.3, 1.1]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Hover Thruster Pads (Underneath) */}
      {[-0.45, 0.45].map((x, i) =>
        [-0.6, 0.6].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.04, z]}>
            <cylinderGeometry args={[0.18, 0.18, 0.08, 12]} />
            <meshBasicMaterial color="#00f2fe" />
          </mesh>
        ))
      )}

      {/* Headlights (Front: +Z) */}
      <mesh position={[-0.38, 0.22, 1.01]}>
        <boxGeometry args={[0.22, 0.08, 0.04]} />
        <meshBasicMaterial color={headlightColor} />
      </mesh>
      <mesh position={[0.38, 0.22, 1.01]}>
        <boxGeometry args={[0.22, 0.08, 0.04]} />
        <meshBasicMaterial color={headlightColor} />
      </mesh>

      {/* Taillight Strip (Back: -Z) */}
      <mesh position={[0, 0.22, -1.01]}>
        <boxGeometry args={[0.9, 0.08, 0.04]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
}
