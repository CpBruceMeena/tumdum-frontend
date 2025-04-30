# TumDum - Food Delivery App

A modern food delivery application built with React and Material-UI.

## Features

- Restaurant listing with details
- Menu items for each restaurant
- Shopping cart functionality
- Checkout process
- User profile management
- Address management
- Responsive design

## Tech Stack

- React
- Material-UI
- React Router
- Local Storage for data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

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
  ├── pages/           # Page components
  │   ├── Auth.js      # Authentication page
  │   ├── Home.js      # Home page with restaurant listings
  │   ├── Restaurant.js # Restaurant details page
  │   ├── Checkout.js  # Checkout page
  │   └── Profile.js   # User profile page
  ├── components/      # Reusable components
  ├── App.js          # Main application component
  └── index.js        # Application entry point
```

## Features in Detail

### Restaurant Listing
- View list of restaurants
- Filter restaurants by cuisine
- Sort by rating, delivery time, or price

### Restaurant Details
- View restaurant information
- Browse menu items
- Add items to cart
- Adjust quantities

### Shopping Cart
- Add/remove items
- Update quantities
- View total amount
- Proceed to checkout

### Checkout
- Review order items
- Manage delivery address
- View order summary
- Place order

### User Profile
- Manage delivery address
- View order history
- Update user preferences

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
