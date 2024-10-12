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
                <Route path="/" element={<RestaurantTab />} /> {/* Default route to RestaurantTab */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<ViewCart />} />
                <Route path="/restaurant" element={<RestaurantTab />} 
                {/* Uncomment and add additional components if needed */}
                {/* <Route path="/signup" element={<SignUpComponent />} /> */}
                {/* <Route path="/login" element={<LoginComponent />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
