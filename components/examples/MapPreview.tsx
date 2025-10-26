'use client';

import dynamic from 'next/dynamic';
const LeafletMap = dynamic(() => import('@/components/lib/maps/LeafletMap'), { ssr: false });

export default function MapPreview() {
  return <LeafletMap />;
}
