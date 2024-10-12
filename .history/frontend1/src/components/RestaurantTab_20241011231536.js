import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import ViewCart from './ViewCart';
import './RestaurantTab.css';


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

    const restaurants = [
    {
        id: 1,
        name: "Restaurant 1",
        description: "A brief description of Restaurant 1",
        imageUrl: "/path/to/image.jpg", // Ensure the path to the image is correct
        menu: [
            { id: 1, name: "Dish 1", price: 10 },
            { id: 2, name: "Dish 2", price: 12 },
            // Add more dishes as needed
        ],
    },
    {
        id: 2,
        name: "Restaurant 2",
        description: "A brief description of Restaurant 2",
        imageUrl: "/path/to/image.jpg",
        menu: [
            { id: 1, name: "Dish 1", price: 15 },
            { id: 2, name: "Dish 2", price: 18 },
        ],
    },
    // Add more restaurants as needed
];


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
