import type { Metadata } from 'next';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'Asset Tracker Platform',
  description: 'Next.js app initialized from Figma design export',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <MainLayout>{children}</MainLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
