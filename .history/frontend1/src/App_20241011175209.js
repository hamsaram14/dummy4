// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage'; // Adjust path if necessary

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProfilePage />} /> {/* Ensure ProfilePage is set as the default route */}
            </Routes>
        </Router>
    );
}

export default App;
