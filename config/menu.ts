export interface MenuItem {
  key: string;
  title: string;
  subtitle?: string;
  path: string;
  icon: string;
  children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    key: 'dashboard',
    title: 'Dasbor Eksekutif',
    subtitle: 'Ikhtisar operasi investigasi dan pelacakan aset',
    path: '/dashboard',
    icon: 'LayoutDashboard'
  },
  {
    key: 'api-fetch',
    title: 'Api Fetch Example',
    subtitle: 'Contoh implementasi data fetching dengan React Query',
    path: '/examples/api-fetch',
    icon: 'Bot'
  },
  {
    key: 'projects',
    title: 'Proyek',
    subtitle: 'Manajemen proyek dan investigasi',
    path: '/projects',
    icon: 'FolderClosed',
    children: [
      { key: 'assets', title: 'Aset', path: '/projects/assets', icon: 'Database', subtitle: 'Manajemen data aset' },
      { key: 'entities', title: 'Entitas', path: '/projects/entities', icon: 'Users', subtitle: 'Manajemen data entitas' },
      { key: 'relationships', title: 'Hubungan', path: '/projects/relationships', icon: 'Network', subtitle: 'Manajemen hubungan antar entitas' },
      { key: 'cases', title: 'Daftar Perkara', path: '/projects/cases', icon: 'FileSpreadsheet', subtitle: 'Daftar perkara yang sedang ditangani' }
    ]
  },
  {
    key: 'osint',
    title: 'OSINT Collector',
    subtitle: 'Pengumpulan dan analisis data dari sumber terbuka',
    path: '/osint',
    icon: 'Bot',
    children: [
      { key: 'osint-dashboard', title: 'Dashboard OSINT', path: '/osint/dashboard', icon: 'BarChart2', subtitle: 'Ikhtisar pengumpulan data OSINT' },
      { key: 'data-sources', title: 'Data Source Manager', path: '/osint/data-sources', icon: 'Globe', subtitle: 'Manajemen sumber data' },
      { key: 'crawler', title: 'Crawler Scheduler', path: '/osint/crawler', icon: 'Clock', subtitle: 'Penjadwalan pengumpulan data' },
      { key: 'keywords', title: 'Keyword Analyzer', path: '/osint/keywords', icon: 'Search', subtitle: 'Analisis kata kunci' },
      { key: 'osint-reports', title: 'Reports & Export', path: '/osint/reports', icon: 'FileText', subtitle: 'Laporan dan ekspor data OSINT' }
    ]
  },
  {
    key: 'comparison',
    title: 'Case Comparison',
    subtitle: 'Perbandingan dan analisis antar kasus',
    path: '/comparison',
    icon: 'GanttChart',
    children: [
      { key: 'select-case', title: 'Pilih Kasus', path: '/comparison/select', icon: 'Search', subtitle: 'Pemilihan kasus untuk komparasi' },
      { key: 'comparison-history', title: 'Riwayat Komparasi', path: '/comparison/history', icon: 'Clock', subtitle: 'Riwayat perbandingan kasus' }
    ]
  },
  {
    key: 'reports',
    title: 'Laporan',
    subtitle: 'Pembuatan dan manajemen laporan',
    path: '/reports',
    icon: 'ScrollText',
    children: [
      { key: 'create-report', title: 'Buat Laporan', path: '/reports/create', icon: 'FileText', subtitle: 'Pembuatan laporan baru' },
      { key: 'all-reports', title: 'Semua Laporan', path: '/reports/all', icon: 'FileStack', subtitle: 'Daftar seluruh laporan' },
      { key: 'admin-docs', title: 'Berkas Administrasi', path: '/reports/admin', icon: 'FileSpreadsheet', subtitle: 'Manajemen berkas administrasi' }
    ]
  },
  {
    key: 'settings',
    title: 'Pengaturan',
    subtitle: 'Konfigurasi sistem dan pengguna',
    path: '/settings',
    icon: 'Settings',
    children: [
      { key: 'users', title: 'Manajemen Pengguna', path: '/settings/users', icon: 'UserCog', subtitle: 'Manajemen akun pengguna' },
      { key: 'system', title: 'Sistem', path: '/settings/system', icon: 'Settings', subtitle: 'Pengaturan sistem' },
      { key: 'audit', title: 'Log Audit', path: '/settings/audit', icon: 'AlertCircle', subtitle: 'Riwayat aktivitas sistem' }
    ]
  }
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