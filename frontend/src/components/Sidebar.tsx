"use client";

import React from 'react';
import Link from 'next/link';
import { FaHome, FaCog, FaChartBar, FaClipboard } from 'react-icons/fa';
import { IconType } from 'react-icons';
import Workform from './Workspacemodal';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from "../redux/lib/hooks";
import { MdDelete } from 'react-icons/md';

interface NavItem {
  href: string;
  icon: IconType;
  label: string;
}

interface User {

  id: string;
  name: string;

}



const Sidebar: React.FC = () => {
  const { users } = useAppSelector((state) => state.authusers);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const navItems: NavItem[] = [
    { href: `/workspaces/${id}`, icon: FaHome, label: "Home" },
    { href: `/workspaces/${id}/members`, icon: FaClipboard, label: "Members" },
    { href: `/workspaces/${id}/analytics`, icon: FaChartBar, label: "Analytics" },
    { href: `/workspaces/${id}/settings`, icon: FaCog, label: "Settings" },
  ];

  const handleDeleteWorkspace = async () => {
    const token = localStorage.getItem('authTokenhive');
    if (window.confirm('Are you sure you want to delete this workspace?')) {
      try {
        const response = await fetch(`https://taskhive-y97a.onrender.com/taskhive/workspaces/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete workspace');
        }

        router.push('/');
      } catch (error) {
        console.error('Error deleting workspace:', error);
        alert('Failed to delete workspace');
      }
    }
  };

  return (
    <div className="w-32 md:w-64 bg-white h-screen shadow-lg flex flex-col overflow-y-auto">
      <div className="p-5 flex-col">
        <nav className=''>
          <ul className="space-y-2 flex-col items-center sm:items-start">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-150"
                >
                  <item.icon className="mr-3 text-gray-400" />
                  <span className=' hidden sm:block'>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button
        onClick={handleDeleteWorkspace}
        className='flex gap-2 w-[75%] font-bold rounded ml-2 p-2 justify-center items-center bg-red-600 text-white'
      >
        <MdDelete size={20} />
        <span className='hidden sm:block'>Delete Workspace</span>
      </button>
    </div>
  );
};

export default Sidebar;