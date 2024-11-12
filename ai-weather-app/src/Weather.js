import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ defaultCity }) => {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(defaultCity);

  const showTemperature = (response) => {
    const weather = response.data.weather;
    const aiInsight = response.data.aiInsight;

    setWeatherData({
      ready: true,
      coordinates: weather.coord,
      temperature: weather.main.temp,
      feelsLike: weather.main.feels_like,
      tempMin: weather.main.temp_min,
      tempMax: weather.main.temp_max,
      humidity: weather.main.humidity,
      city: weather.name,
      description: weather.weather[0].description,
      wind: weather.wind.speed,
      icon: weather.weather[0].icon,
      date: new Date(weather.dt * 1000),
      aiInsight: aiInsight,
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
      <div className="weather-app">
        <form onSubmit={handleSearch}>
          <input type="text" value={city} onChange={updateCity} placeholder="Enter location" />
          <button type="submit">🔍</button>
        </form>
        <div className="weather-card">
          <h2>{weatherData.city}</h2>
          <div className="weather-info">
            <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt={weatherData.description} />
            <div>
              <p>{weatherData.temperature}°F</p>
              <p>{weatherData.description}</p>
            </div>
          </div>
          <div className="ai-insight">
            <h3>AI Weather Insight</h3>
            <p>{weatherData.aiInsight}</p>
          </div>
          <div className="weekly-forecast">
            <h3>Weekly Forecast</h3>
            <div className="forecast-day">
              <p>Mon</p>
              <p>High: 72°F</p>
              <p>Low: 60°F</p>
            </div>
            <div className="forecast-day">
              <p>Tue</p>
              <p>High: 68°F</p>
              <p>Low: 55°F</p>
            </div>
            <div className="forecast-day">
              <p>Wed</p>
              <p>High: 75°F</p>
              <p>Low: 58°F</p>
            </div>
            <div className="forecast-day">
              <p>Thu</p>
              <p>High: 70°F</p>
              <p>Low: 57°F</p>
            </div>
            <div className="forecast-day">
              <p>Fri</p>
              <p>High: 73°F</p>
              <p>Low: 59°F</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
};

export default Weather;
