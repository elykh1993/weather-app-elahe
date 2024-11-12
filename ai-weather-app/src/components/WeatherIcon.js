// src/components/WeatherIcon.js
import React from "react";

const WeatherIcon = ({ description }) => {
  const basePath = "/128x128/";
  const descriptionToIconMap = {
    "light rain": "chancerain.png",
    "mist": "hazy.png",
    "drizzle": "rain.png",
    "clear sky": "clear.png",
    "few clouds": "cloudy.png",
    "scattered clouds": "mostlycloudy.png",
    "broken clouds": "partlycloudy.png",
    "shower rain": "nt_rain.png",
    "rain": "nt_rain.png",
    "thunderstorm": "nt_tstorms.png",
    "snow": "nt_snow.png",
    "fog": "nt_fog.png",
    // Add more mappings as needed
  };

  // Get the appropriate file name based on the description
  const iconFileName = descriptionToIconMap[description.toLowerCase()] || "clear.png";

  // Return the image element with the correct path
  return <img src={`${basePath}${iconFileName}`} alt={description} />;
};

export default WeatherIcon;
