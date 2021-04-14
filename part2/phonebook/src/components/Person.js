import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ id, name, number }) => (
  <li>
    {id}
    {' '}
    {name}
    {' '}
    {number}
  </li>
);

Person.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Person;
