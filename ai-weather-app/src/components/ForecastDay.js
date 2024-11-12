// src/components/ForecastDay.js
import React from "react";
import WeatherIcon from "./WeatherIcon";


const ForecastDay = ({ data }) => {
  function maxTemperature() {
    return <strong>{Math.round(data.main.temp_max)}°F</strong>;
  }

  function minTemperature() {
    return `${Math.round(data.main.temp_min)}°F`;
  }

  function formattedDate() {
    const date = new Date(data.dt * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  function titleCaseDescription(description) {
    return description.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  return (
    <div className="forecast-day">
      <p>{formattedDate()}</p>
      <WeatherIcon description={data.weather[0].description} />
      <p>{maxTemperature()} | {minTemperature()}</p>
      <p>{titleCaseDescription(data.weather[0].description)}</p>
    </div>
  );
};

export default ForecastDay;
