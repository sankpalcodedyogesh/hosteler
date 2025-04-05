// AddStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import WardenHeader from '../Common/WardenHeader';  // Import the WardenHeader component
import WardenNavbar from './WardenNavbar';  // Import the WardenNavbar component
import Footer from '../Common/Footer';  // Import the Footer component

const AddStudent = () => {
    const [student, setStudent] = useState({
        name: '',
        address: '',
        contactNumber: '',
        email: '',
        joiningDate: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/wardens/add-student', student, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Student added!', response.data);
            setMessage('Student added successfully!');
            setStudent({
                name: '',
                address: '',
                contactNumber: '',
                email: '',
                joiningDate: '',
            });
        })
        .catch(error => {
            console.error('There was an error adding the student!', error);
            setMessage('There was an error adding the student. Please try again.');
        });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <WardenHeader />  {/* Use the WardenHeader component */}
            <WardenNavbar />  {/* Use the WardenNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4 text-center">Add Student</h2>
                {message && <div className={`alert ${message.includes('error') ? 'alert-danger' : 'alert-success'}`} role="alert">{message}</div>}
                <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow">
                    <div className="form-group mb-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" className="form-control" placeholder="Name" onChange={handleChange} value={student.name} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" className="form-control" placeholder="Address" onChange={handleChange} value={student.address} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="contactNumber">Contact Number</label>
                        <input type="text" id="contactNumber" name="contactNumber" className="form-control" maxLength="10" placeholder="Contact Number" onChange={handleChange} value={student.contactNumber} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} value={student.email} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="joiningDate">Joining Date</label>
                        <input type="date" id="joiningDate" name="joiningDate" className="form-control" onChange={handleChange} value={student.joiningDate} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Add Student</button>
                </form>
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default AddStudent;
