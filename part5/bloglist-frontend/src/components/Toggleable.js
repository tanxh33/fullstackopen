import React, { useState } from 'react';

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        {/* eslint-disable-next-line */}
        <button onClick={toggleVisibility} type="button">{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {/* props.children references the child components, empty array if none */}
        {/* eslint-disable-next-line */}
        {props.children}
        <button onClick={toggleVisibility} type="button">Cancel</button>
      </div>
    </div>
  );
};

export default Toggleable;
