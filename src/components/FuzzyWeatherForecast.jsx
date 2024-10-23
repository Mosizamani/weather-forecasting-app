import React, { useState, useEffect } from 'react'
import FuzzySet from 'fuzzyset.js' // Import fuzzy logic library

const FuzzyWeatherForecast = ({ weatherData }) => {
  const [fuzzyForecast, setFuzzyForecast] = useState('')

  // Define fuzzy rules based on weather conditions
  const fuzzyRules = FuzzySet([
    'cold and rainy',
    'hot and sunny',
    'mild and cloudy',
    'cool with light showers',
    'warm and dry',
    'stormy',
  ])

  

  // Helper function to apply fuzzy logic to the input data
  const getFuzzyWeatherCondition = (temperature, humidity, windSpeed) => {
    // Cold conditions
    if (temperature < 0 && humidity > 80) return 'freezing and snowy'
    if (temperature < 10 && humidity > 80) return 'cold and rainy'
    if (temperature < 10 && humidity < 50 && windSpeed > 15) return 'cold and windy'
  
    // Warm to hot conditions
    if (temperature > 30 && humidity < 20) return 'scorching hot and dry'
    if (temperature > 30 && humidity >= 20 && humidity < 40) return 'hot and sunny'
    if (temperature > 30 && humidity > 60) return 'hot and humid'
  
    // Mild conditions
    if (temperature >= 10 && temperature <= 20 && humidity > 60 && windSpeed < 10) 
      return 'cool with light showers'
    if (temperature >= 20 && temperature <= 30 && humidity < 50 && windSpeed < 10) 
      return 'warm and dry'
    if (temperature >= 10 && temperature <= 20 && humidity < 50 && windSpeed > 15) 
      return 'cool and breezy'
    if (temperature >= 20 && temperature <= 30 && humidity > 50 && windSpeed > 20) 
      return 'humid and windy'
  
    // Stormy conditions
    if (windSpeed > 30 && humidity > 70) return 'stormy'
    if (temperature < 15 && windSpeed > 40) return 'very windy and cold'
  
    // Default condition
    return 'mild and cloudy'
  }
  

  useEffect(() => {
    if (weatherData) {
      const { temp, humidity, wind_speed } = weatherData
      console.log(`Temperature: ${temp}, Humidity: ${humidity}, Wind Speed: ${wind_speed}`)
      const weatherCondition = getFuzzyWeatherCondition(temp, humidity, wind_speed)
      setFuzzyForecast(weatherCondition)
    }
  }, [weatherData])

  return (
    <div>
      <h2>Fuzzy Weather Forecast</h2>
      <p>{fuzzyForecast}</p>
    </div>
  )
}

export default FuzzyWeatherForecast

