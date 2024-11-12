import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ defaultCity }) => {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(defaultCity);

  const showTemperature = (response) => {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      city: response.data.name,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      icon: response.data.weather[0].icon,
      date: new Date(response.data.dt * 1000),
    });
  };

  const search = () => {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    axios.get(url).then(showTemperature);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    search();
  };

  const updateCity = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    search();
  }, []);

  if (weatherData.ready) {
    return (
      <div>
        <form onSubmit={handleSearch}>
          <input type="text" value={city} onChange={updateCity} placeholder="Enter a city..." />
          <button type="submit">Search</button>
        </form>
        <div>
          <h2>{weatherData.city}</h2>
          <p>{weatherData.temperature}°F</p>
          <p>{weatherData.description}</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind: {weatherData.wind} mph</p>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
};

export default Weather;
