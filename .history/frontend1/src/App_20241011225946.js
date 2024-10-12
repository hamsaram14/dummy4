// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';
import RestaurantTab from './components/RestaurantTab';

function App() {
    return (
        <Router>
            <Routes>
               {/* <Route path="/signup" element={<SignUpComponent />} />
               <Route path="/restaurant" element={<RestaurantTab />} />
                <Route path="/login" element={<LoginComponent />} /> */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/restaurant" element={<RestaurantTab />} />
                {/* Uncomment this if you want ProfilePage as the default route */}
                {/* <Route path="/" element={<ProfilePage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
