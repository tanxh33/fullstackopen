import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const Persons = ({ persons }) => (
  <ul>
    {persons.map(
      (person) => (
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
        />
      ),
    )}
  </ul>
);

Persons.propTypes = {
  // eslint-disable-next-line
  persons: PropTypes.array.isRequired,
};

export default Persons;
