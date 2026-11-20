'use client';

import dynamic from 'next/dynamic';
import { InteractionController } from '@/components/player/InteractionController';
import { MovementControls } from '@/components/player/MovementControls';
import { BuildingInterior } from '@/components/interior/BuildingInterior';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { TopNavigation } from '@/components/navigation/TopNavigation';
import { MiniMap } from '@/components/navigation/MiniMap';
import { GuidedTour } from '@/components/navigation/GuidedTour';
import { ProfilePanel } from '@/components/ui/ProfilePanel';

// Dynamic import with SSR disabled to guarantee clean client-side WebGL mounting
const CityScene = dynamic(() => import('@/components/city/CityScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#030712] text-cyan-400">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent mb-4 shadow-[0_0_20px_rgba(0,210,255,0.5)]"></div>
      <p className="text-sm font-semibold tracking-widest uppercase text-cyan-300">
        Initializing 3D World Engine...
      </p>
    </div>
  )
});

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#030712]">
      {/* 1. 3D WebGL Canvas Layer */}
      <CityScene />

      {/* 2. Top Navigation Bar with Quick Hub Jump Links & Sound/Tour Controls */}
      <TopNavigation />

      {/* 3. Proximity & Interaction Prompt HUD ("Press E to Enter" / "Exit Building") */}
      <InteractionController />

      {/* 4. Touch & On-Screen Virtual D-pad Movement Controls */}
      <MovementControls />

      {/* 5. Interactive 2D Radar Mini-Map with Real-Time Player Tracking */}
      <MiniMap />

      {/* 6. Guided Cinematic City Tour with Progress & Narrations */}
      <GuidedTour />

      {/* 7. Collapsible Bottom Profile & Social Information Panel */}
      <ProfilePanel />

      {/* 8. Building Interior Overlays (About, Projects, Skills, Experience, Services, Contact) */}
      <BuildingInterior />

      {/* 9. Dedicated Project Details Modal */}
      <ProjectModal />
    </main>
  );
}
