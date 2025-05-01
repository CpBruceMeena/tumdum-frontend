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
      const response = await axios.post(`${this.API_URL}/users/login`, {
        email: email.trim(),
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async register(userData) {
    try {
      const response = await axios.post(`${this.API_URL}/users/register`, userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  }

  async getCurrentUser() {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return null;

      const response = await axios.get(`${this.API_URL}/users/${user.id}`);
      return response.data;
    } catch (error) {
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