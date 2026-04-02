import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from './Layout';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return user && user.role === 'admin' ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
