import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './FavoriteRestaurants.css';

function FavoriteRestaurants({ favoriteRestaurants = [] }) {
    return (
        <div className="favorite-restaurants">
            <h2>Favorite Restaurants</h2>
            <div className="favorite-list">
                {favoriteRestaurants.length > 0 ? (
                    favoriteRestaurants.map((restaurant) => (
                        <div key={restaurant.id} className="favorite-card">
                            <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                            <div className="restaurant-info">
                                <h3>{restaurant.name}</h3>
                                <p>{restaurant.description}</p>
                                <div className="favorite-icon">
                                    <FaHeart color="red" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No favorite restaurants yet.</p>
                )}
            </div>
        </div>
    );
}

export default FavoriteRestaurants;
