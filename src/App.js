import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            {user?.role === 'restaurant' ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Home />
            )}
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth"
        element={
          user ? (
            <Navigate to={user.role === 'restaurant' ? '/dashboard' : '/'} replace />
          ) : (
            <Auth />
          )
        }
      />
      <Route
        path="/restaurant/:id"
        element={
          <ProtectedRoute>
            <Restaurant />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="restaurant">
            <RestaurantDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
