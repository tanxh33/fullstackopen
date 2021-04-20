import React from 'react';
import PropTypes from 'prop-types';

const AddEntryForm = (props) => {
  const debug = false;
  const {
    newName, newPhone, nameHandler, phoneHandler, submitHandler,
  } = props;
  const formStyle = {
    margin: '0.5rem auto',
  };

  return (
    <form onSubmit={submitHandler} style={formStyle}>
      <div>
        <div className="mb-s">
          <div className="mb-xs">Name:</div>
          <input value={newName} onChange={nameHandler} />
        </div>
        <div className="mb-s">
          <div className="mb-xs">Phone:</div>
          <input value={newPhone} onChange={phoneHandler} />
        </div>
      </div>
      <div className="mb-s">
        <button type="submit">Add</button>
      </div>
      {debug && <div>{`debug: ${newName} ${newPhone}`}</div>}
    </form>
  );
};

AddEntryForm.propTypes = {
  newName: PropTypes.string.isRequired,
  newPhone: PropTypes.string.isRequired,
  nameHandler: PropTypes.func.isRequired,
  phoneHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default AddEntryForm;
