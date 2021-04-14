import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEntryForm from './components/AddEntryForm';
import Search from './components/Search';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  // States keeping track of strings within input text fields.
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // By default, effects run after every completed render, but
  // you can choose to fire it only when certain values have changed.
  // An empty array as the second parameter makes it run only on the
  // first render of the component.
  useEffect(() => {
    console.log('effect');
    // Fetch data from the server, then set it to the application state.

    // Using .then() to get a promise:
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then((response) => {
    //     console.log('promise fulfilled');
    //     setPersons(response.data);
    //   });

    // Using async/await syntax:
    const fetchPersons = async () => {
      const response = await axios.get('http://localhost:3001/persons');
      setPersons(response.data);
    };
    fetchPersons();
  }, []);

  console.log('render', persons.length, 'persons'); // Check when re-rendering

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
      number: newPhone,
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
