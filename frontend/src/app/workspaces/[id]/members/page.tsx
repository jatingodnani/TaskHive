"use client"
import React, { useState } from 'react';
import { FiUserPlus, FiTrash2, FiSearch } from 'react-icons/fi';

interface Member {
  id: number;
  email: string;
}

const WorkspaceMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([
    { id: 1, email: 'john@example.com' },
    { id: 2, email: 'jane@example.com' },
    // Add more members here for testing
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMemberEmail.trim() !== '') {
      setMembers([...members, { id: Date.now(), email: newMemberEmail }]);
      setNewMemberEmail('');
    }
  };

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const filteredMembers = members.filter(member =>
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full box-border w-full flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Workspace Members</h2>
        
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        <div className="mb-6 h-96 overflow-y-auto border border-gray-200 rounded-md">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member: Member) => (
              <div key={member.id} className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors duration-150">
                <span className="text-gray-700">{member.email}</span>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">No members found</div>
          )}
        </div>
        
        <form onSubmit={handleAddMember} className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="email"
              value={newMemberEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMemberEmail(e.target.value)}
              placeholder="Enter member's email"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center"
            >
              <FiUserPlus className="mr-2" />
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkspaceMembers;