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

const Country = ({ country, initOpen = false }) => {
  const [open, setOpen] = useState(initOpen);
  const [weather, setWeather] = useState();

  useEffect(() => {
    // Run on component load.
    const getWeather = async () => {
    // Fetch country weather data from OpenWeather API.
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
      const response = await fetch(url);
      const responseData = await response.json();
      setWeather(responseData);
    };
    getWeather();
  }, []);

  const toggleOpen = () => {
    const newState = !open;
    setOpen(newState);
  };

  // Unopened component shows only the country name.
  if (!open) {
    return (
      <div>
        {country.name}
        <Button text="show" clickHandler={toggleOpen} />
      </div>
    );
  }

  // Opened component shows more country information
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

const Button = ({ text, clickHandler }) => (
  <button type="submit" onClick={clickHandler}>{text}</button>
);

const WeatherInfo = ({ location, weather }) => (
  <div>
    <h2>{`Weather in ${location}`}</h2>
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].main}`} />
    <div>
      <strong>Current condition:</strong>
      {` ${weather.weather[0].main} (${weather.weather[0].description})`}
    </div>
    <div>
      <strong>Temperature:</strong>
      {` ${weather.main.temp} °C (${weather.main.temp_min} min ~ ${weather.main.temp_max} max)`}
    </div>
    <div>
      <strong>Feels like:</strong>
      {` ${weather.main.feels_like} °C`}
    </div>
    <div>
      <strong>Wind:</strong>
      {` ${weather.wind.speed} m/s, ${weather.wind.deg}°`}
    </div>
    <div>
      {`Updated at ${new Date(weather.dt * 1000).toISOString().slice(0, 19).replace('T', ' ')} GMT`}
    </div>
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
        {'Find countries: '}
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
  initOpen: PropTypes.bool,
};

Country.defaultProps = {
  initOpen: false,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

WeatherInfo.propTypes = {
  location: PropTypes.string.isRequired,
  // eslint-disable-next-line
  weather: PropTypes.object.isRequired,
};

export default App;
