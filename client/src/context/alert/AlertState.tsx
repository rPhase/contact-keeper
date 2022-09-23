import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext, { IAlert, IError } from './alertContext';
import alertReducer, { AlertActionTypes } from './alertReducer';

const AlertState = ({ children }: { children: React.ReactNode }) => {
  const initialState: IAlert[] = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg: string, type: string, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: AlertActionTypes.SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(
      () => dispatch({ type: AlertActionTypes.REMOVE_ALERT, payload: id }),
      timeout
    );
  };

  // Handle alerts
  const handleAlerts = (error: IError) => {
    if (error.errors) {
      error.errors.map((err) => setAlert(err.msg, 'danger'));
    }
    if (error.msg) {
      setAlert(error.msg, 'danger');
    }
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        handleAlerts,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
