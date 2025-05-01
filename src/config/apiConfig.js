/**
 * API Configuration
 * Contains paths and references to API documentation
 */

export const API_CONFIG = {
  // Location of the API documentation
  DOCUMENTATION_PATH: '/Users/sandeep.mehta/Documents/AdhocProjects/tumdum-backend/API.md',
  
  // Base URL for API calls
  BASE_URL: 'http://localhost:8080',
  
  // Image URL handling
  getImageUrl: (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${API_CONFIG.BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  }
}; 