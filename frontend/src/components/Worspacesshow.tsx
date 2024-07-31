import React, { useEffect, useState } from "react";
import Link from "next/link";
import CardList from "./Card";
import image1 from "../../public/images/image1.svg";
import image2 from "../../public/images/image2.svg";
import image3 from "../../public/images/image3.svg";
import { FaSpinner } from "react-icons/fa";

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
  id: string;
  title: string;
  description: string;
  isCollaborated: boolean;
}

const cardsData = [
  {
    title: "Access Anywhere",
    description: "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
    image: image1,
  },
  {
    title: "Mountain Hike",
    description: "An exciting hike up the mountain with breathtaking views.",
    image: image2,
  },
  {
    title: "Share Notes Instantly",
    description: "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
    image: image3,
  },
];

const WorkspacesPage: React.FC = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchWorkspaces = async () => {
      setLoading(true); // Set loading to true when starting fetch
      try {
        const token = localStorage.getItem("authTokenhive");
        const response = await fetch(
          "https://taskhive-y97a.onrender.com/taskhive/workspaces",
          {
            method: "GET",
            headers: {
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: Workspace[] = await response.json();
        setWorkspaces(data);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-start text-gray-500 ml-4 p-4 text-4xl tracking-[0.1rem] font-medium">Welcome Back!!</h1>
      <div>
        <CardList cards={cardsData} />
      </div>
      {
        !loading && workspaces.length > 0 && (
          <h1 className="text-start text-gray-500 ml-4 p-4 text-4xl tracking-[0.1rem] font-medium">All WorkSpaces!!</h1>
        )
      }
      <div className="flex flex-wrap p-6 bg-gray-100 w-full">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <FaSpinner className="animate-spin text-gray-500" size={24} />
            <p className="ml-2 text-gray-500">Loading...</p>
          </div>
        ) : (
          workspaces.length === 0 ? (
            <div className="flex items-center justify-center w-full">
              <p>No workspaces found.</p>
            </div>
          ) : (
            workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace._id}
                id={workspace._id}
                title={workspace.name}
                description={workspace.description}
                isCollaborated={workspace.members.length > 0}
              />
            ))
          )
        )}
      </div>
    </div>
  );
};

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  id,
  title,
  description,
  isCollaborated,
}) => {
  return (
    <Link
      href={`/workspaces/${id}`}
      className="bg-white shadow-lg rounded-lg p-4 m-4 flex flex-col max-w-xs border border-gray-200 w-44 h-44"
    >
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-center self-start">
        <span
          className={`py-1 px-3 text-xs rounded-md font-medium text-white transition-colors ${isCollaborated
            ? "bg-green-500 hover:bg-green-600"
            : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {isCollaborated ? "Public" : "Private"}
        </span>
      </div>
    </Link>
  );
};

export default WorkspacesPage;
