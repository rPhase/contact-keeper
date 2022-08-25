import React, { useContext, useEffect, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';
import {
  useAuth,
  registerUser,
  clearErrors,
} from '../../context/auth/AuthState';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const alertCtx = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();

  const { setAlert } = alertCtx;
  const { error, isAuthenticated } = authState;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, setAlert, navigate, authDispatch]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser(authDispatch, {
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChangeHandler}
            required
          />
        </div>
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
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChangeHandler}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;