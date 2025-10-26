import dynamic from 'next/dynamic';
import ChartPreview from '@/components/examples/ChartPreview';

// const MapPreview = dynamic(() => import("@/components/examples/MapPreview"), {
//   ssr: false,
// });

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Asset Tracker Platform</h1>
        <p className="text-sm text-neutral-400">
          Next.js starter with Tailwind, React Query, Recharts, and Leaflet (client-only).
        </p>
      </header>

      <section className="grid lg:grid-cols-2 gap-6">
        {/* <div className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/50">
          <h2 className="text-lg font-medium mb-3">Map Preview</h2>
          <MapPreview />
        </div> */}
        <div className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/50">
          <h2 className="text-lg font-medium mb-3">Chart Preview</h2>
          <ChartPreview />
        </div>
      </section>
    </main>
  );
}
