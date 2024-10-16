import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DishManagement.css';
import { Link } from 'react-router-dom';

function DishManagement() {
    const [dish, setDish] = useState({
        name: '',
        ingredients: '',
        price: '',
        description: '',
        category: ''
    });
    const [categories, setCategories] = useState([
        'Appetizer', 'Salad', 'Main Course', 'Dessert', 'Beverage'
    ]);
    const [dishImage, setDishImage] = useState(null);
    const [message, setMessage] = useState('');
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/restaurant/dishes/')
            .then(response => setDishes(response.data))
            .catch(error => console.error('Error fetching dishes:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDish({ ...dish, [name]: value });
    };

    const handleImageChange = (e) => {
        setDishImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(dish).forEach(key => formData.append(key, dish[key]));
        if (dishImage) {
            formData.append('image', dishImage);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/restaurant/dish/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('Dish added/updated successfully!');
            setDishes([...dishes, response.data]);
            setDish({ name: '', ingredients: '', price: '', description: '', category: '' });
            setDishImage(null);
        } catch (error) {
            console.error('Error adding/updating dish:', error);
            setMessage('Error adding/updating dish.');
        }
    };

    return (
        <div className="dish-management">
            <div className="dish-heading">Manage Dishes</div>
            <Link to="/restaurant/dishes" className="view-dishes-link">View Added Dishes</Link>
            <div className="dish-container">
                
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Dish Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={dish.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Ingredients:</label>
                    <textarea
                        name="ingredients"
                        value={dish.ingredients}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={dish.price}
                        onChange={handleChange}
                        required
                    />

                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={dish.description}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <label>Category:</label>
                    <select
                        name="category"
                        value={dish.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <label>Upload Image:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />

                    <button type="submit">Save Dish</button>
                </form>
            </div>

            <div className="dishes-list">
                <h3>Existing Dishes</h3>
                {dishes.length > 0 ? (
                    dishes.map(dish => (
                        <div key={dish.id} className="dish-item">
                            <img src={dish.image} alt={dish.name} className="dish-image" />
                            <h4>{dish.name}</h4>
                            <p><strong>Ingredients:</strong> {dish.ingredients}</p>
                            <p><strong>Price:</strong> ${dish.price}</p>
                            <p><strong>Category:</strong> {dish.category}</p>
                            <p><strong>Description:</strong> {dish.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No dishes available.</p>
                )}
            </div>
        </div>
    );
}

export default DishManagement;
