"use client"
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { FiAlignLeft, FiX } from 'react-icons/fi';
import Multiselect from "./MultiselectComponent"
import { PiUserFill } from 'react-icons/pi';


const Workform = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    setLoading(true);
   
    setTimeout(() => {
      console.log(formData);
      setLoading(false);
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => setShowModal(true)}
        className="bg-purple-500 flex gap-2 items-center text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
      >
       <FaPlus className="mr-2" /> Create Workspace
      </button>
      <WorkspaceModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};
const WorkspaceModal = ({ showModal, setShowModal, handleSubmit, loading }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
  
    if (!showModal) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 bg-transparent text-gray-500 hover:text-gray-800 transition-all duration-200 ease-in-out"
          >
            <FiX size={24} />
          </button>
          <form onSubmit={(e) => handleSubmit(e, { name, description })} className="space-y-6">
            <div className="flex items-center gap-2">
              <input
                placeholder="Workspace Name"
                className="text-2xl font-bold w-full border-0 focus:outline-none border-b-2 border-gray-200 pb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-start gap-4 w-full items-center">
              <label className="font-bold">Description</label>
              <FiAlignLeft size={20} />
            </div>
            <textarea
              placeholder="Description"
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex justify-start gap-4 w-full items-center">
              <label className="font-bold">Add members</label>
              <PiUserFill size={20} />
            </div>
            <Multiselect/>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-purple-500 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  
export default Workform;
