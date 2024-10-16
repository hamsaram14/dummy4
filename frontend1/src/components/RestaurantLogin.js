import React, { useState } from 'react';
import './RestaurantLogin.css';
import { Link } from 'react-router-dom';

const RestaurantLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Logging in with:', formData);
    };

    return (
        <div className="login-wrapper">
            <div className="restaurant-login-container">
                <h2>Restaurant Login</h2>
                <form className="restaurant-login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="login-button">Log In</button>
                </form>
                <p className="form-switch">
                    Don't have an account? <Link to="/restaurant-signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default RestaurantLogin;
