import React, { useState, useEffect } from 'react';
import './OrdersManagement.css';

function OrdersManagement() {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusOptions] = useState(['Order Received', 'Preparing', 'On the Way', 'Pick up Ready', 'Delivered', 'Picked Up']);

    // Fetch orders from API
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/orders');
            const data = await response.json();
            setOrders(data);
        };
        fetchOrders();
    }, []);

    // Filter orders by status
    const filteredOrders = filterStatus === 'All' ? orders : orders.filter(order => order.status === filterStatus);

    // Update order status
    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <div className="orders-management">
            <h2>Orders Management</h2>

            {/* Filter orders by status */}
            <div className="filter-section">
                <label>Filter by Status:</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="All">All</option>
                    <option value="New">New</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders list */}
            <div className="orders-list">
                <h3>Orders</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                            <th>Update Status</th>
                            <th>View Profile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customer.name}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => setSelectedOrder(order)}>
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Customer profile modal */}
            {selectedOrder && (
                <div className="customer-profile-modal">
                    <div className="modal-content">
                        <h3>Customer Profile</h3>
                        <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                        <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                        <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                        <p><strong>Address:</strong> {selectedOrder.customer.address}</p>
                        <button onClick={() => setSelectedOrder(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrdersManagement;
