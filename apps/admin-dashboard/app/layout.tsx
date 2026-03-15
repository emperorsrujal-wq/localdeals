import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LocalDeals Admin Dashboard',
  description: 'Manage the LocalDeals platform',
};

import { Sidebar } from '../components/common/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
