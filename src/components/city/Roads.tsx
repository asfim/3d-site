'use client';

import React from 'react';
import * as THREE from 'three';

export function Roads() {
  return (
    <group position={[0, 0.05, 0]}>
      {/* Central Roundabout Island Outer Ring Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <ringGeometry args={[5, 9.5, 48]} />
        <meshStandardMaterial color="#111827" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Central Roundabout Glowing Lane Divider */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[7.2, 7.35, 48]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.8} />
      </mesh>

      {/* Main North-South Highway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[4.2, 58]} />
        <meshStandardMaterial color="#111827" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* North-South Glowing Center Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[0.2, 58]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.85} />
      </mesh>

      {/* Main East-West Highway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[58, 4.2]} />
        <meshStandardMaterial color="#111827" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* East-West Glowing Center Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[58, 0.2]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.85} />
      </mesh>

      {/* Outer Ring Boulevard */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <ringGeometry args={[20, 24, 64]} />
        <meshStandardMaterial color="#0f172a" roughness={0.75} metalness={0.2} />
      </mesh>
      {/* Outer Ring Glowing Trim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[21.9, 22.1, 64]} />
        <meshBasicMaterial color="#00d2ff" transparent opacity={0.7} />
      </mesh>

      {/* Diagonal Connecting Boulevards to Northwest & Northeast */}
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[3.2, 50]} />
        <meshStandardMaterial color="#111827" roughness={0.7} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, -Math.PI / 4]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[3.2, 50]} />
        <meshStandardMaterial color="#111827" roughness={0.7} />
      </mesh>

      {/* Pedestrian Crosswalks at Roundabout Entrances */}
      {/* North Crosswalk */}
      <Crosswalk position={[0, 0.03, 11]} rotation={0} />
      {/* South Crosswalk */}
      <Crosswalk position={[0, 0.03, -11]} rotation={0} />
      {/* East Crosswalk */}
      <Crosswalk position={[11, 0.03, 0]} rotation={Math.PI / 2} />
      {/* West Crosswalk */}
      <Crosswalk position={[-11, 0.03, 0]} rotation={Math.PI / 2} />

      {/* Bridges Over Island Water Channels */}
      <CityBridge position={[0, 0.2, 28]} rotation={[0, 0, 0]} />
      <CityBridge position={[0, 0.2, -28]} rotation={[0, 0, 0]} />
      <CityBridge position={[28, 0.2, 0]} rotation={[0, Math.PI / 2, 0]} />
      <CityBridge position={[-28, 0.2, 0]} rotation={[0, Math.PI / 2, 0]} />
    </group>
  );
}

function Crosswalk({ position, rotation }: { position: [number, number, number]; rotation: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {[-1.5, -0.9, -0.3, 0.3, 0.9, 1.5].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, 0]}>
          <planeGeometry args={[0.35, 1.4]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function CityBridge({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Bridge Deck */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.6, 0.3, 7]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Left Glowing Guard Rail */}
      <mesh position={[-2.4, 0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 7]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[-2.4, 0.8, 0]}>
        <boxGeometry args={[0.1, 0.08, 7]} />
        <meshBasicMaterial color="#00f2fe" />
      </mesh>
      {/* Right Glowing Guard Rail */}
      <mesh position={[2.4, 0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 7]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[2.4, 0.8, 0]}>
        <boxGeometry args={[0.1, 0.08, 7]} />
        <meshBasicMaterial color="#00f2fe" />
      </mesh>
      {/* Arch Support Under Bridge */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 4.4, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
    </group>
  );
}
