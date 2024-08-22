import React from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar /> 
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
