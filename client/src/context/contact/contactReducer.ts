import { IContactState } from './contactContext';
import { ContactAction } from './contactTypes';

const ContactReducer = (state: IContactState, action: ContactAction) => {
  switch (action.type) {
    case 'GET_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts!],
        loading: false,
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts!.filter(
          (contact) => contact._id !== action.payload
        ),
        loading: false,
      };
    case 'CLEAR_CONTACTS':
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null,
      };
    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload,
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        current: null,
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts!.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false,
      };
    case 'FILTER_CONTACTS':
      return {
        ...state,
        filtered: state.contacts!.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        filtered: null,
      };
    case 'CONTACT_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default ContactReducer;
