'use client';

import React, { useState } from 'react';
import { projectsData, projectCategories } from '@/data/projects';
import { useGameStore } from '@/stores/useGameStore';
import { Project } from '@/types';
import {
  FolderGit2,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
  Search,
  ArrowRight
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

export function ProjectsInterior() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const openProjectModal = useGameStore((s) => s.openProjectModal);

  const filteredProjects = projectsData.filter((project: Project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-full max-h-[85vh] w-full max-w-6xl flex-col rounded-2xl border border-pink-500/30 bg-slate-950/90 shadow-[0_0_50px_rgba(255,0,128,0.25)] backdrop-blur-2xl overflow-hidden text-slate-100">
      {/* 1. Header with Category Filters & Search */}
      <div className="border-b border-pink-500/20 bg-gradient-to-r from-slate-950 via-purple-950/30 to-slate-950 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-pink-400 text-xs font-mono uppercase tracking-wider font-semibold">
              <FolderGit2 className="h-4 w-4" />
              <span>Enterprise Software Portfolio</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              Project Showcase Expo
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Explore institutional ERPs, multi-vendor marketplaces, healthcare platforms, and business automations.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by title or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/90 pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(255,0,128,0.4)] font-bold'
                  : 'bg-slate-900/70 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Grid of Interactive Project Cards */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-slate-400">
            <Layers className="h-10 w-10 text-slate-600 mb-3" />
            <p className="text-sm font-semibold">No matching systems found.</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for &quot;Laravel&quot;, &quot;ERP&quot;, &quot;MySQL&quot;, or &quot;API&quot;.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {filteredProjects.map((project: Project) => (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:border-pink-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_30px_rgba(255,0,128,0.15)]"
              >
                <div>
                  {/* Top Badge & Category */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded bg-pink-950/80 border border-pink-500/40 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-pink-300">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded-full">
                        <Sparkles className="h-3 w-3" /> Featured ERP
                      </span>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg font-bold text-white mt-2 group-hover:text-pink-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-slate-950 px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Key Features Preview */}
                  <div className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-3">
                    {project.mainFeatures.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="h-3.5 w-3.5 text-pink-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-4">
                  <button
                    onClick={() => openProjectModal(project)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-pink-500/20 border border-pink-500/40 px-3 py-2 text-xs font-bold text-pink-300 transition-all hover:bg-pink-500 hover:text-white"
                  >
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
                      Demo
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
                    >
                      <GithubIcon className="h-3.5 w-3.5 text-purple-400" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
