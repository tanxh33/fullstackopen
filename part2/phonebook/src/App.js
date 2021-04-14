import React, { useState } from 'react';
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

const Persons = ({ persons }) => (
  <ul>
    {persons.map(
      (person) => (
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          phoneNum={person.phoneNum}
        />
      ),
    )}
  </ul>
);

const Person = ({ id, name, phoneNum }) => (
  <li>
    {id}
    {' '}
    {name}
    {' '}
    {phoneNum}
  </li>
);

const Search = ({ searchTerm, searchHandler }) => (
  <div>
    Search:
    <br />
    <input value={searchTerm} onChange={searchHandler} />
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Emma Watson',
      phoneNum: '007-1234567',
    },
    {
      id: 2,
      name: 'Hermione Granger',
      phoneNum: '343-2401028',
    },
    {
      id: 3,
      name: 'Luna Lovegood',
      phoneNum: '123-9999999',
    },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleNameInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneInputChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault(); // Prevent HTML form submission
    if (persons.find((person) => person.name === newName)) {
      // eslint-disable-next-line
      alert(`${newName} is already in the phonebook`);
      return;
    }
    if (newName === '') return;

    const personObject = {
      id: persons.length + 1,
      name: newName,
      phoneNum: newPhone,
    };

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewPhone('');
  };

  const personsToShow = searchTerm === ''
    ? persons
    : persons.filter(
      (person) => person.name.toUpperCase().includes(searchTerm.toUpperCase()),
    );

  return (
    <div>
      <h1>Phonebook</h1>
      <Search searchTerm={searchTerm} searchHandler={handleSearchInputChange} />
      <h2>Add a new entry</h2>
      <AddEntryForm
        newName={newName}
        newPhone={newPhone}
        nameHandler={handleNameInputChange}
        phoneHandler={handlePhoneInputChange}
        submitHandler={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

AddEntryForm.propTypes = {
  newName: PropTypes.string.isRequired,
  newPhone: PropTypes.string.isRequired,
  nameHandler: PropTypes.func.isRequired,
  phoneHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

Persons.propTypes = {
  // eslint-disable-next-line
  persons: PropTypes.array.isRequired,
};

Person.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phoneNum: PropTypes.string.isRequired,
};

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

export default App;
