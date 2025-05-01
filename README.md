# TumDum - Food Delivery App

A modern food delivery application built with React and Material-UI, integrated with a backend API.

## Features

- Restaurant listing with details
- Menu items for each restaurant
- Shopping cart functionality
- Checkout process
- User profile management
- Address management
- Restaurant owner dashboard
- Backend API integration
- Responsive design
- Image handling with fallbacks

## Tech Stack

- React
- Material-UI
- React Router
- Axios for API calls
- Local Storage for data persistence
- Webpack for module bundling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 8080

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tumdum-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
  ├── pages/                    # Page components
  │   ├── Auth.js              # Authentication page
  │   ├── Home.js              # Home page with restaurant listings
  │   ├── Restaurant.js        # Restaurant details page
  │   ├── Checkout.js          # Checkout page
  │   ├── Profile.js           # User profile page
  │   └── RestaurantDashboard.js # Restaurant owner dashboard
  ├── services/                # API services
  │   └── api.js              # API integration
  ├── components/              # Reusable components
  ├── App.js                   # Main application component
  └── index.js                 # Application entry point
```

## Features in Detail

### Restaurant Listing
- View list of restaurants from backend API
- Filter restaurants by cuisine
- Sort by rating, delivery time, or price
- Display restaurant cover images with fallback

### Restaurant Details
- View restaurant information
- Browse menu items from backend API
- Add items to cart
- Adjust quantities
- Display dish images with fallback

### Shopping Cart
- Add/remove items
- Update quantities
- View total amount
- Proceed to checkout
- Display item images in cart

### Checkout
- Review order items
- Manage delivery address
- View order summary with taxes
- Place order
- Display item images in order summary

### Restaurant Dashboard
- Manage restaurant details
- Add/Edit/Delete menu items
- Upload dish images
- View restaurant statistics

### User Profile
- Manage delivery address
- View order history
- Update user preferences

## API Integration

The application integrates with a backend API running on port 8080. The following endpoints are used:

- `/api/restaurants` - Get all restaurants
- `/api/restaurants/:id` - Get restaurant details
- `/api/restaurants/:id/dishes` - Get restaurant dishes
- `/api/auth` - Authentication endpoints
- `/api/orders` - Order management

### Image Handling

The application handles images from the backend API with the following features:

- Restaurant cover images: Uses `cover_image_url` field
- Restaurant logo: Uses `logo_url` field
- Dish images: Uses `image_url` field
- Automatic URL construction for relative paths
- Fallback placeholder images when images fail to load
- Error logging for image loading failures

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
