import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ defaultCity }) => {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [forecastData, setForecastData] = useState([]);
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

  const showForecast = (response) => {
    setForecastData(response.data.daily.slice(0, 5)); // Get 5-day forecast
  };

  const search = () => {
    const apiKey = 'YOUR_API_KEY';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&units=imperial&appid=${apiKey}`;

    axios.get(weatherUrl).then(showTemperature);
    axios.get(forecastUrl).then(showForecast);
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
            {forecastData.map((day, index) => (
              <div key={index} className="forecast-day">
                <p>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <p>High: {day.temp.max}°F</p>
                <p>Low: {day.temp.min}°F</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
};

export default Weather;
