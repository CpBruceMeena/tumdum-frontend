import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import { useCart } from '../contexts/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getTotalAmount, clearCart } = useCart();

  const address = React.useMemo(() => {
    const savedAddress = localStorage.getItem('userAddress');
    return savedAddress ? JSON.parse(savedAddress) : {
      street: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    };
  }, []);

  const getDeliveryFee = () => 40;
  const calculateTotalWithDelivery = () => getTotalAmount() + getDeliveryFee();

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Browse Restaurants
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Box sx={{ display: 'flex', height: 'calc(100vh - 200px)' }}>
        {/* Left Column - Order Items */}
        <Paper elevation={3} sx={{ 
          flex: '0 0 66.666%',
          p: 3, 
          overflowY: 'auto', 
          borderRadius: '12px 0 0 12px',
          borderRight: 'none'
        }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestaurantIcon color="primary" />
            Your Order Items
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          <Stack spacing={2}>
            {cartItems.map((item) => (
              <Card key={item.id} variant="outlined" sx={{ 
                '&:hover': {
                  boxShadow: 1,
                  bgcolor: 'action.hover'
                }
              }}>
                <CardContent sx={{ p: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3} sm={2}>
                      <CardMedia
                        component="img"
                        height="80"
                        image={item.image_url 
                          ? (item.image_url.startsWith('http') ? item.image_url : `http://localhost:8080${item.image_url}`)
                          : 'https://via.placeholder.com/300x200'}
                        alt={item.name}
                        sx={{ borderRadius: 1 }}
                        onError={(e) => {
                          console.error('Dish image failed to load:', {
                            dishId: item.id,
                            dishName: item.name,
                            imageUrl: item.image_url,
                            error: e
                          });
                        }}
                      />
                    </Grid>
                    <Grid item xs={9} sm={10}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Box sx={{ flex: 1, mr: 2 }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.restaurantName}
                          </Typography>
                          <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                            ₹{item.price}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            p: 0.5
                          }}>
                            <IconButton 
                              size="small"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography variant="body1" sx={{ mx: 1 }}>
                              {item.quantity}
                            </Typography>
                            <IconButton 
                              size="small"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          <IconButton 
                            color="error" 
                            onClick={() => removeFromCart(item.id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>

        {/* Right Column - Order Summary */}
        <Paper 
          elevation={3} 
          sx={{ 
            flex: '0 0 33.333%',
            p: 3, 
            borderRadius: '0 12px 12px 0',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}
        >
          <Box>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PaymentIcon color="primary" />
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />

            {/* Delivery Address Section */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon color="primary" fontSize="small" />
                  Delivery Address
                </Typography>
                <Button
                  startIcon={<EditIcon />}
                  size="small"
                  onClick={() => navigate('/profile')}
                >
                  Edit
                </Button>
              </Box>
              {address.street ? (
                <Typography variant="body2" color="text.secondary">
                  {address.street}
                  {address.landmark && `, ${address.landmark}`}
                  <br />
                  {address.city}, {address.state} - {address.pincode}
                </Typography>
              ) : (
                <Typography variant="body2" color="error">
                  Please add your delivery address
                </Typography>
              )}
            </Box>
          </Box>
          
          <Stack spacing={1.5}>
            <Box>
              <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <span>Items Total</span>
                <span>₹{getTotalAmount()}</span>
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <span>Delivery Fee</span>
                <span>₹{getDeliveryFee()}</span>
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <span>Taxes & Charges</span>
                <span>₹{Math.round(getTotalAmount() * 0.05)}</span>
              </Typography>
            </Box>
            
            <Divider />
            
            <Box>
              <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <span>To Pay</span>
                <span>₹{calculateTotalWithDelivery() + Math.round(getTotalAmount() * 0.05)}</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Inclusive of all taxes
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            startIcon={<LocalShippingIcon />}
            onClick={() => {
              if (!address.street) {
                alert('Please add your delivery address first');
                return;
              }
              alert('Order placed successfully!');
              clearCart();
              navigate('/');
            }}
            sx={{ mt: 2, mb: 0 }}
          >
            Place Order
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Checkout; 