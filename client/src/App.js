import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Fragment>
            <Navbar />
            <div className='container'>
              <Alerts />
              <Routes>
                <Route path='/' element={<PrivateRoute component={Home} />} />
                <Route path='/about' element={<About />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </div>
          </Fragment>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
