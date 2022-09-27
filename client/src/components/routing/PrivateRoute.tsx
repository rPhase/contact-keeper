import { FC } from 'react';
import { useAuth } from '../../context/auth/AuthState';
import { Navigate } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { IAuthState } from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component }: { component: FC }) => {
  const authState = useAuth()[0] as IAuthState;
  const { isAuthenticated, loading } = authState;
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;
  return <Navigate to='/login' />;
};

export default PrivateRoute;
