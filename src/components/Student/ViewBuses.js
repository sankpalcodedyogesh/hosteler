// ViewBuses.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Common/Footer';  // Import the Footer component
import StudentNavbar from './StudentNavbar';  // Import the StudentNavbar component

const ViewBuses = () => {
    const [buses, setBuses] = useState([]);

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

    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="bg-primary text-white text-center py-3">
                <h1>Bus Management System</h1>
            </header>
            <StudentNavbar /> {/* Use the StudentNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2>Bus List</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Route</th>
                                <th>Bus Number</th>
                                <th>Morning Timing</th>
                                <th>Evening Timing</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buses.map(bus => (
                                <tr key={bus.id}>
                                    <td>{bus.route}</td>
                                    <td>{bus.busNumber}</td>
                                    <td>{bus.morningTiming}</td>
                                    <td>{bus.eveningTiming}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default ViewBuses;
