'use client';

import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { buildingsData } from '@/data/buildings';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Pause,
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const tourDescriptions: Record<string, string> = {
  about:
    'Welcome to the About Me Tower. Discover Mohammad Hasan Parvez’s technical background, founding philosophy of H Tech Provision IT, academic qualifications, and career goals.',
  projects:
    'Here at the Project Showcase Expo, explore 10 enterprise platforms including institutional ERPs, multi-vendor marketplaces, hospital information systems, and pharmacy POS software.',
  skills:
    'Enter the Technology Center to explore mastery across PHP, Laravel architecture, modern React/Next.js frontends, MySQL database optimization, and cloud development tools.',
  experience:
    'Step into the Career Plaza to review Mohammad Hasan Parvez’s commercial engineering timeline, team leadership, and major software delivery achievements from 2020 to the present.',
  services:
    'The Enterprise Service Hub presents 10 commercial engineering solutions, from custom web application development and hospital ERPs to API integrations and business automations.',
  contact:
    'Welcome to Communication HQ. Ready to launch your next enterprise system or collaborate? Send a direct transmission, connect via WhatsApp, or reach out through social channels.'
};

export function GuidedTour() {
  const isTourActive = useGameStore((s) => s.isTourActive);
  const tourIndex = useGameStore((s) => s.tourIndex);
  const nextTourStop = useGameStore((s) => s.nextTourStop);
  const prevTourStop = useGameStore((s) => s.prevTourStop);
  const stopTour = useGameStore((s) => s.stopTour);
  const enterBuilding = useGameStore((s) => s.enterBuilding);

  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(12);

  const currentBuilding = buildingsData[tourIndex];
  const tourDescription = currentBuilding ? tourDescriptions[currentBuilding.id] : '';

  // Auto-advance timer
  useEffect(() => {
    if (!isTourActive || !isAutoPlay) return;

    setSecondsLeft(12);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          nextTourStop();
          return 12;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTourActive, isAutoPlay, tourIndex, nextTourStop]);

  if (!isTourActive || !currentBuilding) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 select-none animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div
        className="relative flex flex-col rounded-2xl border-2 p-5 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        style={{
          borderColor: currentBuilding.color,
          backgroundColor: 'rgba(10, 15, 30, 0.95)',
          boxShadow: `0 0 35px ${currentBuilding.color}55, inset 0 0 20px ${currentBuilding.glowColor}22`
        }}
      >
        {/* Progress Bar Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-0.5 text-xs font-mono font-bold"
              style={{
                backgroundColor: `${currentBuilding.color}25`,
                color: currentBuilding.color,
                borderColor: `${currentBuilding.color}50`
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Stop {tourIndex + 1} of {buildingsData.length}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Guided City Tour
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto-play Timer Pill */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-[11px] font-mono text-slate-300 hover:text-white"
            >
              {isAutoPlay ? (
                <>
                  <Pause className="h-3 w-3" />
                  <span>{secondsLeft}s</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 fill-current" />
                  <span>Paused</span>
                </>
              )}
            </button>

            {/* Exit Tour Button */}
            <button
              onClick={stopTour}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:bg-rose-950 hover:text-rose-300 hover:border-rose-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Building Title & Narration */}
        <div className="mt-3">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            {currentBuilding.name}
            <span className="text-xs font-normal text-slate-400 font-mono">
              • {currentBuilding.tagline}
            </span>
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
            {tourDescription}
          </p>
        </div>

        {/* Tour Navigation Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={prevTourStop}
              className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={nextTourStop}
              className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all active:scale-95"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => enterBuilding(currentBuilding.id)}
              className="flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold text-slate-950 shadow-lg transition-all hover:brightness-110 active:scale-95"
              style={{
                backgroundColor: currentBuilding.color
              }}
            >
              <span>Inspect Building Interior</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={stopTour}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white"
            >
              Exit Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
