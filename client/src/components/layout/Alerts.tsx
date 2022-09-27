import { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertCtx = useContext(AlertContext);
  if (alertCtx.alerts.length > 0) {
    return (
      <>
        {alertCtx.alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            <i className='fas fa-info-circle' /> {alert.msg}
          </div>
        ))}
      </>
    );
  }

  return null;
};

export default Alerts;
