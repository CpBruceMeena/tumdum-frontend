import axios from 'axios';
import { API_BASE_URL } from '../config';

class AuthService {
  constructor() {
    this.API_URL = API_BASE_URL;
    this.setupAxiosInterceptors();
  }

  setupAxiosInterceptors() {
    // Request interceptor
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const newToken = await this.refreshToken();
            localStorage.setItem('token', newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async login(email, password) {
    try {
      console.log('Attempting login with:', { email });
      const response = await axios.post(`${this.API_URL}/users/login`, {
        email: email.trim(),
        password
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('Stored user data:', response.data.user);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      this.handleError(error);
    }
  }

  async register(userData) {
    try {
      console.log('Attempting registration with:', userData);
      const response = await axios.post(`${this.API_URL}/users/register`, userData);
      
      console.log('Registration response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('Stored user data:', response.data.user);
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      this.handleError(error);
    }
  }

  logout() {
    console.log('Logging out, clearing localStorage');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  }

  async getCurrentUser() {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('getCurrentUser - localStorage user:', user);
      
      if (!user) {
        console.log('No user found in localStorage');
        return null;
      }

      // If we have a user in localStorage, return it immediately
      if (user.id && user.role) {
        console.log('Returning user from localStorage:', user);
        return user;
      }

      // Otherwise, fetch the user data from the server
      console.log('Fetching user data from server for ID:', user.id);
      const response = await axios.get(`${this.API_URL}/users/${user.id}`);
      const userData = response.data;
      
      console.log('Server user data:', userData);
      
      // Update localStorage with the fresh user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('getCurrentUser error:', error);
      this.handleError(error);
    }
  }

  async refreshToken() {
    try {
      const response = await axios.post(`${this.API_URL}/users/refresh`);
      return response.data.token;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.error || 'An error occurred');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'An error occurred');
    }
  }
}

const authService = new AuthService();
export default authService; 