import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { IAuthState } from '../../context/auth/authContext';
import { useAuth, logoutUser } from '../../context/auth/AuthState';
import { AuthAction } from '../../context/auth/authTypes';
import { useContacts, clearContacts } from '../../context/contact/ContactState';
import { ContactAction } from '../../context/contact/contactTypes';

const Navbar = ({ icon, title }: { icon: string; title: string }) => {
  const [authState, authDispatch] = useAuth() as [
    IAuthState,
    React.Dispatch<AuthAction>
  ];
  const contactDispatch = useContacts()[1] as React.Dispatch<ContactAction>;

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
        <NavLink to='/'>
          <i className={icon} /> {title}
        </NavLink>
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

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
