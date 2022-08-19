import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
  const contactCtx = useContext(ContactContext);

  const { contacts, filtered } = contactCtx;

  if (contacts.length === 0) {
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
      <TransitionGroup>
        {display.map((contact) => (
          <CSSTransition key={contact.id} timeout={700} classNames='item'>
            <ContactItem contact={contact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
