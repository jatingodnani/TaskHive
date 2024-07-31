"use client"
import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/lib/hooks';
import { useParams } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import Select from 'react-select';
import { fetchUsers } from '@/redux/features/authuser';

interface Member {
  id: string; 
  email: string;
}

interface UserOption {
  value: string;
  label: string;
}

const WorkspaceMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { users } = useAppSelector((state) => state.authusers);
  const dispatch = useAppDispatch();
  const { id } = useParams(); // Assumed 'id' to be the workspaceId
  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/taskhive/workspaces/${id}`, {
          method: 'GET',
          credentials: 'include', 
        });

        if (!response.ok) {
          throw new Error('Failed to fetch workspace');
        }

        const data = await response.json();
        setMembers(data.members.map((member: any) => ({
          id: member._id, 
          email: member.email,
        })));
      } catch (err) {
        setError('Failed to load members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [id]);

  const handleSelectChange = (selectedOptions: UserOption[]) => {
    setSelectedUsers(selectedOptions);
  };

  const handleAddMembers = async () => {
    try {
      const memberIds = selectedUsers.map(user => user.value);
      const response = await fetch(`http://localhost:8000/taskhive/workspaces/${id}/members`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ memberIds }),
      });

      if (!response.ok) {
        throw new Error('Failed to add members');
      }

      const updatedWorkspace = await response.json();
      setMembers(updatedWorkspace.members.map((member: any) => ({
        id: member._id,
        email: member.email,
      })));

      setSelectedUsers([]); // Clear the selection after adding
    } catch (err) {
      setError('Failed to add members');
    }
  };

  const filteredMembers = members.filter(member =>
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userOptions = users.map((user: any) => ({
    value: user._id,
    label: user.email,
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className=" box-border w-full flex justify-center items-center p-4">
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
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">No members found</div>
          )}
        </div>

        <div className="mb-4">
          <Select
            isMulti
            options={userOptions}
            value={selectedUsers}
            onChange={handleSelectChange}
            placeholder="Select users to add..."
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <button
          onClick={handleAddMembers}
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
        >
          Add Members
        </button>
      </div>
    </div>
  );
};

export default WorkspaceMembers;
