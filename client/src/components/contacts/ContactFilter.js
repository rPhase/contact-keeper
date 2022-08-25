import React, { useEffect, useRef } from 'react';
import {
  useContacts,
  filterContacts,
  clearFilter,
} from '../../context/contact/ContactState';

const ContactFilter = () => {
  const [contactState, contactDispatch] = useContacts();
  const { filtered } = contactState;

  const textRef = useRef('');

  useEffect(() => {
    if (filtered === null) {
      textRef.current.value = '';
    }
  }, [filtered]);

  const onChangeHandler = (e) => {
    if (textRef.current.value !== '') {
      filterContacts(contactDispatch, e.target.value);
    } else {
      clearFilter(contactDispatch);
    }
  };

  return (
    <form>
      <input
        ref={textRef}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChangeHandler}
      />
    </form>
  );
};

export default ContactFilter;
