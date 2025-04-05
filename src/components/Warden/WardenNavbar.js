// WardenNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaBed, FaClipboardCheck, FaUserFriends, FaComments, FaBus, FaUtensils, FaClipboardList } from 'react-icons/fa';

const WardenNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Warden Dashboard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-student"><FaUserPlus className="mr-2" /> Add Student</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-room"><FaBed className="mr-2" /> Add Room</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/assign-room"><FaClipboardCheck className="mr-2" /> Assign Room</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/leave-requests"><FaClipboardList className="mr-2" /> Leave Requests</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/student-list"><FaUserFriends className="mr-2" /> Student List</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/complaints"><FaComments className="mr-2" /> View Complaints</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/manage-buses"><FaBus className="mr-2" /> Manage Buses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/manage-food-menus"><FaUtensils className="mr-2" /> Manage Food Menus</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default WardenNavbar;
