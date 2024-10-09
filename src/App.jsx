import React, { useState, useReducer } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorComponent from './components/ErrorComponent';
import { weatherReducer, initialState } from './reducers/weatherReducer';

const App = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialState)
  const [inputValue, setInputValue] = useState('')

  const fetchWeatherData = async (city) => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
      setInputValue('')
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message });
    }
  }

  return (
    <div>
      <SearchBar onSearch={fetchWeatherData} inputValue={inputValue} setInputValue={setInputValue} />
      {state.loading && (
        <>
          <p>Loading...</p>
          <a href="https://dribbble.com/shots/3718681-Loading-GIF/attachments/9981630?mode=media"></a>
        </>
    )}
      {state.error && <ErrorComponent message={state.error} />}
      {state.weatherData && <WeatherDisplay data={state.weatherData} />}
    </div>
  );
};

export default App
