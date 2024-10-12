import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/customer/signup/', formData);
            setMessage('Sign-up successful!');
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || 'Sign-up failed'));
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Customer Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
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

export default SignUp;
