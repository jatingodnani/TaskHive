"use client"
import React, { useState } from 'react';
import Modal from "./TaskModal";
import { FaPlus } from 'react-icons/fa';

const Taskbutton = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
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
      <Modal showModal={showModal} setShowModal={setShowModal} handleSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default Taskbutton;
