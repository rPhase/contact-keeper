import React from 'react';
import {
  useContacts,
  filterContacts,
  clearFilter,
} from '../../context/contact/ContactState';
import { ContactAction } from '../../context/contact/contactTypes';

const ContactFilter = () => {
  const contactDispatch = useContacts()[1] as React.Dispatch<ContactAction>;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      filterContacts(contactDispatch, e.target.value);
    } else {
      clearFilter(contactDispatch);
    }
  };

  return (
    <form>
      <input
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChangeHandler}
      />
    </form>
  );
};

export default ContactFilter;
