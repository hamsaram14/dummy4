// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import RestaurantTab from './components/RestaurantTab';
import ViewCart from './components/ViewCart';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RestaurantTab />} />  {/* Home route for RestaurantTab */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/restaurant" element={<RestaurantTab />} />  {/* Add /restaurant route */}
                <Route path="/cart" element={<ViewCart />} />
            </Routes>
        </Router>
    );
}

export default App;
