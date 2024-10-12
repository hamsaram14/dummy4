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
                        value={profile.date_of_birth}
                        onChange={handleChange}
                    />

                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                    />

                    <label>State:</label>
                    <input
                        type="text"
                        name="state"
                        value={profile.state}
                        onChange={handleChange}
                    />

                    <label>Country:</label>
                    <select name="country" value={profile.country} onChange={handleChange}>
                        <option value="">Select Country</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>

                    <label>Nickname:</label>
                    <input
                        type="text"
                        name="nickname"
                        value={profile.nickname}
                        onChange={handleChange}
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />

                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={profile.phone_number}
                        onChange={handleChange}
                    />

                    <label>Profile Picture:</label>
                    <input
                        type="file"
                        name="profile_picture"
                        onChange={handleImageChange}
                    />

                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
}

export default ProfilePage;
