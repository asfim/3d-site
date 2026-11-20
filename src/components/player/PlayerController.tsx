'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';
import { useGameStore } from '@/stores/useGameStore';
import { buildingsData } from '@/data/buildings';

const MOVE_SPEED = 14;
const MAX_ISLAND_RADIUS = 33;
const INTERACTION_DISTANCE = 8.5;

export function PlayerController() {
  const keys = useKeyboardControls();
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const cameraMode = useGameStore((s) => s.cameraMode);
  const joystickVector = useGameStore((s) => s.joystickVector);
  const setNearbyBuilding = useGameStore((s) => s.setNearbyBuilding);
  const setPlayerPosition = useGameStore((s) => s.setPlayerPosition);

  // Keep a local position vector to avoid per-frame allocations
  const pos = useRef(new THREE.Vector3(0, 0.7, 8));
  const currentRot = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Only allow free exploration when in city mode
    if (cameraMode === 'city') {
      let moveX = 0;
      let moveZ = 0;

      // 1. Keyboard WASD / Arrow Keys
      if (keys.current.forward) moveZ -= 1;
      if (keys.current.backward) moveZ += 1;
      if (keys.current.left) moveX -= 1;
      if (keys.current.right) moveX += 1;

      // 2. Touch Virtual Joystick Inputs
      if (Math.abs(joystickVector.x) > 0.05) moveX += joystickVector.x;
      if (Math.abs(joystickVector.y) > 0.05) moveZ += joystickVector.y;

      const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
      if (len > 0.05) {
        const normX = moveX / Math.max(1, len);
        const normZ = moveZ / Math.max(1, len);

        pos.current.x += normX * MOVE_SPEED * delta;
        pos.current.z += normZ * MOVE_SPEED * delta;

        // Smooth rotation facing movement vector
        const targetRot = Math.atan2(normX, normZ);
        currentRot.current = THREE.MathUtils.lerp(
          currentRot.current,
          targetRot,
          delta * 12
        );
        groupRef.current.rotation.y = currentRot.current;
      }

      // 3. Constrain to island bounds
      const distFromCenter = Math.sqrt(
        pos.current.x * pos.current.x + pos.current.z * pos.current.z
      );
      if (distFromCenter > MAX_ISLAND_RADIUS) {
        const angle = Math.atan2(pos.current.z, pos.current.x);
        pos.current.x = Math.cos(angle) * MAX_ISLAND_RADIUS;
        pos.current.z = Math.sin(angle) * MAX_ISLAND_RADIUS;
      }

      // Gentle floating bob
      const t = Date.now() * 0.003;
      pos.current.y = 0.7 + Math.sin(t) * 0.08;

      groupRef.current.position.copy(pos.current);

      // Sync position to game store for minimap & camera tracking
      setPlayerPosition([pos.current.x, pos.current.y, pos.current.z]);

      // 4. Proximity detection to all 6 buildings
      let closestBuildingId: any = null;
      let minDistance = INTERACTION_DISTANCE;

      for (const building of buildingsData) {
        const dx = pos.current.x - building.position[0];
        const dz = pos.current.z - building.position[2];
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < minDistance) {
          minDistance = dist;
          closestBuildingId = building.id;
        }
      }

      setNearbyBuilding(closestBuildingId);
    }

    // Drone animations
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 2.5;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 1.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.7, 8]}>
      {/* 1. Cyber Explorer Drone Body */}
      <mesh castShadow position={[0, 0, 0]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* 2. Emissive Glowing Energy Visor */}
      <mesh ref={coreRef} position={[0, 0.05, 0.28]}>
        <boxGeometry args={[0.5, 0.16, 0.2]} />
        <meshStandardMaterial
          color="#00f2fe"
          emissive="#00f2fe"
          emissiveIntensity={3}
        />
      </mesh>

      {/* 3. Orbiting Sensor Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.7, 0.03, 8, 32]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* 4. Anti-Gravity Ground Thruster Light */}
      <pointLight position={[0, -0.3, 0]} intensity={1.5} distance={3.5} color="#00f2fe" />

      {/* 5. Ground Projection Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.65, 0]}>
        <circleGeometry args={[0.6, 16]} />
        <meshBasicMaterial
          color="#00d2ff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
