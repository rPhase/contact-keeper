import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertCtx = useContext(AlertContext);
  return (
    alertCtx.alerts.length > 0 &&
    alertCtx.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
