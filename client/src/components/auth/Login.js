import React, { useContext, useEffect, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, loginUser, clearErrors } from '../../context/auth/AuthState';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const alertCtx = useContext(AlertContext);
  const { setAlert, handleAlerts } = alertCtx;

  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error) {
      handleAlerts(error);
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, handleAlerts, navigate, authDispatch]);

  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      loginUser(authDispatch, { email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
