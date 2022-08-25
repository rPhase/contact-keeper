import React, { Fragment, useEffect } from 'react';
import { useContacts, getContacts } from '../../context/contact/ContactState';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const [contactState, contactDispatch] = useContacts();
  const { contacts, filtered, loading } = contactState;

  useEffect(() => {
    getContacts(contactDispatch);
  }, [contactDispatch]);

  if (contacts !== null && contacts.length === 0 && !loading) {
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
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {display.map((contact) => (
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
