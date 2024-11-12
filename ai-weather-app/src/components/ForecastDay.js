// src/components/ForecastDay.js
import React from "react";
import WeatherIcon from "./WeatherIcon";
import FormatDate from "./FormatDate";

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

  return (
    <div className="forecast-day">
      <p>{formattedDate()}</p>
      <WeatherIcon description={data.weather[0].description} />
      <p>{maxTemperature()} | {minTemperature()}</p>
    </div>
  );
};

export default ForecastDay;
