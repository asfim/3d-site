'use client';

import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { BuildingId } from '@/types';
import { useGameStore } from '@/stores/useGameStore';

interface BuildingProps {
  id: BuildingId;
  name: string;
  tagline: string;
  iconName: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  glowColor: string;
  labelY?: number;
  children: React.ReactNode;
}

export function Building({
  id,
  name,
  tagline,
  position,
  rotation = [0, 0, 0],
  color,
  glowColor,
  labelY = 12,
  children
}: BuildingProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  const enterBuilding = useGameStore((s) => s.enterBuilding);
  const activeBuilding = useGameStore((s) => s.activeBuilding);
  const isSelected = activeBuilding === id;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.8;
      const s = 1 + Math.sin(t * 3) * 0.08;
      ringRef.current.scale.set(s, s, s);
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    enterBuilding(id);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* 3D Children Architecture */}
      {children}

      {/* Ground Interaction Indicator Decal / Ring */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.06, 0]}
      >
        <ringGeometry args={[4.2, 4.6, 32]} />
        <meshBasicMaterial
          color={hovered || isSelected ? '#00f2fe' : glowColor}
          transparent
          opacity={hovered || isSelected ? 0.9 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Vertical Light Beam on Hover */}
      {hovered && (
        <mesh position={[0, labelY / 2, 0]}>
          <cylinderGeometry args={[1.5, 3.5, labelY, 16, 1, true]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Floating 3D HUD Label */}
      <Html
        position={[0, labelY, 0]}
        center
        distanceFactor={28}
        zIndexRange={[100, 0]}
      >
        <div
          onClick={handleClick}
          className={`pointer-events-auto cursor-pointer transition-all duration-300 transform -translate-y-2 ${
            hovered ? 'scale-110' : 'scale-100 opacity-90'
          }`}
        >
          <div
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-1.5 backdrop-blur-md shadow-2xl border text-left whitespace-nowrap"
            style={{
              backgroundColor: hovered ? 'rgba(10, 20, 40, 0.92)' : 'rgba(15, 23, 42, 0.8)',
              borderColor: hovered ? color : 'rgba(56, 189, 248, 0.3)',
              boxShadow: hovered
                ? `0 0 20px ${color}88, inset 0 0 10px ${glowColor}44`
                : '0 8px 24px rgba(0, 0, 0, 0.6)'
            }}
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg shadow-inner"
              style={{ backgroundColor: `${color}33`, color }}
            >
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider uppercase text-white drop-shadow">
                  {name}
                </span>
                <span
                  className="rounded px-1.5 py-0.2 text-[9px] font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: `${color}33`, color }}
                >
                  Enter
                </span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium">
                {tagline}
              </p>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}
