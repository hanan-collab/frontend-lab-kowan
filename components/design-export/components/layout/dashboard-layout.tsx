import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '../ui/sidebar';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Shield,
  BarChart3,
  Network,
  Database,
  Users,
  FileText,
  Settings,
  LogOut,
  Building2,
  Activity,
  GitBranch,
  BookOpen,
  UserCheck,
  Archive,
  TrendingUp,
  Bot,
  Globe,
  Calendar,
  Search,
  Download,
  FolderKanban,
  GitCompare,
  FolderOpen,
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { NotificationCenter } from '../notifications/notification-center';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
}

const navigation = [
  {
    name: 'Dasbor',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    name: 'Proyek',
    href: '/projects',
    icon: FolderKanban,
  },
  {
    name: 'Link Analysis',
    href: '/ontology',
    icon: Network,
  },
  {
    name: 'Pencarian Data',
    href: '/data-search',
    icon: Search,
  },
  {
    name: 'Manajemen Data Ontologi',
    icon: Database,
    children: [
      { name: 'Aset', href: '/assets', icon: Building2 },
      { name: 'Entitas', href: '/entities', icon: Users },
      { name: 'Hubungan', href: '/relationships', icon: GitBranch },
      { name: 'Daftar Perkara', href: '/case-files', icon: FolderOpen },
    ],
  },
  {
    name: 'OSINT Collector',
    icon: Bot,
    children: [
      { name: 'Dashboard OSINT', href: '/osint/dashboard', icon: BarChart3 },
      { name: 'Data Source Manager', href: '/osint/sources', icon: Globe },
      { name: 'Crawler Scheduler', href: '/osint/scheduler', icon: Calendar },
      { name: 'Keyword Analyzer', href: '/osint/analyzer', icon: Search },
      { name: 'Reports & Export', href: '/osint/reports', icon: Download },
    ],
  },
  {
    name: 'Case Comparison',
    icon: GitCompare,
    children: [
      { name: 'Pilih Kasus', href: '/case-comparison', icon: GitCompare },
      { name: 'Riwayat Komparasi', href: '/case-comparison/history', icon: Archive },
    ],
  },
  {
    name: 'Laporan',
    icon: FileText,
    children: [
      { name: 'Buat Laporan', href: '/reports/create', icon: BookOpen },
      { name: 'Semua Laporan', href: '/reports', icon: Archive },
      { name: 'Berkas Administrasi', href: '/reports/documents', icon: Shield },
    ],
  },
  {
    name: 'Kinerja & KPI',
    href: '/performance',
    icon: TrendingUp,
  },
  {
    name: 'Pengaturan',
    icon: Settings,
    children: [
      { name: 'Manajemen Pengguna', href: '/admin/users', icon: UserCheck },
      { name: 'Sistem', href: '/admin/settings', icon: Settings },
      { name: 'Log Audit', href: '/admin/audit', icon: Activity },
    ],
  },
];

export function DashboardLayout({ children, user, onLogout }: DashboardLayoutProps) {
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  const isActiveParentRoute = (children: any[]) => {
    return children.some(child => location.pathname === child.href);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-slate-900">
        <Sidebar className="border-slate-700 hidden lg:flex">
          <SidebarHeader className="border-b border-slate-700 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="hidden xl:block">
                <h2 className="text-white font-medium">Pelacakan Aset</h2>
                <p className="text-xs text-slate-400">Kejaksaan Agung RI</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-2">
            <SidebarMenu>
              {navigation.map(item => (
                <SidebarMenuItem key={item.name}>
                  {item.children ? (
                    <div className="space-y-1">
                      <div
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium ${isActiveParentRoute(item.children) ? 'text-blue-400' : 'text-slate-400'}`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </div>
                      <div className="ml-6 space-y-1">
                        {item.children.map(child => (
                          <SidebarMenuButton
                            key={child.href}
                            asChild
                            className={
                              isActiveRoute(child.href)
                                ? 'bg-blue-600/20 text-blue-400 border-blue-500/50'
                                : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }
                          >
                            <Link to={child.href} className="flex items-center gap-3">
                              <child.icon className="w-4 h-4" />
                              {child.name}
                            </Link>
                          </SidebarMenuButton>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className={
                        isActiveRoute(item.href)
                          ? 'bg-blue-600/20 text-blue-400 border-blue-500/50'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }
                    >
                      <Link to={item.href} className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-slate-800 border-b border-slate-700 p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 lg:gap-4 min-w-0">
                <SidebarTrigger className="text-slate-300 hover:text-white lg:hidden" />
                <h1 className="text-white text-base lg:text-lg font-medium truncate">
                  Sistem Platform Analisis Penelusuran Aset
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <NotificationCenter />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 lg:gap-3 text-slate-300 hover:text-white"
                    >
                      <Avatar className="w-7 h-7 lg:w-8 lg:h-8">
                        <AvatarFallback className="bg-blue-600 text-white text-xs lg:text-sm">
                          {user?.name
                            ?.split(' ')
                            .map(n => n[0])
                            .join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left hidden sm:block">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-slate-400">{user?.role}</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
                    <DropdownMenuItem className="text-slate-300 focus:bg-slate-700 focus:text-white">
                      Pengaturan Profil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-slate-300 focus:bg-slate-700 focus:text-white">
                      Preferensi
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem
                      onClick={onLogout}
                      className="text-red-400 focus:bg-red-600/20 focus:text-red-300"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-slate-900 p-3 lg:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
