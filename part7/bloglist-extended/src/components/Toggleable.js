import React, { useState, useImperativeHandle } from 'react';
import { Button } from '../Styled/Components';

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
        <Button primary onClick={toggleVisibility} type="button">{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="toggleableContent">
        {/* props.children references the child components, empty array if none */}
        {props.children}
        <Button onClick={toggleVisibility} type="button">Cancel</Button>
      </div>
    </div>
  );
});

export default Toggleable;
