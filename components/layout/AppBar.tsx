'use client';

import { Bell, ChevronDown } from 'lucide-react';

type AppBarProps = {
  isCollapsed: boolean;
};

export default function AppBar({ isCollapsed }: AppBarProps) {
  // sidebar widths are 48px (w-12) when collapsed and 256px (w-64) when expanded
  const leftOffset = isCollapsed ? 48 : 256;

  return (
    <header
      className="fixed top-0 z-40 flex h-14 items-center justify-between bg-[#0f2b4a]/95 px-4 shadow-sm"
      style={{ left: leftOffset, right: 0 }}
    >
      {/* left: app logo/name */}
      <div className="flex items-center gap-3 text-white">
        <span className="hidden font-semibold sm:inline">Sistem Platform Analisis Penelusuran Aset</span>
      </div>

      {/* right: notifications + user */}
      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="rounded-md p-2 text-white/90 hover:bg-white/5"
        >
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-2 rounded-md bg-white/6 px-3 py-1 text-white">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-xs font-medium">
            BI
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-xs font-medium">Budi Investigator</span>
            <span className="text-[11px] text-white/70">Admin</span>
          </div>
          <ChevronDown size={14} className="text-white/70" />
        </div>
      </div>
    </header>
  );
}
