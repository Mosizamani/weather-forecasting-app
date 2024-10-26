
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const LocationImage = ({ coord }) => {
  const [locationImage, setLocationImage] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch location image based on coordinates using Google Static Maps API
  useEffect(() => {
    if (coord.lat && coord.lon) {
      const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coord.lat},${coord.lon}&zoom=12&size=600x300&key=AIzaSyALcj43SbYPxgq6GadxWwZgkjOmMYOR77A`
      
      setLoading(true)

      setLocationImage(staticMapUrl);

      const timeout = setTimeout(() => {
        setLoading(false)
    }, 1000)
    return () => clearTimeout(timeout)
    } else {
      setLoading(false)
    }

  }, [coord]);

  console.log('Location Image:', locationImage)

  return (
    <div className="location-image">
      {locationImage ? (
        <>
          <h3>Location Map</h3>
          <img src={locationImage} alt="Location Map" />
        </>
      ) : (
        <p>Location image not available</p>
      )}
    </div>
  )
}

LocationImage.propTypes = {
  coord: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  }).isRequired,
};

export default LocationImage
