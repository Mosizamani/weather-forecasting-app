// // components/LocationFetcher.jsx

// import React, { useReducer } from 'react';
// import { weatherReducer, initialState } from '../reducers/weatherReducer'; // Adjust the import path as needed

// const LocationFetcher = ({ latitude, longitude }) => {
//   const [state, dispatch] = useReducer(weatherReducer, initialState);

//   // Fetch weather data using latitude and longitude
//   const fetchWeatherData = async () => {
//     dispatch({ type: 'FETCH_INIT' });
//     try {
//       const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
//       const weatherResponse = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${state.unit}`
//       );

//       if (!weatherResponse.ok) {
//         throw new Error('Could not fetch weather data for your location');
//       }

//       const weatherData = await weatherResponse.json();
//       console.log("Fetched weather data for location:", weatherData);

//       // Dispatch success action
//       dispatch({ type: 'FETCH_SUCCESS', payload: { weather: weatherData } });
//     } catch (error) {
//       dispatch({ type: 'FETCH_FAILURE', payload: error.message });
//     }
//   };

//   // Call fetchWeatherData when latitude and longitude are provided
//   React.useEffect(() => {
//     if (latitude && longitude) {
//       fetchWeatherData();
//     }
//   }, [latitude, longitude]);

//   return (
//     <div>
//       {state.loading && <p>Loading...</p>}
//       {state.error && <p>Error: {state.error}</p>}
//       {state.weatherData && (
//         // Display weather data here (e.g., pass it to WeatherDisplay)
//         <div>
//           <h2>Weather for your location:</h2>
//           <p>{JSON.stringify(state.weatherData)}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LocationFetcher;
