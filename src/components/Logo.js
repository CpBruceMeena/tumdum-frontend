import React from 'react';
import { Box, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Logo = ({ size = 'medium' }) => {
  const sizes = {
    small: { icon: 24, text: 'h6', gap: 1 },
    medium: { icon: 32, text: 'h4', gap: 1.5 },
    large: { icon: 48, text: 'h3', gap: 2 }
  };

  const { icon, text, gap } = sizes[size];

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: gap,
      p: 1,
      borderRadius: 2,
      bgcolor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
    }}>
      <RestaurantIcon 
        sx={{ 
          fontSize: icon,
          color: 'white',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
        }} 
      />
      <Typography 
        variant={text} 
        component="span" 
        sx={{ 
          fontWeight: 800,
          letterSpacing: '1px',
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        TumDum
      </Typography>
    </Box>
  );
};

export default Logo; 