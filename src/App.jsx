import React, { useState, useReducer } from 'react'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'
import ForecastDisplay from './components/ForecastDisplay'
import LocationImage from './components/LocationImage'
import FuzzyWeatherForecast from './components/FuzzyWeatherForecast'
import ErrorComponent from './components/ErrorComponent'
import SpeechRecognition from './components/SpeechRecognition'
import SpeechResponse from './components/SpeechResponse'
import LocationDetector from './components/LocationDetector'
import { weatherReducer, initialState } from './reducers/weatherReducer'
import './App.css'

const App = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialState)
  const [inputValue, setInputValue] = useState('')


  const fetchWeatherData = async (city) => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${state.unit}`
      )
      if (!weatherResponse.ok) {
        throw new Error('City not found')
      }

      const weatherData = await weatherResponse.json()
      console.log("Fetched weather data:", weatherData)

      if (!weatherData.coord) {
        throw new Error('coordinates not found')
      }

      // Fetch 5-day forecast data using coordinates from weatherData
      const { coord } = weatherData
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=${state.unit}`
      )

      if (!forecastResponse.ok) {
        throw new Error('Forecast data not found')
      }
      
      const forecastData = await forecastResponse.json()
      
      //Just to check the data
      console.log('Weather Type:', weatherData.weather[0].description)
      console.log('Weather Data:', weatherData)
      console.log('Forecast Data:', forecastData)
      console.log('Coordinates:', weatherData.coord)

      // Dispatch success action with both weather and forecast data
      dispatch({ type: 'FETCH_SUCCESS', payload: { weather: weatherData, forecast: forecastData } })
      setInputValue('')
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message })
    }
  }

  const toggleUnit = () => {
    dispatch({ type: 'TOGGLE_UNIT' })
  }

  const handleLocationDetect = async (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${state.unit}`
      )

      if (!weatherResponse.ok) {
        throw new Error('Could not fetch weather data for your location')
      }

      const weatherData = await weatherResponse.json()
      console.log("Fetched weather data for location:", weatherData)

      const { coord } = weatherData
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=${state.unit}`
      )

      if (!forecastResponse.ok) {
        throw new Error('Forecast data not found')
      }
      
      const forecastData = await forecastResponse.json()

      // Dispatch success action
      dispatch({ type: 'FETCH_SUCCESS', payload: { weather: weatherData, forecast: forecastData } })
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message })
    }
  }

  // Function to handle errors from the LocationDetector
  const handleError = (message) => {
    dispatch({ type: 'FETCH_FAILURE', payload: message })
  }

  return (
    
    <>
      <div className="App">
        <SearchBar onSearch={fetchWeatherData} inputValue={inputValue} setInputValue={setInputValue} />
        <SpeechRecognition onSearch={fetchWeatherData} />
        {state.loading && (
          <>
            <p>Loading...</p>
            <a href="https://dribbble.com/shots/3718681-Loading-GIF/attachments/9981630?mode=media"></a>
          </>)}
        {state.error && <ErrorComponent message={state.error} />}
        {state.error && <ErrorComponent message={state.error} />}
        <LocationDetector onLocationDetect={handleLocationDetect} onError={handleError} />
        
        {state.weatherData && <SpeechResponse weatherData={state.weatherData} />}
        {state.weatherData && state.weatherData.coord && (
          <LocationImage coord={state.weatherData.coord} />
        )}
        {state.weatherData && (
          <WeatherDisplay 
          data={state.weatherData}
          toggleUnit={toggleUnit}
          unit={state.unit}
          />
          )}
        {state.weatherData && <FuzzyWeatherForecast weatherData={state.weatherData} />}
        {state.forecastData && <ForecastDisplay forecastData={state.forecastData} />}
      </div>
    </>
  )
}

export default App
