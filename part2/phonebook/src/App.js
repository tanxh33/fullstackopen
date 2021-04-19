import React, { useState, useEffect } from 'react';
import AddEntryForm from './components/AddEntryForm';
import Search from './components/Search';
import Persons from './components/Persons';
import personService from './services/persons';

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
    // console.log('effect');
    // Fetch data from the server, then set it to the application state.
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      });
  }, []);

  // console.log('render', persons.length, 'persons'); // Check when re-rendering

  const handleNameInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneInputChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const updatePerson = (id, changedPerson) => {
    personService
      .update(id, changedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map((person) => (person.id !== id ? person : returnedPerson)));
        setNewName('');
        setNewPhone('');
      })
      .catch((error) => {
        console.error(error);
        // eslint-disable-next-line
        alert(`The person ${changedPerson.name} has already been deleted from the server`);
        setPersons(persons.map((person) => person.id !== id));
        setNewName('');
        setNewPhone('');
      });
  };

  // Form submission handler.
  const addPerson = (e) => {
    e.preventDefault(); // Prevent HTML form submission

    // Simple error handling.
    if (newName === '' || newPhone === '') return;

    // Update phone number if name already exists
    const personExists = persons.find((person) => person.name === newName);
    if (personExists) {
      // eslint-disable-next-line
      if (window.confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(personExists.id, { ...personExists, number: newPhone });
      }
      return;
    }

    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newPhone,
    };

    // Update the backend database server:
    personService
      .create(personObject)
      .then((returnedNote) => {
        setPersons(persons.concat(returnedNote));
        setNewName('');
        setNewPhone('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deletePerson = (id, name) => {
    // eslint-disable-next-line
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteEntry(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      <Persons persons={personsToShow} deleteHandler={deletePerson} />
    </div>
  );
};

export default App;
