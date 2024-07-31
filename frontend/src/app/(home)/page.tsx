"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/lib/hooks";
import { checkAuth, clearUser } from "../../redux/features/userSlice";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt, FaSpinner } from "react-icons/fa";
import { fetchUsers } from "@/redux/features/authuser";
import WorkspacesPage from "../../components/Worspacesshow";

const AuthStatus: React.FC = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { isAuthenticated, user, loading, error } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading || isAuthenticated === undefined) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 border border-gray-200 rounded-md max-w-sm mx-auto">
        <FaSpinner className="text-blue-500 animate-spin text-3xl" />
        <p className="mt-4 text-lg text-gray-700">Checking authentication status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 border border-gray-200 rounded-md max-w-sm mx-auto">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
   <WorkspacesPage/>
  );
};

export default AuthStatus;
