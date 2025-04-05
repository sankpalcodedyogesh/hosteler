// AddComplaint.js
import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../Common/Footer';
import StudentNavbar from './StudentNavbar';  // Import the StudentNavbar component

const AddComplaint = ({ studentId }) => {
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8080/students/${studentId}/complaint`, { description })
            .then(response => {
                setMessage('Complaint submitted successfully!');
                setDescription('');
            })
            .catch(error => {
                setMessage(`Error submitting complaint: ${error.message}`);
            });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="bg-primary text-white text-center py-3">
                <h1>Student Complaint System</h1>
            </header>
            <StudentNavbar /> {/* Use the StudentNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2>Add Complaint</h2>
                {message && <p className="alert alert-info">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default AddComplaint;
