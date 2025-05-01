import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  useTheme,
  alpha,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from '../components/Logo';

const Auth = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0); // 0 for Customer, 1 for Restaurant
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (!isLogin) { // Registration validation
      if (!formData.name) {
        setError('Name is required');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual authentication logic here
      console.log('Form submitted:', {
        ...formData,
        userType: activeTab === 0 ? 'customer' : 'restaurant',
        isLogin
      });
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    const commonFields = (
      <>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'primary.main'
              }
            }
          }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleInputChange}
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'primary.main'
              }
            }
          }}
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
      </>
    );

    if (isLogin) {
      return commonFields;
    }

    return (
      <>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'primary.main'
              }
            }
          }}
        />
        {commonFields}
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          margin="normal"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'primary.main'
              }
            }
          }}
        />
        {activeTab === 1 && ( // Only show these fields for restaurant registration
          <>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              margin="normal"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              margin="normal"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main'
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main'
                    }
                  }
                }}
              />
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main'
                    }
                  }
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main'
                    }
                  }
                }}
              />
              <TextField
                fullWidth
                label="Postal Code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main'
                    }
                  }
                }}
              />
            </Box>
          </>
        )}
      </>
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: alpha(theme.palette.primary.main, 0.05),
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4
          }}
        >
          {/* Left side - Logo and Welcome Message */}
          <Box
            sx={{
              flex: 1,
              textAlign: 'center',
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Logo size="large" />
            </Box>
            <Typography
              variant="h3"
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                mb: 2
              }}
            >
              Welcome to TumDum
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 2
              }}
            >
              Your favorite food delivery platform
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '400px',
                mx: 'auto'
              }}
            >
              Order from your favorite restaurants and get delicious food delivered right to your doorstep.
            </Typography>
          </Box>

          {/* Right side - Auth Form */}
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 2,
              maxWidth: '500px',
              width: '100%',
              bgcolor: 'background.paper'
            }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
              >
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {isLogin
                  ? 'Sign in to continue to TumDum'
                  : 'Join TumDum to start your journey'}
              </Typography>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                centered
                sx={{
                  '& .MuiTab-root': {
                    color: 'text.secondary',
                    '&.Mui-selected': {
                      color: 'primary.main',
                      fontWeight: 'bold'
                    }
                  }
                }}
              >
                <Tab label="Customer" />
                <Tab label="Restaurant" />
              </Tabs>
            </Box>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: 'error.main'
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              {renderFormFields()}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>

              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <Button
                    onClick={() => setIsLogin(!isLogin)}
                    sx={{
                      color: 'primary.main',
                      textTransform: 'none',
                      fontWeight: 600,
                      p: 0,
                      '&:hover': {
                        bgcolor: 'transparent',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </Button>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Auth; 