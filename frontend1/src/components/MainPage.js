import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
    return (
        <div className="main-page">
            <h1></h1>
            <div className="login-options">
                <Link to="/customer-login" className="option-button">User Login</Link>
                <Link to="/restaurant-login" className="option-button">Restaurant Login</Link>
            </div>
        </div>
    );
}

export default MainPage;
