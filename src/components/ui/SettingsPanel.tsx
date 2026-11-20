'use client';

import React from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { GraphicsQuality } from '@/types';
import {
  Settings,
  X,
  Volume2,
  VolumeX,
  Sliders,
  Zap,
  Eye,
  Navigation,
  Compass,
  Monitor
} from 'lucide-react';

export function SettingsPanel() {
  const isSettingsOpen = useGameStore((s) => s.isSettingsOpen);
  const toggleSettings = useGameStore((s) => s.toggleSettings);
  const isAudioEnabled = useGameStore((s) => s.isAudioEnabled);
  const toggleAudio = useGameStore((s) => s.toggleAudio);
  const graphicsQuality = useGameStore((s) => s.graphicsQuality);
  const setGraphicsQuality = useGameStore((s) => s.setGraphicsQuality);
  const skipAnimations = useGameStore((s) => s.skipAnimations);
  const setSkipAnimations = useGameStore((s) => s.setSkipAnimations);
  const isMiniMapOpen = useGameStore((s) => s.isMiniMapOpen);
  const toggleMiniMap = useGameStore((s) => s.toggleMiniMap);

  if (!isSettingsOpen) return null;

  const qualityOptions: GraphicsQuality[] = ['low', 'medium', 'high', 'ultra'];

  return (
    <div
      onClick={toggleSettings}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl border border-cyan-500/40 bg-slate-950 p-6 shadow-[0_0_50px_rgba(0,210,255,0.25)] text-slate-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <Settings className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                World Preferences & Accessibility
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                System Configurations & Controls
              </p>
            </div>
          </div>

          <button
            onClick={toggleSettings}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="mt-5 space-y-5 text-xs">
          {/* 1. Audio Synth Ambient & SFX */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950 text-cyan-400">
                {isAudioEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </div>
              <div>
                <span className="font-semibold text-white">Synthesized Audio</span>
                <p className="text-[11px] text-slate-400">
                  Ambient city harmonics, building entrance chimes & UI audio
                </p>
              </div>
            </div>

            <button
              onClick={toggleAudio}
              className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                isAudioEnabled
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,210,255,0.5)]'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {isAudioEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>

          {/* 2. Graphics Rendering Quality */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Monitor className="h-4 w-4 text-cyan-400" />
                <span>Graphics Rendering Tier</span>
              </div>
              <span className="font-mono text-cyan-300 uppercase font-bold text-[11px]">
                {graphicsQuality}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Adjusts particle counts, shadow resolutions, and shader depth.
            </p>

            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {qualityOptions.map((q) => (
                <button
                  key={q}
                  onClick={() => setGraphicsQuality(q)}
                  className={`rounded-lg py-1.5 text-center font-mono capitalize transition-all ${
                    graphicsQuality === q
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,210,255,0.4)]'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Accessibility: Reduced Motion / Skip Animations */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-950 text-blue-400">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold text-white">Skip Camera Transitions</span>
                <p className="text-[11px] text-slate-400">
                  Instant camera jump (Reduced Motion accessibility)
                </p>
              </div>
            </div>

            <button
              onClick={() => setSkipAnimations(!skipAnimations)}
              className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                skipAnimations
                  ? 'bg-blue-500 text-slate-950 shadow-[0_0_12px_rgba(59,130,246,0.5)]'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {skipAnimations ? 'Active' : 'Off'}
            </button>
          </div>

          {/* 4. Mini-Map HUD Visibility */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-950 text-teal-400">
                <Navigation className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold text-white">GPS Radar Mini-Map</span>
                <p className="text-[11px] text-slate-400">
                  Show or hide on-screen tactical map HUD
                </p>
              </div>
            </div>

            <button
              onClick={toggleMiniMap}
              className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                isMiniMapOpen
                  ? 'bg-teal-500 text-slate-950 shadow-[0_0_12px_rgba(20,184,166,0.5)]'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {isMiniMapOpen ? 'Visible' : 'Hidden'}
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Reference Footer */}
        <div className="mt-5 border-t border-slate-800/80 pt-3 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2 font-mono">
          <span><b className="text-cyan-400">WASD</b>: Move</span>
          <span><b className="text-cyan-400">E</b>: Enter Hub</span>
          <span><b className="text-cyan-400">ESC</b>: Exit / Close</span>
          <span><b className="text-cyan-400">Mouse</b>: Orbit</span>
        </div>
      </div>
    </div>
  );
}
