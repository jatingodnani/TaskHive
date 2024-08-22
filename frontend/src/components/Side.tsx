"use client";

import React from "react";
import Link from "next/link";
import {
  FaHome,
  FaCog,
  FaChartBar,
  FaClipboard,
  FaUser,
} from "react-icons/fa";
import { IconType } from "react-icons";
import Workform from "./Workspacemodal";
import { useAppSelector } from "../redux/lib/hooks";

interface NavItem {
  href: string;
  label: string;
  icon: IconType;
}

interface User {
  name: string;
}

const SideCompo: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  const navItems: NavItem[] = [
    { href: "/", icon: FaHome, label: "Home" },
    { href: "/", icon: FaClipboard, label: "Board" },
    { href: "/", icon: FaChartBar, label: "Analytics" },
    { href: "/", icon: FaCog, label: "Settings" },
  ];

  return (
    <div className="w-auto px-4  md:w-auto bg-white h-screen shadow-lg flex flex-col items-center md:items-start overflow-hidden">
      {/* <div className="p-5 flex-grow"> */}
        <nav>
          {/* <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-150"
                >
                  <item.icon className="mr-3 text-gray-400" />
                  <span className="hidden md:inline">{item.label}</span> 
                </Link>
              </li>
            ))}
          </ul> */}
        </nav>
      {/* </div> */}
      <Workform />
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center text-gray-600">
          <FaUser className="mr-2 text-gray-400" />
          <span className="hidden md:inline">{user?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default SideCompo;
