import { useCallback, useEffect, useReducer } from 'react';
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

  // Load User
  const loadUser = async () => {
    console.log('Load User');

    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // watch state.token and set headers and local storage on any change
  useEffect(() => {
    console.log('State changed');
    setAuthToken(state.token);
    if (localStorage.token) {
      console.log('Login effect');
      loadUser();
    }
  }, [state.token]);

  // Register User
  const registerUser = async (formData) => {
    console.log('Register User');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      // loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };

  // Login User
  const loginUser = async (formData) => {
    console.log('Login User');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      // loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  // Logout
  const logoutUser = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = useCallback(() => dispatch({ type: CLEAR_ERRORS }), []);

  // load user on first run or refresh
  if (state.loading) {
    loadUser();
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        registerUser,
        loginUser,
        logoutUser,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
