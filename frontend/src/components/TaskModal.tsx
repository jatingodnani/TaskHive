"use client";
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiLoader, FiTag, FiClock, FiClipboard, FiAlignLeft, FiX, FiStar } from 'react-icons/fi';
import { PiUserFill } from 'react-icons/pi';

const Modal = ({ colid, id, showModal, setShowModal, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    priority: '',
    deadline: '',
    description: '',
    assignedTo: [],
    workspaceMembers: [],
  });

  useEffect(() => {
    if (showModal) {
      fetch(`http://localhost:8000/taskhive/workspaces/${id}`, {
        credentials: "include"
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData((prevData) => ({
            ...prevData,
            workspaceMembers: data.members,
          }));
        })
        .catch((error) => console.error('Error fetching workspace members:', error));
    }
  }, [showModal, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMemberChange = (selectedMembers) => {
    setFormData((prevData) => ({
      ...prevData,
      assignedTo: selectedMembers,
    }));
  };

  const toggleFavoured = () => {
    setFormData((prevData) => ({
      ...prevData,
    }));
  };

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
console.log(formData);;
    try {
      const response = await fetch('http://localhost:8000/taskhive/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          deadline: formData.deadline,
          workspace: id, // workspace id
          assignedTo: formData.assignedTo,
          columns: colid // column id
        }),
        credentials: "include"
      });
   console.log(response,colid)
      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const task = await response.json();
      console.log('Task created:', task);
      setShowModal(false); // Close the modal on success
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <div className="absolute flex justify-center items-center gap-5 top-4 right-4 bg-transparent text-gray-500 hover:text-gray-800 transition-all duration-200 ease-in-out">
          {formData.favoured ? (
            <FaStar size={20} onClick={toggleFavoured} className="text-yellow-500 cursor-pointer" />
          ) : (
            <FiStar size={20} onClick={toggleFavoured} className="cursor-pointer" />
          )}
          <FiX size={24} className="cursor-pointer" onClick={() => setShowModal(false)} />
        </div>
        <form onSubmit={(e) => handleSubmit(e, formData)} className="space-y-6">
          <div className="flex items-center gap-2">
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              className="text-2xl font-bold w-full border-0 focus:outline-none border-b-2 border-gray-200 pb-2"
              required
            />
          </div>
          <div className="flex justify-start gap-4 w-full items-center">
            {loading ? <FiLoader size={20} className="animate-spin" /> : null}
            <label className="font-bold">Status</label>
            <FiTag size={20} />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="block w-1/2 bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out"
            >
              <option value="">Not Selected</option>
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-start gap-4 w-full items-center">
            <label className="font-bold">Priority</label>
            <FiClipboard size={20} />
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="block w-1/2 bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out"
            >
              <option value="">Not Selected</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="flex justify-start gap-4 w-full items-center">
            <label className="font-bold">Deadline</label>
            <FiClock size={20} />
            <input
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleInputChange}
              className="block w-1/2 bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out"
            />
          </div>
          <div className="flex justify-start gap-4 w-full items-center">
            <label className="font-bold">Description</label>
            <FiAlignLeft size={20} />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out"
          ></textarea>
          <div className="flex justify-start gap-4 w-full items-center">
            <label className="font-bold">Assign To</label>
            <PiUserFill size={20} />
          </div>
          <select
            name="assignedTo"
            multiple
            value={formData.assignedTo}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                assignedTo: Array.from(e.target.selectedOptions, (option) => option.value),
              }))
            }
            className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ease-in-out"
          >
            {formData.workspaceMembers.length > 0 ? (
              formData.workspaceMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No members added
              </option>
            )}
          </select>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-purple-500 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
