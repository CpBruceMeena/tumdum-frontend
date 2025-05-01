import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Logo = ({ size = 'medium' }) => {
  const theme = useTheme();
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
      bgcolor: 'primary.main',
      boxShadow: theme.shadows[2],
    }}>
      <RestaurantIcon 
        sx={{ 
          fontSize: icon,
          color: 'primary.contrastText',
        }} 
      />
      <Typography 
        variant={text} 
        component="span" 
        sx={{ 
          fontWeight: 800,
          letterSpacing: '1px',
          color: 'primary.contrastText',
        }}
      >
        TumDum
      </Typography>
    </Box>
  );
};

export default Logo; 