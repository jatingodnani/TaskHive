"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiAlignLeft, FiX } from "react-icons/fi";
import Select from "react-select";
import { PiUserFill } from "react-icons/pi";
import { useAppSelector } from "@/redux/lib/hooks";
import { useRouter } from "next/navigation";

const Workform = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { users } = useAppSelector((state) => state.authusers);
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    members: [],
  });

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/taskhive/workspaces",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setShowModal(false);
        router.push("/");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => setShowModal(true)}
        className="bg-purple-500 flex gap-2 items-center text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
      >
        <FaPlus className="" /> Create Workspace
      </button>
      <WorkspaceModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
        loading={loading}
        formState={formState}
        setFormState={setFormState}
        users={users}
      />
    </div>
  );
};

const WorkspaceModal = ({
  showModal,
  setShowModal,
  handleSubmit,
  loading,
  formState,
  setFormState,
  users,
}) => {
  const handleChange = (selectedOptions) => {
    setFormState((prevState) => ({
      ...prevState,
      members: selectedOptions.map((option) => option.value),
    }));
  };

  if (!showModal) return null;

  const userOptions = users.map((user) => ({
    value: user._id,
    label: user.email,
  }));

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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-2">
            <input
              placeholder="Workspace Name"
              className="text-2xl font-bold w-full border-0 focus:outline-none border-b-2 border-gray-200 pb-2"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
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
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
          ></textarea>
          <div className="flex justify-start gap-4 w-full items-center">
            <label className="font-bold">Add members</label>
            <PiUserFill size={20} />
          </div>
          <Select
            isMulti
            name="members"
            options={userOptions}
            value={userOptions.filter((option) =>
              formState.members.includes(option.value)
            )}
            onChange={handleChange}
            className="basic-multi-select"
            classNamePrefix="select"
          />
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
