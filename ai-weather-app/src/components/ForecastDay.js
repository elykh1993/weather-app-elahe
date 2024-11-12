// ForecastDay.js
import React from "react";
import WeatherIcon from "./WeatherIcon";

const ForecastDay = ({ data }) => {
  function maxTemperature() {
    let temperature = Math.round(data.temp.max);
    return `${temperature}°F`;
  }

  function minTemperature() {
    let temperature = Math.round(data.temp.min);
    return `${temperature}°F`;
  }

  function day() {
    const date = new Date(data.dt * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  return (
    <div className="forecast-day">
      <p>{day()}</p>
      <WeatherIcon code={data.weather[0].icon} />
      <p>High: {maxTemperature()}</p>
      <p>Low: {minTemperature()}</p>
    </div>
  );
};

export default ForecastDay;
