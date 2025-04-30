import React, { useState } from 'react';
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sample restaurant data with menu items
  const restaurantData = {
    1: {
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
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
          category: "Burgers"
        },
        {
          id: 2,
          name: "Chicken Royale",
          description: "Crispy chicken fillet topped with fresh lettuce and creamy mayonnaise",
          price: 179,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4",
          category: "Burgers"
        },
        {
          id: 3,
          name: "French Fries",
          description: "Crispy golden fries seasoned with salt",
          price: 99,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1ace5fa65eff3e1223feb696c956b38b",
          category: "Sides"
        }
      ]
    },
    2: {
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
          description: "Classic pizza with tomato sauce, mozzarella cheese, and basil",
          price: 249,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
          category: "Pizzas"
        },
        {
          id: 2,
          name: "Pepperoni",
          description: "Pizza topped with pepperoni and cheese",
          price: 299,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
          category: "Pizzas"
        },
        {
          id: 3,
          name: "Garlic Bread",
          description: "Toasted bread with garlic butter and herbs",
          price: 149,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1ace5fa65eff3e1223feb696c956b38b",
          category: "Sides"
        }
      ]
    },
    3: {
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
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4",
          category: "Chicken"
        },
        {
          id: 2,
          name: "Zinger Burger",
          description: "Crispy chicken fillet with lettuce and mayo",
          price: 199,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4",
          category: "Burgers"
        },
        {
          id: 3,
          name: "Chicken Wings",
          description: "8 pieces of spicy chicken wings",
          price: 299,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4",
          category: "Chicken"
        }
      ]
    },
    4: {
      name: "Subway",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1ace5fa65eff3e1223feb696c956b38b",
      rating: 4.3,
      deliveryTime: "15-20 min",
      cuisine: "Sandwiches, Healthy",
      price: "₹150 for two",
      menu: [
        {
          id: 1,
          name: "Veg Delite",
          description: "Fresh vegetables with your choice of bread and sauces",
          price: 149,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1ace5fa65eff3e1223feb696c956b38b",
          category: "Sandwiches"
        },
        {
          id: 2,
          name: "Chicken Teriyaki",
          description: "Grilled chicken with teriyaki sauce and vegetables",
          price: 199,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1ace5fa65eff3e1223feb696c956b38b",
          category: "Sandwiches"
        },
        {
          id: 3,
          name: "Cookies",
          description: "Freshly baked chocolate chip cookies",
          price: 49,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1ace5fa65eff3e1223feb696c956b38b",
          category: "Desserts"
        }
      ]
    },
    5: {
      name: "McDonald's",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
      rating: 4.4,
      deliveryTime: "25-30 min",
      cuisine: "Burgers, Fast Food",
      price: "₹200 for two",
      menu: [
        {
          id: 1,
          name: "Big Mac",
          description: "Two beef patties with special sauce, lettuce, cheese, pickles, onions",
          price: 189,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
          category: "Burgers"
        },
        {
          id: 2,
          name: "McChicken",
          description: "Crispy chicken patty with lettuce and mayo",
          price: 169,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
          category: "Burgers"
        },
        {
          id: 3,
          name: "McFlurry",
          description: "Creamy soft serve with your choice of toppings",
          price: 99,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
          category: "Desserts"
        }
      ]
    },
    6: {
      name: "Domino's Pizza",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
      rating: 4.2,
      deliveryTime: "30-35 min",
      cuisine: "Pizzas, Italian",
      price: "₹350 for two",
      menu: [
        {
          id: 1,
          name: "Farmhouse",
          description: "Loaded with capsicum, onion, tomato, mushroom, and olives",
          price: 399,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
          category: "Pizzas"
        },
        {
          id: 2,
          name: "Chicken Golden Delight",
          description: "Loaded with chicken, capsicum, and onion",
          price: 449,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
          category: "Pizzas"
        },
        {
          id: 3,
          name: "Choco Lava Cake",
          description: "Warm chocolate cake with molten chocolate center",
          price: 149,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
          category: "Desserts"
        }
      ]
    },
    7: {
      name: "Haldiram's",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1ace5fa65eff3e1223feb696c956b38b",
      rating: 4.5,
      deliveryTime: "25-30 min",
      cuisine: "North Indian, Sweets",
      price: "₹400 for two",
      menu: [
        {
          id: 1,
          name: "Chole Bhature",
          description: "Spicy chickpeas with fluffy fried bread",
          price: 199,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1ace5fa65eff3e1223feb696c956b38b",
          category: "Main Course"
        },
        {
          id: 2,
          name: "Raj Kachori",
          description: "Crispy shell filled with spiced potatoes, sprouts, and chutneys",
          price: 149,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1ace5fa65eff3e1223feb696c956b38b",
          category: "Street Food"
        },
        {
          id: 3,
          name: "Rasmalai",
          description: "Soft cottage cheese dumplings in sweetened milk",
          price: 99,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/1ace5fa65eff3e1223feb696c956b38b",
          category: "Desserts"
        }
      ]
    },
    8: {
      name: "Bikanervala",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4",
      rating: 4.3,
      deliveryTime: "20-25 min",
      cuisine: "North Indian, Street Food",
      price: "₹300 for two",
      menu: [
        {
          id: 1,
          name: "Dahi Bhalla",
          description: "Lentil dumplings in yogurt with tamarind chutney",
          price: 129,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4",
          category: "Street Food"
        },
        {
          id: 2,
          name: "Chole Kulche",
          description: "Spicy chickpeas with soft bread",
          price: 149,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4",
          category: "Street Food"
        },
        {
          id: 3,
          name: "Gulab Jamun",
          description: "Sweet milk solids dumplings in sugar syrup",
          price: 89,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4",
          category: "Desserts"
        }
      ]
    },
    9: {
      name: "Biryani Blues",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
      rating: 4.4,
      deliveryTime: "30-35 min",
      cuisine: "Biryani, Mughlai",
      price: "₹450 for two",
      menu: [
        {
          id: 1,
          name: "Chicken Biryani",
          description: "Fragrant basmati rice with tender chicken pieces and spices",
          price: 299,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
          category: "Biryani"
        },
        {
          id: 2,
          name: "Veg Biryani",
          description: "Fragrant basmati rice with mixed vegetables and spices",
          price: 249,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
          category: "Biryani"
        },
        {
          id: 3,
          name: "Raita",
          description: "Cooling yogurt with cucumber and mint",
          price: 49,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426",
          category: "Sides"
        }
      ]
    },
    10: {
      name: "Cafe Coffee Day",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
      rating: 4.1,
      deliveryTime: "15-20 min",
      cuisine: "Coffee, Snacks",
      price: "₹200 for two",
      menu: [
        {
          id: 1,
          name: "Cappuccino",
          description: "Espresso with steamed milk and foam",
          price: 99,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
          category: "Coffee"
        },
        {
          id: 2,
          name: "Chocolate Mousse",
          description: "Rich chocolate mousse with whipped cream",
          price: 149,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
          category: "Desserts"
        },
        {
          id: 3,
          name: "Veg Sandwich",
          description: "Fresh vegetables with cheese and mayo",
          price: 129,
          image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7",
          category: "Snacks"
        }
      ]
    }
  };

  const restaurant = restaurantData[id];

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      let newItems;
      
      if (existingItem) {
        newItems = prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        newItems = [...prevItems, { ...item, quantity: 1, restaurantName: restaurant.name }];
      }
      
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: Math.max(0, item.quantity - 1) };
        }
        return item;
      }).filter(item => item.quantity > 0);
      
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (!restaurant) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Restaurant not found
        </Typography>
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
        <Button
          variant="contained"
          color="primary"
          startIcon={
            <Badge badgeContent={getTotalItems()} color="error">
              <ShoppingCartIcon />
            </Badge>
          }
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              height="200"
              image={restaurant.image}
              alt={restaurant.name}
              sx={{ borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {restaurant.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rating value={restaurant.rating} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {restaurant.rating}
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {restaurant.cuisine}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Delivery Time: {restaurant.deliveryTime}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {restaurant.price}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Menu
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {restaurant.menu.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ₹{item.price}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>
                <Chip
                  label={item.category}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  {getItemQuantity(item.id) > 0 ? (
                    <>
                      <IconButton 
                        size="small"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 1 }}>
                        {getItemQuantity(item.id)}
                      </Typography>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => addToCart(item)}
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
                      onClick={() => addToCart(item)}
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
    </Container>
  );
};

export default Restaurant; 