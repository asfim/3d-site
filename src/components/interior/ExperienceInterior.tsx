'use client';

import React from 'react';
import { experienceData } from '@/data/experience';
import { ExperienceItem } from '@/types';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Building2,
  Award
} from 'lucide-react';

export function ExperienceInterior() {
  return (
    <div className="flex h-full max-h-[85vh] w-full max-w-5xl flex-col rounded-2xl border border-emerald-500/30 bg-slate-950/90 shadow-[0_0_50px_rgba(56,239,125,0.25)] backdrop-blur-2xl overflow-hidden text-slate-100">
      {/* 1. Header */}
      <div className="border-b border-emerald-500/20 bg-gradient-to-r from-slate-950 via-emerald-950/30 to-slate-950 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider font-semibold">
              <Briefcase className="h-4 w-4" />
              <span>Career Trajectory & Engineering Experience</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              Career & Experience Plaza
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Documenting commercial software engineering roles, foundational milestones, and founder leadership.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-lg w-fit">
            <Building2 className="h-4 w-4 text-emerald-400" />
            35+ Production Deployments
          </div>
        </div>
      </div>

      {/* 2. Interactive Timeline Body */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
        <div className="relative border-l-2 border-emerald-500/30 pl-6 md:pl-8 space-y-8 ml-2">
          {experienceData.map((item: ExperienceItem, idx: number) => (
            <div key={item.id} className="relative group">
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[33px] md:-left-[41px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-emerald-400 bg-slate-950 shadow-[0_0_15px_rgba(56,239,125,0.8)] group-hover:scale-125 transition-transform">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>

              {/* Timeline Card Container */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_30px_rgba(56,239,125,0.15)]">
                {/* Header: Period & Company */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 text-xs font-mono font-bold text-emerald-300">
                      <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                      {item.period}
                    </span>
                    {idx === 0 && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded-full">
                        <Sparkles className="h-3 w-3" /> Current Role
                      </span>
                    )}
                  </div>

                  {item.location && (
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                      {item.location}
                    </span>
                  )}
                </div>

                {/* Job Title & Company */}
                <h3 className="text-xl font-bold text-white mt-3 group-hover:text-emerald-300 transition-colors">
                  {item.role}
                </h3>
                <h4 className="text-sm font-semibold text-cyan-300 mt-0.5">
                  {item.company}
                </h4>

                {/* Core Responsibilities */}
                <div className="mt-4 space-y-2">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                    Key Responsibilities:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                    {item.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Achievements */}
                {item.achievements.length > 0 && (
                  <div className="mt-4 border-t border-slate-800/80 pt-3">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5 mb-2">
                      <Award className="h-3.5 w-3.5" /> Notable Achievements:
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {item.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Stack Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-800/80 pt-3">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-slate-950 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
