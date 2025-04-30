import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Rating } from '@mui/material';
import Logo from '../components/Logo';

const Home = () => {
  // Sample restaurant data
  const restaurants = [
    {
      id: 1,
      name: "Burger King",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
      rating: 4.2,
      deliveryTime: "30-35 min",
      cuisine: "Burgers, American",
      price: "₹200 for two"
    },
    {
      id: 2,
      name: "Pizza Hut",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
      rating: 4.0,
      deliveryTime: "25-30 min",
      cuisine: "Pizzas, Italian",
      price: "₹300 for two"
    },
    {
      id: 3,
      name: "KFC",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4",
      rating: 4.1,
      deliveryTime: "20-25 min",
      cuisine: "Chicken, Fast Food",
      price: "₹250 for two"
    },
    {
      id: 4,
      name: "Subway",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1ace5fa65eff3e1223feb696c956b38b",
      rating: 4.3,
      deliveryTime: "15-20 min",
      cuisine: "Sandwiches, Healthy",
      price: "₹150 for two"
    },
    {
      id: 5,
      name: "McDonald's",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
      rating: 4.4,
      deliveryTime: "25-30 min",
      cuisine: "Burgers, Fast Food",
      price: "₹200 for two"
    },
    {
      id: 6,
      name: "Domino's Pizza",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
      rating: 4.2,
      deliveryTime: "30-35 min",
      cuisine: "Pizzas, Italian",
      price: "₹350 for two"
    }
  ];

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
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Delicious food delivered to your doorstep
            </Typography>
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
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {restaurant.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={restaurant.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {restaurant.rating}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.cuisine}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.deliveryTime} • {restaurant.price}
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