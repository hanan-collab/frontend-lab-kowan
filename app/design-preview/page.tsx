'use client';

import dynamic from 'next/dynamic';
import '@/app/design-export.css';

// Helper: load default export if present, otherwise first named export
function pickComponent(mod: any) {
  if (mod && mod.__esModule && mod.default) return mod.default;
  const keys = Object.keys(mod || {}).filter(k => typeof mod[k] === 'function');
  return keys.length
    ? mod[keys[0]]
    : () => <div style={{ fontSize: 12, color: '#999' }}>Component not found in module.</div>;
}

// Update this path to a real exported component file:
const loadModule = async () => {
  try {
    const mod = await import('@/components/design-export/dashboard/_dashboard');
    return pickComponent(mod);
  } catch {
    try {
      const mod = await import('@/components/design-export/pages/_dashboard');
      return pickComponent(mod);
    } catch {
      return () => (
        <div style={{ fontSize: 12, color: '#999' }}>
          Adjust import path inside design-preview/page.tsx to match your exported component.
        </div>
      );
    }
  }
};

const ExportedDashboard = dynamic(loadModule as any, { ssr: false });

export default function DesignPreviewPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 space-y-6">
      <h1 className="text-xl font-semibold">Design Export Preview</h1>
      <div className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/40">
        <ExportedDashboard />
      </div>
      <p className="text-xs text-neutral-500">
        This mounts a component from components/design-export/**. Change the import path above to
        target the exact screen you want.
      </p>
    </main>
  );
}
