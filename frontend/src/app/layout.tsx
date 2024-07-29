import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
    <html lang="en">
        
        
      <body className={inter.className}>
      <Navbar />
      
        {/* <Sidebar/> */}
        <main className="bg-gray-100">
          {children}
        </main>
     
        </body>
    </html>
  );
}
