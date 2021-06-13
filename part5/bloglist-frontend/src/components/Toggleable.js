import React, { useState, useImperativeHandle } from 'react';

// Component function wrapped inside forwardRef function call.
const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // A React hook, used to make toggleVisbility() available outside of
  // the component, used with forwardRef.
  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        {/* eslint-disable-next-line */}
        <button onClick={toggleVisibility} type="button">{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="toggleableContent">
        {/* props.children references the child components, empty array if none */}
        {/* eslint-disable-next-line */}
        {props.children}
        <button onClick={toggleVisibility} type="button">Cancel</button>
      </div>
    </div>
  );
});

export default Toggleable;
