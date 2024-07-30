"use client"
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/lib/hooks';
import { checkAuth, clearUser } from '../../redux/features/userSlice';

const AuthStatus: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <div>Checking authentication status...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div>
        <p>Welcome, {user}!</p>
        <button onClick={() => dispatch(clearUser())}>Logout</button>
      </div>
    );
  }

  return <div>Please log in to continue.</div>;
};

export default AuthStatus;