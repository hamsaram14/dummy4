import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';

function ProfilePage() {
    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        city: '',
        state: '',
        country: '',
        nickname: '',
        email: '',
        phone_number: '',
        profile_picture: ''
    });
    const [countries, setCountries] = useState([]);
    const [message, setMessage] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/customer/profile/')
            .then(response => setProfile(response.data))
            .catch(error => console.error('Error fetching profile:', error));

        axios.get('https://restcountries.com/v3.1/all')
            .then(response => setCountries(response.data.map(country => country.name.common)))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(profile).forEach(key => formData.append(key, profile[key]));
        if (profileImage) {
            formData.append('profile_picture', profileImage);
        }

        try {
            const response = await axios.put('http://127.0.0.1:8000/api/customer/profile/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('Profile updated successfully!');
            setProfile(response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile.');
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-heading">Account Details</div>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={profile.first_name}
                        onChange={handleChange}
                    />

                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={profile.last_name}
                        onChange={handleChange}
                    />

                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="date_of_birth"
              
