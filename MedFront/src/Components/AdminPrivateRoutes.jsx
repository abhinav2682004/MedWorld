import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const AdminPrivateRoutes = () => {
  // const { token, role } = useAuth();
  const token=localStorage.getItem("token");
  const role=localStorage.getItem("role");
  if (!token) {
    console.log(token);
    return <Navigate to="/login" />;
  }
  if (role === 'admin') {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};
