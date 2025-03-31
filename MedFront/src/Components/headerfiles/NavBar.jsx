import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser } from 'react-icons/fa';
import './NavBar.css'; // Import your custom CSS file

const NavBar = () => {
    const navigate = useNavigate();
    
    // Check if the user is logged in based on localStorage
    const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('username') && localStorage.getItem('role');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');

        navigate('/login');
    };

    return (
        <Navbar bg="blue" variant="dark" expand="lg" className="p-4" style={{'border':'2px solid white'}}>
            <div className="container-fluid">
                <Navbar.Brand as={Link} to="/" className="navbar-brand d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-capsule" viewBox="0 0 16 16">
                        <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z"/>
                    </svg>
                    <h1 className="ms-2 display-6 medworld-title">MedWorld</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/home" className="nav-link custom-link fs-4">Home</Link>
                        <Link to="/products" className="nav-link custom-link fs-4">Products</Link>
                        <Link to="/about" className="nav-link custom-link fs-4">About</Link>
                    </Nav>
                    <Nav>
                        {!isLoggedIn ? (
                            <>
                                <Button variant="outline-light" className="me-2" onClick={() => navigate("/login")}>Login</Button>
                                <Button variant="primary" onClick={() => navigate("/signup")}>Sign-up</Button>
                            </>
                        ) : (
                            <>
                                <NavDropdown 
                                    title={<div className="d-flex align-items-center custom-link"><FaUser size={24} /><span className="ms-2">{username}</span></div>} 
                                    id="basic-nav-dropdown" 
                                    align="end"
                                    style={{ minWidth: "200px", maxWidth: "300px" }} // Adjust the min-width and max-width as needed
                                >
                                    <NavDropdown.Item onClick={() => navigate("/cart")}>My Cart</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate("/orders")}>Orders</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate("/profile")}>Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export { NavBar };
