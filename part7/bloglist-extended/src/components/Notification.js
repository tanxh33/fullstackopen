import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, style } = useSelector((state) => state.notification);

  const notificationStyle = {
    margin: '0.5rem auto',
    padding: '1rem',
    border: '2px solid',
    borderRadius: '0.25rem',
  };

  if (!message) {
    return null;
  }
  return (
    <div className={style} style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
