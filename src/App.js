import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import RestaurantDashboard from './pages/RestaurantDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Material-UI Blue
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#03A9F4', // Light Blue
      light: '#4FC3F7',
      dark: '#0288D1',
      contrastText: '#fff',
    },
    background: {
      default: '#F5F9FF', // Very light blue background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#546E7A',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(33, 150, 243, 0.2)',
          },
        },
        contained: {
          '&:hover': {
            backgroundColor: '#1976D2',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(33, 150, 243, 0.08)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(33, 150, 243, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#2196F3',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2196F3',
            },
          },
        },
      },
    },
  },
});

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                user.type === 'restaurant' ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Home user={user} onLogout={handleLogout} />
                )
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
          <Route
            path="/auth"
            element={user ? <Navigate to="/" replace /> : <Auth />}
          />
          <Route
            path="/restaurant/:id"
            element={
              user ? (
                <Restaurant user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
          <Route
            path="/checkout"
            element={
              user ? (
                <Checkout user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              user && user.type === 'restaurant' ? (
                <RestaurantDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
