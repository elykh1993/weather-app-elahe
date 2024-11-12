// src/components/ForecastDay.js
import React from "react";
import WeatherIcon from "./WeatherIcon";

const ForecastDay = ({ data }) => {
  function maxTemperature() {
    // Access temp_max directly from data.main
    return `${Math.round(data.main.temp_max)}°F`;
  }

  function minTemperature() {
    // Access temp_min directly from data.main
    return `${Math.round(data.main.temp_min)}°F`;
  }

  function day() {
    const date = new Date(data.dt * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  return (
    <div className="forecast-day">
      <p>{day()}</p>
      <WeatherIcon description={data.weather[0].description} />
      <p>High: {maxTemperature()}</p>
      <p>Low: {minTemperature()}</p>
    </div>
  );
};

export default ForecastDay;
