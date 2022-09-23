import { IAlert } from './alertContext';

export enum AlertActionTypes {
  SET_ALERT = 'SET_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT',
}

interface SET_ALERT {
  type: AlertActionTypes.SET_ALERT;
  payload: any;
}

interface REMOVE_ALERT {
  type: AlertActionTypes.REMOVE_ALERT;
  payload: any;
}

export type AlertAction = SET_ALERT | REMOVE_ALERT;

const AlertReducer = (state: IAlert[], action: AlertAction) => {
  switch (action.type) {
    case 'SET_ALERT':
      return [...state, action.payload];
    case 'REMOVE_ALERT':
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};

export default AlertReducer;
