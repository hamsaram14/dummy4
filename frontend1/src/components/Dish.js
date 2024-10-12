import React from 'react';
import './Dish.css';

function Dish({ dish, addToCart }) {
    return (
        <div className="dish">
            <h5>{dish.name}</h5>
            <p>{dish.description}</p>
            <p>Price: ${dish.price}</p>
            <button onClick={() => addToCart(dish)}>Add to Cart</button>
        </div>
    );
}

export default Dish;
