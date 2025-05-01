import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  CardMedia,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { restaurantApi, dishApi } from '../services/api';

const RestaurantDashboard = () => {
  const [restaurantData, setRestaurantData] = useState({
    name: '',
    cuisine: '',
    address: '',
    image: null,
    description: '',
    openingHours: '',
    contactNumber: '',
  });

  const [menuItems, setMenuItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.type === 'restaurant') {
          // Fetch restaurant details
          const restaurantDetails = await restaurantApi.getRestaurantById(userData.id);
          setRestaurantData({
            name: restaurantDetails.name || '',
            cuisine: restaurantDetails.cuisine || '',
            address: restaurantDetails.address || '',
            image: restaurantDetails.image || null,
            description: restaurantDetails.description || '',
            openingHours: restaurantDetails.openingHours || '',
            contactNumber: restaurantDetails.contactNumber || '',
          });

          // Fetch restaurant dishes
          const dishesData = await restaurantApi.getRestaurantDishes(userData.id);
          setMenuItems(dishesData.dishes || []);
        }
      } catch (err) {
        setError('Failed to load restaurant data. Please try again.');
        console.error('Error fetching restaurant data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, []);

  const handleRestaurantChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'restaurant') {
          setRestaurantData((prev) => ({
            ...prev,
            image: reader.result,
          }));
        } else {
          setCurrentMenuItem((prev) => ({
            ...prev,
            image: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveRestaurant = async () => {
    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData && userData.type === 'restaurant') {
        await restaurantApi.updateRestaurant(userData.id, restaurantData);
        setSuccess('Restaurant details updated successfully!');
      }
    } catch (err) {
      setError('Failed to update restaurant details. Please try again.');
      console.error('Error updating restaurant:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenuItem = () => {
    setCurrentMenuItem({
      name: '',
      description: '',
      price: '',
      category: '',
      image: null,
    });
    setOpenDialog(true);
  };

  const handleEditMenuItem = (item) => {
    setCurrentMenuItem(item);
    setOpenDialog(true);
  };

  const handleDeleteMenuItem = async (id) => {
    try {
      setLoading(true);
      await dishApi.deleteDish(id);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
      setSuccess('Menu item deleted successfully!');
    } catch (err) {
      setError('Failed to delete menu item. Please try again.');
      console.error('Error deleting menu item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMenuItem = async () => {
    if (currentMenuItem.name && currentMenuItem.price) {
      try {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.type === 'restaurant') {
          const menuItemData = {
            ...currentMenuItem,
            restaurant_id: userData.id,
          };

          if (currentMenuItem.id) {
            // Update existing menu item
            await dishApi.updateDish(currentMenuItem.id, menuItemData);
            setMenuItems((prev) =>
              prev.map((item) =>
                item.id === currentMenuItem.id ? currentMenuItem : item
              )
            );
          } else {
            // Create new menu item
            const newMenuItem = await dishApi.createDish(menuItemData);
            setMenuItems((prev) => [...prev, newMenuItem]);
          }

          setOpenDialog(false);
          setSuccess('Menu item saved successfully!');
        }
      } catch (err) {
        setError('Failed to save menu item. Please try again.');
        console.error('Error saving menu item:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Restaurant Details Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Restaurant Details
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Restaurant Name"
                name="name"
                value={restaurantData.name}
                onChange={handleRestaurantChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Cuisine Type"
                name="cuisine"
                value={restaurantData.cuisine}
                onChange={handleRestaurantChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={restaurantData.address}
                onChange={handleRestaurantChange}
                margin="normal"
                multiline
                rows={2}
              />
              <Box sx={{ mt: 2, mb: 2 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="restaurant-image-upload"
                  type="file"
                  onChange={(e) => handleImageUpload(e, 'restaurant')}
                />
                <label htmlFor="restaurant-image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                  >
                    Upload Restaurant Image
                  </Button>
                </label>
                {restaurantData.image && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <img
                      src={restaurantData.image}
                      alt="Restaurant"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        borderRadius: '8px',
                      }}
                    />
                  </Box>
                )}
              </Box>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={restaurantData.description}
                onChange={handleRestaurantChange}
                margin="normal"
                multiline
                rows={3}
              />
              <TextField
                fullWidth
                label="Opening Hours"
                name="openingHours"
                value={restaurantData.openingHours}
                onChange={handleRestaurantChange}
                margin="normal"
                placeholder="e.g., 9:00 AM - 10:00 PM"
              />
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={restaurantData.contactNumber}
                onChange={handleRestaurantChange}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveRestaurant}
                sx={{ mt: 2 }}
                disabled={loading}
              >
                Save Restaurant Details
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Menu Items Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">Menu Items</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddMenuItem}
                disabled={loading}
              >
                Add Item
              </Button>
            </Box>
            <List>
              {menuItems.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    {item.image && (
                      <CardMedia
                        component="img"
                        sx={{ width: 60, height: 60, mr: 2, borderRadius: 1 }}
                        image={item.image}
                        alt={item.name}
                      />
                    )}
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                          <Typography variant="body2" color="primary">
                            ₹{item.price}
                          </Typography>
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditMenuItem(item)}
                        sx={{ mr: 1 }}
                        disabled={loading}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteMenuItem(item.id)}
                        disabled={loading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Add/Edit Menu Item Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentMenuItem.id ? 'Edit Menu Item' : 'Add Menu Item'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Item Name"
              value={currentMenuItem.name}
              onChange={(e) =>
                setCurrentMenuItem({ ...currentMenuItem, name: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              value={currentMenuItem.description}
              onChange={(e) =>
                setCurrentMenuItem({ ...currentMenuItem, description: e.target.value })
              }
              margin="normal"
              multiline
              rows={2}
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={currentMenuItem.price}
              onChange={(e) =>
                setCurrentMenuItem({ ...currentMenuItem, price: e.target.value })
              }
              margin="normal"
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={currentMenuItem.category}
                label="Category"
                onChange={(e) =>
                  setCurrentMenuItem({ ...currentMenuItem, category: e.target.value })
                }
              >
                <MenuItem value="appetizers">Appetizers</MenuItem>
                <MenuItem value="mainCourse">Main Course</MenuItem>
                <MenuItem value="desserts">Desserts</MenuItem>
                <MenuItem value="beverages">Beverages</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="menu-item-image-upload"
                type="file"
                onChange={(e) => handleImageUpload(e, 'menuItem')}
              />
              <label htmlFor="menu-item-image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload Dish Image
                </Button>
              </label>
              {currentMenuItem.image && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <img
                    src={currentMenuItem.image}
                    alt="Dish"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSaveMenuItem} variant="contained" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbars for notifications */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RestaurantDashboard; 