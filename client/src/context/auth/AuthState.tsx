import React, { Dispatch, useContext, useEffect, useReducer } from 'react';
import axios, { AxiosError } from 'axios';
import AuthContext, { IAuthState } from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import { AuthAction, AuthActionTypes } from './authTypes';

// Create a custom hook to use the auth context
export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

// Action creators

// Load User
export const loadUser = async (dispatch: Dispatch<AuthAction>) => {
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: AuthActionTypes.USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AuthActionTypes.AUTH_ERROR });
  }
};

// Register User
export const registerUser = async (
  dispatch: Dispatch<AuthAction>,
  formData: HTMLFormElement
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/users', formData, config);
    dispatch({ type: AuthActionTypes.REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: AuthActionTypes.REGISTER_FAIL,
      payload: (error as AxiosError).response!.data,
    });
  }
};

// Login User
export const loginUser = async (
  dispatch: Dispatch<AuthAction>,
  formData: HTMLFormElement
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/auth', formData, config);
    dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: AuthActionTypes.LOGIN_FAIL,
      payload: (error as AxiosError).response!.data,
    });
  }
};

// Logout
export const logoutUser = (dispatch: Dispatch<AuthAction>) =>
  dispatch({ type: AuthActionTypes.LOGOUT });

// Clear Errors
export const clearErrors = (dispatch: Dispatch<AuthAction>) =>
  dispatch({ type: AuthActionTypes.CLEAR_ERRORS });

// AuthState Provider
const AuthState = ({ children }: { children: React.ReactNode }) => {
  const initialState: IAuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // set token on initial app loading
  setAuthToken(state.token);

  // watch state.token and set headers and local storage on any change
  // load the current user if token is found in local storage
  useEffect(() => {
    setAuthToken(state.token);
    if (localStorage.token) {
      loadUser(dispatch);
    }
  }, [state.token]);

  // load user on first run or refresh
  if (state.loading) {
    loadUser(dispatch);
  }

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
