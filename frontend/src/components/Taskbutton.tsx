"use client";
import React, { useState } from 'react';
import Modal from "./TaskModal";
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'next/navigation';

interface TaskbuttonProps {
  colid: string;
  settas: React.Dispatch<React.SetStateAction<any[]>>;
}

const Taskbutton: React.FC<TaskbuttonProps> = ({ colid, settas }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const params = useParams<{ id: string }>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setShowModal(true)}
        className="bg-black w-full flex items-center text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out justify-between"
      >
        <span>Create Task</span> <FaPlus size={20}/>
      </button>
      
      <Modal
        id={params?.id || ''}
        settas={settas}
        colid={colid}
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
      />
    </div>
  );
};

export default Taskbutton;