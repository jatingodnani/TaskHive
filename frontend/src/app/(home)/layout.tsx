
import React from 'react';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { FaHome, FaCog, FaChartBar, FaClipboard, FaPlus, FaUser } from 'react-icons/fa';
const inter = Inter({ subsets: ['latin'] });
export default function StartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`min-h-screen ${inter.className}`}>
      <Navbar />
      <div className="flex">
        <Sidebar/>
        <main className="w-[70%] p-4">
          {children}
        </main>
      </div>
    </div>
  );
}


