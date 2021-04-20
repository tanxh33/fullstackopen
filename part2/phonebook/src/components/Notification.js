import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
  const notificationStyle = {
    margin: '0.5rem auto',
    padding: '1rem',
    border: '2px solid',
    borderRadius: '0.25rem',
  };

  if (message === null) {
    return null;
  }
  return (
    <div className={type} style={notificationStyle}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string.isRequired,
};

Notification.defaultProps = {
  message: null,
};

export default Notification;
