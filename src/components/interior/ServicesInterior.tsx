'use client';

import React from 'react';
import { servicesData } from '@/data/services';
import { ServiceItem } from '@/types';
import { useGameStore } from '@/stores/useGameStore';
import {
  Layers,
  CheckCircle2,
  Send,
  Globe,
  ShoppingCart,
  GraduationCap,
  Building2,
  Home,
  Activity,
  CheckSquare,
  Cpu,
  Zap,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Layers,
  Globe,
  ShoppingCart,
  GraduationCap,
  Building2,
  Home,
  Activity,
  CheckSquare,
  Cpu,
  Zap
};

export function ServicesInterior() {
  const enterBuilding = useGameStore((s) => s.enterBuilding);

  const handleInquire = (serviceTitle: string) => {
    // Navigate directly into the Contact Center Hub
    enterBuilding('contact');
  };

  return (
    <div className="flex h-full max-h-[85vh] w-full max-w-6xl flex-col rounded-2xl border border-pink-500/30 bg-slate-950/90 shadow-[0_0_50px_rgba(248,87,166,0.25)] backdrop-blur-2xl overflow-hidden text-slate-100">
      {/* 1. Header */}
      <div className="border-b border-pink-500/20 bg-gradient-to-r from-slate-950 via-rose-950/30 to-slate-950 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-pink-400 text-xs font-mono uppercase tracking-wider font-semibold">
              <Layers className="h-4 w-4" />
              <span>Commercial Software Engineering & Consulting</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              Enterprise Service Hub
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Bespoke digital engineering services, institutional ERPs, high-traffic web apps, and business automations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-pink-300 bg-pink-950/60 border border-pink-500/30 px-3.5 py-1.5 rounded-lg w-fit">
            10 Specialized Offerings
          </div>
        </div>
      </div>

      {/* 2. Services Grid */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {servicesData.map((service: ServiceItem) => {
            const IconComponent = iconMap[service.icon] || Layers;
            return (
              <div
                key={service.id}
                className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-pink-500/50 hover:bg-slate-900/90 hover:shadow-[0_0_30px_rgba(248,87,166,0.15)]"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-950/80 border border-pink-500/40 text-pink-400 shadow-inner group-hover:scale-105 transition-transform">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                        {service.title}
                      </h3>
                      <span className="text-[10px] font-mono text-pink-400/80 uppercase tracking-wider">
                        Tailored Architecture
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-slate-300">
                    {service.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-3">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="h-3.5 w-3.5 text-pink-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry Action Button */}
                <div className="mt-6 border-t border-slate-800/80 pt-4">
                  <button
                    onClick={() => handleInquire(service.title)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/25 transition-all hover:brightness-110 active:scale-95"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
