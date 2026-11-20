import * as THREE from 'three';
import gsap from 'gsap';
import { BuildingConfig } from '@/types';

export const CITY_DEFAULT_CAMERA_POS: [number, number, number] = [0, 32, 44];
export const CITY_DEFAULT_TARGET: [number, number, number] = [0, 0, 0];

export interface CameraTransitionOptions {
  duration?: number;
  ease?: string;
  onUpdate?: () => void;
  onComplete?: () => void;
}

/**
 * Calculates a cinematic approach camera viewpoint for any building
 */
export function getBuildingApproachPosition(
  building: BuildingConfig
): [number, number, number] {
  // Offset camera back and up slightly from building position along building forward vector
  const [bx, by, bz] = building.position;
  
  // Custom camera angles based on building location to ensure optimal interior/exterior visibility
  const angle = Math.atan2(bz, bx);
  const distance = 14;
  const height = 9;

  return [
    bx + Math.cos(angle) * distance,
    by + height,
    bz + Math.sin(angle) * distance
  ];
}

/**
 * Smoothly animates camera and controls target using GSAP
 */
export function animateCameraTo(
  camera: THREE.Camera,
  controls: any,
  targetPos: [number, number, number],
  targetLookAt: [number, number, number],
  options: CameraTransitionOptions = {}
): gsap.core.Timeline {
  const {
    duration = 1.4,
    ease = 'power2.inOut',
    onUpdate,
    onComplete
  } = options;

  const tl = gsap.timeline({
    onUpdate: () => {
      if (controls && controls.target) {
        controls.update();
      }
      if (onUpdate) onUpdate();
    },
    onComplete
  });

  // Animate Camera Position
  tl.to(
    camera.position,
    {
      x: targetPos[0],
      y: targetPos[1],
      z: targetPos[2],
      duration,
      ease
    },
    0
  );

  // Animate Controls Target (Look-at point)
  if (controls && controls.target) {
    tl.to(
      controls.target,
      {
        x: targetLookAt[0],
        y: targetLookAt[1],
        z: targetLookAt[2],
        duration,
        ease
      },
      0
    );
  }

  return tl;
}
