import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    // Add token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Restaurant API
export const restaurantApi = {
  // Get all restaurants
  getAllRestaurants: async () => {
    try {
      const response = await api.get('/restaurants');
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw error;
    }
  },

  // Get restaurant by ID
  getRestaurantById: async (id) => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching restaurant ${id}:`, error);
      throw error;
    }
  },

  // Create new restaurant
  createRestaurant: async (restaurantData) => {
    try {
      const response = await api.post('/restaurants', restaurantData);
      return response.data;
    } catch (error) {
      console.error('Error creating restaurant:', error);
      throw error;
    }
  },

  // Update restaurant
  updateRestaurant: async (id, restaurantData) => {
    try {
      const response = await api.put(`/restaurants/${id}`, restaurantData);
      return response.data;
    } catch (error) {
      console.error(`Error updating restaurant ${id}:`, error);
      throw error;
    }
  },

  // Delete restaurant
  deleteRestaurant: async (id) => {
    try {
      const response = await api.delete(`/restaurants/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting restaurant ${id}:`, error);
      throw error;
    }
  }
};

// Dish API
export const dishApi = {
  // Get all dishes for a restaurant
  getDishesByRestaurant: async (restaurantId) => {
    try {
      console.log('Making request to fetch dishes for restaurant:', restaurantId);
      const response = await api.get(`/restaurants/${restaurantId}/dishes`);
      console.log('Raw dishes response:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching dishes:', {
        restaurantId,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  // Get dish by ID
  getDishById: async (restaurantId, dishId) => {
    try {
      const response = await api.get(`/restaurants/${restaurantId}/dishes/${dishId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching dish ${dishId}:`, error);
      throw error;
    }
  },

  // Create new dish
  createDish: async (restaurantId, dishData) => {
    try {
      const response = await api.post(`/restaurants/${restaurantId}/dishes`, dishData);
      return response.data;
    } catch (error) {
      console.error('Error creating dish:', error);
      throw error;
    }
  },

  // Update dish
  updateDish: async (restaurantId, dishId, dishData) => {
    try {
      const response = await api.put(`/restaurants/${restaurantId}/dishes/${dishId}`, dishData);
      return response.data;
    } catch (error) {
      console.error(`Error updating dish ${dishId}:`, error);
      throw error;
    }
  },

  // Delete dish
  deleteDish: async (restaurantId, dishId) => {
    try {
      const response = await api.delete(`/restaurants/${restaurantId}/dishes/${dishId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting dish ${dishId}:`, error);
      throw error;
    }
  }
};

// Auth API
export const authApi = {
  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
};

// Order API calls
export const orderApi = {
  // Create order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Get user orders
  getUserOrders: async (userId) => {
    const response = await api.get(`/users/${userId}/orders`);
    return response.data;
  },
};

// User API calls
export const userApi = {
  // Create user
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    await api.delete(`/users/${id}`);
  },
};

export default api; 