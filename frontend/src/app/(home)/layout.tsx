import Navbar from "@/components/Navbar";
import SideCompo from "@/components/Side";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-gray-100">
      <Navbar />
      <div className="w-full flex items-start">
        <div className="">
          <SideCompo />
        </div>
        {children}
      </div>
    </main>
  );
}
