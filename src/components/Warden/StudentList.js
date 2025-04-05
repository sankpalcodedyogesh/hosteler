// StudentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WardenHeader from '../Common/WardenHeader';  // Import the WardenHeader component
import WardenNavbar from './WardenNavbar';  // Import the WardenNavbar component
import Footer from '../Common/Footer';  // Import the Footer component
import { FaEdit, FaTrash } from 'react-icons/fa';  // Import icons for edit and delete

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedStudent, setEditedStudent] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        axios.get('http://localhost:8080/students')
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the students!', error);
            });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const deleteStudent = (id) => {
        axios.delete(`http://localhost:8080/wardens/students/${id}`)
            .then(() => {
                setMessage(`Student has been deleted.`);
                fetchStudents(); // Refresh the student list
            })
            .catch(error => {
                console.error('There was an error deleting the student!', error);
                setMessage(`Error deleting student: ${error.message}`);
            });
    };

    const handleEditClick = (student) => {
        setEditingId(student.id);
        setEditedStudent(student);
    };

    const handleInputChange = (e) => {
        setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/wardens/students/${editedStudent.id}`, editedStudent)
            .then(() => {
                setMessage(`Student has been updated.`);
                setEditingId(null);
                fetchStudents(); // Refresh the student list
            })
            .catch(error => {
                console.error('There was an error updating the student!', error);
                setMessage(`Error updating student: ${error.message}`);
            });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="d-flex flex-column min-vh-100">
            <WardenHeader />  {/* Use the WardenHeader component */}
            <WardenNavbar />  {/* Use the WardenNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4 text-center">Student List</h2>
                {message && <div className="alert alert-info" role="alert">{message}</div>}
                <p>Total Students: {students.length}</p> {/* Display total student count */}
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Contact Number</th>
                            <th>Email</th>
                            <th>Joining Date</th>
                            <th>Room Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id}>
                                {editingId === student.id ? (
                                    <>
                                        <td>{student.id}</td>
                                        <td>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                className="form-control form-control-sm"
                                                value={editedStudent.name} 
                                                onChange={handleInputChange} 
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                type="text" 
                                                name="address" 
                                                className="form-control form-control-sm"
                                                value={editedStudent.address} 
                                                onChange={handleInputChange} 
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                type="text" 
                                                name="contactNumber" 
                                                className="form-control form-control-sm"
                                                value={editedStudent.contactNumber} 
                                                onChange={handleInputChange} 
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                className="form-control form-control-sm"
                                                value={editedStudent.email} 
                                                onChange={handleInputChange} 
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                type="date" 
                                                name="joiningDate" 
                                                className="form-control form-control-sm"
                                                value={editedStudent.joiningDate} 
                                                onChange={handleInputChange} 
                                            />
                                        </td>
                                        <td>{student.room ? student.room.roomNumber : 'No room assigned'}</td>
                                        <td className="d-flex flex-column">
                                            <button className="btn btn-primary btn-sm mb-2" onClick={handleUpdateSubmit}>Save</button>
                                            <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.address}</td>
                                        <td>{student.contactNumber}</td>
                                        <td>{student.email}</td>
                                        <td>{new Date(student.joiningDate).toLocaleDateString()}</td>
                                        <td>{student.room ? student.room.roomNumber : 'No room assigned'}</td>
                                        <td className="d-flex flex-column">
                                            <button className="btn btn-primary btn-sm mb-2" onClick={() => handleEditClick(student)}>
                                                <FaEdit />
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(student.id)}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default StudentList;
