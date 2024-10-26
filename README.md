Weather Forecasting App
This application provides weather and forecast information based on city input or location detection. It includes features like speech recognition for search, an interactive forecast display, and an error handling component for a better user experience.

Features
-City search with Google Maps Autocomplete
-Weather and forecast retrieval from OpenWeather API
-Speech recognition and response for search functionality
-Location-based weather fetching with Google Maps API
-Fuzzy weather predictions based on data analysis
-Project Setup and Running Instructions

Prerequisites
Node.js (v14 or later) installed on your local machine.

API Keys:
Google Maps API Key
OpenWeather API Key

Installation
Clone the repository:
git clone <repository_url>
cd weather-forecasting-app

Install dependencies:

npm install

npm install axios recharts

npm install fuzzyset.js

npm install prop-types

npm install @mui/material @emotion/react @emotion/styled

npm install @mui/icons-material

Environment Setup:

Create a .env file in the root directory with your API keys:

VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_OPENWEATHER_API_KEY=your_openweather_api_key

Run the application:

npm run dev

Visit the application: Open your browser and navigate to http://localhost:3000 to view the app.

External Libraries and Frameworks

React: Frontend framework used to build the user interface.
Google Maps JavaScript API: Provides city name autocompletion and location-based weather search.
OpenWeather API: Fetches current weather and 5-day forecast data.
React Speech Recognition: Handles speech-to-text conversion for voice-activated search.
React Hooks (useState, useReducer): Manages the application state and updates based on user interactions.
Code Organization
App.jsx: Main component containing the app's core logic and data handling.

Components:

SearchBar: Search input with Google Maps Autocomplete for city names.
WeatherDisplay: Displays current weather data.
ForecastDisplay: Renders a 5-day weather forecast.
LocationImage: Shows an image based on the city or coordinates.
FuzzyWeatherForecast: Provides fuzzy logic-based predictions.
ErrorComponent: Handles and displays error messages.
SpeechRecognition: Enables voice search functionality.
SpeechResponse: Responds to weather queries with audio output.
LocationDetector: Fetches the user's location and updates the weather display.

Reducers:

weatherReducer.js: Manages state updates for weather and forecast data based on dispatched actions like FETCH_INIT, FETCH_SUCCESS, and FETCH_FAILURE.

Styles:

App.css: Contains CSS for layout and styling.

Usage Instructions
Enter a city name in the search bar or use voice input for weather queries.
Click "Get Weather" or use location detection to fetch weather data.
Toggle temperature units and explore the weather forecast.

Note: Ensure you have the correct API keys in the .env file and access to Google Maps and OpenWeather services to fully utilize all features.
