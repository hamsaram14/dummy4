// src/components/DishList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DishList.css';
import { Link } from 'react-router-dom';


function DishList() {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/restaurant/dishes')
            .then(response => setDishes(response.data))
            .catch(error => console.error('Error fetching dishes:', error));
    }, []);

    return (
        <div className="dish-list-page">
            <h2 className="dish-list-heading">List of dishes added</h2>
            <div className="dish-list-container">
                {dishes.length > 0 ? (
                    dishes.map(dish => (
                        <div key={dish.id} className="dish-card">
                            <img src={dish.image} alt={dish.name} className="dish-image" />
                            <h3>{dish.name}</h3>
                            <p><strong>Ingredients:</strong> {dish.ingredients}</p>
                            <p><strong>Price:</strong> ${dish.price}</p>
                            <p><strong>Description:</strong> {dish.description}</p>
                            <p><strong>Category:</strong> {dish.category}</p>
                        </div>
                    ))
                ) : (
                    <p>No dishes added yet.</p>
                )}
            </div>
            <Link to="/dish-management" className="dish-management-link">Manage Dishes</Link> {/* Link back to manage dishes */}
        </div>
    );
}

export default DishList;
