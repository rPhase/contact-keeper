import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
  const authCtx = useContext(AuthContext);
  const { isAuthenticated, loading } = authCtx;
  if (loading) return <p>Loading...</p>;
  if (isAuthenticated) return <Component />;
  return <Navigate to='/login' />;
};

export default PrivateRoute;
