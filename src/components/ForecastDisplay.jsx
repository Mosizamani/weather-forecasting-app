import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import TemperatureToggle from './TemperatureToggle'

const ForecastDisplay = ({ forecastData }) => {

  const [showGraph, setShowGraph] = useState(false)
  const [showForecast, setShowForecast] = useState(false)
  const [unit, setUnit] = useState('metric'); // State to track the unit of temperature

  // Function to convert temperature based on the selected unit
  const convertTemp = (temp) => {
    return unit === 'metric' ? temp : (temp * 9/5) + 32
  }

  // Function to toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'))
  }

  // Group data by day
  const dailyData = forecastData.list.reduce((acc, forecast) => {
    const dateObj = new Date(forecast.dt_txt)
    const date = dateObj.toLocaleDateString() // Get the date part
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' }) // Get the day name

    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(forecast) // Push the forecast data to the respective date group
    return acc;
  }, {});

  // Get max and min temp for each day
  const dailyForecasts = Object.keys(dailyData).map((date) => {
    const dayForecasts = dailyData[date]
    const temps = dayForecasts.map((entry) => entry.main.temp)
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)
    const condition = dayForecasts[0].weather[0].description // Using the first entry for condition

    const dataObj = new Date(dayForecasts[0].dt_txt)
    const dayName = dataObj.toLocaleDateString('en-US', { weekday: 'long' })
    const dateWithDayName = `${dayName}(${date})`

    return { 
      date: dateWithDayName, 
      minTemp, 
      maxTemp, 
      condition,
      minTempC: minTemp,
      maxTempC: maxTemp,
      minTempF: convertTemp(minTemp),
      maxTempF: convertTemp(maxTemp),
     }
  })

  // Event handler for showing/hiding the graph
  const handleShowGraph = () => {
    setShowGraph(!showGraph)
  }

    // Event handler for showing/hiding the forecast
  const handleShowForecast = () => {
    setShowForecast(!showForecast)
  }

  return (
    <div>
      <h2>Weather Forecast</h2>
      

      
      {/* Button for toggling the forecast visibility */}
      <button onClick={handleShowForecast} style={{ marginBottom: '20px' }}>
        {showForecast ? 'Hide 5-Day Forecast' : 'Show 5-Day Forecast'}
      </button>
      {showForecast && (
        <div>
          {/* Use the TemperatureToggle component */}
          <TemperatureToggle toggleUnit={toggleUnit} unit={unit} />
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Temperatures (Max/Min)</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Condition</th>
              </tr>
            </thead>
            <tbody>
              {dailyForecasts.map((forecast, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{forecast.date}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    <span style={{ color: 'red' }}>Max: {convertTemp(forecast.maxTemp).toFixed(1)}°</span> / 
                    <span style={{ color: 'skyblue' }}> Min: {convertTemp(forecast.minTemp).toFixed(1)}°</span>
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{forecast.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleShowGraph}>{showGraph ? 'Hide Graph' : 'Show Graph'}</button>
        </div>
      )}

      {/* Line Graph for Min and Max Temperatures */}
      {showGraph && (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={dailyForecasts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={unit === 'metric' ? 'maxTempC' : 'maxTempF'} stroke="red" />
            <Line type="monotone" dataKey={unit === 'metric' ? 'minTempC' : 'minTempF'} stroke="skyblue" />
          </LineChart>
        </ResponsiveContainer>
      )}

    </div>
  )
}

export default ForecastDisplay

