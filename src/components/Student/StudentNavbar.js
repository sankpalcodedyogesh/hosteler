// StudentNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaUtensils, FaExclamationTriangle, FaListAlt, FaUserAlt, FaClipboardList } from 'react-icons/fa'; // Import icons

const StudentNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Student Dashboard</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/my-leave-requests">
                            <FaClipboardList className="mr-2" /> My Leave Requests
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-leave-request">
                            <FaExclamationTriangle className="mr-2" /> Add Leave Request
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/student-details">
                            <FaUserAlt className="mr-2" /> Student Details
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-complaint">
                            <FaExclamationTriangle className="mr-2" /> Add Complaint
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/my-complaints">
                            <FaListAlt className="mr-2" /> My Complaints
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/view-buses">
                            <FaBus className="mr-2" /> View Buses
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/view-food-menu">
                            <FaUtensils className="mr-2" /> View Food Menu
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default StudentNavbar;
