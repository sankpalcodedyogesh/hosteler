import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserTie, FaUserGraduate } from 'react-icons/fa';  // Font Awesome icons
import { MdSchool, MdSupervisorAccount } from 'react-icons/md';  // Material Design icons
import AboutUs from './AboutUs';
import PrivacyPolicy from './PrivacyPolicy';

const Login = ({ setRole }) => {
    const [email, setEmail] = useState('');
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [isWarden, setIsWarden] = useState(false);  // Track role selection
    const [showFields, setShowFields] = useState(false);  // Track visibility of input fields
    const navigate = useNavigate();

    const handleLogin = () => {
        if (isWarden) {
            // Warden login logic
            if (email === 'warden@example.com' && password === 'warden123') {
                localStorage.setItem('wardenId', '1');  // Simulating warden login
                setRole('WARDEN');
                navigate('/warden-dashboard');
            } else {
                alert('Invalid warden credentials');
            }
        } else {
            // Student login logic
            axios.post('http://localhost:8080/auth/login', { email, id: studentId })
                .then(response => {
                    const { role, studentId } = response.data;
                    if (role === 'STUDENT') {
                        localStorage.setItem('studentId', studentId);
                        setRole('STUDENT');
                        navigate('/student-dashboard');
                    } else {
                        alert('Invalid credentials');
                    }
                })
                .catch(error => {
                    console.error('There was an error logging in!', error);
                    alert('Invalid credentials');
                });
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100" style={{ 
            backgroundImage: 'url("/path/to/hms.png")', 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center',
            opacity: 0.9 // Adjust this value for less opacity
        }}>
            <header className="bg-dark text-white w-100 text-center py-3 d-flex align-items-center justify-content-center">
                <MdSupervisorAccount size={40} className="me-2" />
                <h2 className="mb-0">Hostel Management System</h2>
            </header>
            <h2 className="mb-4">Login</h2>
            <div className="d-flex justify-content-center gap-4">
                <div className={`card p-3 ${!isWarden && showFields ? "border-primary" : ""}`} style={{ width: "18rem", cursor: "pointer" }} onClick={() => { setIsWarden(false); setShowFields(true); }}>
                    <div className="d-flex flex-column align-items-center">
                        <MdSchool size={50} className="text-primary mb-3" />
                        <h3 className="mb-3">Login as Student</h3>
                    </div>
                    { !isWarden && showFields && (
                        <>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Student Email"
                                className="form-control mb-2"
                            />
                            <input
                                type="text"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                placeholder="Student ID"
                                className="form-control mb-2"
                            />
                            <button onClick={handleLogin} className="btn btn-primary">Login as Student</button>
                        </>
                    )}
                </div>
                <div className={`card p-3 ${isWarden && showFields ? "border-primary" : ""}`} style={{ width: "18rem", cursor: "pointer" }} onClick={() => { setIsWarden(true); setShowFields(true); }}>
                    <div className="d-flex flex-column align-items-center">
                        <MdSupervisorAccount size={50} className="text-primary mb-3" />
                        <h3 className="mb-3">Login as Warden</h3>
                    </div>
                    { isWarden && showFields && (
                        <>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Warden Email"
                                className="form-control mb-2"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="form-control mb-2"
                            />
                            <button onClick={handleLogin} className="btn btn-primary">Login as Warden</button>
                        </>
                    )}
                </div>
            </div>
            {/* Footer Section */}
            <div className="mt-5">
                <AboutUs />
                <PrivacyPolicy />
            </div>
        </div>
    );
};

export default Login;
