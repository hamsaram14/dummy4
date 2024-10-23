import React, { useEffect, useState } from 'react';

function OrderDetails({ orderId }) {
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/order/${orderId}/`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                // Try to parse the JSON data
                const data = await response.json();
                setOrder(data);  // Set the order data if everything works fine
            } catch (err) {
                setError(err.message);  // Catch and set the error message
                console.error('Failed to fetch order:', err);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Order Details</h2>
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <p>Restaurant: {order.restaurant}</p>
            <p>Customer: {order.customer}</p>

            <h3>Order Items</h3>
            <ul>
                {order.items.map(item => (
                    <li key={item.id}>
                        {item.dish.name} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderDetails;
