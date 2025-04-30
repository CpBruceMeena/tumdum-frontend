import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  // Sample cart data
  const cartItems = [
    {
      id: 1,
      name: "Whopper",
      price: 199,
      quantity: 2,
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426"
    },
    {
      id: 2,
      name: "Chicken Royale",
      price: 179,
      quantity: 1,
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7"
    }
  ];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2 }}>
        <Container>
          <Typography variant="h4" component="h1">
            Cart
          </Typography>
        </Container>
      </Box>

      {/* Cart Items */}
      <Container sx={{ py: 4 }}>
        {cartItems.length === 0 ? (
          <Typography variant="h6" align="center">
            Your cart is empty
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {cartItems.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            ₹{item.price}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton size="small">
                              <RemoveIcon />
                            </IconButton>
                            <Typography>{item.quantity}</Typography>
                            <IconButton size="small">
                              <AddIcon />
                            </IconButton>
                            <IconButton size="small" color="error" sx={{ ml: 'auto' }}>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Order Summary */}
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Order Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Item Total</Typography>
                  <Typography>₹{calculateTotal()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Delivery Fee</Typography>
                  <Typography>₹40</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">₹{calculateTotal() + 40}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Cart; 