'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import { MENU_ITEMS, APP_INFO } from '@/config/menu';
import * as Icons from 'lucide-react';

// Convert menu items from config to sidebar format
const convertMenuItem = (item: (typeof MENU_ITEMS)[0]): MenuItem => {
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
      })),
    }),
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

  // helper: apakah item punya child yang aktif?
  const hasActiveChild = (item: MenuItem): boolean =>
    !!item.submenu?.some(sub => sub.href === pathname);

  // helper: apakah parent sendiri aktif (exact match href)?
  const isParentExactActive = (item: MenuItem): boolean => !!(item.href && pathname === item.href);

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
    <aside
      className={cn(
        'fixed left-0 top-0 z-60 h-screen bg-[#020817] text-white transition-all duration-300',
        isCollapsed ? 'w-12' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-3 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <Icons.Shield className="w-5 h-5 text-white shrink-0" />
            {!isCollapsed && (
              <div className="truncate">
                <div className="font-semibold text-sm">{APP_INFO.title}</div>
                <div className="text-xs text-slate-400">{APP_INFO.subtitle}</div>
              </div>
            )}
          </div>
          <button onClick={onToggleCollapse} className="rounded-lg p-1 hover:bg-slate-800">
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map(item => {
            const isOpen = openMenus.includes(item.title);
            const childActive = hasActiveChild(item);
            const parentExactActive = isParentExactActive(item);

            const parentHoverClass =
              item.submenu && childActive ? 'hover:bg-neutral-800' : 'hover:bg-slate-800';

            const parentHasBg = item.submenu
              ? parentExactActive
                ? true
                : !isOpen && childActive
              : parentExactActive;

            const parentTextClass =
              parentExactActive || childActive ? 'text-blue-400' : 'text-neutral-300';

            return (
              <div key={item.title}>
                <div
                  className={cn(
                    'flex items-center mx-2 px-2 py-2 rounded-md transition-colors',
                    parentHoverClass,
                    parentHasBg && 'bg-slate-800'
                  )}
                  onClick={() => toggleMenu(item.title)}
                >
                  {/* clickable area: if item has submenu, render as button (no navigation); otherwise render Link */}
                  {item.submenu ? (
                    <button
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={cn('flex flex-1 items-center gap-3 text-left', parentTextClass)}
                    >
                      <item.icon size={20} />
                      {!isCollapsed && <span className="flex-1 text-sm">{item.title}</span>}
                    </button>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className={cn(
                        'flex flex-1 items-center gap-3',
                        pathname === item.href ? 'text-blue-400' : 'text-neutral-300'
                      )}
                    >
                      <item.icon size={20} />
                      {!isCollapsed && <span className="flex-1 text-sm">{item.title}</span>}
                    </Link>
                  )}

                  {/* chevron to toggle submenu (separate from navigation) */}
                  {item.submenu && !isCollapsed && (
                    <button
                      aria-expanded={isOpen}
                      className="mr-2 p-1 text-neutral-300 hover:text-white"
                    >
                      <ChevronRight
                        size={16}
                        className={cn('transition-transform', isOpen && 'rotate-90')}
                      />
                    </button>
                  )}
                </div>

                {/* Submenu: only render when not collapsed to avoid width/layout issues */}
                {item.submenu && !isCollapsed && (
                  <div
                    className={cn(
                      'ml-4 overflow-hidden border-l border-neutral-800 transition-[max-height] duration-200',
                      isOpen ? 'max-h-96' : 'max-h-0'
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
                          'flex items-center space-x-2 px-4 py-2 transition-colors hover:bg-neutral-800 rounded-md mx-2',
                          pathname === subItem.href && 'bg-slate-800 text-blue-400'
                        )}
                      >
                        <subItem.icon size={18} />
                        <span className="text-sm">{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
