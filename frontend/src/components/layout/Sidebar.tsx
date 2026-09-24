"use client";

import Link from "next/link";

import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  Settings,
  FileText,
  Satellite,
  ChevronLeft,
  Plus,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Analyses",
    icon: BarChart3,
  },
  {
    label: "Projects",
    icon: FolderKanban,
  },
  {
    label: "Reports",
    icon: FileText,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] border-r border-white/[0.07] bg-[#07090d] lg:flex lg:flex-col">
      {/* Brand */}
      <div className="flex h-[72px] items-center border-b border-white/[0.07] px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08]">
            <Satellite className="h-5 w-5 text-cyan-300" />
          </div>

          <div>
            <div className="text-[15px] font-semibold tracking-[0.18em] text-white">
              ORBIT<span className="text-cyan-300">X</span>AI
            </div>
            <div className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-white/35">
              Earth Intelligence
            </div>
          </div>
        </div>
      </div>

      {/* New Analysis */}
      <div className="px-4 pt-5">
        <Link
  href="/analysis"
  className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] px-4 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.13]"
>
  <Plus className="h-4 w-4" />
  New Analysis
</Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-7">
        <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
          Workspace
        </div>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  item.active
                    ? "bg-white/[0.07] text-white"
                    : "text-white/45 hover:bg-white/[0.04] hover:text-white/80"
                }`}
              >
                <Icon
                  className={`h-[17px] w-[17px] ${
                    item.active
                      ? "text-cyan-300"
                      : "text-white/35 group-hover:text-white/60"
                  }`}
                />

                <span>{item.label}</span>

                {item.active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-300" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
          System
        </div>

        <button className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/45 transition hover:bg-white/[0.04] hover:text-white/80">
          <Settings className="h-[17px] w-[17px] text-white/35 group-hover:text-white/60" />
          Settings
        </button>
      </nav>

      {/* System status */}
      <div className="border-t border-white/[0.07] p-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-white/70">
              System Online
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-white/30">
            <span>AI Engine</span>
            <span className="text-emerald-300/70">Ready</span>
          </div>
        </div>
      </div>

      <button className="absolute right-[-12px] top-[30px] flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0c1016] text-white/40 hover:text-white">
        <ChevronLeft className="h-3 w-3" />
      </button>
    </aside>
  );
}