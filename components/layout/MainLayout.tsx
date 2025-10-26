'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import AppBar from './AppBar';
import { cn } from '@/lib/utils';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  // Sidebar collapse state lifted here so AppBar and main content can size accordingly
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarLeft = isCollapsed ? 48 : 256; // px (w-12 when collapsed, w-64 when expanded)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071226] via-[#071a2a] to-[#071226] text-white">
      {/* App bar with centered title; offset by sidebar width */}
      <AppBar isCollapsed={isCollapsed} />

      {/* Sidebar (fixed, highest z) */}
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(prev => !prev)} />

      {/* Main Content (pad top for app bar and offset left by sidebar width) */}
      <main
        className={cn('transition-all duration-300 min-h-screen pt-14 p-8')}
        style={{ marginLeft: sidebarLeft }}
      >
        <div className="max-w-6xl mx-auto pt-10">{children}</div>
      </main>
    </div>
  );
}
