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
        console.log("Submitting form...");
        console.log("FormData before sending:", formData); 
        console.log("Sending Axios request...");

        try {


            
            const response = await axios.post('http://127.0.0.1:8000/api/customer/signup/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });  
            setMessage('Sign-up successful!');
        } catch (error) {
            // Check if error.response exists before trying to access it
            if (error.response) {
                console.error('Sign-up error details:', error.response.data);  // Log error details for debugging
                setMessage('Error: ' + (error.response.data.error || 'Sign-up failed'));
            } else if (error.request) {
                console.error('No response received:', error.request);  // Error in sending request
                setMessage('Error: No response from server');
            } else {
                console.error('Error setting up request:', error.message);  // Error in setting up the request
                setMessage('Error: ' + error.message);
            }
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
