import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewCart.css';

function ViewCart({ cart: passedCart }) {
    const [cart, setCart] = useState(passedCart || [
        { id: 1, name: 'Pizza', price: 12.99, quantity: 1 },
        { id: 2, name: 'Burger', price: 9.99, quantity: 2 },
        { id: 3, name: 'Pasta', price: 10.99, quantity: 1 },
    ]);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/address-confirmation');
    };

    return (
        <div className="view-cart">
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
                    <button onClick={handleCheckout}>Place Order</button>
                </div>
            )}
        </div>
    );
}

export default ViewCart;
