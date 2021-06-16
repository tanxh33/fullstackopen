import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 2,
    borderRadius: '0.25rem',
  };

  if (notification !== '') {
    return (
      <div style={style}>
        {notification}
      </div>
    );
  }
  return (<></>);
};

export default Notification;
