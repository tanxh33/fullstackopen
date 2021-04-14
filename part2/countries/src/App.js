import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Countries = ({ countries }) => {
  if (countries.length === 0) {
    return <p>Enter a search term.</p>;
  }
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  return (
    <div>
      {countries.map((country) => (
        <div key={country.numericCode}>
          {country.name}
        </div>
      ))}
    </div>
  );
};

const Country = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <div>
      {`Capital: ${country.capital}`}
    </div>
    <div>
      {`Population: ${country.population}`}
    </div>
    <h2>Languages</h2>
    <ul>
      {country.languages && country.languages.map((lang) => (
        <li key={lang.iso639_1}>
          {`${lang.name}, ${lang.nativeName}`}
        </li>
      ))}
    </ul>
    <img src={country.flag} alt={`${country.name} flag`} width="200" />
  </div>
);

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch country data from REST Countries API on first render.
  useEffect(() => {
    const fetchCountries = async () => {
      const url = 'https://restcountries.eu/rest/v2/all';
      const response = await axios.get(url);
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const countriesToShow = searchTerm === ''
    ? []
    : countries.filter(
      (country) => country.name.toUpperCase().includes(searchTerm.toUpperCase()),
    );

  return (
    <div>
      <h1>Countries</h1>
      <div>
        Find countries:
        {' '}
        <input value={searchTerm} onChange={handleSearch} />
      </div>
      <Countries countries={countriesToShow} />
    </div>
  );
};

Countries.propTypes = {
  // eslint-disable-next-line
  countries: PropTypes.array.isRequired,
};

Country.propTypes = {
  // eslint-disable-next-line
  country: PropTypes.object.isRequired,
};

export default App;
