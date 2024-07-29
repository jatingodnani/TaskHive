"use client"
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaUser, FaSignOutAlt, FaBriefcase, FaCog } from 'react-icons/fa';

const Navbar = () => {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userName = "John Doe"; // Replace with actual user name

  const toggleWorkspaceMenu = () => setIsWorkspaceOpen(!isWorkspaceOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    alert('Logged out');
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-gray-800 p-6 shadow-md"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          TaskHive
        </Link>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button
              onClick={toggleWorkspaceMenu}
              className="px-5 py-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none flex items-center transition-colors"
            >
              <FaBriefcase className="mr-2" />
              Workspaces
              <FaChevronDown className="ml-2" />
            </button>
            <AnimatePresence>
              {isWorkspaceOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 mt-2 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-lg w-56"
                >
                  {[1, 2, 3].map((num) => (
                    <motion.li key={num} whileHover={{ x: 5 }} className="border-b last:border-b-0">
                      <Link href={`/workspace/${num}`} className="flex items-center px-4 py-3 hover:bg-gray-100">
                        <FaBriefcase className="mr-3 text-blue-600" />
                        Workspace {num}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-3 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none transition-colors"
            >
              <FaUser />
              <span>{userName}</span>
              <FaChevronDown />
            </button>
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 mt-2 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-lg w-56"
                >
                  <motion.div whileHover={{ x: 5 }} className="px-4 py-3 border-b">
                    <p className="font-semibold">{userName}</p>
                    <p className="text-sm text-gray-600">john.doe@example.com</p>
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center text-red-600"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Logout
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;