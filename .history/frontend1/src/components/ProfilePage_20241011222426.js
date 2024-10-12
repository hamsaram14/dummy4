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

    // Fetch profile and countries data on component load
    useEffect(() => {
        console.log("Loading ProfilePage...");
        axios.get('http://127.0.0.1:8000/api/customer/profile/') // Ensure this URL is correct
            .then(response => {
                console.log("Profile data fetched:", response.data);
                setProfile(response.data);
            })
            .catch(error => console.error('Error fetching profile:', error));

        axios.get('https://restcountries.com/v3.1/all')
            .then(response => setCountries(response.data.map(country => country.name.common)))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    // Handle input change for form fields
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Handle profile picture upload
    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    // Submit profile updates
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
            console.log("Profile updated:", response.data);
            setMessage('Profile updated successfully!');
            setProfile(response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile.');
        }
    };

 