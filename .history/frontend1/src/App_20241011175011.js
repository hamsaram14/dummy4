// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfilePage from './components/ProfilePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProfilePage />} />  {/* Set ProfilePage as default route */}
            </Routes>
        </Router>
    );
}

export default App;
