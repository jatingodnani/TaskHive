"use client"

import React from 'react';
import Link from 'next/link';
import { FaHome, FaCog, FaChartBar, FaClipboard, FaPlus, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const userName = "John Doe";

  return (
    <div className="w-64 mt-4 bg-white h-screen shadow-lg flex flex-col overflow-y-auto">
      <div className="p-5 flex-grow">
        
        <nav>
          <ul className="space-y-2">
            {[
              { href: "/home", icon: FaHome, label: "Home" },
              { href: "/board", icon: FaClipboard, label: "Board" },
              { href: "/analytics", icon: FaChartBar, label: "Analytics" },
              { href: "/settings", icon: FaCog, label: "Settings" },
            ].map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-150">
                  <item.icon className="mr-3 text-gray-400" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg mt-6 flex items-center justify-center transition-colors duration-150">
          <FaPlus className="mr-2" /> Create Workspace
        </button>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center text-gray-600">
          <FaUser className="mr-2 text-gray-400" />
          <span>{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;