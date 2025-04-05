// LeaveRequestList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WardenHeader from '../Common/WardenHeader';  // Import the WardenHeader component
import WardenNavbar from './WardenNavbar';  // Import the WardenNavbar component
import Footer from '../Common/Footer';  // Import the Footer component

const LeaveRequestList = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    const fetchLeaveRequests = () => {
        axios.get('http://localhost:8080/wardens/leave-requests')
            .then(response => {
                const sortedRequests = response.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                setLeaveRequests(sortedRequests);
            })
            .catch(error => {
                console.error('There was an error fetching the leave requests!', error);
            });
    };

    const updateLeaveRequestStatus = (id, status) => {
        axios.put(`http://localhost:8080/wardens/leave-requests/${id}?status=${status}`)
            .then(response => {
                fetchLeaveRequests(); // Refresh the leave requests
                setMessage(`Request ${status.toLowerCase()}.`);
            })
            .catch(error => {
                console.error('There was an error updating the leave request status!', error);
                setMessage(`Error updating request: ${error.message}`);
            });
    };

    const renderTable = (status) => {
        const filteredRequests = leaveRequests.filter(request => request.status.toLowerCase() === status);
        return (
            <div className="mb-5">
                <h4 className="text-center text-capitalize">{status} Requests</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Reason</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map(request => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.reason}</td>
                                <td>{new Date(request.startDate).toLocaleDateString()}</td>
                                <td>{new Date(request.endDate).toLocaleDateString()}</td>
                                <td>{request.status}</td>
                                <td>
                                    {status === 'pending' && (
                                        <>
                                            <button
                                                className="btn btn-success btn-sm mr-2"
                                                onClick={() => updateLeaveRequestStatus(request.id, 'APPROVED')}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => updateLeaveRequestStatus(request.id, 'REJECTED')}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {status === 'approved' && (
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => updateLeaveRequestStatus(request.id, 'REJECTED')}
                                        >
                                            Reject
                                        </button>
                                    )}
                                    {status === 'rejected' && (
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => updateLeaveRequestStatus(request.id, 'APPROVED')}
                                        >
                                            Approve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <WardenHeader />  {/* Use the WardenHeader component */}
            <WardenNavbar />  {/* Use the WardenNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4 text-center">Leave Requests</h2>
                {message && <div className="alert alert-info" role="alert">{message}</div>}
                {renderTable('pending')}
                {renderTable('approved')}
                {renderTable('rejected')}
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default LeaveRequestList;
