import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from '@/components/Sidebar';
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskHive",
  description: "Task Management Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex w-full">
        <Sidebar/>
        <main className="flex-1">
          {children}
        </main>
      </div>
    
 
  );
}
