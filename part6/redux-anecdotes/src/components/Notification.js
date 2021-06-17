import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Notification = (props) => {
  // Using the hook-api (recommended)
  // const notification = useSelector((state) => state.notification);

  // Using connect(), for older projects using redux
  const { notification } = props;

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 2,
    borderRadius: '0.25rem',
  };

  if (notification === '') {
    style = { ...style, display: 'none' };
  }

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
};

// Let the Notification component access/reference the state of the
// store through props.<whatever>
const mapStateToProps = (state) => ({
  notification: state.notification,
});

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
