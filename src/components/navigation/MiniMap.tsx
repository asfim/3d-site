'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { buildingsData } from '@/data/buildings';
import { BuildingId } from '@/types';
import {
  Compass,
  MapPin,
  Play,
  RotateCcw,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  X,
  Navigation
} from 'lucide-react';

export function MiniMap() {
  const isMiniMapOpen = useGameStore((s) => s.isMiniMapOpen);
  const toggleMiniMap = useGameStore((s) => s.toggleMiniMap);
  const playerPosition = useGameStore((s) => s.playerPosition);
  const activeBuilding = useGameStore((s) => s.activeBuilding);
  const enterBuilding = useGameStore((s) => s.enterBuilding);
  const exitBuilding = useGameStore((s) => s.exitBuilding);
  const startTour = useGameStore((s) => s.startTour);

  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  if (!isMiniMapOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={toggleMiniMap}
          className="flex items-center gap-2 rounded-2xl border border-cyan-500/40 bg-slate-950/85 px-4 py-2.5 text-xs font-bold text-cyan-300 backdrop-blur-xl shadow-2xl hover:bg-cyan-950 hover:text-white hover:border-cyan-400 transition-all active:scale-95"
        >
          <MapPin className="h-4 w-4" />
          <span>Open Mini-Map</span>
        </button>
      </div>
    );
  }

  // Map 3D coordinates [-34, 34] to SVG [10, 190] inside a 200x200 viewBox
  const mapScale = (val: number) => 100 + (val / 34) * 80;

  const playerX = mapScale(playerPosition[0]);
  const playerY = mapScale(playerPosition[2]);

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2 select-none animate-in fade-in zoom-in-95 duration-200">
      {/* Radar Map Frame */}
      <div className="relative h-56 w-56 rounded-2xl border border-cyan-500/40 bg-slate-950/90 p-2.5 backdrop-blur-2xl shadow-[0_0_35px_rgba(0,210,255,0.25)] overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 px-1 text-[11px] font-mono text-cyan-300">
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold tracking-wider">TACTICAL GPS</span>
          </div>
          <button
            onClick={toggleMiniMap}
            className="text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Tactical SVG Map Layer */}
        <div className="relative h-40 w-full mt-1 flex items-center justify-center">
          <svg className="h-full w-full" viewBox="0 0 200 200">
            {/* Outer Water Boundary */}
            <circle
              cx="100"
              cy="100"
              r="84"
              className="fill-slate-950 stroke-cyan-500/20"
              strokeWidth="1.5"
            />

            {/* Island Outer Rim */}
            <circle
              cx="100"
              cy="100"
              r="78"
              className="fill-slate-900/60 stroke-cyan-500/40"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />

            {/* Circular Radar Sweep Grid */}
            <circle cx="100" cy="100" r="50" className="stroke-cyan-500/15" fill="none" />
            <circle cx="100" cy="100" r="22" className="stroke-cyan-500/25" fill="none" />

            {/* Highway Crosshairs */}
            <line x1="20" y1="100" x2="180" y2="100" className="stroke-cyan-500/20" strokeWidth="1" />
            <line x1="100" y1="20" x2="100" y2="180" className="stroke-cyan-500/20" strokeWidth="1" />

            {/* 6 Interactive Building Pins */}
            {buildingsData.map((b) => {
              const bx = mapScale(b.position[0]);
              const by = mapScale(b.position[2]);
              const isSelected = activeBuilding === b.id;
              const isHovered = hoveredBuilding === b.id;

              return (
                <g
                  key={b.id}
                  onClick={() => enterBuilding(b.id)}
                  onMouseEnter={() => setHoveredBuilding(b.id)}
                  onMouseLeave={() => setHoveredBuilding(null)}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Ring if Active */}
                  {isSelected && (
                    <circle
                      cx={bx}
                      cy={by}
                      r="9"
                      fill="none"
                      stroke={b.color}
                      strokeWidth="1.5"
                      className="animate-ping"
                    />
                  )}
                  {/* Pin Background */}
                  <circle
                    cx={bx}
                    cy={by}
                    r={isHovered || isSelected ? '7' : '5'}
                    fill={b.color}
                    className="transition-all duration-200"
                  />
                  {/* Inner Node */}
                  <circle cx={bx} cy={by} r="2" fill="#030712" />
                </g>
              );
            })}

            {/* Real-time Player Drone Position */}
            <g transform={`translate(${playerX}, ${playerY})`}>
              <circle
                r="7"
                fill="none"
                stroke="#00f2fe"
                strokeWidth="1.5"
                className="animate-pulse"
              />
              <circle r="3" fill="#00f2fe" />
            </g>
          </svg>

          {/* Active Building Tooltip Label */}
          {hoveredBuilding && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded bg-slate-950/95 border border-cyan-500/40 px-2 py-0.5 text-[10px] font-mono text-cyan-300 pointer-events-none whitespace-nowrap shadow-xl">
              {buildingsData.find((b) => b.id === hoveredBuilding)?.name}
            </div>
          )}
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] text-slate-300 font-medium">
          <button
            onClick={exitBuilding}
            title="Return to City Overview"
            className="flex items-center gap-1 rounded-lg bg-slate-900 px-2 py-1 hover:bg-cyan-950 hover:text-cyan-300 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset View</span>
          </button>

          <button
            onClick={startTour}
            title="Start Guided Tour"
            className="flex items-center gap-1 rounded-lg bg-amber-500/20 border border-amber-500/40 px-2 py-1 text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all font-bold"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>Tour</span>
          </button>
        </div>
      </div>
    </div>
  );
}
