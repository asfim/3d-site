'use client';

import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useGameStore } from '@/stores/useGameStore';
import { buildingsData } from '@/data/buildings';
import {
  animateCameraTo,
  getBuildingApproachPosition,
  CITY_DEFAULT_CAMERA_POS,
  CITY_DEFAULT_TARGET
} from '@/lib/camera';

export function CameraController() {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const activeBuildingId = useGameStore((s) => s.activeBuilding);
  const cameraMode = useGameStore((s) => s.cameraMode);
  const setCameraMode = useGameStore((s) => s.setCameraMode);
  const skipAnimations = useGameStore((s) => s.skipAnimations);

  // Store the active tween to avoid overlapping animation conflicts
  const currentTween = useRef<gsap.core.Timeline | null>(null);
  const prevActiveBuilding = useRef<string | null>(null);

  useEffect(() => {
    // If activeBuilding changed from null to a building (Entering)
    if (activeBuildingId && activeBuildingId !== prevActiveBuilding.current) {
      prevActiveBuilding.current = activeBuildingId;
      const building = buildingsData.find((b) => b.id === activeBuildingId);
      if (!building) return;

      const duration = skipAnimations ? 0.05 : 1.3;
      const targetCameraPos = getBuildingApproachPosition(building);
      const lookAtPos = [
        building.position[0],
        building.position[1] + 2.5,
        building.position[2]
      ] as [number, number, number];

      if (currentTween.current) currentTween.current.kill();

      setCameraMode('transitioning');
      currentTween.current = animateCameraTo(
        camera,
        controlsRef.current,
        targetCameraPos,
        lookAtPos,
        {
          duration,
          ease: 'power3.inOut',
          onComplete: () => {
            setCameraMode('interior');
          }
        }
      );
    }
    // If activeBuilding changed from a building to null (Exiting back to city)
    else if (!activeBuildingId && prevActiveBuilding.current !== null) {
      prevActiveBuilding.current = null;
      const duration = skipAnimations ? 0.05 : 1.2;

      if (currentTween.current) currentTween.current.kill();

      setCameraMode('transitioning');
      currentTween.current = animateCameraTo(
        camera,
        controlsRef.current,
        CITY_DEFAULT_CAMERA_POS,
        CITY_DEFAULT_TARGET,
        {
          duration,
          ease: 'power2.inOut',
          onComplete: () => {
            setCameraMode('city');
          }
        }
      );
    }
  }, [activeBuildingId, camera, setCameraMode, skipAnimations]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={cameraMode === 'interior' ? Math.PI / 2.2 : Math.PI / 2.15}
      minPolarAngle={cameraMode === 'interior' ? Math.PI / 6 : Math.PI / 8}
      minDistance={cameraMode === 'interior' ? 6 : 10}
      maxDistance={cameraMode === 'interior' ? 25 : 85}
      rotateSpeed={0.7}
      zoomSpeed={0.8}
    />
  );
}
