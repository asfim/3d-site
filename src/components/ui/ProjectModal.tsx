'use client';

import React from 'react';
import { useGameStore } from '@/stores/useGameStore';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
  Code2
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

export function ProjectModal() {
  const isProjectModalOpen = useGameStore((s) => s.isProjectModalOpen);
  const selectedProject = useGameStore((s) => s.selectedProject);
  const closeProjectModal = useGameStore((s) => s.closeProjectModal);

  if (!isProjectModalOpen || !selectedProject) return null;

  return (
    <div
      onClick={closeProjectModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-pink-500/40 bg-slate-950 p-6 md:p-8 shadow-[0_0_60px_rgba(255,0,128,0.3)] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={closeProjectModal}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:bg-pink-950 hover:border-pink-500 hover:text-white transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="pr-12">
          <div className="flex items-center gap-2">
            <span className="rounded bg-pink-950/80 border border-pink-500/40 px-2.5 py-0.5 text-xs font-mono font-semibold text-pink-300">
              {selectedProject.category}
            </span>
            {selectedProject.featured && (
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-950/50 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                <Sparkles className="h-3 w-3" /> Featured Production ERP
              </span>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
            {selectedProject.title}
          </h2>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto mt-6 space-y-6 pr-1">
          {/* Detailed Overview */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold mb-2 flex items-center gap-1.5">
              <Layers className="h-4 w-4" /> Comprehensive System Architecture
            </h3>
            <p className="text-sm leading-relaxed text-slate-200 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              {selectedProject.fullDescription}
            </p>
          </div>

          {/* Core Technical Specifications & Stack */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold mb-2.5 flex items-center gap-1.5">
              <Code2 className="h-4 w-4" /> Technologies & Frameworks Utilized
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-slate-900 border border-pink-500/30 px-3 py-1 text-xs font-mono font-medium text-pink-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Engineering Features */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold mb-3">
              Key Features & Enterprise Capabilities
            </h3>
            <div className="space-y-2">
              {selectedProject.mainFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-900/40 p-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-pink-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed text-slate-300">
                    {feat}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <div className="text-xs text-slate-400 font-mono">
            ID: {selectedProject.id}
          </div>

          <div className="flex items-center gap-3">
            {selectedProject.liveDemoUrl && (
              <a
                href={selectedProject.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/30 transition-all hover:brightness-110 active:scale-95"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}

            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition-all"
              >
                <GithubIcon className="h-4 w-4 text-purple-400" />
                Repository
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
