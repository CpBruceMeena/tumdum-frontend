import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Logo from '../components/Logo';

const Restaurant = () => {
  const { id } = useParams();

  // Sample restaurant data - in a real app, this would come from an API
  const restaurants = {
    1: {
      id: 1,
      name: "Burger King",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
      rating: 4.2,
      deliveryTime: "30-35 min",
      cuisine: "Burgers, American",
      price: "₹200 for two",
      menu: [
        {
          id: 1,
          name: "Whopper",
          description: "Flame-grilled beef patty topped with tomatoes, lettuce, mayonnaise, pickles, and onions",
          price: 199,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426"
        },
        {
          id: 2,
          name: "Chicken Royale",
          description: "Crispy chicken fillet topped with fresh lettuce and creamy mayonnaise",
          price: 179,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7"
        },
        {
          id: 3,
          name: "Veg Whopper",
          description: "Flame-grilled veg patty topped with tomatoes, lettuce, mayonnaise, pickles, and onions",
          price: 189,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426"
        },
        {
          id: 4,
          name: "Chicken Fries",
          description: "Crispy chicken fries served with dipping sauce",
          price: 149,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426"
        }
      ]
    },
    2: {
      id: 2,
      name: "Pizza Hut",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
      rating: 4.0,
      deliveryTime: "25-30 min",
      cuisine: "Pizzas, Italian",
      price: "₹300 for two",
      menu: [
        {
          id: 1,
          name: "Margherita",
          description: "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil",
          price: 299,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7"
        },
        {
          id: 2,
          name: "Pepperoni",
          description: "Pizza topped with pepperoni and extra cheese",
          price: 399,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7"
        },
        {
          id: 3,
          name: "Veg Supreme",
          description: "Loaded with bell peppers, onions, mushrooms, olives, and tomatoes",
          price: 349,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7"
        },
        {
          id: 4,
          name: "Chicken Supreme",
          description: "Loaded with chicken, bell peppers, onions, and mushrooms",
          price: 449,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7"
        }
      ]
    },
    3: {
      id: 3,
      name: "KFC",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4",
      rating: 4.1,
      deliveryTime: "20-25 min",
      cuisine: "Chicken, Fast Food",
      price: "₹250 for two",
      menu: [
        {
          id: 1,
          name: "Chicken Bucket",
          description: "8 pieces of fried chicken with 4 sides",
          price: 599,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4"
        },
        {
          id: 2,
          name: "Zinger Burger",
          description: "Crispy chicken fillet with lettuce and mayo",
          price: 199,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4"
        },
        {
          id: 3,
          name: "Chicken Wings",
          description: "8 pieces of spicy chicken wings",
          price: 299,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4"
        },
        {
          id: 4,
          name: "Popcorn Chicken",
          description: "Bite-sized pieces of crispy chicken",
          price: 249,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4"
        }
      ]
    }
  };

  const restaurant = restaurants[id];

  if (!restaurant) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Restaurant not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Restaurant Header */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 3,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Container>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Logo size="small" />
          </Box>
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 'bold',
            letterSpacing: '0.5px'
          }}>
            {restaurant.name}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
            {restaurant.cuisine} • {restaurant.deliveryTime} • {restaurant.price}
          </Typography>
        </Container>
      </Box>

      {/* Menu Items */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" component="h2" sx={{ 
          mb: 3,
          color: 'primary.dark',
          fontWeight: 600
        }}>
          Menu
        </Typography>
        
        <Grid container spacing={3}>
          {restaurant.menu.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card sx={{ 
                display: 'flex',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}>
                <CardMedia
                  component="img"
                  sx={{ width: 140 }}
                  image={item.image}
                  alt={item.name}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      ₹{item.price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      size="small"
                    >
                      Add
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Restaurant; 