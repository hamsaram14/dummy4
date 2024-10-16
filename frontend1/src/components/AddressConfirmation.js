// src/components/AddressConfirmation.js
import React, { useState } from 'react';
import './AddressConfirmation.css';

function AddressConfirmation() {
    const [address, setAddress] = useState('');
    const [savedAddresses] = useState([
        '123 Main St, Cityville',
        '456 Park Ave, Townsville'
    ]);

    const handleSelectAddress = (address) => {
        setAddress(address);
    };

    const handleSubmit = () => {
        alert(`Order placed with delivery address: ${address}`);
        // API call to submit the order with the address can go here
    };

    return (
        <div className="address-confirmation">
            <h3>Confirm Delivery Address</h3>
            <label>Saved Addresses:</label>
            <ul className="address-list">
                {savedAddresses.map((addr, index) => (
                    <li key={index} onClick={() => handleSelectAddress(addr)}>
                        {addr}
                    </li>
                ))}
            </ul>

            <label>Or Enter New Address:</label>
            <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <button onClick={handleSubmit} disabled={!address}>Confirm Address</button>
        </div>
    );
}

export default AddressConfirmation;
