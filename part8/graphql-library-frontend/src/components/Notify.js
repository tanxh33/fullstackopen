import React from 'react';

const Notify = ({ notification }) => {
  const { message, type } = notification;

  if (!message) {
    return null;
  }

  const style = { color: 'inherit' };
  if (type === 'error') { style.color = 'red'; }
  if (type === 'success') { style.color = 'green'; }

  return (
    <div style={style}>
      {` ${message} `}
    </div>
  );
};

export default Notify;
