"use client"
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FiLoader, FiTag, FiClock, FiClipboard, FiAlignLeft, FiX, FiStar } from 'react-icons/fi';
import Multiselect from "./MultiselectComponent"
import { PiUserFill } from 'react-icons/pi';
const Modal = ({ showModal, setShowModal, handleSubmit, loading }) => {
  const [favoured, setFavoured] = React.useState(false);
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <div
         
         
          className="absolute flex justify-center items-center gap-5 top-4 right-4 bg-transparent text-gray-500 hover:text-gray-800 transition-all duration-200 ease-in-out"
        >
          {!favoured ? <FiStar size={20} onClick={()=>setFavoured(prev=>!prev)} className='cursor-pointer' />:<FaStar size={20} onClick={()=>setFavoured(prev=>!prev)}  className='text-yellow-500 cursor-pointer' />}
          <FiX size={24} className='cursor-pointer'  onClick={() => setShowModal(false)} />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-2">
           
            <input
              placeholder="Title"
              className="text-2xl font-bold w-full border-0 focus:outline-none border-b-2 border-gray-200 pb-2"
            />
          </div>
          <div className="flex justify-start gap-4 w-full items-center">
            {loading ? <FiLoader size={20} className="animate-spin" /> : null}
            <label className="font-bold">Status</label>
            <FiTag size={20} />
            <select className="block w-1/2 bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out">
              <option className="rounded-md" value="">Not Selected</option>
              <option className="rounded-md">To-Do</option>
              <option className="rounded-md">In Progress</option>
              <option className="rounded-md">Under Review</option>
              <option className="rounded-md">Completed</option>
            </select>
          </div>
          <div className="flex justify-start gap-4 w-full items-center">
            <label className="font-bold">Priority</label>
            <FiClipboard size={20} />
            <select className="block w-1/2 bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out">
              <option className="rounded-md" value="">Not Selected</option>
              <option className="rounded-md">Low</option>
              <option className="rounded-md">Medium</option>
              <option className="rounded-md">Urgent</option>
            </select>
          </div>
          <div className="flex justify-start gap-4 w-full items-center">
            <label className="font-bold">Deadline</label>
            <FiClock size={20} />
            <input
              type="date"
              className="block w-1/2 bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out"
            />
          </div>
          
          <div className="flex justify-start gap-4 w-full items-center">
            <label className="font-bold">Description</label>
            <FiAlignLeft size={20} />
          </div>
          <textarea
            placeholder="Description"
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out"
          ></textarea>
          <div className="flex justify-start gap-4 w-full items-center">
              <label className="font-bold">AssignTo</label>
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

export default Modal;
