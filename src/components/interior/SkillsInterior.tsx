'use client';

import React, { useState } from 'react';
import { skillsData } from '@/data/skills';
import { SkillItem } from '@/types';
import {
  Cpu,
  Server,
  Layout,
  Database,
  Wrench,
  Search,
  BarChart3,
  Sparkles
} from 'lucide-react';

export function SkillsInterior() {
  const [selectedCategory, setSelectedCategory] = useState<
    'All' | 'Backend' | 'Frontend' | 'Database' | 'Tools'
  >('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'All', label: 'All Stack', icon: Cpu },
    { id: 'Backend', label: 'Backend Architecture', icon: Server },
    { id: 'Frontend', label: 'Frontend Engineering', icon: Layout },
    { id: 'Database', label: 'Databases & Schemas', icon: Database },
    { id: 'Tools', label: 'DevOps & Tooling', icon: Wrench },
  ];

  const filteredSkills = skillsData.filter((skill: SkillItem) => {
    const matchesCategory =
      selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesQuery =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.description &&
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const getMasteryBadge = (level: number) => {
    if (level >= 93) return { text: 'Expert Architect', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40' };
    if (level >= 90) return { text: 'Senior Specialist', color: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40' };
    return { text: 'Advanced Mastery', color: 'text-blue-400 bg-blue-950/60 border-blue-500/40' };
  };

  return (
    <div className="flex h-full max-h-[85vh] w-full max-w-5xl flex-col rounded-2xl border border-cyan-500/30 bg-slate-950/90 shadow-[0_0_50px_rgba(0,242,254,0.25)] backdrop-blur-2xl overflow-hidden text-slate-100">
      {/* 1. Header */}
      <div className="border-b border-cyan-500/20 bg-gradient-to-r from-slate-950 via-cyan-950/30 to-slate-950 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider font-semibold">
              <Cpu className="h-4 w-4" />
              <span>Technical Capabilities & Mastery</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              Technology Center
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Core technologies powering enterprise backends, reactive frontends, relational databases, and agile workflows.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/90 pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.5)]'
                    : 'bg-slate-900/70 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Skills Showcase Grid */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          {filteredSkills.map((skill: SkillItem) => {
            const badge = getMasteryBadge(skill.level);
            // Circle progress calculation (radius = 18, circumference = 2 * PI * 18 ~ 113.1)
            const radius = 18;
            const circ = 2 * Math.PI * radius;
            const strokeDashoffset = circ - (skill.level / 100) * circ;

            return (
              <div
                key={skill.name}
                className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_20px_rgba(0,242,254,0.15)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-bold font-mono text-sm shadow-inner group-hover:scale-105 transition-transform">
                      {skill.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </h3>
                        <span
                          className={`rounded px-1.5 py-0.2 text-[9px] font-mono border font-semibold ${badge.color}`}
                        >
                          {badge.text}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400/80">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  {/* Circular Indicator */}
                  <div className="relative flex items-center justify-center">
                    <svg className="h-12 w-12 -rotate-90 transform" viewBox="0 0 44 44">
                      <circle
                        cx="22"
                        cy="22"
                        r={radius}
                        className="stroke-slate-800"
                        strokeWidth="3.5"
                        fill="transparent"
                      />
                      <circle
                        cx="22"
                        cy="22"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="3.5"
                        fill="transparent"
                        strokeDasharray={circ}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="text-cyan-400 transition-all duration-1000"
                      />
                    </svg>
                    <span className="absolute text-[11px] font-mono font-bold text-white">
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Animated Horizontal Progress Bar */}
                <div className="mt-4">
                  <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(0,210,255,0.7)] transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                {/* Description */}
                {skill.description && (
                  <p className="mt-3 text-xs leading-relaxed text-slate-300 border-t border-slate-800/80 pt-2.5">
                    {skill.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
