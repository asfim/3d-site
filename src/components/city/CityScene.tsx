'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { CityIsland } from './CityIsland';
import { Water } from './Water';
import { Roads } from './Roads';
import { Lighting } from './Lighting';
import { Trees } from './Trees';
import { Vehicles } from './Vehicles';
import { CityEnvironment } from './CityEnvironment';

// 6 Dedicated Interactive Buildings with Unique Architectural Identities
import { AboutBuilding } from '../buildings/AboutBuilding';
import { ProjectsBuilding } from '../buildings/ProjectsBuilding';
import { SkillsBuilding } from '../buildings/SkillsBuilding';
import { ExperienceBuilding } from '../buildings/ExperienceBuilding';
import { ServicesBuilding } from '../buildings/ServicesBuilding';
import { ContactBuilding } from '../buildings/ContactBuilding';
import { PlayerController } from '../player/PlayerController';
import { CameraController } from '../player/CameraController';

export default function CityScene() {
  return (
    <div className="relative w-full h-screen bg-[#030712] overflow-hidden select-none">
      <Canvas
        shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <PerspectiveCamera makeDefault position={[0, 32, 44]} fov={45} />

        <Suspense fallback={null}>
          {/* Atmospheric Environmental Lighting */}
          <Lighting />

          {/* Sky, Horizon Mountains, Clouds, Hologram Billboards */}
          <CityEnvironment />

          {/* Surrounding Dynamic Water Effects */}
          <Water />

          {/* Floating Miniature Island & Terraces */}
          <CityIsland />

          {/* Roads, Roundabout, Highway Dividers, Bridges */}
          <Roads />

          {/* City Parks, Cyber Pines & Garden Planters */}
          <Trees />

          {/* Moving Autonomous Futuristic Vehicles */}
          <Vehicles />

          {/* Interactive Player Explorer Drone */}
          <PlayerController />

          {/* The Six Portfolio Buildings with Unique Architecture */}
          <group>
            {/* 1. About Me Modern Glass Corporate Tower */}
            <AboutBuilding />

            {/* 2. Project Showcase Technology Expo Center */}
            <ProjectsBuilding />

            {/* 3. Technology Center with Animated Neon Rings */}
            <SkillsBuilding />

            {/* 4. Career & Experience Plaza with Stepped Terraces */}
            <ExperienceBuilding />

            {/* 5. Enterprise Service Hub with Modular Cantilevered Pods */}
            <ServicesBuilding />

            {/* 6. Communication HQ with Satellite Dish & Radar Array */}
            <ContactBuilding />
          </group>
        </Suspense>

        {/* Smooth GSAP Cinematic Camera & Dynamic Orbit Controller */}
        <CameraController />
      </Canvas>
    </div>
  );
}
