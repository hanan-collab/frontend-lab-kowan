'use client';

if (typeof window === 'undefined') {
  // Guard for any accidental SSR usage
  // @ts-ignore
  export default function LeafletSSRGuard() {
    return null;
  }
}

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression, Icon } from 'leaflet';
import * as L from 'leaflet';

// Default marker fix for Next bundling
const DefaultIcon: Icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type Props = {
  center?: LatLngExpression;
  zoom?: number;
  className?: string;
  height?: number | string;
  width?: number | string;
};

export default function LeafletMap({
  center = [-7.7829, 110.3671],
  zoom = 12,
  className,
  height = 360,
  width = '100%',
}: Props) {
  return (
    <div style={{ height, width }} className={className}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={DefaultIcon}>
          <Popup>Center</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
