import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState('Seattle');
  const [weather, setWeather] = useState(null);

  const fetchWeather = useCallback(async () => {
    try {
      console.log('Fetching weather for:', location);
      const response = await axios.get(`/.netlify/functions/getWeather?location=${location}`);
      console.log('Weather data received:', response.data);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [location]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <div className="weather-app">
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>
      {weather && weather.main && weather.weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{Math.round(weather.main.temp)}°F</p>
          <p>{weather.weather[0].description}</p>
          <div>
            <h3>AI Weather Insight</h3>
            <p>{weather.aiInsight}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
