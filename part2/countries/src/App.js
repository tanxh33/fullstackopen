import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch country data from REST Countries API.
  useEffect(() => {
    // Runs on first render.
    // Note that axios.get() seems to handle JSON data automatically, unlike fetch()
    const fetchCountries = async () => {
      const url = 'https://restcountries.eu/rest/v2/all';
      const response = await axios.get(url);
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  // Update searchTerm state variable according to what's typed in the search bar
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the list of countries to show from the full list, based on searchTerm.
  const countriesToShow = searchTerm === ''
    ? []
    : countries.filter(
      (country) => country.name.toUpperCase().includes(searchTerm.toUpperCase()),
    );

  return (
    <div>
      <h1>Countries</h1>
      <div>
        {'Find countries: '}
        <input value={searchTerm} onChange={handleSearch} />
      </div>
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;
