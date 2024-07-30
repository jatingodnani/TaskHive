import Link from 'next/link';
import React, { useEffect, useState } from 'react';
interface Workspace {
    _id: string;
    name: string;
    description: string;
    members: string[];
    owner: {
      name: string;
      email: string;
    };
  }
  
interface WorkspaceCardProps {
    title: string;
    description: string;
    isCollaborated: boolean;
  }

const WorkspacesPage: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await fetch('http://localhost:8000/taskhive/workspaces', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setWorkspaces(data);
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <div className="flex flex-wrap justify-center p-6 bg-gray-100">
      {workspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace._id}
          id={workspace._id}
          title={workspace.name}
          description={workspace.description}
          isCollaborated={workspace.members.length > 0}
        />
      ))}
    </div>
  );
};





const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ id,title, description, isCollaborated }) => {
  return (
    <Link href={`/workspaces/${id}`} className="bg-white shadow-lg rounded-lg p-6 m-4 flex flex-col max-w-xs border border-gray-200">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {isCollaborated && (
        <div className="flex justify-center mt-auto">
          <button
            className="py-1 px-3 text-xs rounded-md font-medium text-white bg-green-500 hover:bg-green-600 transition-colors"
          >
            Collaborative
          </button>
        </div>
      )}
    </Link>
  );
};



export default WorkspacesPage;
