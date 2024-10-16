// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import RestaurantTab from './components/RestaurantTab';
import ViewCart from './components/ViewCart';
import RestaurantSignup from './components/RestaurantSignup';
import RestaurantLogin from './components/RestaurantLogin';
import LogoutButton from './components/LogoutButton';
import SignUpComponent from './components/SignUpComponent';
import LoginComponent from './components/LoginComponent';
import RestaurantProfile from './components/RestaurantProfile';
import DishManagement from './components/DishManagement';
import DishList from './components/DishList';
import FavoriteRestaurants from './components/FavoriteRestaurants';
import CartPage from './components/CartPage';
import AddressConfirmation from './components/AddressConfirmation';


const favoriteRestaurantsData = [
  { id: 1, name: 'Italian Bistro', description: 'Delicious Italian food.', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Sushi Palace', description: 'Fresh sushi and Japanese dishes.', image: 'https://via.placeholder.com/150' },
  // Add more restaurants as needed
];


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/restaurant" element={<RestaurantTab />} /> {/* use only / for Default route to RestaurantTab */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<ViewCart />} />
                <Route path="/restaurant-signup" element={<RestaurantSignup />} />
                <Route path="/restaurant-login" element={<RestaurantLogin />} />
                <Route path="/logout" element={<LogoutButton />} />
                <Route path="/restaurant" element={<RestaurantTab />}  />
                <Route path="/customer-signup" element={<SignUpComponent />} />
                <Route path="/customer-login" element={<LoginComponent />} />
                <Route path="restaurant-profile" element={<RestaurantProfile />} />
                <Route path="dish-management" element={<DishManagement />} />
                <Route path="/restaurant/dishes" element={<DishList />} />
                <Route path="/cart" element={<CartPage />} />
                {/* <Route path="/favorites" element={<FavoriteRestaurants />} /> */}
                <Route path="/favorites" element={<FavoriteRestaurants favoriteRestaurants={favoriteRestaurantsData} />} />
                {/* Uncomment and add additional components if needed */}
                <Route path="/customer-signup" element={<SignUpComponent />} /> 
                <Route path="/customer-login" element={<LoginComponent />} /> 
                <Route path="/address-confirmation" element={<AddressConfirmation />} />
            </Routes>
        </Router>
    );
}

export default App;
