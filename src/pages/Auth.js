import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from '../components/Logo';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    restaurantName: '',
    cuisine: '',
    address: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (userType === 'customer') {
        if (!formData.name) {
          newErrors.name = 'Name is required';
        }
      } else {
        if (!formData.restaurantName) {
          newErrors.restaurantName = 'Restaurant name is required';
        }
        if (!formData.cuisine) {
          newErrors.cuisine = 'Cuisine type is required';
        }
        if (!formData.address) {
          newErrors.address = 'Address is required';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        setApiError('');

        // Skip authentication and directly proceed
        const mockUserData = {
          id: 1,
          email: formData.email,
          name: userType === 'customer' ? formData.name : formData.restaurantName,
          type: userType,
          ...(userType === 'restaurant' && {
            restaurantDetails: {
              cuisine: formData.cuisine,
              address: formData.address,
            },
          }),
        };

        // Store mock user data
        localStorage.setItem('user', JSON.stringify(mockUserData));
        localStorage.setItem('token', 'mock-token');

        // Navigate based on user type
        if (userType === 'restaurant') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Navigation error:', error);
        setApiError('Navigation failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setUserType(newValue);
    setFormData({
      email: '',
      password: '',
      name: '',
      restaurantName: '',
      cuisine: '',
      address: '',
    });
    setErrors({});
    setApiError('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left side - Logo and Welcome Message */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 4,
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Logo size="large" />
              </Box>
              <Typography variant="h4" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                Welcome to TumDum
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                Your favorite food delivery platform
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '400px' }}>
                Order from your favorite restaurants and get delicious food delivered right to your doorstep.
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Login/Signup Form */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: 2,
                maxWidth: '500px',
                mx: 'auto',
              }}
            >
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {isLogin ? 'Welcome Back!' : 'Create Account'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {isLogin
                    ? 'Sign in to continue to TumDum'
                    : 'Join TumDum to start your journey'}
                </Typography>
              </Box>

              <Tabs
                value={userType}
                onChange={handleTabChange}
                centered
                sx={{ mb: 3 }}
              >
                <Tab
                  value="customer"
                  label="Customer"
                  icon={<PersonIcon />}
                  iconPosition="start"
                />
                <Tab
                  value="restaurant"
                  label="Restaurant"
                  icon={<RestaurantIcon />}
                  iconPosition="start"
                />
              </Tabs>

              {apiError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {apiError}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {!isLogin && userType === 'customer' && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </Grid>
                  )}

                  {!isLogin && userType === 'restaurant' && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Restaurant Name"
                          name="restaurantName"
                          value={formData.restaurantName}
                          onChange={handleChange}
                          error={!!errors.restaurantName}
                          helperText={errors.restaurantName}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Cuisine Type"
                          name="cuisine"
                          value={formData.cuisine}
                          onChange={handleChange}
                          error={!!errors.cuisine}
                          helperText={errors.cuisine}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          error={!!errors.address}
                          helperText={errors.address}
                          multiline
                          rows={2}
                        />
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{ mt: 2 }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        isLogin ? 'Sign In' : 'Create Account'
                      )}
                    </Button>
                  </Grid>

                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setErrors({});
                        setApiError('');
                      }}
                      sx={{ mt: 2 }}
                    >
                      {isLogin
                        ? "Don't have an account? Sign Up"
                        : 'Already have an account? Sign In'}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Auth; 