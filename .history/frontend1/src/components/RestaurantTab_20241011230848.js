import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import ViewCart from './ViewCart';
import './RestaurantTab.css';
import RestaurantTab from './ViewCart';


function RestaurantTab() {
    const [restaurants, setRestaurants] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Fetch 10 restaurants with 10 dishes each
        axios.get('/api/restaurants') // Replace with your API endpoint
            .then(response => setRestaurants(response.data.slice(0, 10)))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    const addToCart = (dish) => {
        setCart([...cart, dish]);
    };

    const RestaurantTab = () => {
        return <h1>Restaurant Tab Loaded</h1>;
    };

    return (
        <div className="restaurant-tab">
            <h2>Restaurants</h2>
            <div className="restaurants-list">
                {restaurants.map(restaurant => (
                    <RestaurantCard 
                        key={restaurant.id} 
                        restaurant={restaurant} 
                        addToCart={addToCart} 
                    />
                ))}
            </div>
            <ViewCart cart={cart} />
        </div>
    );
}

export default RestaurantTab;
