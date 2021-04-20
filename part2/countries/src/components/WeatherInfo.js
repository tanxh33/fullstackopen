import React from 'react';
import PropTypes from 'prop-types';

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

WeatherInfo.propTypes = {
  location: PropTypes.string.isRequired,
  // eslint-disable-next-line
  weather: PropTypes.object.isRequired,
};

export default WeatherInfo;
