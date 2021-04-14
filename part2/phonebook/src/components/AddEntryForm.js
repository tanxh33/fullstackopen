import React from 'react';
import PropTypes from 'prop-types';

const AddEntryForm = (props) => {
  const debug = true;
  const {
    newName, newPhone, nameHandler, phoneHandler, submitHandler,
  } = props;
  return (
    <form onSubmit={submitHandler}>
      <div>
        <div>
          name:
          <br />
          <input value={newName} onChange={nameHandler} />
        </div>
        <div>
          phone:
          <br />
          <input value={newPhone} onChange={phoneHandler} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
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
