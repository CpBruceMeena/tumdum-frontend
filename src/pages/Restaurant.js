import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Rating,
  Divider,
  Paper,
  Chip,
  IconButton,
  Badge,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { restaurantApi, dishApi } from '../services/api';
import { useCart } from '../contexts/CartContext';

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, getTotalItems } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch restaurant details
        console.log('Fetching restaurant details for ID:', id);
        const restaurantResponse = await restaurantApi.getRestaurantById(id);
        console.log('Restaurant response:', restaurantResponse);
        setRestaurant(restaurantResponse);

        // Fetch restaurant dishes
        console.log('Fetching dishes for restaurant ID:', id);
        const dishesResponse = await dishApi.getDishesByRestaurant(id);
        console.log('Dishes response:', dishesResponse);
        
        // Handle different response formats
        let dishesList = [];
        if (Array.isArray(dishesResponse)) {
          dishesList = dishesResponse;
        } else if (dishesResponse?.dishes) {
          dishesList = dishesResponse.dishes;
        } else if (dishesResponse?.data) {
          dishesList = dishesResponse.data;
        }
        
        console.log('Extracted dishes list:', dishesList);
        
        // Process dishes and ensure they have all required fields
        const processedDishes = dishesList.map(dish => ({
          ...dish,
          id: dish.id || dish._id, // Handle both id formats
          image: dish.image_url 
            ? (dish.image_url.startsWith('http') ? dish.image_url : `http://localhost:8080${dish.image_url}`)
            : 'https://via.placeholder.com/300x200',
          price: dish.price || 0,
          description: dish.description || 'No description available',
          category: dish.category || 'Uncategorized'
        }));
        
        console.log('Processed dishes:', processedDishes);
        setDishes(processedDishes);
      } catch (err) {
        console.error('Error fetching restaurant data:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError(err.response?.data?.message || err.message || 'Failed to load restaurant data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

  const handleAddToCart = (dish) => {
    addToCart(dish);
    setSnackbar({
      open: true,
      message: 'Item added to cart',
      severity: 'success'
    });
  };

  const handleRemoveFromCart = (dishId) => {
    removeFromCart(dishId);
    setSnackbar({
      open: true,
      message: 'Item removed from cart',
      severity: 'info'
    });
  };

  const getItemQuantity = (dishId) => {
    const item = cartItems.find(item => item.id === dishId);
    return item ? item.quantity : 0;
  };

  const handleCheckout = () => {
    navigate('/checkout');
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
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!restaurant) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Restaurant not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        {cartItems.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            startIcon={
              <Badge badgeContent={getTotalItems()} color="error">
                <ShoppingCartIcon />
              </Badge>
            }
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        )}
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              height="200"
              image={restaurant.cover_image_url 
                ? (restaurant.cover_image_url.startsWith('http') 
                  ? restaurant.cover_image_url 
                  : `http://localhost:8080${restaurant.cover_image_url}`)
                : 'https://via.placeholder.com/300x200'}
              alt={restaurant.name}
              sx={{ borderRadius: 1 }}
              onError={(e) => {
                console.error('Restaurant image failed to load:', {
                  restaurantId: restaurant.id,
                  restaurantName: restaurant.name,
                  imageUrl: restaurant.cover_image_url,
                  error: e
                });
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {restaurant.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating value={restaurant.rating || 0} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {restaurant.rating || 'N/A'}
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {restaurant.cuisine}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Delivery Time: {restaurant.deliveryTime || '30-40'} min
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Price for two: {restaurant.price || '₹300-400'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Menu
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {dishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} key={dish.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={dish.image}
                alt={dish.name}
                onError={(e) => {
                  console.error('Dish image failed to load:', {
                    dishId: dish.id,
                    dishName: dish.name,
                    imageUrl: dish.image,
                    error: e
                  });
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="div">
                    {dish.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ₹{dish.price}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {dish.description}
                </Typography>
                <Chip
                  label={dish.category}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  {getItemQuantity(dish.id) > 0 ? (
                    <>
                      <IconButton 
                        size="small"
                        onClick={() => handleRemoveFromCart(dish.id)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 1 }}>
                        {getItemQuantity(dish.id)}
                      </Typography>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleAddToCart(dish)}
                      >
                        <AddIcon />
                      </IconButton>
                    </>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => handleAddToCart(dish)}
                    >
                      Add
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCheckout}
            sx={{ borderRadius: 2 }}
          >
            Checkout ({getTotalItems()} items)
          </Button>
        </Box>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Restaurant; 