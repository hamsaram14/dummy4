import React, { useState } from 'react';
import Dish from './Dish';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './RestaurantCard.css';

function RestaurantCard({ restaurant, addToCart }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // Optionally send favorite status to API
    };

    return (
        <div className="restaurant-card">
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
            <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.description}</p>
                <div onClick={toggleFavorite} className="favorite-icon">
                    {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                </div>
            </div>
            <h4>Menu</h4>
            <div className="menu">
                {restaurant.menu.slice(0, 10).map(dish => (
                    <Dish key={dish.id} dish={dish} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}

export default RestaurantCard;
