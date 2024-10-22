import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ForecastDisplay = ({ forecastData }) => {

  const [showGraph, setShowGraph] = useState(false)

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

    return { date: dateWithDayName, minTemp, maxTemp, condition }
  })

  // Event handler for showing/hiding the graph
  const handleShowGraph = () => {
    setShowGraph(!showGraph)
  }

  return (
    <div>
      <h2>5-Day Forecast</h2>
      <ul>
        {dailyForecasts.map((forecast, index) => (
          <ul key={index}>
            <p>{forecast.date}</p>
            <p style={{color: "red"}}>Max: {forecast.maxTemp.toFixed(1)}°C</p>
            <p style={{color: "skyblue"}}>Min: {forecast.minTemp.toFixed(1)}°C</p>
            <p>Condition: {forecast.condition}</p>
          </ul>
        ))}
      </ul>

      <button onClick={handleShowGraph}>{showGraph ? 'Hide Graph' : 'Show Graph'}</button>

      {/* Line Graph for Min and Max Temperatures */}
      {showGraph && (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={dailyForecasts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="maxTemp" stroke="red" />
            <Line type="monotone" dataKey="minTemp" stroke="skyblue" />
          </LineChart>
        </ResponsiveContainer>
      )}

    </div>
  )
}

export default ForecastDisplay

