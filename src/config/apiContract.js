/**
 * API Contract Configuration
 * This file contains the field mappings and API contract details
 * Source: /Users/sandeep.mehta/Documents/AdhocProjects/tumdum-backend/API.md
 */

export const API_CONTRACT = {
  // Restaurant fields
  RESTAURANT: {
    ID: 'id',
    NAME: 'name',
    DESCRIPTION: 'description',
    CUISINE: 'cuisine',
    RATING: 'rating',
    COVER_IMAGE: 'cover_image_url',
    LOGO_IMAGE: 'logo_url',
    ADDRESS: 'address',
    CITY: 'city',
    STATE: 'state',
    COUNTRY: 'country',
    POSTAL_CODE: 'postal_code',
    PHONE: 'phone',
    EMAIL: 'email',
    IS_ACTIVE: 'is_active',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at'
  },

  // Dish fields
  DISH: {
    ID: 'id',
    NAME: 'name',
    DESCRIPTION: 'description',
    PRICE: 'price',
    IMAGE: 'image',
    CATEGORY: 'category',
    RESTAURANT_ID: 'restaurant_id',
    IS_AVAILABLE: 'is_available',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at'
  },

  // API Endpoints
  ENDPOINTS: {
    RESTAURANTS: '/restaurants',
    RESTAURANT_DETAILS: (id) => `/restaurants/${id}`,
    RESTAURANT_DISHES: (id) => `/restaurants/${id}/dishes`,
    DISH_DETAILS: (restaurantId, dishId) => `/restaurants/${restaurantId}/dishes/${dishId}`
  },

  // Image URL handling
  IMAGE_URL: {
    BASE_URL: 'http://localhost:8080',
    getFullUrl: (path) => {
      if (!path) return null;
      if (path.startsWith('http')) return path;
      return `${API_CONTRACT.IMAGE_URL.BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
    }
  }
};

// Helper functions for data transformation
export const transformRestaurant = (restaurant) => ({
  ...restaurant,
  image: API_CONTRACT.IMAGE_URL.getFullUrl(restaurant[API_CONTRACT.RESTAURANT.COVER_IMAGE])
});

export const transformDish = (dish) => ({
  ...dish,
  image: API_CONTRACT.IMAGE_URL.getFullUrl(dish[API_CONTRACT.DISH.IMAGE])
}); 