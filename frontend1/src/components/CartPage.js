import React, { useState, useEffect } from 'react';
import './CartPage.css';

function CartPage({ cart, restaurantName, addToCart }) {
    const [currentRestaurant, setCurrentRestaurant] = useState(restaurantName);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [newRestaurant, setNewRestaurant] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    useEffect(() => {
        if (orderPlaced) {
            const timer = setTimeout(() => setOrderPlaced(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [orderPlaced]);

    const handleAddToCart = (item, restaurant) => {
        if (currentRestaurant && currentRestaurant !== restaurant) {
            setShowConfirmation(true);
            setNewRestaurant(restaurant);
        } else {
            addToCart(item);
            setCurrentRestaurant(restaurant);
        }
    };

    const handleConfirmClearCart = () => {
        addToCart([], true); // Clear the cart
        setCurrentRestaurant(newRestaurant);
        setNewRestaurant(null);
        setShowConfirmation(false);
    };

    const handleCancelClearCart = () => {
        setShowConfirmation(false);
    };

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        // Make an API call to place the order if needed
        alert('Order placed successfully!');
    };

    return (
        <div className="cart-page">
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="cart-item-list">
                        {cart.map((dish, index) => (
                            <li key={index}>
                                <span>{dish.name} (x{dish.quantity})</span>
                                <span>${(dish.price * dish.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="cart-total">Total: ${total.toFixed(2)}</p>
                    <button onClick={handlePlaceOrder}>Place Order</button>
                    {orderPlaced && <p className="order-confirmation">Order placed successfully!</p>}
                </div>
            )}

            {showConfirmation && (
                <div className="confirmation-dialog">
                    <p>
                        Adding items from <strong>{newRestaurant}</strong> will clear your current cart.
                        Do you want to proceed?
                    </p>
                    <button onClick={handleConfirmClearCart}>Yes</button>
                    <button onClick={handleCancelClearCart}>No</button>
                </div>
            )}
        </div>
    );
}

export default CartPage;
