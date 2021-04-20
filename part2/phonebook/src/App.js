import React, { useState, useEffect } from 'react';
import AddEntryForm from './components/AddEntryForm';
import Search from './components/Search';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);

  // States keeping track of strings within input text fields.
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [notification, setNotification] = useState({ message: null, type: '' });
  const notificationDuration = 5000;

  const appBodyStyle = {
    margin: 'auto',
    padding: '2rem',
  };

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

  const handleNameInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneInputChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const setTempNotification = (message, type, duration) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: '' });
    }, duration);
  };

  const updatePerson = (id, changedPerson) => {
    personService
      .update(id, changedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map((person) => (person.id !== id ? person : returnedPerson)));
        setNewName('');
        setNewPhone('');
        setTempNotification(`Updated ${newName} contact`, 'success', notificationDuration);
      })
      .catch((error) => {
        console.error(error);
        setTempNotification(
          `The person ${changedPerson.name} has already been deleted from the server`,
          'error',
          notificationDuration,
        );
        setPersons(persons.filter((person) => person.id !== id));
        setNewName('');
        setNewPhone('');
      });
  };

  // Form submission handler.
  const addPerson = (e) => {
    e.preventDefault(); // Prevent HTML form submission

    // Simple error handling.
    if (newName === '' || newPhone === '') {
      setTempNotification('Fields need to be filled in', 'error', notificationDuration);
      return;
    }

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
        setTempNotification(`Added ${newName}`, 'success', notificationDuration);
      })
      .catch((error) => {
        console.error(error);
        setTempNotification('Error adding new entry', 'error', notificationDuration);
      });
  };

  const deletePerson = (id, name) => {
    // eslint-disable-next-line
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteEntry(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setTempNotification(`Deleted ${name}`, 'success', notificationDuration);
        })
        .catch((error) => {
          console.log(error);

          setTempNotification(`Error deleting ${name}`, 'error', notificationDuration);
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
    <div style={appBodyStyle}>
      <h1 className="mb-xs">Phonebook</h1>
      <Notification message={notification.message} type={notification.type} />
      <Search searchTerm={searchTerm} searchHandler={handleSearchInputChange} />
      <h2>Add a new entry</h2>
      <AddEntryForm
        newName={newName}
        newPhone={newPhone}
        nameHandler={handleNameInputChange}
        phoneHandler={handlePhoneInputChange}
        submitHandler={addPerson}
      />
      <h2 className="mb-xs">Numbers</h2>
      <Persons persons={personsToShow} deleteHandler={deletePerson} />
    </div>
  );
};

export default App;
