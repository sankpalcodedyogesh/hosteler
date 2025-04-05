import React from 'react';

const Header = () => {
    return (
        <header className="bg-primary text-white text-center py-3 d-flex align-items-center justify-content-center">
            <img src={`${process.env.PUBLIC_URL}/hosteler.png`} alt="Hostel Logo" className="me-2" style={{ width: '40px', height: '40px' }} />
            <h1>Student Dashboard</h1>
        </header>
    );
};

export default Header;
