import React, { useState, useEffect } from 'react';
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
  Divider
} from '@mui/material';
import Logo from '../components/Logo';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Home = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear any stored data
    localStorage.removeItem('cartItems');
    // Close the menu
    handleProfileClose();
    // Navigate to auth screen
    navigate('/auth');
  };

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
    },
    {
      id: 7,
      name: "Haldiram's",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1ace5fa65eff3e1223feb696c956b38b",
      rating: 4.5,
      deliveryTime: "25-30 min",
      cuisine: "North Indian, Sweets",
      price: "₹400 for two"
    },
    {
      id: 8,
      name: "Bikanervala",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4",
      rating: 4.3,
      deliveryTime: "20-25 min",
      cuisine: "North Indian, Street Food",
      price: "₹300 for two"
    },
    {
      id: 9,
      name: "Biryani Blues",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
      rating: 4.4,
      deliveryTime: "30-35 min",
      cuisine: "Biryani, Mughlai",
      price: "₹450 for two"
    },
    {
      id: 10,
      name: "Cafe Coffee Day",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
      rating: 4.1,
      deliveryTime: "15-20 min",
      cuisine: "Coffee, Snacks",
      price: "₹200 for two"
    }
  ];

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

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
                onClick={() => navigate('/checkout')}
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
                    John Doe
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
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
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