import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Rating, 
  Button, 
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import Logo from '../components/Logo';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { restaurantApi } from '../services/api';
import { Refresh as RefreshIcon } from '@mui/icons-material';

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching restaurants...');
      const response = await restaurantApi.getAllRestaurants();
      console.log('Restaurants response:', response);
      
      // Check if response is an array or has a restaurants property
      const restaurantsList = Array.isArray(response) ? response : (response.restaurants || []);
      console.log('Processed restaurants list:', restaurantsList);
      
      if (!restaurantsList || restaurantsList.length === 0) {
        console.warn('No restaurants found in the response');
        setError('No restaurants available at the moment.');
      } else {
        // Process image URLs to ensure they're absolute
        const processedList = restaurantsList.map(restaurant => ({
          ...restaurant,
          image: restaurant.image 
            ? (restaurant.image.startsWith('http') ? restaurant.image : `http://localhost:8080${restaurant.image}`)
            : 'https://via.placeholder.com/300x200'
        }));
        console.log('Processed restaurants with images:', processedList);
        setRestaurants(processedList);
      }
    } catch (err) {
      console.error('Error fetching restaurants:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || err.message || 'Failed to load restaurants. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('cart');
    handleProfileClose();
    onLogout();
  };

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  const handleRetry = () => {
    fetchRestaurants();
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="error" 
          action={
            <Button 
              color="inherit" 
              size="small" 
              startIcon={<RefreshIcon />}
              onClick={handleRetry}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 3,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Container>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Logo size="medium" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={
                  <Badge badgeContent={getTotalItems()} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                }
                onClick={handleCheckoutClick}
                sx={{ 
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
              >
                Checkout
              </Button>
              <IconButton 
                onClick={handleProfileClick}
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <PersonIcon />
              </IconButton>
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
                    {user?.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Premium Member
                  </Typography>
                </Box>
                <Divider />
                <MenuItem sx={{ py: 1.5 }}>
                  <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography variant="body2">john.doe@example.com</Typography>
                </MenuItem>
                <MenuItem sx={{ py: 1.5 }}>
                  <PhoneIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography variant="body2">+91 98765 43210</Typography>
                </MenuItem>
                <MenuItem sx={{ py: 1.5 }}>
                  <LocationOnIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography variant="body2">123 Food Street, Food City</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogoutClick} sx={{ color: 'error.main' }}>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" component="h2" sx={{ 
          mb: 3,
          color: 'primary.dark',
          fontWeight: 600
        }}>
          Popular Restaurants
        </Typography>
        
        <Grid container spacing={3}>
          {restaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
              <Card 
                onClick={() => handleRestaurantClick(restaurant.id)}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={restaurant.image}
                  alt={restaurant.name}
                  onError={(e) => {
                    console.error('Image failed to load:', restaurant.image);
                    e.target.src = 'https://via.placeholder.com/300x200';
                  }}
                  sx={{
                    objectFit: 'cover',
                    backgroundColor: 'grey.200'
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {restaurant.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={restaurant.rating || 0} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {restaurant.rating || 'N/A'}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.cuisine}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.deliveryTime || '30-40'} min
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 