// AddLeaveRequest.js
import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../Common/Footer';  // Import the Footer component
import StudentNavbar from './StudentNavbar';  // Import the StudentNavbar component

const AddLeaveRequest = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [studentId, setStudentId] = useState(localStorage.getItem('studentId'));
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const leaveRequestData = {
            startDate,
            endDate,
            reason
        };

        try {
            const response = await axios.post(`http://localhost:8080/students/${studentId}/leave-request`, leaveRequestData);
            setSuccessMessage('Leave request submitted successfully');
            setErrorMessage('');
        } catch (error) {
            console.error('Error adding the leave request!', error);
            setErrorMessage('There was an error adding the leave request!');
            setSuccessMessage('');
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="bg-primary text-white text-center py-3">
                <h1>Student Complaint System</h1>
            </header>
            <StudentNavbar /> {/* Use the StudentNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2>Submit Leave Request</h2>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reason">Reason</label>
                        <textarea
                            className="form-control"
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit Leave Request</button>
                </form>
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default AddLeaveRequest;
