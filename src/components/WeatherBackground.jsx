import React from 'react'

const WeatherBackground = ({ weatherType, children }) => {
  const getBackgroundImage = (weatherType) => {
    switch (weatherType) {
      case 'clear sky':
        return 'url(https://images.pexels.com/photos/754419/pexels-photo-754419.jpeg)'
      case 'cloudy':
        return 'url(/assets/cloudy.jpg)'
      case 'rainy':
        return 'url(/assets/rainy.jpg)'
      case 'snowy':
        return 'url(/assets/snowy.jpg)'
      default :
        return 'url(/assets/default.jpg)'
    }
  }

  console.log('Weather Type:', weatherType)

  const backgroundStyle = {
    backgroundImage: getBackgroundImage(weatherType),
    backgroundColor:'black',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
    transition: 'background-image 0.5s ease-in-out',
  }

  console.log('Background Style:', backgroundStyle)

  return <div style={backgroundStyle}>{children}</div>
}

export default WeatherBackground
