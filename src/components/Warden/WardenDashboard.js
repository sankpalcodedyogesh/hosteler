import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaBed, FaClipboardCheck, FaUserFriends, FaComments, FaBus, FaUtensils, FaClipboardList } from 'react-icons/fa'; // Import icons
import { MdPersonAdd, MdHotel, MdAssignment, MdPeople, MdFeedback, MdDirectionsBus, MdRestaurantMenu, MdList } from 'react-icons/md'; // Additional Material Design icons
import WardenHeader from '../Common/WardenHeader';  // Import the WardenHeader component
import Footer from '../Common/Footer';

const WardenDashboard = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <WardenHeader />  {/* Use the WardenHeader component */}
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4 text-center">Welcome to the Warden Dashboard</h2>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <div className="col mb-4">
                        <Link to="/add-student" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <MdPersonAdd size={50} className="mr-2" /> Add Student
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/add-room" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <MdHotel size={50} className="mr-2" /> Add Room
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/assign-room" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <MdAssignment size={50} className="mr-2" /> Assign Room
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/leave-requests" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <MdList size={50} className="mr-2" /> Leave Requests
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/student-list" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <MdPeople size={50} className="mr-2" /> Student List
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/complaints" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <MdFeedback size={50} className="mr-2" /> View Complaints
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/manage-buses" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <MdDirectionsBus size={50} className="mr-2" /> Manage Buses
                        </Link>
                    </div>
                    <div className="col mb-4">
                        <Link to="/manage-food-menus" className="btn btn-primary btn-lg btn-block d-flex align-items-center justify-content-center h-100">
                            <MdRestaurantMenu size={50} className="mr-2" /> Manage Food Menus
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default WardenDashboard;
