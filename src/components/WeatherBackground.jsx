// WeatherBackground.js
import React from 'react'

const WeatherBackground = ({ weatherType, children }) => {
  const getBackgroundImage = (weatherType) => {
    switch (weatherType) {
      case 'sunny':
        return 'url(/assets/sunny.jpg)'
      case 'cloudy':
        return 'url(/assets/cloudy.jpg)'
      case 'rainy':
        return 'url(/assets/rainy.jpg)'
      case 'snowy':
        return 'url(/assets/snowy.jpg)'
      default:
        return 'url(/assets/default.jpg)'
    }
  }

  const backgroundStyle = {
    backgroundImage: getBackgroundImage(weatherType),
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
    transition: 'background-image 0.5s ease-in-out',
  }

  return <div style={backgroundStyle}>{children}</div>
}

export default WeatherBackground