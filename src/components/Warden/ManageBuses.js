// ManageBuses.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WardenHeader from '../Common/WardenHeader';  // Import the WardenHeader component
import WardenNavbar from './WardenNavbar';  // Import the WardenNavbar component
import Footer from '../Common/Footer';  // Import the Footer component
import { FaEdit, FaTrash } from 'react-icons/fa';  // Import icons for edit and delete

const ManageBuses = () => {
    const [buses, setBuses] = useState([]);
    const [bus, setBus] = useState({ route: '', busNumber: '', morningTiming: '', eveningTiming: '' });
    const [editingBus, setEditingBus] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchBuses();
    }, []);

    const fetchBuses = () => {
        axios.get('http://localhost:8080/services/buses')
            .then(response => {
                setBuses(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleChange = (e) => {
        setBus({ ...bus, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingBus) {
            // Update existing bus
            axios.put(`http://localhost:8080/services/buses/${editingBus.id}`, bus)
                .then(response => {
                    setMessage('Bus updated successfully!');
                    setEditingBus(null);
                    setBus({ route: '', busNumber: '', morningTiming: '', eveningTiming: '' });
                    fetchBuses();
                })
                .catch(error => {
                    console.error('Error updating bus:', error);
                    setMessage('Error updating bus.');
                });
        } else {
            // Add new bus
            axios.post('http://localhost:8080/services/buses', bus)
                .then(response => {
                    setMessage('Bus added successfully!');
                    setBus({ route: '', busNumber: '', morningTiming: '', eveningTiming: '' });
                    fetchBuses();
                })
                .catch(error => {
                    console.error('Error adding new bus:', error);
                    setMessage('Error adding new bus.');
                });
        }
    };

    const handleEditClick = (bus) => {
        setEditingBus(bus);
        setBus(bus);
    };

    const handleDeleteClick = (busId) => {
        axios.delete(`http://localhost:8080/services/buses/${busId}`)
            .then(response => {
                setMessage('Bus deleted successfully!');
                fetchBuses();
            })
            .catch(error => {
                console.error(error);
                setMessage('Error deleting bus.');
            });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <WardenHeader />  {/* Use the WardenHeader component */}
            <WardenNavbar />  {/* Use the WardenNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4 text-center">Manage Buses</h2>
                {message && <div className="alert alert-info" role="alert">{message}</div>}
                <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow mb-4">
                    <div className="form-group mb-3">
                        <label htmlFor="route">Route:</label>
                        <input type="text" name="route" id="route" className="form-control" value={bus.route} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="busNumber">Bus Number:</label>
                        <input type="text" name="busNumber" id="busNumber" className="form-control" value={bus.busNumber} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="morningTiming">Morning Timing:</label>
                        <input type="text" name="morningTiming" id="morningTiming" className="form-control" value={bus.morningTiming} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="eveningTiming">Evening Timing:</label>
                        <input type="text" name="eveningTiming" id="eveningTiming" className="form-control" value={bus.eveningTiming} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">{editingBus ? 'Update Bus' : 'Add Bus'}</button>
                </form>
                <h3 className="mb-4 text-center">Bus List</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Route</th>
                            <th>Bus Number</th>
                            <th>Morning Timing</th>
                            <th>Evening Timing</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buses.map(bus => (
                            <tr key={bus.id}>
                                <td>{bus.route}</td>
                                <td>{bus.busNumber}</td>
                                <td>{bus.morningTiming}</td>
                                <td>{bus.eveningTiming}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEditClick(bus)}>
                                        <FaEdit />
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(bus.id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default ManageBuses;
