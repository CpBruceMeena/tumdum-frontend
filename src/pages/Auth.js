import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  InputAdornment,
  IconButton,
  Grid,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from '../components/Logo';

const Auth = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle authentication
    // For now, we'll just navigate to home
    navigate('/home');
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
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                  mb: 4,
                  width: '100%',
                  '& .MuiTab-root': {
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    py: 2,
                  },
                }}
              >
                <Tab label="Login" sx={{ flex: 1 }} />
                <Tab label="Sign Up" sx={{ flex: 1 }} />
              </Tabs>

              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                {tabValue === 1 && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={tabValue === 0 ? 'current-password' : 'new-password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
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

                {tabValue === 1 && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                  }}
                >
                  {tabValue === 0 ? 'Login' : 'Sign Up'}
                </Button>

                {tabValue === 0 && (
                  <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don't have an account?{' '}
                    <Button
                      color="primary"
                      onClick={() => setTabValue(1)}
                      sx={{ textTransform: 'none', fontWeight: 600 }}
                    >
                      Sign Up
                    </Button>
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Auth; 