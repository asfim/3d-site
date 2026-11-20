'use client';

import React from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { AboutInterior } from './AboutInterior';
import { ProjectsInterior } from './ProjectsInterior';
import { SkillsInterior } from './SkillsInterior';
import { ExperienceInterior } from './ExperienceInterior';
import { ServicesInterior } from './ServicesInterior';
import { ContactInterior } from './ContactInterior';
import { X, ArrowLeft } from 'lucide-react';

export function BuildingInterior() {
  const activeBuilding = useGameStore((s) => s.activeBuilding);
  const cameraMode = useGameStore((s) => s.cameraMode);
  const exitBuilding = useGameStore((s) => s.exitBuilding);

  if (!activeBuilding || cameraMode !== 'interior') {
    return null;
  }

  const renderContent = () => {
    switch (activeBuilding) {
      case 'about':
        return <AboutInterior />;
      case 'projects':
        return <ProjectsInterior />;
      case 'skills':
        return <SkillsInterior />;
      case 'experience':
        return <ExperienceInterior />;
      case 'services':
        return <ServicesInterior />;
      case 'contact':
        return <ContactInterior />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={exitBuilding}
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-300"
    >
      {/* Top Exit Navigation Bar */}
      <div className="fixed top-5 left-6 right-6 z-50 flex items-center justify-between pointer-events-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            exitBuilding();
          }}
          className="pointer-events-auto flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-slate-950/90 px-4 py-2 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-2xl transition-all hover:bg-cyan-950 hover:text-white hover:border-cyan-400 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to City</span>
          <span className="hidden rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-cyan-400 border border-slate-700 md:inline-block">
            ESC
          </span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            exitBuilding();
          }}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/40 bg-slate-950/90 text-slate-300 backdrop-blur-md shadow-2xl transition-all hover:bg-rose-950/80 hover:text-rose-300 hover:border-rose-500 active:scale-95"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Interior Content Container (Stops propagation so clicking inside doesn't close) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl flex justify-center animate-in zoom-in-95 duration-300"
      >
        {renderContent()}
      </div>
    </div>
  );
}
