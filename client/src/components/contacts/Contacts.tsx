import React, { Fragment, useEffect } from 'react';
import { useContacts, getContacts } from '../../context/contact/ContactState';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';
import { IContactState } from '../../context/contact/contactContext';
import { ContactAction } from '../../context/contact/contactTypes';

const Contacts = () => {
  const [contactState, contactDispatch] = useContacts() as [
    IContactState,
    React.Dispatch<ContactAction>
  ];
  const { contacts, filtered } = contactState;

  useEffect(() => {
    getContacts(contactDispatch);
  }, [contactDispatch]);

  if (contacts !== null && contacts.length === 0) {
    return <h4>Please add a contact.</h4>;
  }

  if (filtered && filtered.length === 0) {
    return <h4>Found none.</h4>;
  }

  let display = contacts;
  if (filtered !== null) {
    display = filtered;
  }

  return (
    <Fragment>
      {contacts !== null ? (
        <TransitionGroup>
          {display!.map((contact) => (
            <CSSTransition key={contact._id} timeout={700} classNames='item'>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
