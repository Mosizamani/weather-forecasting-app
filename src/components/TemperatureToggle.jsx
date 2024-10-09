import React from 'react';

const TemperatureToggle = ({ toggleUnit, unit }) => {
  return (
    <button onClick={toggleUnit}>
      Toggle to {unit === 'metric' ? '°F' : '°C'}
    </button>
  );
};

export default TemperatureToggle;
