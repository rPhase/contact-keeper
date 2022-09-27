import { createContext } from 'react';

export interface IAlert {
  msg: string;
  type: string;
  id?: string;
}

export interface IError {
  msg?: string;
  errors?: Record<string, string>[];
}

export interface IAlertContext {
  alerts: IAlert[];
  setAlert: (msg: string, type: string, timeout?: number) => void;
  handleAlerts: (error: IError) => void;
}

const initialState: IAlertContext = {
  alerts: [],
  setAlert: () => {},
  handleAlerts: () => {},
};

const alertContext = createContext(initialState);

export default alertContext;
