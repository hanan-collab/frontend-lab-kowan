'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  FolderClosed,
  Database,
  FileText,
  Settings,
  Users,
  Search,
  Globe,
  Network,
  FileSpreadsheet,
  Bot,
  Clock,
  BarChart2,
  GanttChart,
  ScrollText,
  FileStack,
  UserCog,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { MENU_ITEMS } from '@/config/menu';
import * as Icons from 'lucide-react';

// Convert menu items from config to sidebar format
const convertMenuItem = (item: typeof MENU_ITEMS[0]): MenuItem => {
  const IconComponent = Icons[item.icon as keyof typeof Icons];
  return {
    title: item.title,
    icon: IconComponent,
    href: item.path,
    ...(item.children && {
      submenu: item.children.map(child => ({
        title: child.title,
        icon: Icons[child.icon as keyof typeof Icons],
        href: child.path,
      }))
    })
  };
};

type MenuItem = {
  title: string;
  icon: any;
  href?: string;
  submenu?: MenuItem[];
};

const menuItems: MenuItem[] = MENU_ITEMS.map(convertMenuItem);

type SidebarProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export default function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  // initialize open menus based on current pathname so parent menus are open on first render
  const [openMenus, setOpenMenus] = useState<string[]>(() => {
    try {
      return menuItems
        .filter(mi => mi.submenu && mi.submenu.some(si => si.href === pathname))
        .map(p => p.title);
    } catch {
      return [];
    }
  });

  const toggleMenu = (title: string) => {
    setOpenMenus(prev =>
      prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]
    );
  };

  const ensureOpen = (title: string) => {
    setOpenMenus(prev => (prev.includes(title) ? prev : [...prev, title]));
  };

  const isMenuActive = (item: MenuItem): boolean => {
    if (item.href && pathname === item.href) return true;
    if (item.submenu) {
      return item.submenu.some(subItem => subItem.href && pathname === subItem.href);
    }
    return false;
  };

  // ensure parent menus are open when the current pathname matches any submenu
  useEffect(() => {
    const parentsToOpen = menuItems
      .filter(mi => mi.submenu && mi.submenu.some(si => si.href === pathname))
      .map(p => p.title);

    if (parentsToOpen.length) {
      setOpenMenus(prev => Array.from(new Set([...prev, ...parentsToOpen])));
    }

    // also open parent if pathname exactly equals parent's href
    menuItems.forEach(mi => {
      if (mi.href === pathname && mi.submenu) {
        setOpenMenus(prev => Array.from(new Set([...prev, mi.title])));
      }
    });
  }, [pathname]);

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-60 h-screen bg-[#0F0F0F] text-white transition-all duration-300',
        isCollapsed ? 'w-12' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 p-2">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" className="h-8 w-8" />
              <span className="font-semibold">Asset Tracing</span>
            </div>
          )}
          <button onClick={onToggleCollapse} className="rounded-lg p-2 hover:bg-neutral-800">
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map(item => (
            <div key={item.title}>
              <div
                className={cn(
                  'flex w-full items-center px-4 py-2 transition-colors hover:bg-neutral-800',
                  isMenuActive(item) && 'bg-neutral-800'
                )}
                onClick={() => toggleMenu(item.title)}
              >
                {/* clickable area: if item has submenu, render as button (no navigation); otherwise render Link */}
                {item.submenu ? (
                  <button
                    aria-expanded={openMenus.includes(item.title)}
                    aria-haspopup="true"
                    className="flex flex-1 items-center gap-3 text-left text-neutral-300"
                  >
                    <item.icon size={20} />
                    {!isCollapsed && <span className="flex-1 text-sm">{item.title}</span>}
                  </button>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className={cn(
                      'flex flex-1 items-center gap-3 text-neutral-300',
                      pathname === item.href && 'text-blue-400'
                    )}
                  >
                    <item.icon size={20} />
                    {!isCollapsed && <span className="flex-1 text-sm">{item.title}</span>}
                  </Link>
                )}

                {/* chevron to toggle submenu (separate from navigation) */}
                {item.submenu && !isCollapsed && (
                  <button
                    aria-expanded={openMenus.includes(item.title)}
                    className="mr-2 p-1 text-neutral-300 hover:text-white"
                  >
                    <ChevronRight
                      size={16}
                      className={cn(
                        'transition-transform',
                        openMenus.includes(item.title) && 'rotate-90'
                      )}
                    />
                  </button>
                )}
              </div>

              {/* Submenu */}
              {/* Submenu: only render when not collapsed to avoid width/layout issues */}
              {item.submenu && !isCollapsed && (
                <div
                  className={cn(
                    'ml-4 overflow-hidden border-l border-neutral-800 transition-[max-height] duration-200',
                    openMenus.includes(item.title) ? 'max-h-96' : 'max-h-0'
                  )}
                >
                  {item.submenu.map(subItem => (
                    <Link
                      key={subItem.title}
                      href={subItem.href || '#'}
                      onMouseDown={() => ensureOpen(item.title)}
                      onClick={() => {
                        ensureOpen(item.title);
                      }}
                      className={cn(
                        'flex items-center space-x-2 px-4 py-2 transition-colors hover:bg-neutral-800',
                        pathname === subItem.href && 'bg-neutral-800 text-blue-400'
                      )}
                    >
                      <subItem.icon size={18} />
                      <span className="text-sm">{subItem.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
