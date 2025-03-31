import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser } from 'react-icons/fa';

const AdminNavBar = () => {
    const navigate = useNavigate();

    // Handle logout function
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="p-4">
            <div className="container-fluid">
                <Navbar.Brand as={Link} to="/" className="navbar-brand d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-capsule" viewBox="0 0 16 16">
                        <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z"/>
                    </svg>
                    <h1 className="ms-2 display-6">MedWorld</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/home" className="nav-link fs-4 me-2 text-white">Home</Link>
                        <Link to="/products" className="nav-link fs-4 me-2 text-white">Products</Link>
                        <Link to="/about" className="nav-link fs-4 me-2 text-white">About</Link>
                        {/* Style Manage Inventory button similarly to other links */}
                        <Button 
                            as={Link} 
                            to="/manageinv" 
                            variant="primary" 
                            className="nav-link fs-4 ms-2"
                            style={{ textDecoration: 'none', color: 'white' }} // Override default link styles
                        >
                            Manage Inventory
                        </Button>
                    </Nav>
                    <Nav>
                        <NavDropdown 
                            title={<div className="d-flex align-items-center"><FaUser size={24} /><span className="ms-2">{localStorage.getItem('username')}</span></div>} 
                            id="basic-nav-dropdown" 
                            align="end"
                            style={{ minWidth: "200px", maxWidth: "300px" }} // Adjust the min-width and max-width as needed
                        >
                            <NavDropdown.Item onClick={() => navigate("/profile")}>Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export { AdminNavBar };
