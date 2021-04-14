import React, { useState } from 'react';
import AddEntryForm from './components/AddEntryForm';
import Search from './components/Search';
import Persons from './components/Persons';

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

  // States keeping track of strings within input text fields.
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

  // Form submission handler.
  const addPerson = (e) => {
    e.preventDefault(); // Prevent HTML form submission

    // Simple error handling.
    if (newName === '' || newPhone === '') return;
    if (persons.find((person) => person.name === newName)) {
      // eslint-disable-next-line
      alert(`${newName} is already in the phonebook`);
      return;
    }

    const personObject = {
      id: persons.length + 1,
      name: newName,
      phoneNum: newPhone,
    };

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewPhone('');
  };

  // If there is a search term, filter persons[] based on the search term.
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

export default App;
