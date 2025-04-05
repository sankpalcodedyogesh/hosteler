// AddRoom.js
import React, { useState } from 'react';
import axios from 'axios';
import WardenHeader from '../Common/WardenHeader';  // Import the WardenHeader component
import WardenNavbar from './WardenNavbar';  // Import the WardenNavbar component
import Footer from '../Common/Footer';  // Import the Footer component

const AddRoom = () => {
    const [room, setRoom] = useState({ roomNumber: '', capacity: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setRoom({ ...room, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/wardens/addroom', room, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Room added!', response.data);
            setMessage('Room added successfully!');
            setRoom({ roomNumber: '', capacity: '' });
        })
        .catch(error => {
            console.error('There was an error adding the room!', error);
            setMessage('There was an error adding the room. Please try again.');
        });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <WardenHeader />  {/* Use the WardenHeader component */}
            <WardenNavbar />  {/* Use the WardenNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4 text-center">Add Room</h2>
                {message && <div className={`alert ${message.includes('error') ? 'alert-danger' : 'alert-success'}`} role="alert">{message}</div>}
                <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow">
                    <div className="form-group mb-3">
                        <label htmlFor="roomNumber">Room Number</label>
                        <input type="text" id="roomNumber" name="roomNumber" className="form-control" value={room.roomNumber} onChange={handleChange} placeholder="Enter Room Number" required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="capacity">Capacity</label>
                        <input type="number" id="capacity" name="capacity" className="form-control" value={room.capacity} onChange={handleChange} placeholder="Enter Capacity" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Add Room</button>
                </form>
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default AddRoom;
