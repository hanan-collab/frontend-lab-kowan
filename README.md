# Asset Tracker Platform (Next.js)

Starter Next.js (App Router) dengan Tailwind, React Query, Recharts (grafik), dan Leaflet (maps).

## Quickstart (npm atau yarn)

```bash
# npm
npm install
npm run dev

# yarn
# npm i -g yarn@4   # jika belum terpasang
yarn install
yarn dev
```

## Fitur

- Next.js App Router (TypeScript)
- Tailwind CSS 3
- Prettier (+ plugin tailwind)
- ESLint (next/core-web-vitals)
- React Query (@tanstack) + Axios
- Recharts (grafik)
- Leaflet + react-leaflet (+ dynamic import) untuk maps
- Vitest + Testing Library (siap pakai)

## Struktur

```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  providers/ReactQueryProvider.tsx
  examples/ChartPreview.tsx
  examples/MapPreview.tsx
  lib/maps/LeafletMap.tsx
lib/
  api.ts
```

## Design Export

- Semua komponen hasil export Figma dipertahankan di `components/design-export/**`.
- Asset gambar diletakkan di `public/design-assets/**`.
- Styles khusus export di-import melalui `app/design-export.css` dan dipakai di route `/design-preview`.
