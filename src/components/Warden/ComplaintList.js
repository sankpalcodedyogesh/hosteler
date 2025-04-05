// ComplaintList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WardenHeader from '../Common/WardenHeader';  // Import the WardenHeader component
import WardenNavbar from './WardenNavbar';  // Import the WardenNavbar component
import Footer from '../Common/Footer';  // Import the Footer component

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);
    const [responseMap, setResponseMap] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = () => {
        axios.get('http://localhost:8080/students/complaints')
            .then(response => {
                setComplaints(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the complaints!', error);
            });
    };

    const handleResponseChange = (id, value) => {
        setResponseMap({ ...responseMap, [id]: value });
    };

    const respondToComplaint = (id) => {
        const response = responseMap[id];
        axios.put(`http://localhost:8080/students/complaint/${id}/response`, { response })
            .then(() => {
                setMessage('Response submitted successfully!');
                fetchComplaints(); // Refresh the complaints list
            })
            .catch(error => {
                setMessage(`Error responding to complaint: ${error.message}`);
            });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <WardenHeader />  {/* Use the WardenHeader component */}
            <WardenNavbar />  {/* Use the WardenNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4 text-center">Complaints</h2>
                {message && <div className="alert alert-info" role="alert">{message}</div>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Response</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map(complaint => (
                            <tr key={complaint.id}>
                                <td>{complaint.id}</td>
                                <td>{complaint.description}</td>
                                <td>{complaint.response ? complaint.response : 'No response yet'}</td>
                                <td>{new Date(complaint.date).toLocaleDateString()}</td>
                                <td>
                                    {responseMap[complaint.id] !== undefined ? (
                                        <>
                                            <textarea
                                                className="form-control mb-2"
                                                value={responseMap[complaint.id]}
                                                onChange={(e) => handleResponseChange(complaint.id, e.target.value)}
                                                placeholder="Write a response..."
                                            ></textarea>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => respondToComplaint(complaint.id)}
                                            >
                                                Submit
                                            </button>
                                            <button
                                                className="btn btn-secondary btn-sm ml-2"
                                                onClick={() => handleResponseChange(complaint.id, undefined)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleResponseChange(complaint.id, '')}
                                        >
                                            Respond
                                        </button>
                                    )}
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

export default ComplaintList;
