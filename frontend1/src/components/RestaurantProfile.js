import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';

function RestaurantProfile() {
    const [profile, setProfile] = useState({
        name: '',
        location: '',
        description: '',
        contact: '',
        timings: '',
        images: []
    });
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState('');

    // Fetch profile data on load
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/restaurant/profile/') // Adjust API endpoint if necessary
            .then(response => setProfile(response.data))
            .catch(error => console.error('Error fetching profile:', error));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // Handle image upload
    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    // Submit profile updates
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(profile).forEach(key => formData.append(key, profile[key]));
        if (profileImage) {
            formData.append('images', profileImage);
        }

        try {
            const response = await axios.put('http://127.0.0.1:8000/api/restaurant/profile/', formData, {
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
                <div className="profile-heading">Restaurant Profile</div>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Restaurant Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                        required
                    />

                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={profile.description}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <label>Contact Information:</label>
                    <input
                        type="text"
                        name="contact"
                        value={profile.contact}
                        onChange={handleChange}
                        required
                    />

                    <label>Timings:</label>
                    <input
                        type="text"
                        name="timings"
                        value={profile.timings}
                        onChange={handleChange}
                        required
                    />

                    <label>Upload Image:</label>
                    <input
                        type="file"
                        name="images"
                        onChange={handleImageChange}
                    />

                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
}

export default RestaurantProfile;
