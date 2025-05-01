// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Application Configuration
export const APP_NAME = 'TumDum';
export const APP_DESCRIPTION = 'Your favorite food delivery platform';

// Feature Flags
export const FEATURES = {
  ENABLE_CART: true,
  ENABLE_ORDERS: true,
  ENABLE_REVIEWS: true,
  ENABLE_NOTIFICATIONS: true
};

// Pagination Settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50
};

// Cache Duration (in milliseconds)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000 // 24 hours
}; 