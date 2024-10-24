import React from 'react'

const LocationDetector = ({ onLocationDetect, onError }) => {

  // Function to detect user location
  const detectUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User location: ', latitude, longitude);
          onLocationDetect(latitude, longitude); // Pass location coordinates back to parent
        },
        (error) => {
          console.error('Error detecting location: ', error);
          onError('Location access denied or unavailable');
        }
      );
    } else {
      onError('Geolocation is not supported by your browser.');
    }
  }

  return (
    <div>
      <button onClick={detectUserLocation}>Detect My Location</button> {/* Button to trigger location detection */}
    </div>
  )
}

export default LocationDetector
