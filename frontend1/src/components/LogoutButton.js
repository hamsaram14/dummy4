import React from 'react';

function LogoutButton() {
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        alert('Logged out successfully');
    };

    return <button onClick={handleLogout}>Log Out</button>;
}

export default LogoutButton;
