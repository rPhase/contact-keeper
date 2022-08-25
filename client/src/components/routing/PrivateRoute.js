import React from 'react';
import { useAuth } from '../../context/auth/AuthState';
import { Navigate } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component }) => {
  const authState = useAuth()[0];
  const { isAuthenticated, loading } = authState;
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;
  return <Navigate to='/login' />;
};

export default PrivateRoute;
