import React from 'react';
import './ViewCart.css';

function ViewCart({ cart }) {
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const handleCheckout = () => {
        alert('Order placed successfully!');
        // API call to submit the order can go here
    };

    return (
        <div className="view-cart">
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((dish, index) => (
                            <li key={index}>
                                {dish.name} - ${dish.price}
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${total.toFixed(2)}</p>
                    <button onClick={handleCheckout}>Place Order</button>
                </div>
            )}
        </div>
    );
}

export default ViewCart;
