import React, { Dispatch, useContext, useReducer } from 'react';
import axios, { AxiosError } from 'axios';
import ContactContext, { IContact, IContactState } from './contactContext';
import contactReducer from './contactReducer';
import { ContactAction, ContactActionTypes } from './contactTypes';

// Create a custom hook to use contact context
export const useContacts = () => {
  const { state, dispatch } = useContext(ContactContext);
  return [state, dispatch];
};

// Action creators

// Get Contacts
export const getContacts = async (dispatch: Dispatch<ContactAction>) => {
  try {
    const res = await axios.get('/api/contacts');
    dispatch({ type: ContactActionTypes.GET_CONTACTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: ContactActionTypes.CONTACT_ERROR,
      payload: (error as AxiosError).response!.data,
    });
  }
};

// Add Contact
export const addContact = async (
  dispatch: Dispatch<ContactAction>,
  contact: IContact
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/contacts', contact, config);
    dispatch({ type: ContactActionTypes.ADD_CONTACT, payload: res.data });
  } catch (error) {
    dispatch({
      type: ContactActionTypes.CONTACT_ERROR,
      payload: (error as AxiosError).response!.data,
    });
  }
};

// Delete Contact
export const deleteContact = async (
  dispatch: Dispatch<ContactAction>,
  id: string
) => {
  try {
    await axios.delete(`/api/contacts/${id}`);
    dispatch({ type: ContactActionTypes.DELETE_CONTACT, payload: id });
  } catch (error) {
    dispatch({
      type: ContactActionTypes.CONTACT_ERROR,
      payload: (error as AxiosError).response!.data,
    });
  }
};

// Update Contact
export const updateContact = async (
  dispatch: Dispatch<ContactAction>,
  contact: IContact
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(
      `/api/contacts/${contact._id}`,
      contact,
      config
    );
    dispatch({ type: ContactActionTypes.UPDATE_CONTACT, payload: res.data });
  } catch (error) {
    dispatch({
      type: ContactActionTypes.CONTACT_ERROR,
      payload: (error as AxiosError).response!.data,
    });
  }
};

// Clear Contacts
export const clearContacts = (dispatch: Dispatch<ContactAction>) => {
  dispatch({ type: ContactActionTypes.CLEAR_CONTACTS });
};

// Set Current Contact
export const setCurrent = (
  dispatch: Dispatch<ContactAction>,
  contact: IContact
) => {
  dispatch({ type: ContactActionTypes.SET_CURRENT, payload: contact });
};

// Clear Current Contact
export const clearCurrent = (dispatch: Dispatch<ContactAction>) => {
  dispatch({ type: ContactActionTypes.CLEAR_CURRENT });
};

// Filter Contacts
export const filterContacts = (
  dispatch: Dispatch<ContactAction>,
  text: string
) => {
  dispatch({ type: ContactActionTypes.FILTER_CONTACTS, payload: text });
};
// Clear Filter
export const clearFilter = (dispatch: Dispatch<ContactAction>) => {
  dispatch({ type: ContactActionTypes.CLEAR_FILTER });
};

// Clear Errors
export const clearErrors = (dispatch: Dispatch<ContactAction>) =>
  dispatch({ type: ContactActionTypes.CLEAR_ERRORS });

const ContactState = ({ children }: { children: React.ReactNode }) => {
  const initialState: IContactState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
