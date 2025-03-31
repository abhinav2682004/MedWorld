import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaChartArea, FaChartBar, FaUsers, FaChartLine, FaCog, FaUser } from 'react-icons/fa';
import './AdminSideBar.css'; // Import CSS for styling

const AdminSideBar = () => {
    return (
        <div className="admin-sidebar bg-dark text-white">
            <Nav className="flex-column">
                <Nav.Link as={NavLink} to="/admindashboard" className="sidebar-link">
                    <FaTachometerAlt className="me-3" />
                    Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/manageinv" className="sidebar-link">
                    <FaChartArea className="me-3" />
                    Manage Inventory
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/userOrders" className="sidebar-link">
                    <FaChartBar className="me-3" />
                    Orders
                </Nav.Link>
                <Nav.Link as={NavLink} to="/admin/customers" className="sidebar-link" >
                    <FaUsers className="me-3" />
                    Customers
                </Nav.Link>
                
                
                <Nav.Link as={NavLink} to="/admin/feedbacks" className="sidebar-link">
                    <FaUser className="me-3" />
                    Customer Feedback
                </Nav.Link>

                <Nav.Link as={NavLink} to="/admin/settings" className="sidebar-link" >
                    <FaCog className="me-3" />
                    Logout
                </Nav.Link>
            </Nav>
        </div>
    );
};

export { AdminSideBar };
