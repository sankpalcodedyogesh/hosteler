// StudentDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Common/Footer';  // Import the Footer component
import StudentNavbar from './StudentNavbar';  // Import the StudentNavbar component

const StudentDetails = ({ studentId }) => {
    const [student, setStudent] = useState({});
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/students/${studentId}`)
            .then(response => {
                setStudent(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the student details!', error);
            });

        axios.get(`http://localhost:8080/students/${studentId}/leave-requests`)
            .then(response => {
                setLeaveRequests(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the leave requests!', error);
            });

        axios.get(`http://localhost:8080/students/${studentId}/complaints`)
            .then(response => {
                setComplaints(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the complaints!', error);
            });
    }, [studentId]);

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

    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="bg-primary text-white text-center py-3">
                <h1>Student Complaint System</h1>
            </header>
            <StudentNavbar /> {/* Use the StudentNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4">{student.name}'s Details</h2>
                <div className="mb-4 p-3 border rounded">
                    <h4>Personal Information</h4>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Contact Number:</strong> {student.contactNumber}</p>
                    <p><strong>Address:</strong> {student.address}</p>
                    <p><strong>Joining Date:</strong> {student.joiningDate}</p>
                    <p><strong>Leaving Date:</strong> {student.leavingDate}</p>
                </div>

                <div className="mb-4 p-3 border rounded">
                    <h4>Leave Requests</h4>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Reason</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaveRequests.map(request => (
                                    <tr key={request.id}>
                                        <td>{request.reason}</td>
                                        <td>{request.startDate}</td>
                                        <td>{request.endDate}</td>
                                        <td className={getStatusClass(request.status)}>{request.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mb-4 p-3 border rounded">
                    <h4>Complaints</h4>
                    <ul className="list-group">
                        {complaints.map(complaint => (
                            <li key={complaint.id} className="list-group-item border rounded">
                                {complaint.description}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default StudentDetails;
