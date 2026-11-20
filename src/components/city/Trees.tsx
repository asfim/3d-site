'use client';

import React from 'react';
import * as THREE from 'three';

export function Trees() {
  const treeClusters = [
    // Central Plaza Garden Corners
    { pos: [3.5, 0, 3.5] as [number, number, number], scale: 1.1, type: 'cyber-pine' as const },
    { pos: [-3.5, 0, 3.5] as [number, number, number], scale: 1.0, type: 'crystal-round' as const },
    { pos: [3.5, 0, -3.5] as [number, number, number], scale: 1.0, type: 'crystal-round' as const },
    { pos: [-3.5, 0, -3.5] as [number, number, number], scale: 1.1, type: 'cyber-pine' as const },

    // East Promenade Park Area
    { pos: [12, 0, 8] as [number, number, number], scale: 1.3, type: 'cyber-pine' as const },
    { pos: [10, 0, 10] as [number, number, number], scale: 0.9, type: 'crystal-round' as const },
    { pos: [14, 0, 10] as [number, number, number], scale: 1.1, type: 'cherry-blossom' as const },

    // West Promenade Park Area
    { pos: [-12, 0, -6] as [number, number, number], scale: 1.2, type: 'crystal-round' as const },
    { pos: [-10, 0, -8] as [number, number, number], scale: 1.0, type: 'cyber-pine' as const },
    { pos: [-14, 0, -8] as [number, number, number], scale: 1.1, type: 'cherry-blossom' as const },

    // North Boulevard Green Belt
    { pos: [7, 0, -18] as [number, number, number], scale: 1.2, type: 'cyber-pine' as const },
    { pos: [9, 0, -16] as [number, number, number], scale: 1.0, type: 'cherry-blossom' as const },
    { pos: [-7, 0, -18] as [number, number, number], scale: 1.2, type: 'crystal-round' as const },
    { pos: [-9, 0, -16] as [number, number, number], scale: 0.9, type: 'cyber-pine' as const },

    // South Boulevard Waterfront Park
    { pos: [8, 0, 20] as [number, number, number], scale: 1.1, type: 'crystal-round' as const },
    { pos: [10, 0, 18] as [number, number, number], scale: 1.3, type: 'cherry-blossom' as const },
    { pos: [-8, 0, 20] as [number, number, number], scale: 1.2, type: 'cyber-pine' as const },
    { pos: [-10, 0, 18] as [number, number, number], scale: 0.9, type: 'crystal-round' as const },
  ];

  return (
    <group>
      {treeClusters.map((t, idx) => (
        <TreeInstance
          key={idx}
          position={t.pos}
          scale={t.scale}
          type={t.type}
        />
      ))}

      {/* Decorative Garden Planters */}
      <GardenPlanter position={[6, 0, 0]} size={[1.5, 0.4, 6]} />
      <GardenPlanter position={[-6, 0, 0]} size={[1.5, 0.4, 6]} />
      <GardenPlanter position={[0, 0, 6]} size={[6, 0.4, 1.5]} />
      <GardenPlanter position={[0, 0, -6]} size={[6, 0.4, 1.5]} />
    </group>
  );
}

function TreeInstance({
  position,
  scale,
  type
}: {
  position: [number, number, number];
  scale: number;
  type: 'cyber-pine' | 'crystal-round' | 'cherry-blossom';
}) {
  const foliageColor =
    type === 'cyber-pine'
      ? '#059669'
      : type === 'crystal-round'
      ? '#06b6d4'
      : '#c026d3';

  const emissiveColor =
    type === 'cyber-pine'
      ? '#10b981'
      : type === 'crystal-round'
      ? '#22d3ee'
      : '#e879f9';

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Planter Curb Ring */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <cylinderGeometry args={[0.9, 1.05, 0.16, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Tree Trunk */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.18, 2.2, 8]} />
        <meshStandardMaterial color="#1f1815" roughness={0.9} />
      </mesh>

      {/* Foliage Geometry */}
      {type === 'cyber-pine' ? (
        <group position={[0, 2, 0]}>
          <mesh position={[0, 0.4, 0]} castShadow>
            <coneGeometry args={[1.1, 1.6, 7]} />
            <meshStandardMaterial
              color={foliageColor}
              emissive={emissiveColor}
              emissiveIntensity={0.25}
              roughness={0.4}
              flatShading
            />
          </mesh>
          <mesh position={[0, 1.2, 0]} castShadow>
            <coneGeometry args={[0.85, 1.4, 7]} />
            <meshStandardMaterial
              color={foliageColor}
              emissive={emissiveColor}
              emissiveIntensity={0.35}
              roughness={0.4}
              flatShading
            />
          </mesh>
          <mesh position={[0, 1.9, 0]} castShadow>
            <coneGeometry args={[0.6, 1.1, 7]} />
            <meshStandardMaterial
              color={foliageColor}
              emissive={emissiveColor}
              emissiveIntensity={0.45}
              roughness={0.4}
              flatShading
            />
          </mesh>
        </group>
      ) : type === 'crystal-round' ? (
        <mesh position={[0, 2.5, 0]} castShadow>
          <dodecahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color={foliageColor}
            emissive={emissiveColor}
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.3}
            flatShading
          />
        </mesh>
      ) : (
        <group position={[0, 2.4, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <icosahedronGeometry args={[1.1, 1]} />
            <meshStandardMaterial
              color={foliageColor}
              emissive={emissiveColor}
              emissiveIntensity={0.5}
              roughness={0.3}
              flatShading
            />
          </mesh>
          <mesh position={[0.4, 0.6, 0.2]} castShadow>
            <dodecahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial
              color={foliageColor}
              emissive={emissiveColor}
              emissiveIntensity={0.6}
              flatShading
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

function GardenPlanter({
  position,
  size
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  return (
    <group position={position}>
      {/* Planter Box */}
      <mesh position={[0, size[1] / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
      {/* Soil / Lawn Surface */}
      <mesh position={[0, size[1] + 0.01, 0]}>
        <boxGeometry args={[size[0] - 0.2, 0.02, size[2] - 0.2]} />
        <meshStandardMaterial color="#064e3b" roughness={0.8} />
      </mesh>
      {/* Neon Planter Edge */}
      <mesh position={[0, size[1] + 0.02, 0]}>
        <boxGeometry args={[size[0] + 0.04, 0.04, size[2] + 0.04]} />
        <meshBasicMaterial color="#00f2fe" wireframe />
      </mesh>
    </group>
  );
}
