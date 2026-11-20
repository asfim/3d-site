'use client';

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/stores/useGameStore';

export interface MovementVector {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

export function useKeyboardControls() {
  const keysRef = useRef<MovementVector>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const enterBuilding = useGameStore((s) => s.enterBuilding);
  const exitBuilding = useGameStore((s) => s.exitBuilding);
  const nearbyBuilding = useGameStore((s) => s.nearbyBuilding);
  const activeBuilding = useGameStore((s) => s.activeBuilding);
  const cameraMode = useGameStore((s) => s.cameraMode);
  const closeProjectModal = useGameStore((s) => s.closeProjectModal);
  const isProjectModalOpen = useGameStore((s) => s.isProjectModalOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keysRef.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keysRef.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keysRef.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keysRef.current.right = true;
          break;
        case 'KeyE':
          if (nearbyBuilding && cameraMode === 'city') {
            enterBuilding(nearbyBuilding);
          }
          break;
        case 'Escape':
          if (isProjectModalOpen) {
            closeProjectModal();
          } else if (activeBuilding) {
            exitBuilding();
          }
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keysRef.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keysRef.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keysRef.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keysRef.current.right = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    nearbyBuilding,
    activeBuilding,
    cameraMode,
    enterBuilding,
    exitBuilding,
    isProjectModalOpen,
    closeProjectModal
  ]);

  return keysRef;
}
