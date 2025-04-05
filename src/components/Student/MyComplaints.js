// MyComplaints.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Common/Footer';  // Import the Footer component
import StudentNavbar from './StudentNavbar';  // Import the StudentNavbar component

const MyComplaints = ({ studentId }) => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = () => {
        axios.get(`http://localhost:8080/students/${studentId}/complaints`)
            .then(response => {
                setComplaints(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the complaints!', error);
            });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="bg-primary text-white text-center py-3">
                <h1>Student Complaint System</h1>
            </header>
            <StudentNavbar /> {/* Use the StudentNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2>My Complaints</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Response</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map(complaint => (
                                <tr key={complaint.id}>
                                    <td>{complaint.id}</td>
                                    <td>{complaint.description}</td>
                                    <td>{complaint.response ? complaint.response : 'No response yet'}</td>
                                    <td>{new Date(complaint.date).toLocaleDateString()}</td>
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

export default MyComplaints;
