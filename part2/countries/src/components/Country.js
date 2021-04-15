import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from './Button';
import WeatherInfo from './WeatherInfo';

const Country = ({ country, initOpen = false }) => {
  const [open, setOpen] = useState(initOpen);
  const [weather, setWeather] = useState();

  // Fetch country weather data from OpenWeather API.
  useEffect(() => {
    // Run on component load.
    const getWeather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeather(response.data);
    };
    getWeather();
  }, []);

  const toggleOpen = () => {
    const newState = !open;
    setOpen(newState);
  };

  // An unopened component shows only the country name and a button to open it.
  if (!open) {
    return (
      <div>
        {country.name}
        <Button text="show" clickHandler={toggleOpen} />
      </div>
    );
  }

  // Opened component shows more country information.
  return (
    <div>
      <h1>{country.name}</h1>
      <Button text="hide" clickHandler={toggleOpen} />
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
      {weather
        ? <WeatherInfo location={country.capital} weather={weather} />
        : <div>Weather information unavailable</div>}
    </div>
  );
};

Country.propTypes = {
  // eslint-disable-next-line
  country: PropTypes.object.isRequired,
  initOpen: PropTypes.bool,
};

Country.defaultProps = {
  initOpen: false,
};

export default Country;
