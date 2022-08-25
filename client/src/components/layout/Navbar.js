import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useAuth, logoutUser } from '../../context/auth/AuthState';
import { useContacts, clearContacts } from '../../context/contact/ContactState';

const Navbar = ({ icon, title }) => {
  const [authState, authDispatch] = useAuth();
  const contactDispatch = useContacts()[1];

  const { isAuthenticated, user } = authState;

  const onLogout = () => {
    logoutUser(authDispatch);
    clearContacts(contactDispatch);
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <NavLink to='/register'>Register</NavLink>
      </li>
      <li>
        <NavLink to='/login'>Login</NavLink>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {/* <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/about'>About</NavLink>
        </li> */}
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
