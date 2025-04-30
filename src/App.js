import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import Cart from './pages/Cart';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Light blue
      light: '#64B5F6',
      dark: '#1976D2',
    },
    secondary: {
      main: '#90CAF9', // Lighter blue
    },
    background: {
      default: '#F5F9FF', // Very light blue background
    },
  },
  typography: {
    fontFamily: '"ProximaNova", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
