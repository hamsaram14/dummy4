import React, { useState } from 'react';
import axios from 'axios';
import './SignUpComponent.css';

const SignUpComponent = () => {
    const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/customer/signup/', formData);
            setMessage('Sign-up successful!');
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.error || 'Sign-up failed'));
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Customer Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
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
                    <button type="submit">Sign Up</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default SignUpComponent;
