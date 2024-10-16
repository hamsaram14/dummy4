import React, { useState } from 'react';
import './RestaurantSignup.css';
import { Link } from 'react-router-dom';

const RestaurantSignup = () => {
    const [formData, setFormData] = useState({
        restaurantName: '',
        email: '',
        password: '',
        location: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('Signing up with:', formData);
    };

    return (
        <div className="signup-wrapper">
            <div className="restaurant-signup-container">
                <h2>Restaurant Signup</h2>
                <form className="restaurant-signup-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="restaurantName"
                        placeholder="Restaurant Name"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        required
                    />
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
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <p className="form-switch">
                    Already have an account? <Link to="/restaurant-login">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default RestaurantSignup;
