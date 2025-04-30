import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState(() => {
    const savedAddress = localStorage.getItem('userAddress');
    return savedAddress ? JSON.parse(savedAddress) : {
      street: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    };
  });

  const handleAddressChange = (field) => (event) => {
    setAddress(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSaveAddress = () => {
    localStorage.setItem('userAddress', JSON.stringify(address));
    alert('Address saved successfully!');
    navigate(-1);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnIcon color="primary" />
          Manage Address
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street Address"
              value={address.street}
              onChange={handleAddressChange('street')}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              value={address.city}
              onChange={handleAddressChange('city')}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              value={address.state}
              onChange={handleAddressChange('state')}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pincode"
              value={address.pincode}
              onChange={handleAddressChange('pincode')}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Landmark (Optional)"
              value={address.landmark}
              onChange={handleAddressChange('landmark')}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveAddress}
            size="large"
          >
            Save Address
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile; 