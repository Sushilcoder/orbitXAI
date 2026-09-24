import { Bell, Search, UserRound } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[0.07] bg-[#07090d]/90 px-6 backdrop-blur-xl lg:ml-[248px]">
      <div>
        <div className="text-xs text-white/30">Workspace / Overview</div>
        <div className="mt-1 text-sm font-medium text-white/80">
          Mission Control
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden h-9 w-[230px] items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 md:flex">
          <Search className="h-4 w-4 text-white/25" />

          <input
            type="text"
            placeholder="Search analyses..."
            className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/25"
          />

          <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[9px] text-white/25">
            ⌘K
          </kbd>
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] text-white/45 hover:text-white">
          <Bell className="h-4 w-4" />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
        </button>

        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] text-white/50 hover:text-white">
          <UserRound className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}