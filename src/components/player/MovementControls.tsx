'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

export function MovementControls() {
  const cameraMode = useGameStore((s) => s.cameraMode);
  const setJoystickVector = useGameStore((s) => s.setJoystickVector);
  const playerPosition = useGameStore((s) => s.playerPosition);
  const [activeDirection, setActiveDirection] = useState<string | null>(null);

  if (cameraMode !== 'city') return null;

  const handlePress = (direction: 'up' | 'down' | 'left' | 'right') => {
    setActiveDirection(direction);
    switch (direction) {
      case 'up':
        setJoystickVector({ x: 0, y: -1 });
        break;
      case 'down':
        setJoystickVector({ x: 0, y: 1 });
        break;
      case 'left':
        setJoystickVector({ x: -1, y: 0 });
        break;
      case 'right':
        setJoystickVector({ x: 1, y: 0 });
        break;
    }
  };

  const handleRelease = () => {
    setActiveDirection(null);
    setJoystickVector({ x: 0, y: 0 });
  };

  return (
    <div className="fixed bottom-6 left-6 z-30 flex flex-col items-center gap-2 select-none">
      {/* Virtual D-Pad for Mobile & Desktop Navigation */}
      <div className="relative h-32 w-32 rounded-full border border-cyan-500/30 bg-slate-950/75 p-2 backdrop-blur-xl shadow-2xl">
        {/* Up Button */}
        <button
          aria-label="Move Forward"
          onMouseDown={() => handlePress('up')}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={() => handlePress('up')}
          onTouchEnd={handleRelease}
          className={`absolute top-2 left-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
            activeDirection === 'up'
              ? 'bg-cyan-400 text-slate-950 scale-110 shadow-[0_0_15px_rgba(0,210,255,0.8)]'
              : 'bg-slate-900/90 text-cyan-300 hover:bg-slate-800'
          }`}
        >
          <ChevronUp className="h-5 w-5" />
        </button>

        {/* Down Button */}
        <button
          aria-label="Move Backward"
          onMouseDown={() => handlePress('down')}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={() => handlePress('down')}
          onTouchEnd={handleRelease}
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
            activeDirection === 'down'
              ? 'bg-cyan-400 text-slate-950 scale-110 shadow-[0_0_15px_rgba(0,210,255,0.8)]'
              : 'bg-slate-900/90 text-cyan-300 hover:bg-slate-800'
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </button>

        {/* Left Button */}
        <button
          aria-label="Move Left"
          onMouseDown={() => handlePress('left')}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={() => handlePress('left')}
          onTouchEnd={handleRelease}
          className={`absolute top-1/2 left-2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
            activeDirection === 'left'
              ? 'bg-cyan-400 text-slate-950 scale-110 shadow-[0_0_15px_rgba(0,210,255,0.8)]'
              : 'bg-slate-900/90 text-cyan-300 hover:bg-slate-800'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right Button */}
        <button
          aria-label="Move Right"
          onMouseDown={() => handlePress('right')}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={() => handlePress('right')}
          onTouchEnd={handleRelease}
          className={`absolute top-1/2 right-2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
            activeDirection === 'right'
              ? 'bg-cyan-400 text-slate-950 scale-110 shadow-[0_0_15px_rgba(0,210,255,0.8)]'
              : 'bg-slate-900/90 text-cyan-300 hover:bg-slate-800'
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Center Compass Rose Indicator */}
        <div className="absolute inset-0 m-auto flex h-8 w-8 items-center justify-center rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
          <Compass className="h-4 w-4 animate-spin-slow opacity-80" />
        </div>
      </div>

      {/* Keyboard Controls Guide Badge */}
      <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1 text-[10px] font-mono text-slate-400 backdrop-blur-md">
        <span className="text-cyan-400 font-bold">W A S D</span> / <span className="text-cyan-400 font-bold">Arrows</span> to explore
      </div>
    </div>
  );
}
