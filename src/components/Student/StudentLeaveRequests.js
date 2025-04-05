import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Common/Footer';  // Import the Footer component
import StudentNavbar from './StudentNavbar';  // Import the StudentNavbar component
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap CSS is included

const StudentLeaveRequests = ({ studentId }) => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [rejectedRequests, setRejectedRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null); // Track the selected request for modal

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    const fetchLeaveRequests = () => {
        axios.get(`http://localhost:8080/wardens/students/${studentId}/leave-requests`)
            .then(response => {
                const requests = response.data;
                setLeaveRequests(requests);
                setPendingRequests(requests.filter(request => request.status.toLowerCase() === 'pending'));
                setApprovedRequests(requests.filter(request => request.status.toLowerCase() === 'approved'));
                setRejectedRequests(requests.filter(request => request.status.toLowerCase() === 'rejected'));
            })
            .catch(error => {
                console.error('There was an error fetching the leave requests!', error);
            });
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return 'text-success';
            case 'rejected':
                return 'text-danger';
            case 'pending':
                return 'text-warning';
            default:
                return '';
        }
    };

    const showModal = (request) => {
        setSelectedRequest(request);
    };

    const hideModal = () => {
        setSelectedRequest(null);
    };

    const renderTable = (requests, title, showButton) => (
        <div className="table-responsive mb-4">
            <h3 className="text-center">{title}</h3>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Reason</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        {showButton && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request.id}>
                            <td>{request.reason}</td>
                            <td>{request.startDate}</td>
                            <td>{request.endDate}</td>
                            <td className={getStatusClass(request.status)}>{request.status}</td>
                            {showButton && (
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => showModal(request)}
                                    >
                                        Show Details
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="bg-primary text-white text-center py-3">
                <h1>Student Complaint System</h1>
            </header>
            <StudentNavbar /> {/* Use the StudentNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2>My Leave Requests</h2>
                {renderTable(pendingRequests, 'Pending Requests', false)}
                {renderTable(approvedRequests, 'Approved Requests', true)}
                {renderTable(rejectedRequests, 'Rejected Requests', false)}
            </div>
            <Footer />  {/* Use the Footer component */}
            
            {/* Modal */}
            {selectedRequest && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Leave Request Details</h5>
                                <button type="button" className="close" onClick={hideModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Reason:</strong> {selectedRequest.reason}</p>
                                <p><strong>Start Date:</strong> {selectedRequest.startDate}</p>
                                <p><strong>End Date:</strong> {selectedRequest.endDate}</p>
                                <p className={getStatusClass(selectedRequest.status)}><strong>Status:</strong> {selectedRequest.status}</p>
                                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '2rem' }}></i>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentLeaveRequests;
