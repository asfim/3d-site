import { create } from 'zustand';
import { BuildingId, CameraMode, GraphicsQuality, Project } from '@/types';
import { buildingsData } from '@/data/buildings';
import { soundEngine } from '@/lib/audio';

interface GameState {
  hasStarted: boolean;
  cameraMode: CameraMode;
  activeBuilding: BuildingId | null;
  nearbyBuilding: BuildingId | null;
  
  // Navigation & Tour
  isTourActive: boolean;
  tourIndex: number;
  
  // Player & Camera
  playerPosition: [number, number, number];
  joystickVector: { x: number; y: number };
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
  
  // UI Panels
  isProfilePanelOpen: boolean;
  isSettingsOpen: boolean;
  isMiniMapOpen: boolean;
  isControlsHelpOpen: boolean;
  
  // Project detail modal
  selectedProject: Project | null;
  isProjectModalOpen: boolean;
  
  // Audio & Settings
  isAudioEnabled: boolean;
  graphicsQuality: GraphicsQuality;
  skipAnimations: boolean;
  
  // Actions
  setHasStarted: (hasStarted: boolean) => void;
  setCameraMode: (mode: CameraMode) => void;
  setNearbyBuilding: (buildingId: BuildingId | null) => void;
  enterBuilding: (buildingId: BuildingId) => void;
  exitBuilding: () => void;
  
  // Tour controls
  startTour: () => void;
  stopTour: () => void;
  nextTourStop: () => void;
  prevTourStop: () => void;
  
  // Position updates
  setPlayerPosition: (pos: [number, number, number]) => void;
  setJoystickVector: (v: { x: number; y: number }) => void;
  setCameraCoordinates: (pos: [number, number, number], target: [number, number, number]) => void;
  
  // UI toggles
  toggleProfilePanel: () => void;
  toggleSettings: () => void;
  toggleMiniMap: () => void;
  toggleControlsHelp: () => void;
  toggleAudio: () => void;
  setGraphicsQuality: (quality: GraphicsQuality) => void;
  setSkipAnimations: (skip: boolean) => void;
  
  openProjectModal: (project: Project) => void;
  closeProjectModal: () => void;
}

const DEFAULT_CAMERA_POS: [number, number, number] = [0, 36, 46];
const DEFAULT_CAMERA_TARGET: [number, number, number] = [0, 0, 0];

export const useGameStore = create<GameState>((set, get) => ({
  hasStarted: false,
  cameraMode: 'city',
  activeBuilding: null,
  nearbyBuilding: null,
  
  isTourActive: false,
  tourIndex: 0,
  
  playerPosition: [0, 0.5, 6],
  joystickVector: { x: 0, y: 0 },
  cameraPosition: DEFAULT_CAMERA_POS,
  cameraTarget: DEFAULT_CAMERA_TARGET,
  
  isProfilePanelOpen: false,
  isSettingsOpen: false,
  isMiniMapOpen: true,
  isControlsHelpOpen: false,
  
  selectedProject: null,
  isProjectModalOpen: false,
  
  isAudioEnabled: false,
  graphicsQuality: 'high',
  skipAnimations: false,
  
  setHasStarted: (hasStarted) => set({ hasStarted }),
  
  setCameraMode: (cameraMode) => set({ cameraMode }),
  
  setNearbyBuilding: (nearbyBuilding) => set({ nearbyBuilding }),
  
  enterBuilding: (buildingId) => {
    const building = buildingsData.find((b) => b.id === buildingId);
    if (!building) return;
    
    if (get().isAudioEnabled) {
      soundEngine.playEnterChime();
    }

    set({
      activeBuilding: buildingId,
      cameraMode: 'interior',
      isTourActive: false,
      cameraTarget: building.position,
      cameraPosition: building.interiorCamera
    });
  },
  
  exitBuilding: () => {
    if (get().isAudioEnabled) {
      soundEngine.playExitSound();
    }

    set({
      activeBuilding: null,
      cameraMode: 'city',
      cameraTarget: DEFAULT_CAMERA_TARGET,
      cameraPosition: DEFAULT_CAMERA_POS
    });
  },
  
  startTour: () => {
    const firstBuilding = buildingsData[0];
    set({
      isTourActive: true,
      tourIndex: 0,
      activeBuilding: firstBuilding.id,
      cameraMode: 'tour',
      cameraTarget: firstBuilding.position,
      cameraPosition: firstBuilding.interiorCamera
    });
  },
  
  stopTour: () => {
    set({
      isTourActive: false,
      activeBuilding: null,
      cameraMode: 'city',
      cameraTarget: DEFAULT_CAMERA_TARGET,
      cameraPosition: DEFAULT_CAMERA_POS
    });
  },
  
  nextTourStop: () => {
    const { tourIndex } = get();
    const nextIndex = (tourIndex + 1) % buildingsData.length;
    const targetBuilding = buildingsData[nextIndex];
    set({
      tourIndex: nextIndex,
      activeBuilding: targetBuilding.id,
      cameraTarget: targetBuilding.position,
      cameraPosition: targetBuilding.interiorCamera
    });
  },
  
  prevTourStop: () => {
    const { tourIndex } = get();
    const prevIndex = (tourIndex - 1 + buildingsData.length) % buildingsData.length;
    const targetBuilding = buildingsData[prevIndex];
    set({
      tourIndex: prevIndex,
      activeBuilding: targetBuilding.id,
      cameraTarget: targetBuilding.position,
      cameraPosition: targetBuilding.interiorCamera
    });
  },
  
  setPlayerPosition: (playerPosition) => set({ playerPosition }),
  setJoystickVector: (joystickVector) => set({ joystickVector }),
  
  setCameraCoordinates: (cameraPosition, cameraTarget) =>
    set({ cameraPosition, cameraTarget }),
  
  toggleProfilePanel: () =>
    set((state) => ({ isProfilePanelOpen: !state.isProfilePanelOpen })),
  
  toggleSettings: () =>
    set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
  
  toggleMiniMap: () =>
    set((state) => ({ isMiniMapOpen: !state.isMiniMapOpen })),
  
  toggleControlsHelp: () =>
    set((state) => ({ isControlsHelpOpen: !state.isControlsHelpOpen })),
  
  toggleAudio: () => {
    const nextState = !get().isAudioEnabled;
    if (nextState) {
      soundEngine.startAmbient();
      soundEngine.playClick();
    } else {
      soundEngine.stopAmbient();
    }
    set({ isAudioEnabled: nextState });
  },
  
  setGraphicsQuality: (graphicsQuality) => set({ graphicsQuality }),
  
  setSkipAnimations: (skipAnimations) => set({ skipAnimations }),
  
  openProjectModal: (project) =>
    set({ selectedProject: project, isProjectModalOpen: true }),
  
  closeProjectModal: () =>
    set({ selectedProject: null, isProjectModalOpen: false })
}));
