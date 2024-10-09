// src/components/ForecastDisplay.jsx
import React from 'react';
import './ForecastDisplay.css'; // Optional: Create this file for custom styles

const ForecastDisplay = ({ forecastData, unit }) => {
  return (
    <div className="forecast-container">
      <h2>10-Day Forecast</h2>
      <div className="forecast-grid">
        {forecastData.daily.slice(0, 10).map((day, index) => {
          const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          });
          const temp = unit === 'metric' ? day.temp.day : (day.temp.day * 9/5) + 32; // Convert to Fahrenheit
          const weather = day.weather[0].description;
          const icon = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

          return (
            <div key={index} className="forecast-day">
              <p>{date}</p>
              <img src={icon} alt={weather} />
              <p>{temp.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
              <p>{weather}</p>
              <button onClick={() => alert(`More details for ${date}`)}>More Details</button> {/* More details button */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastDisplay;

