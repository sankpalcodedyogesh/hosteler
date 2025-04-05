// AssignRoom.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WardenHeader from '../Common/WardenHeader';  // Import the WardenHeader component
import WardenNavbar from './WardenNavbar';  // Import the WardenNavbar component
import Footer from '../Common/Footer';  // Import the Footer component

const AssignRoom = () => {
    const [students, setStudents] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:8080/students')
            .then((response) => setStudents(response.data))
            .catch((error) => console.error('Error fetching students:', error));

        axios
            .get('http://localhost:8080/wardens/rooms')
            .then((response) => setRooms(response.data))
            .catch((error) => console.error('Error fetching rooms:', error));
    }, []);

    const handleAssignRoom = async () => {
        if (!selectedStudent || !selectedRoom) {
            setMessage('Please select both a student and a room.');
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/wardens/students/${selectedStudent}/assign-room/${selectedRoom}`
            );
            setMessage(response.data);
        } catch (error) {
            console.error('Error assigning room:', error);
            setMessage('Failed to assign room.');
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <WardenHeader />  {/* Use the WardenHeader component */}
            <WardenNavbar />  {/* Use the WardenNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4 text-center">Assign Room to Student</h2>
                {message && <div className={`alert ${message.includes('error') ? 'alert-danger' : 'alert-success'}`} role="alert">{message}</div>}
                <form onSubmit={(e) => e.preventDefault()} className="bg-light p-5 rounded shadow">
                    <div className="form-group mb-3">
                        <label htmlFor="studentSelect">Select Student</label>
                        <select
                            id="studentSelect"
                            className="form-control"
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                        >
                            <option value="">--Select Student--</option>
                            {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="roomSelect">Select Room</label>
                        <select
                            id="roomSelect"
                            className="form-control"
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                        >
                            <option value="">--Select Room--</option>
                            {rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.roomNumber} - Capacity: {room.capacity}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="button" className="btn btn-primary btn-block" onClick={handleAssignRoom}>
                        Assign Room
                    </button>
                </form>
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default AssignRoom;
