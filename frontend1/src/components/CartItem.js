// src/components/CartItem.js : This component displays each item in the cart, showing details such as name, quantity, and price.
import React from 'react';

function CartItem({ item, onRemove, onUpdateQuantity }) {
    return (
        <div className="cart-item">
            <h4>{item.name}</h4>
            <p>Price: ${item.price}</p>
            <div>
                Quantity: 
                <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))} 
                />
            </div>
            <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
    );
}

export default CartItem;
