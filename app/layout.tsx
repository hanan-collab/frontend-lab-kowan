import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Kalkulator Luas',
  description: 'Kalkulator Luas Persegi & Kubus Glassy',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 min-h-screen">
        {children}
      </body>
    </html>
  );
}
