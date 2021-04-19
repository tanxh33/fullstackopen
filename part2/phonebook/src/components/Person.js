import React from 'react';
import PropTypes from 'prop-types';

const Person = ({
  id, name, number, deleteHandler,
}) => (
  <li>
    {`${id} ${name} ${number} `}
    <button
      type="button"
      onClick={() => deleteHandler(id, name)}
    >
      delete
    </button>
  </li>
);

Person.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default Person;
