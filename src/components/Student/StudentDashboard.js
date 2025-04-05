// StudentDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaUtensils, FaExclamationTriangle, FaListAlt, FaUserAlt, FaClipboardList } from 'react-icons/fa'; // Import icons
import Header from '../Common/Header';
import Footer from '../Common/Footer';

const StudentDashboard = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4 text-center">Welcome to the Student Dashboard</h2>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <div className="col mb-4">
                        <Link to="/my-leave-requests" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <FaClipboardList size={50} className="mr-2" /> My Leave Requests
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/add-leave-request" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <FaExclamationTriangle size={50} className="mr-2" /> Add Leave Request
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/student-details" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <FaUserAlt size={50} className="mr-2" /> Student Details
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/add-complaint" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <FaExclamationTriangle size={50} className="mr-2" /> Add Complaint
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/my-complaints" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <FaListAlt size={50} className="mr-2" /> My Complaints
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/view-buses" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <FaBus size={50} className="mr-2" /> View Buses
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/view-food-menu" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <FaUtensils size={50} className="mr-2" /> View Food Menu
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default StudentDashboard;
