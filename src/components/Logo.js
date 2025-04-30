import React from 'react';
import { Box, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Logo = ({ size = 'medium' }) => {
  const sizes = {
    small: { icon: 24, text: 'h6' },
    medium: { icon: 32, text: 'h4' },
    large: { icon: 48, text: 'h3' }
  };

  const { icon, text } = sizes[size];

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1
    }}>
      <RestaurantIcon 
        sx={{ 
          fontSize: icon,
          color: 'white'
        }} 
      />
      <Typography 
        variant={text} 
        component="span" 
        sx={{ 
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          color: 'white'
        }}
      >
        TumDum
      </Typography>
    </Box>
  );
};

export default Logo; 