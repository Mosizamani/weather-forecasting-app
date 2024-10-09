// src/components/WeatherDisplay.jsx
import React from 'react';

const WeatherDisplay = ({ data, toggleTemperatureUnit, unit }) => {
  const temp = unit === 'metric' ? data.main.temp : (data.main.temp * 9/5) + 32; // Convert to Fahrenheit
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{temp.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
      <button onClick={toggleTemperatureUnit}>Toggle °C/°F</button> {/* Toggle button */}
    </div>
  )
}

export default WeatherDisplay
