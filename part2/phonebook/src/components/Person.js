import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ id, name, phoneNum }) => (
  <li>
    {id}
    {' '}
    {name}
    {' '}
    {phoneNum}
  </li>
);

Person.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phoneNum: PropTypes.string.isRequired,
};

export default Person;
