import React from 'react';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';

const TemperatureToggle = ({ toggleUnit, unit }) => {
  return (
    <Tooltip title={`Switch to ${unit === 'metric' ? 'Fahrenheit' : 'Celsius'}`} arrow>
      <FormControlLabel
        control={
          <Switch
            checked={unit === 'imperial'}
            onChange={toggleUnit}
            aria-label="Toggle temperature unit"
            color="primary"
          />
        }
        label={
          <Typography variant="body1">
            {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
          </Typography>
        }
      />
    </Tooltip>
  );
};

export default TemperatureToggle
