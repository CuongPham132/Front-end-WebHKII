import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../services/auth';

const PrivateRoute = () => {
  const isAuthenticated = !!getToken();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute; 