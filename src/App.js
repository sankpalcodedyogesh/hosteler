import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Common/Login';
import WardenDashboard from './components/Warden/WardenDashboard';
import AddRoom from './components/Warden/AddRoom';
import AssignRoom from './components/Warden/AssignRoom';
import LeaveRequestList from './components/Warden/LeaveRequestList';
import AddStudent from './components/Warden/AddStudent';
import StudentDashboard from './components/Student/StudentDashboard';
import AddLeaveRequest from './components/Student/AddLeaveRequest';
import StudentLeaveRequests from './components/Student/StudentLeaveRequests';
import StudentDetails from './components/Student/StudentDetails';
import StudentList from './components/Warden/StudentList';
import AddComplaint from './components/Student/AddComplaint';
import ComplaintList from './components/Warden/ComplaintList';
import MyComplaints from './components/Student/MyComplaints';
import ManageFoodMenus from './components/Warden/ManageFoodMenus';
import ViewFoodMenu from './components/Student/ViewFoodMenu';
import ManageBuses from './components/Warden/ManageBuses';
import ViewBuses from './components/Student/ViewBuses';

const App = () => {
    const [role, setRole] = useState(null);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login setRole={setRole} />} />
                    <Route path="/warden-dashboard" element={<WardenDashboard />} />
                    <Route path="/add-student" element={<AddStudent />} />
                    <Route path="/add-room" element={<AddRoom />} />
                    <Route path="/assign-room" element={<AssignRoom />} />
                    <Route path="/leave-requests" element={<LeaveRequestList />} />
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/add-leave-request" element={<AddLeaveRequest studentId={localStorage.getItem('studentId')} />} />
                    <Route path="/my-leave-requests" element={<StudentLeaveRequests studentId={localStorage.getItem('studentId')} />} />
                    <Route path="/student-details" element={<StudentDetails studentId={localStorage.getItem('studentId')} />} />
                    <Route path="/student-list" element={<StudentList />} />
                    <Route path="/add-complaint" element={<AddComplaint studentId={localStorage.getItem('studentId')} />} />
                    <Route path="/complaints" element={<ComplaintList />} />
                    <Route path="/my-complaints" element={<MyComplaints studentId={localStorage.getItem('studentId')} />} />
                    <Route path="/manage-food-menus" element={<ManageFoodMenus />} />
                    <Route path="/view-food-menu" element={<ViewFoodMenu />} />
                    <Route path="/manage-buses" element={<ManageBuses />} />
                    <Route path="/view-buses" element={<ViewBuses />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
