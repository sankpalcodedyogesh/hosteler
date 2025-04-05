// ManageFoodMenus.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WardenHeader from '../Common/WardenHeader';  // Import the WardenHeader component
import WardenNavbar from './WardenNavbar';  // Import the WardenNavbar component
import Footer from '../Common/Footer';  // Import the Footer component

const ManageFoodMenus = () => {
    const [foodMenus, setFoodMenus] = useState([]);
    const [foodMenu, setFoodMenu] = useState({ dayOfWeek: '', breakfast: '', lunch: '', dinner: '' });
    const [editingMenu, setEditingMenu] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchFoodMenus();
    }, []);

    const fetchFoodMenus = () => {
        axios.get('http://localhost:8080/services/food-menus')
            .then(response => {
                setFoodMenus(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleChange = (e) => {
        setFoodMenu({ ...foodMenu, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingMenu) {
            // Update existing food menu
            axios.put(`http://localhost:8080/services/food-menus/${editingMenu.id}`, foodMenu)
                .then(response => {
                    setMessage('Food menu updated successfully!');
                    setEditingMenu(null);
                    setFoodMenu({ dayOfWeek: '', breakfast: '', lunch: '', dinner: '' });
                    fetchFoodMenus();
                })
                .catch(error => {
                    console.error('Error updating food menu:', error);
                    setMessage('Error updating food menu.');
                });
        } else {
            // Add new food menu
            axios.post('http://localhost:8080/services/food-menus', foodMenu)
                .then(response => {
                    setMessage('Food menu added successfully!');
                    setFoodMenu({ dayOfWeek: '', breakfast: '', lunch: '', dinner: '' });
                    fetchFoodMenus();
                })
                .catch(error => {
                    console.error('Error adding new food menu:', error);
                    setMessage('Error adding new food menu.');
                });
        }
    };

    const handleEditClick = (menu) => {
        setEditingMenu(menu);
        setFoodMenu(menu);
    };

    const handleDeleteClick = (menuId) => {
        axios.delete(`http://localhost:8080/services/food-menus/${menuId}`)
            .then(response => {
                setMessage('Food menu deleted successfully!');
                fetchFoodMenus();
            })
            .catch(error => {
                console.error('Error deleting food menu:', error);
                setMessage('Error deleting food menu.');
            });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <WardenHeader />  {/* Use the WardenHeader component */}
            <WardenNavbar />  {/* Use the WardenNavbar component */}
            <div className="container mt-5 flex-grow-1">
                <h2 className="mb-4 text-center">Manage Food Menus</h2>
                {message && <div className="alert alert-info" role="alert">{message}</div>}
                <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow mb-4">
                    <div className="form-group mb-3">
                        <label htmlFor="dayOfWeek">Day of the Week:</label>
                        <input type="text" name="dayOfWeek" id="dayOfWeek" className="form-control" value={foodMenu.dayOfWeek} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="breakfast">Breakfast:</label>
                        <input type="text" name="breakfast" id="breakfast" className="form-control" value={foodMenu.breakfast} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="lunch">Lunch:</label>
                        <input type="text" name="lunch" id="lunch" className="form-control" value={foodMenu.lunch} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="dinner">Dinner:</label>
                        <input type="text" name="dinner" id="dinner" className="form-control" value={foodMenu.dinner} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">{editingMenu ? 'Update Food Menu' : 'Add Food Menu'}</button>
                </form>
                <h3 className="mb-4 text-center">Food Menu List</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Day of the Week</th>
                            <th>Breakfast</th>
                            <th>Lunch</th>
                            <th>Dinner</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodMenus.map(menu => (
                            <tr key={menu.id}>
                                <td>{menu.dayOfWeek}</td>
                                <td>{menu.breakfast}</td>
                                <td>{menu.lunch}</td>
                                <td>{menu.dinner}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEditClick(menu)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(menu.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />  {/* Use the Footer component */}
        </div>
    );
};

export default ManageFoodMenus;
