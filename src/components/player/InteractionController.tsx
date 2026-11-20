'use client';

import React from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { buildingsData } from '@/data/buildings';
import { LogIn, ArrowLeft } from 'lucide-react';

export function InteractionController() {
  const nearbyBuildingId = useGameStore((s) => s.nearbyBuilding);
  const activeBuildingId = useGameStore((s) => s.activeBuilding);
  const cameraMode = useGameStore((s) => s.cameraMode);
  const enterBuilding = useGameStore((s) => s.enterBuilding);
  const exitBuilding = useGameStore((s) => s.exitBuilding);

  const nearbyBuilding = buildingsData.find((b) => b.id === nearbyBuildingId);
  const activeBuilding = buildingsData.find((b) => b.id === activeBuildingId);

  // If inside building or interior view
  if (cameraMode === 'interior' && activeBuilding) {
    return (
      <div className="fixed top-20 left-6 z-40 animate-in fade-in slide-in-from-top-4 duration-300">
        <button
          onClick={exitBuilding}
          className="group flex items-center gap-2.5 rounded-xl border border-cyan-500/40 bg-slate-950/85 px-4 py-2.5 text-sm font-semibold text-cyan-300 shadow-2xl backdrop-blur-md transition-all hover:border-cyan-400 hover:bg-cyan-950/80 hover:text-white hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Exit {activeBuilding.name}</span>
          <span className="ml-1.5 hidden rounded bg-cyan-950/90 px-2 py-0.5 text-[11px] font-mono text-cyan-400 border border-cyan-800 md:inline-block">
            ESC
          </span>
        </button>
      </div>
    );
  }

  // If near a building in city mode
  if (cameraMode === 'city' && nearbyBuilding) {
    return (
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => enterBuilding(nearbyBuilding.id)}
          className="group flex items-center gap-3.5 rounded-2xl border-2 px-6 py-3.5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            borderColor: nearbyBuilding.color,
            backgroundColor: 'rgba(10, 15, 30, 0.92)',
            boxShadow: `0 0 30px ${nearbyBuilding.color}66, inset 0 0 15px ${nearbyBuilding.glowColor}33`
          }}
        >
          {/* Keycap Badge */}
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl font-mono text-base font-black shadow-md transition-transform group-hover:scale-110"
            style={{
              backgroundColor: nearbyBuilding.color,
              color: '#030712'
            }}
          >
            E
          </span>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                Nearby Hub Detected
              </span>
              <span className="flex h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: nearbyBuilding.color }} />
            </div>
            <p className="text-base font-bold text-white drop-shadow">
              Enter {nearbyBuilding.name}
            </p>
          </div>

          <LogIn className="h-5 w-5 text-white/80 transition-transform group-hover:translate-x-1 ml-2" />
        </button>
      </div>
    );
  }

  return null;
}
