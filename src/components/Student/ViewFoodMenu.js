// ViewFoodMenu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Common/Footer';  // Import the Footer component
import StudentNavbar from './StudentNavbar';  // Import the StudentNavbar component

const ViewFoodMenu = () => {
    const [foodMenus, setFoodMenus] = useState([]);

    useEffect(() => {
        fetchFoodMenus();
    }, []);

    const fetchFoodMenus = () => {
        axios.get('http://localhost:8080/services/food-menus')
            .then(response => {
                setFoodMenus(response.data);
            })
            .catch(error => {
                console.error('Error fetching food menus:', error);
            });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="bg-primary text-white text-center py-3">
                <h1>Food Menu System</h1>
            </header>
            <StudentNavbar /> {/* Use the StudentNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2>Food Menu</h2>
                {foodMenus.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Breakfast</th>
                                    <th>Lunch</th>
                                    <th>Dinner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodMenus.map(menu => (
                                    <tr key={menu.id}>
                                        <td>{menu.dayOfWeek}</td>
                                        <td>{menu.breakfast}</td>
                                        <td>{menu.lunch}</td>
                                        <td>{menu.dinner}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No food menus available.</p>
                )}
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default ViewFoodMenu;
