import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Button,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Typography
} from '@mui/material';
import Logo from './Logo';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleProfileClose();
    logout();
  };

  return (
    <Box sx={{ 
      bgcolor: 'primary.main', 
      color: 'white', 
      py: 2,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Container>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}>
          <Logo size="medium" />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user?.role === 'customer' && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/checkout')}
                startIcon={
                  <Badge badgeContent={getTotalItems()} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                }
              >
                Checkout
              </Button>
            )}
            {user && (
              <IconButton 
                onClick={handleProfileClick}
                sx={{ color: 'white' }}
              >
                <PersonIcon />
              </IconButton>
            )}
            {user && (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 280,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      margin: '0 auto 16px',
                      bgcolor: 'primary.main'
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {user?.name || 'User'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.role === 'restaurant' ? 'Restaurant Owner' : 'Customer'}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem sx={{ py: 1.5 }}>
                  <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography variant="body2">{user?.email}</Typography>
                </MenuItem>
                {user?.phone && (
                  <MenuItem sx={{ py: 1.5 }}>
                    <PhoneIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography variant="body2">{user.phone}</Typography>
                  </MenuItem>
                )}
                {user?.address && (
                  <MenuItem sx={{ py: 1.5 }}>
                    <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {user.address}
                      {user.city && `, ${user.city}`}
                      {user.state && `, ${user.state}`}
                      {user.postal_code && ` - ${user.postal_code}`}
                    </Typography>
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleLogoutClick} sx={{ color: 'error.main' }}>
                  Logout
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar; 