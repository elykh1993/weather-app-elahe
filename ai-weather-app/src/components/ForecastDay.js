// src/components/ForecastDay.js
import React from "react";
import WeatherIcon from "./WeatherIcon";
import FormatDate from "./FormatDate";

const ForecastDay = ({ data }) => {
  function maxTemperature() {
    return `${Math.round(data.main.temp_max)}°F`;
  }

  function minTemperature() {
    return `${Math.round(data.main.temp_min)}°F`;
  }

  function formattedDate() {
    return <FormatDate date={new Date(data.dt * 1000)} />;
  }

  return (
    <div className="forecast-day">
      <p>{formattedDate()}</p>
      <WeatherIcon description={data.weather[0].description} />
      <p>High: {maxTemperature()}</p>
      <p>Low: {minTemperature()}</p>
    </div>
  );
};

export default ForecastDay;
