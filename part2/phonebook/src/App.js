import React, { useState } from 'react';

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
      <div>
        Search:
        <br />
        <input value={searchTerm} onChange={handleSearchInputChange} />
      </div>
      <h2>Add a new entry</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>
            name:
            <br />
            <input value={newName} onChange={handleNameInputChange} />
          </div>
          <div>
            phone:
            <br />
            <input value={newPhone} onChange={handlePhoneInputChange} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>
          {`debug: ${newName} ${newPhone}`}
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(
          (person) => (
            <li key={person.id}>
              {person.name}
              {' '}
              {person.phoneNum}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default App;
