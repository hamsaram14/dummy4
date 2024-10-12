import React, { useState } from 'react';
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
            const response = await fetch('http://127.0.0.1:8000/api/customer/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                setMessage('Login successful!');
                localStorage.setItem('authToken', data.token);
            } else {
                const errorData = await response.json();
                console.error('Login error:', errorData);
                setMessage(errorData.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login request:', error);
            setMessage('Error: Unable to log in');
        }
    };

    return (
        <div className="container">
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
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginComponent;
