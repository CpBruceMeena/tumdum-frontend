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
  CircularProgress,
  Alert
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { restaurantApi } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching restaurants...');
      const response = await restaurantApi.getAllRestaurants();
      console.log('Restaurants response:', response);
      
      // Check if response is an array or has a restaurants property
      const restaurantsList = Array.isArray(response) ? response : (response.restaurants || []);
      console.log('Raw restaurants data from backend:', restaurantsList.map(r => ({
        id: r.id,
        name: r.name,
        cover_image_url: r.cover_image_url,
        logo_url: r.logo_url
      })));
      
      if (!restaurantsList || restaurantsList.length === 0) {
        console.warn('No restaurants found in the response');
        setError('No restaurants available at the moment.');
      } else {
        // Process image URLs to ensure they're absolute
        const processedList = restaurantsList.map((restaurant, index) => {
          console.log('Processing restaurant image:', {
            id: restaurant.id,
            name: restaurant.name,
            coverImage: restaurant.cover_image_url,
            logoImage: restaurant.logo_url,
            index
          });

          return {
            ...restaurant,
            image: restaurant.cover_image_url 
              ? (restaurant.cover_image_url.startsWith('http') 
                ? restaurant.cover_image_url 
                : `http://localhost:8080${restaurant.cover_image_url}`)
              : 'https://via.placeholder.com/300x200',
            logo: restaurant.logo_url 
              ? (restaurant.logo_url.startsWith('http') 
                ? restaurant.logo_url 
                : `http://localhost:8080${restaurant.logo_url}`)
              : 'https://via.placeholder.com/100x100'
          };
        });
        
        console.log('Processed restaurants list:', processedList);
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

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Discover Restaurants
      </Typography>
      <Grid container spacing={3}>
        {restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              <CardMedia
                component="img"
                height="200"
                image={restaurant.image}
                alt={restaurant.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {restaurant.cuisine}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={restaurant.rating || 0} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    ({restaurant.reviews || 0} reviews)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 