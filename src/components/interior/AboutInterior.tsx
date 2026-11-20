'use client';

import React, { useState } from 'react';
import { profileData } from '@/data/profile';
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  Target,
  FileDown,
  Mail,
  MapPin,
  ExternalLink,
  Phone,
  Sparkles
} from 'lucide-react';

export function AboutInterior() {
  const [activeTab, setActiveTab] = useState<'bio' | 'education' | 'journey' | 'achievements' | 'goals'>('bio');

  return (
    <div className="flex h-full max-h-[85vh] w-full max-w-5xl flex-col rounded-2xl border border-cyan-500/30 bg-slate-950/90 shadow-[0_0_50px_rgba(0,210,255,0.25)] backdrop-blur-2xl overflow-hidden text-slate-100">
      {/* 1. Header Banner & Identity */}
      <div className="relative border-b border-cyan-500/20 bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Profile Avatar / Hologram Container */}
            <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-cyan-400 bg-gradient-to-br from-cyan-600/30 to-blue-900/60 shadow-[0_0_20px_rgba(0,210,255,0.4)]">
              <User className="h-10 w-10 text-cyan-300" />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-slate-950 ring-2 ring-slate-950">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Profile Names & Titles */}
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 text-[11px] font-mono text-cyan-400">
                  {profileData.brand}
                </span>
                <span className="text-xs text-slate-400">• Founder & Specialist</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
                {profileData.name}
              </h2>
              <p className="text-sm font-medium text-cyan-300">
                {profileData.title}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                  {profileData.contact.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-cyan-400" />
                  {profileData.contact.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-cyan-400" />
                  {profileData.contact.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Download CV & Contact */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={profileData.cvUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:brightness-110 active:scale-95"
            >
              <FileDown className="h-4 w-4" />
              Download CV
            </a>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-800/80 pt-4 text-xs">
          {[
            { id: 'bio', label: 'About & Bio', icon: User },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'journey', label: 'Career Journey', icon: Briefcase },
            { id: 'achievements', label: 'Achievements', icon: Award },
            { id: 'goals', label: 'Career Goals', icon: Target },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,210,255,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
        {activeTab === 'bio' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-cyan-400" /> Professional Identity & Vision
              </h3>
              <p className="text-sm leading-relaxed text-slate-300 bg-slate-900/60 rounded-xl p-4 border border-slate-800">
                {profileData.identity}
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider mb-3">
                Background & Engineering Philosophy
              </h3>
              <div className="space-y-3">
                {profileData.bio.map((paragraph, i) => (
                  <p key={i} className="text-sm leading-relaxed text-slate-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-cyan-400" /> Academic Qualifications
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {profileData.education.map((edu, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-cyan-500/20 bg-slate-900/50 p-5 backdrop-blur-md hover:border-cyan-500/40 transition-colors"
                >
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                    {edu.period}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    {edu.institution}
                  </p>
                  {edu.details && (
                    <p className="text-xs text-slate-400 mt-3 leading-relaxed border-t border-slate-800 pt-3">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'journey' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-cyan-400" /> Career Milestones & History
            </h3>
            <div className="relative pl-6 border-l-2 border-cyan-500/30 space-y-8 ml-3">
              {profileData.journey.map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-cyan-400 bg-slate-950 shadow-[0_0_10px_rgba(0,210,255,0.8)] group-hover:scale-125 transition-transform" />
                  <span className="rounded bg-cyan-950/80 border border-cyan-800 px-2 py-0.5 text-[11px] font-mono text-cyan-300">
                    {item.year}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1.5">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="h-4 w-4 text-cyan-400" /> Key Personal & Technical Achievements
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {profileData.achievements.map((ach, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-cyan-500/30 hover:bg-slate-900/80"
                >
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {ach}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 text-cyan-400" /> Strategic Career Goals & Future Horizons
            </h3>
            <div className="space-y-3">
              {profileData.careerGoals.map((goal, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3.5 rounded-xl border border-slate-800/80 bg-slate-900/60 p-4"
                >
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-blue-500/20 text-xs font-mono font-bold text-blue-400">
                    0{i + 1}
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
