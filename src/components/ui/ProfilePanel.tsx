'use client';

import React from 'react';
import { useGameStore } from '@/stores/useGameStore';
import { profileData } from '@/data/profile';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  FileDown,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon
} from '@/components/ui/SocialIcons';

export function ProfilePanel() {
  const isProfilePanelOpen = useGameStore((s) => s.isProfilePanelOpen);
  const toggleProfilePanel = useGameStore((s) => s.toggleProfilePanel);
  const enterBuilding = useGameStore((s) => s.enterBuilding);

  if (!isProfilePanelOpen) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4 select-none animate-in fade-in slide-in-from-bottom-8 duration-300">
      <div className="relative rounded-2xl border border-cyan-500/40 bg-slate-950/95 p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.85)] text-slate-100">
        {/* Collapse Button Header */}
        <button
          onClick={toggleProfilePanel}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ChevronDown className="h-4 w-4" />
        </button>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pr-8">
          {/* Avatar & Main Identity */}
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-cyan-400 bg-gradient-to-br from-cyan-600/30 to-blue-900/60 shadow-[0_0_20px_rgba(0,210,255,0.4)]">
              <User className="h-8 w-8 text-cyan-300" />
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-slate-950 ring-2 ring-slate-950">
                <Sparkles className="h-3 w-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.2 text-[10px] font-mono text-cyan-400">
                  {profileData.brand}
                </span>
                <span className="text-xs text-slate-400 font-mono">• Founder</span>
              </div>
              <h2 className="text-xl font-black text-white mt-0.5">
                {profileData.name}
              </h2>
              <p className="text-xs font-semibold text-cyan-300">
                {profileData.title}
              </p>
            </div>
          </div>

          {/* Social Channels & Contact */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5 text-purple-400" />
              <span>GitHub</span>
            </a>

            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
            >
              <LinkedinIcon className="h-3.5 w-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href={profileData.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
            >
              <FacebookIcon className="h-3.5 w-3.5 text-blue-500" />
              <span>Facebook</span>
            </a>

            <a
              href={profileData.cvUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 font-bold text-slate-950 shadow-md hover:brightness-110 transition-all"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Bottom Strip: Primary Technologies & Contact Info */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-4 text-xs">
          {/* Main Technologies */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400 mr-1">Stack:</span>
            {['PHP', 'Laravel', 'MySQL', 'Next.js', 'React', 'Tailwind CSS', 'REST API'].map((t) => (
              <span
                key={t}
                className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Quick Contact & Inquiry Button */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-cyan-400" />
              {profileData.contact.email}
            </span>
            <button
              onClick={() => {
                toggleProfilePanel();
                enterBuilding('contact');
              }}
              className="rounded-lg bg-teal-500/20 border border-teal-500/40 px-3 py-1 text-xs font-bold text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition-colors"
            >
              Contact Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
