import React from 'react';
import {
  useContacts,
  deleteContact,
  setCurrent,
  clearCurrent,
} from '../../context/contact/ContactState';
import { IContact } from '../../context/contact/contactContext';
import { ContactAction } from '../../context/contact/contactTypes';

const ContactItem = ({ contact }: { contact: IContact }) => {
  const contactDispatch = useContacts()[1] as React.Dispatch<ContactAction>;

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(contactDispatch, _id!);
    clearCurrent(contactDispatch);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contactDispatch, contact)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
