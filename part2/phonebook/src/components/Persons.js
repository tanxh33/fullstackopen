import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

const Persons = ({ persons, deleteHandler }) => {
  const listStyle = {
    listStyleType: 'none',
  };
  return (
    <ul style={listStyle}>
      {persons.map(
        (person) => (
          <Person
            key={person.id}
            id={person.id}
            name={person.name}
            number={person.number}
            deleteHandler={deleteHandler}
          />
        ),
      )}
    </ul>
  );
};

Persons.propTypes = {
  // eslint-disable-next-line
  persons: PropTypes.array.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default Persons;
