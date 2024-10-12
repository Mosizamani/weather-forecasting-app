import React from 'react';
import TemperatureToggle from './TemperatureToggle'

const WeatherDisplay = ({ data, toggleUnit, unit }) => {
  // Safely access the temperature and other properties
  const temp = data?.main?.temp
  const humidity = data?.main?.humidity
  const windSpeed = data?.wind?.speed
  const cityName = data?.name
  const realFeel = data?.main?.feels_like
  
  
  // If data is not available yet, return a placeholder
  if (!temp || !humidity || !windSpeed || !cityName) {
    return <p>Weather data is not available</p>
  }

  // Convert to Fahrenheit if the unit is imperial (°F)
  const displayTemp = unit === 'metric' ? temp : (temp * 9/5) + 32
  const realfeelT = unit === 'metric' ? realFeel : (realFeel * 9/5) + 32

  return (
    <div>
      <h1>{cityName}</h1>
      <p>{displayTemp.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
        <p>Real Feel: {realfeelT.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} m/s</p>

      {/* Use the TemperatureToggle component */}
      <TemperatureToggle toggleUnit={toggleUnit} unit={unit} />
    </div>
  )
}

export default WeatherDisplay