'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { buildingsData } from '@/data/buildings';
import { profileData } from '@/data/profile';
import { BuildingId } from '@/types';
import {
  Compass,
  MapPin,
  Play,
  Volume2,
  VolumeX,
  Menu,
  X,
  User,
  FolderGit2,
  Cpu,
  Briefcase,
  Layers,
  Send,
  Home,
  ShieldAlert,
  PanelBottom
} from 'lucide-react';

const navIcons: Record<string, any> = {
  about: User,
  projects: FolderGit2,
  skills: Cpu,
  experience: Briefcase,
  services: Layers,
  contact: Send
};

export function TopNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const activeBuilding = useGameStore((s) => s.activeBuilding);
  const enterBuilding = useGameStore((s) => s.enterBuilding);
  const exitBuilding = useGameStore((s) => s.exitBuilding);
  const isTourActive = useGameStore((s) => s.isTourActive);
  const startTour = useGameStore((s) => s.startTour);
  const stopTour = useGameStore((s) => s.stopTour);
  const isAudioEnabled = useGameStore((s) => s.isAudioEnabled);
  const toggleAudio = useGameStore((s) => s.toggleAudio);
  const isMiniMapOpen = useGameStore((s) => s.isMiniMapOpen);
  const toggleMiniMap = useGameStore((s) => s.toggleMiniMap);
  const isProfilePanelOpen = useGameStore((s) => s.isProfilePanelOpen);
  const toggleProfilePanel = useGameStore((s) => s.toggleProfilePanel);

  const handleNavClick = (id: BuildingId | 'home') => {
    setMobileMenuOpen(false);
    if (id === 'home') {
      if (isTourActive) stopTour();
      exitBuilding();
    } else {
      enterBuilding(id);
    }
  };

  return (
    <header className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between gap-4 pointer-events-none select-none">
      {/* Brand & Identity Logo Card */}
      <div
        onClick={() => handleNavClick('home')}
        className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-slate-950/85 px-4 py-2.5 backdrop-blur-xl shadow-2xl cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,210,255,0.3)] transition-all group"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 shadow-md font-black text-sm">
          HT
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-black tracking-wide text-white group-hover:text-cyan-300 transition-colors">
              {profileData.name}
            </h1>
            <span className="hidden sm:inline-block rounded bg-cyan-950 px-1.5 py-0.2 text-[10px] font-mono text-cyan-400 border border-cyan-800">
              3D City
            </span>
          </div>
          <p className="text-[11px] text-cyan-400/80 font-mono">
            {profileData.brand} • {profileData.title.split('|')[0]}
          </p>
        </div>
      </div>

      {/* Center Floating Desktop Nav Menu */}
      <nav className="pointer-events-auto hidden xl:flex items-center gap-1 rounded-2xl border border-cyan-500/25 bg-slate-950/80 px-2 py-1.5 backdrop-blur-xl shadow-2xl">
        {/* City Overview Home Link */}
        <button
          onClick={() => handleNavClick('home')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
            !activeBuilding && !isTourActive
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,210,255,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Home className="h-3.5 w-3.5" />
          <span>City Island</span>
        </button>

        {/* 6 Building Jump Links */}
        {buildingsData.map((b) => {
          const Icon = navIcons[b.id] || Compass;
          const isActive = activeBuilding === b.id;
          return (
            <button
              key={b.id}
              onClick={() => handleNavClick(b.id)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'text-white border shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
              style={{
                backgroundColor: isActive ? `${b.color}33` : undefined,
                borderColor: isActive ? b.color : undefined,
                boxShadow: isActive ? `0 0 15px ${b.color}55` : undefined
              }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: isActive ? b.color : undefined }} />
              <span>{b.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Guided Tour, Sound, Minimap Toggle, Profile Drawer */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Guided Tour Launcher Button */}
        <button
          onClick={() => {
            if (isTourActive) stopTour();
            else startTour();
          }}
          className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all backdrop-blur-md shadow-xl ${
            isTourActive
              ? 'bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse'
              : 'border border-amber-500/40 bg-slate-950/85 text-amber-300 hover:bg-amber-950/60 hover:text-white'
          }`}
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span className="hidden sm:inline">
            {isTourActive ? 'Stop Tour' : 'Guided Tour'}
          </span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={toggleAudio}
          aria-label="Toggle Audio"
          className={`flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-md transition-all shadow-xl ${
            isAudioEnabled
              ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.4)]'
              : 'border-slate-800 bg-slate-950/85 text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          {isAudioEnabled ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </button>

        {/* Profile Info Drawer Toggle */}
        <button
          onClick={toggleProfilePanel}
          title="Toggle Quick Profile Dock"
          className={`flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-md transition-all shadow-xl ${
            isProfilePanelOpen
              ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300'
              : 'border-slate-800 bg-slate-950/85 text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <PanelBottom className="h-4 w-4" />
        </button>

        {/* MiniMap Toggle Button */}
        <button
          onClick={toggleMiniMap}
          title="Toggle Mini-map"
          className={`flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-md transition-all shadow-xl ${
            isMiniMapOpen
              ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300'
              : 'border-slate-800 bg-slate-950/85 text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <MapPin className="h-4 w-4" />
        </button>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex xl:hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/85 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-16 left-0 right-0 z-50 rounded-2xl border border-cyan-500/30 bg-slate-950/95 p-4 backdrop-blur-2xl shadow-2xl xl:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 rounded-xl bg-slate-900 p-3 text-slate-200 hover:bg-cyan-950 hover:text-cyan-300"
            >
              <Home className="h-4 w-4 text-cyan-400" />
              <span>City Island</span>
            </button>
            {buildingsData.map((b) => {
              const Icon = navIcons[b.id] || Compass;
              return (
                <button
                  key={b.id}
                  onClick={() => handleNavClick(b.id)}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 p-3 text-slate-200 hover:bg-slate-800 hover:text-white"
                >
                  <Icon className="h-4 w-4" style={{ color: b.color }} />
                  <span>{b.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
