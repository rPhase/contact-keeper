import { createContext } from 'react';
import { ContactAction } from './contactTypes';

export interface IContact {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  type: 'personal' | 'professional';
}

export interface IError {
  error: string | Record<string, any>;
}

export interface IContactState {
  contacts: IContact[] | null;
  current: IContact | null;
  filtered: IContact[] | null;
  error: IError | null;
}

export interface IContactContext {
  state: IContactState | null;
  dispatch: React.Dispatch<ContactAction>;
}

const initialState: IContactContext = {
  state: null,
  dispatch: () => {},
};

const contactContext = createContext(initialState);

export default contactContext;
