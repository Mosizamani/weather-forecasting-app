// src/reducers/weatherReducer.js
export const initialState = {
    loading: false,
    error: null,
    weatherData: null,
    forecastData: null,
    unit: 'metric', // **Add unit state**
  }
  
  export const weatherReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return { ...state, loading: true, error: null };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, weatherData: action.payload.weather, forecastData: action.payload.forecast };
      case 'FETCH_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'TOGGLE_UNIT': // **Add toggle unit case**
        return { ...state, unit: state.unit === 'metric' ? 'imperial' : 'metric' }; // Toggle between metric and imperial
      default:
        return state;
    }
  }
