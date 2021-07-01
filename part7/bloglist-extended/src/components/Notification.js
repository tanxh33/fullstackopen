import React from 'react';
import { useSelector } from 'react-redux';
import { NotificationDiv } from '../Styled/Notification';

const Notification = () => {
  const { message, style } = useSelector((state) => state.notification);

  if (!message) {
    return null;
  }
  return (
    <NotificationDiv notificationType={style}>
      {message}
    </NotificationDiv>
  );
};

export default Notification;
