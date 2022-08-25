import { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

// Create a custom hook to use the auth context
export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

// Action creators

// Load User
export const loadUser = async (dispatch) => {
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const registerUser = async (dispatch, formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/users', formData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
  }
};

// Login User
export const loginUser = async (dispatch, formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/auth', formData, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
  }
};

// Logout
export const logoutUser = (dispatch) => dispatch({ type: LOGOUT });

// Clear Errors
export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

// AuthState Provider
const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
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
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
