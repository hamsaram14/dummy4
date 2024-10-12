// src/components/LoginComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoginComponent.css';

const LoginComponent = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/customer/login/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage('Login successful!');
            // Handle successful login (e.g., redirect, store token, etc.)
        } catch (error) {
            if (error.response) {
                console.error('Login error details:', error.response.data);
                setMessage('Error: ' + (error.response.data.error || 'Login failed'));
            } else if (error.request) {
                console.error('No response received:', error.request);
                setMessage('Error: No response from server');
            } else {
                console.error('Error setting up request:', error.message);
                setMessage('Error: ' + error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Customer Login</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Log In</button>
                </form>
                {message && <p className="message">{message}</p>}
                <p className="signup-prompt">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginComponent;
