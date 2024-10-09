import React, { useState, useReducer } from 'react'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'
import ForecastDisplay from './components/ForecastDisplay'
import ErrorComponent from './components/ErrorComponent'
import { weatherReducer, initialState } from './reducers/weatherReducer'

const App = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialState)
  const [inputValue, setInputValue] = useState('')

  const fetchWeatherData = async (city) => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${state.unit}`
      )
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }

      const weatherData = await weatherResponse.json()
      console.log("Fetched weather data:", weatherData)
      // Fetch 5-day forecast data using coordinates from weatherData
      const { coord } = weatherData
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=${state.unit}`
      )

      if (!forecastResponse.ok) {
        throw new Error('Forecast data not found');
      }

      
      
      const forecastData = await forecastResponse.json()
      
      //Just to check the data
      console.log('Weather Data:', weatherData)
      console.log('Forecast Data:', forecastData)

      // Dispatch success action with both weather and forecast data
      dispatch({ type: 'FETCH_SUCCESS', payload: { weather: weatherData, forecast: forecastData } });
      setInputValue('')
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message });
    }
  }

  const toggleUnit = () => {
    dispatch({ type: 'TOGGLE_UNIT' });
  }

  return (
    <div>
      <SearchBar onSearch={fetchWeatherData} inputValue={inputValue} setInputValue={setInputValue} />
      {state.loading && (
        <>
          <p>Loading...</p>
          <a href="https://dribbble.com/shots/3718681-Loading-GIF/attachments/9981630?mode=media"></a>
        </>)}
      {state.error && <ErrorComponent message={state.error} />}
      {state.weatherData && (
      <WeatherDisplay 
        data={state.weatherData}
        toggleUnit={toggleUnit}
        unit={state.unit}
         />)}
      {state.forecastData && <ForecastDisplay forecastData={state.forecastData} />}
    </div>
  );
};

export default App
