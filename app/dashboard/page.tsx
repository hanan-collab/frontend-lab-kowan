'use client';

import React from 'react';
import { SectionHeader } from '@/components/design-export/components/ui/section-header';
import { getMenuItemByPath } from '@/config/menu';
import { usePathname } from 'next/navigation';

export default function DashboardPage() {
  const pathname = usePathname();
  const menuItem = getMenuItemByPath(pathname);

  return (
    <div>
      <SectionHeader
        title={menuItem?.title}
        subtitle={menuItem?.subtitle}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white/5 p-4">Total Aset: 2,847</div>
        <div className="rounded-lg bg-white/5 p-4">Total Tersangka: 1,523</div>
        <div className="rounded-lg bg-white/5 p-4">Total Transaksi: 45,721</div>
      </div>
    </div>
  );
}
