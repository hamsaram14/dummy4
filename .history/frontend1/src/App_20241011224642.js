// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUpComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/profile" element={<ProfilePage />} />
                {/* Uncomment this if you want ProfilePage as the default route */}
                {/* <Route path="/" element={<ProfilePage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
