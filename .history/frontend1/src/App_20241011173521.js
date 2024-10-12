import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpComponent from './components/SignUpComponent';
import LoginComponent from './components/LoginComponent';
import ProfilePage from './components/ProfilePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;

