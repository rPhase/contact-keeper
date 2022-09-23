export enum ContactActionTypes {
  ADD_CONTACT = 'ADD_CONTACT',
  DELETE_CONTACT = 'DELETE_CONTACT',
  SET_CURRENT = 'SET_CURRENT',
  CLEAR_CURRENT = 'CLEAR_CURRENT',
  UPDATE_CONTACT = 'UPDATE_CONTACT',
  FILTER_CONTACTS = 'FILTER_CONTACTS',
  CLEAR_FILTER = 'CLEAR_FILTER',
  CONTACT_ERROR = 'CONTACT_ERROR',
  GET_CONTACTS = 'GET_CONTACTS',
  CLEAR_CONTACTS = 'CLEAR_CONTACTS',
  CLEAR_ERRORS = 'CLEAR_ERRORS',
}

interface ADD_CONTACT {
  type: ContactActionTypes.ADD_CONTACT;
  payload: any;
}
interface DELETE_CONTACT {
  type: ContactActionTypes.DELETE_CONTACT;
  payload: any;
}
interface SET_CURRENT {
  type: ContactActionTypes.SET_CURRENT;
  payload: any;
}
interface CLEAR_CURRENT {
  type: ContactActionTypes.CLEAR_CURRENT;
  payload?: any;
}
interface UPDATE_CONTACT {
  type: ContactActionTypes.UPDATE_CONTACT;
  payload: any;
}
interface FILTER_CONTACTS {
  type: ContactActionTypes.FILTER_CONTACTS;
  payload: any;
}
interface CLEAR_FILTER {
  type: ContactActionTypes.CLEAR_FILTER;
  payload?: any;
}
interface CONTACT_ERROR {
  type: ContactActionTypes.CONTACT_ERROR;
  payload: any;
}
interface GET_CONTACTS {
  type: ContactActionTypes.GET_CONTACTS;
  payload: any;
}
interface CLEAR_CONTACTS {
  type: ContactActionTypes.CLEAR_CONTACTS;
  payload?: any;
}
interface CLEAR_ERRORS {
  type: ContactActionTypes.CLEAR_ERRORS;
  payload?: any;
}

export type ContactAction =
  | ADD_CONTACT
  | DELETE_CONTACT
  | SET_CURRENT
  | CLEAR_CURRENT
  | UPDATE_CONTACT
  | FILTER_CONTACTS
  | CLEAR_FILTER
  | CONTACT_ERROR
  | GET_CONTACTS
  | CLEAR_CONTACTS
  | CLEAR_ERRORS;
