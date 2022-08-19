import React, { useContext, useEffect, useRef } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactCtx = useContext(ContactContext);
  const textRef = useRef('');

  const { filterContacts, clearFilter, filtered } = contactCtx;

  useEffect(() => {
    if (filtered === null) {
      textRef.current.value = '';
    }
  }, [filtered]);

  const onChangeHandler = (e) => {
    if (textRef.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
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
