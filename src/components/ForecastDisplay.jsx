import React from 'react';

const ForecastDisplay = ({ forecastData }) => {
  // Group data by day
  const dailyData = forecastData.list.reduce((acc, forecast) => {
    const date = new Date(forecast.dt_txt).toLocaleDateString(); // Get only the date part
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(forecast); // Push the forecast data to the respective date group
    return acc;
  }, {});

  // Get max and min temp for each day
  const dailyForecasts = Object.keys(dailyData).map((date) => {
    const dayForecasts = dailyData[date]
    const temps = dayForecasts.map((entry) => entry.main.temp)
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)
    const condition = dayForecasts[0].weather[0].description; // Using the first entry for condition

    return { date, minTemp, maxTemp, condition }
  })

  return (
    <div>
      <h2>5-Day Forecast</h2>
      <ul>
        {dailyForecasts.map((forecast, index) => (
          <li key={index}>
            <p>{forecast.date}</p>
            <p>Max: {forecast.maxTemp.toFixed(1)}°C</p>
            <p>Min: {forecast.minTemp.toFixed(1)}°C</p>
            <p>Condition: {forecast.condition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForecastDisplay

