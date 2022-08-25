import React, { useEffect, useState } from 'react';
import {
  useContacts,
  addContact,
  updateContact,
  clearCurrent,
} from '../../context/contact/ContactState';

const defaultContact = {
  name: '',
  email: '',
  phone: '',
  type: 'personal',
};

const ContactForm = () => {
  const [contactState, contactDispatch] = useContacts();

  const { current } = contactState;

  const [contact, setContact] = useState(defaultContact);

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(defaultContact);
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChangeHandler = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contactDispatch, contact);
    } else {
      updateContact(contactDispatch, contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(contactDispatch);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <h2 className='text-primary'>
        {(current ? 'Edit' : 'Add') + ' Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChangeHandler}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChangeHandler}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChangeHandler}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChangeHandler}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChangeHandler}
      />{' '}
      Professional{' '}
      <div>
        <input
          type='submit'
          value={(current ? 'Update' : 'Add') + ' Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
