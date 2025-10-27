export interface MenuItem {
  key: string;
  title: string;
  subtitle?: string;
  path: string;
  icon: string;
  children?: MenuItem[];
  group?: string;
}

export const APP_INFO = {
  title: 'Pelacakan Aset',
  subtitle: 'Kejaksaan Agung RI',
  logo: 'Shield' as const,
};

export const MENU_ITEMS: MenuItem[] = [
  {
    key: 'dashboard',
    title: 'Dasbor',
    path: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    key: 'projects',
    title: 'Proyek',
    path: '/projects',
    icon: 'FolderClosed',
  },
  {
    key: 'link-analysis',
    title: 'Link Analysis',
    path: '/link-analysis',
    icon: 'Network',
  },
  {
    key: 'data-search',
    title: 'Pencarian Data',
    path: '/search',
    icon: 'Search',
  },
  {
    key: 'data-management',
    title: 'Manajemen Data Ontologi',
    path: '/data-management',
    icon: 'Database',
    children: [
      {
        key: 'assets',
        title: 'Aset',
        path: '/assets',
        icon: 'Building',
      },
      {
        key: 'entities',
        title: 'Entitas',
        path: '/entities',
        icon: 'Users',
      },
      {
        key: 'relationships',
        title: 'Hubungan',
        path: '/relationships',
        icon: 'GitFork',
      },
      {
        key: 'cases',
        title: 'Daftar Perkara',
        path: '/cases',
        icon: 'FileText',
      },
    ],
  },
  {
    key: 'osint',
    title: 'OSINT Collector',
    path: '/osint',
    icon: 'Bot',
    children: [
      {
        key: 'osint-dashboard',
        title: 'Dashboard OSINT',
        path: '/osint/dashboard',
        icon: 'BarChart2',
      },
      {
        key: 'data-sources',
        title: 'Data Source Manager',
        path: '/data-sources',
        icon: 'Globe',
      },
      {
        key: 'crawler',
        title: 'Crawler Scheduler',
        path: '/osint/crawler',
        icon: 'Clock',
      },
      {
        key: 'keywords',
        title: 'Keyword Analyzer',
        path: '/osint/keywords',
        icon: 'Search',
      },
      {
        key: 'reports-export',
        title: 'Reports & Export',
        path: '/reports-export',
        icon: 'FileOutput',
      },
    ],
  },
  {
    key: 'case-comparison',
    title: 'Case Comparison',
    path: '/comparison',
    icon: 'GitCompare',
    children: [
      {
        key: 'select-case',
        title: 'Pilih Kasus',
        path: '/comparison/select',
        icon: 'FileSearch',
      },
      {
        key: 'comparison-history',
        title: 'Riwayat Komparasi',
        path: '/comparison/history',
        icon: 'History',
      },
    ],
  },
  {
    key: 'reports',
    title: 'Laporan',
    path: '/reports',
    icon: 'ScrollText',
    children: [
      {
        key: 'create-report',
        title: 'Buat Laporan',
        path: '/reports/create',
        icon: 'FilePlus',
      },
      {
        key: 'all-reports',
        title: 'Semua Laporan',
        path: '/reports/all',
        icon: 'Files',
      },
      {
        key: 'admin-docs',
        title: 'Berkas Administrasi',
        path: '/reports/admin',
        icon: 'FileSpreadsheet',
      },
    ],
  },
  {
    key: 'performance',
    title: 'Kinerja & KPI',
    path: '/performance',
    icon: 'TrendingUp',
  },
  {
    key: 'settings',
    title: 'Pengaturan',
    path: '/settings',
    icon: 'Settings',
    children: [
      {
        key: 'users',
        title: 'Manajemen Pengguna',
        path: '/settings/users',
        icon: 'UserCog',
      },
      {
        key: 'system',
        title: 'Sistem',
        path: '/settings/system',
        icon: 'Settings',
      },
      {
        key: 'audit',
        title: 'Log Audit',
        path: '/settings/audit',
        icon: 'AlertCircle',
      },
    ],
  },
];

export function getMenuItemByPath(path: string): MenuItem | undefined {
  // Recursive function to find menu item
  const findItem = (items: MenuItem[]): MenuItem | undefined => {
    for (const item of items) {
      if (item.path === path) {
        return item;
      }
      if (item.children) {
        const found = findItem(item.children);
        if (found) return found;
      }
    }
    return undefined;
  };

  return findItem(MENU_ITEMS);
}
