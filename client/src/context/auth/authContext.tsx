import { createContext } from 'react';
import { AuthAction } from './authTypes';

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IError {
  error: string | Record<string, any>;
}

export interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: IUser | null;
  error: IError | null;
}

export interface IAuthContext {
  state: IAuthState | null;
  dispatch: React.Dispatch<AuthAction>;
}

const initialState: IAuthContext = {
  state: null,
  dispatch: () => {},
};

const authContext = createContext(initialState);

export default authContext;
