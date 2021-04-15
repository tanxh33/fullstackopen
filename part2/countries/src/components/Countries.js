import React from 'react';
import PropTypes from 'prop-types';
import Country from './Country';

const Countries = ({ countries }) => {
  if (countries.length === 0) {
    return <p>Enter a search term.</p>;
  }
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} initOpen />;
  }
  return (
    <div>
      {countries.map((country) => (
        <Country key={country.numericCode} country={country} />
      ))}
    </div>
  );
};

Countries.propTypes = {
  // eslint-disable-next-line
  countries: PropTypes.array.isRequired,
};

export default Countries;
