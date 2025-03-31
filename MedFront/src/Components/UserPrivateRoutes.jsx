import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const UserPrivateRoutes = () => {
  const { token, role } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (role === 'user') {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};
