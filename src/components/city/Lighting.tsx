'use client';

import React from 'react';
import * as THREE from 'three';

export function Lighting() {
  return (
    <group>
      {/* 1. Deep Atmospheric Ambient Light */}
      <ambientLight intensity={0.45} color="#253561" />

      {/* 2. Main Key Directional Sunlight (Cool Blue-Hour / Cyber Twilight) */}
      <directionalLight
        position={[30, 45, 25]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={140}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0005}
        color="#d0e5ff"
      />

      {/* 3. Secondary Warm Orange Accent Rim Light (creating high contrast) */}
      <directionalLight
        position={[-35, 20, -30]}
        intensity={0.6}
        color="#ff8c38"
      />

      {/* 4. Electric Blue / Violet Fill Light */}
      <directionalLight
        position={[0, -20, 0]}
        intensity={0.9}
        color="#3a7bd5"
      />

      {/* 5. Central Plaza Fountain Accent Point Light */}
      <pointLight position={[0, 3, 0]} intensity={3} distance={16} color="#00f2fe" decay={2} />

      {/* 6. Streetlights with 3D Light Poles along Boulevards */}
      <StreetLight position={[6, 0, 8]} rotation={Math.PI / 4} lightColor="#67e8f9" />
      <StreetLight position={[-6, 0, 8]} rotation={-Math.PI / 4} lightColor="#67e8f9" />
      <StreetLight position={[6, 0, -8]} rotation={(3 * Math.PI) / 4} lightColor="#67e8f9" />
      <StreetLight position={[-6, 0, -8]} rotation={-(3 * Math.PI) / 4} lightColor="#67e8f9" />

      {/* Avenue Streetlights */}
      <StreetLight position={[14, 0, 3]} rotation={0} lightColor="#38bdf8" />
      <StreetLight position={[-14, 0, 3]} rotation={Math.PI} lightColor="#38bdf8" />
      <StreetLight position={[3, 0, 14]} rotation={Math.PI / 2} lightColor="#38bdf8" />
      <StreetLight position={[3, 0, -14]} rotation={-Math.PI / 2} lightColor="#38bdf8" />

      {/* Bridge Entry Beacon Lights */}
      <pointLight position={[0, 2, 26]} intensity={1.8} distance={12} color="#00f2fe" decay={2} />
      <pointLight position={[0, 2, -26]} intensity={1.8} distance={12} color="#00f2fe" decay={2} />
      <pointLight position={[26, 2, 0]} intensity={1.8} distance={12} color="#00f2fe" decay={2} />
      <pointLight position={[-26, 2, 0]} intensity={1.8} distance={12} color="#00f2fe" decay={2} />
    </group>
  );
}

function StreetLight({
  position,
  rotation,
  lightColor
}: {
  position: [number, number, number];
  rotation: number;
  lightColor: string;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Vertical Mast */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 3.2, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Horizontal Curved Arm */}
      <mesh position={[0.4, 3.2, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.06, 0.06, 0.9, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Luminaire Head */}
      <mesh position={[0.8, 3.4, 0]}>
        <boxGeometry args={[0.35, 0.12, 0.2]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Emissive Lamp Glass */}
      <mesh position={[0.8, 3.32, 0]}>
        <boxGeometry args={[0.25, 0.04, 0.14]} />
        <meshStandardMaterial
          color={lightColor}
          emissive={lightColor}
          emissiveIntensity={3}
        />
      </mesh>

      {/* Local Downlight */}
      <spotLight
        position={[0.8, 3.2, 0]}
        target-position={[0.8, 0, 0]}
        intensity={2.5}
        distance={9}
        angle={Math.PI / 4}
        penumbra={0.6}
        color={lightColor}
        decay={2}
      />
    </group>
  );
}
