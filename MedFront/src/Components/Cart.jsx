import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import './cssfiles/cartPage.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    const fetchProd = async () => {
        try {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const userId = localStorage.getItem('userId');
            const response = await axios.post('http://localhost:5632/cart', { userId: userId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Role: role,
                },
            });
            console.log(response.data);
            setCartItems(response.data);
        } catch (e) {
            console.log("Error in Fetching cart items ", e);
            toast.error('Error!!');
        }
    };

    useEffect(() => {
        fetchProd();
    }, []);

    const handleIncrement = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const userId = localStorage.getItem('userId');
            await axios.post(`http://localhost:5632/cart/increment/${id}`, { userId: userId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Role: role,
                },
            });
        } catch (e) {
            console.log(e);
        }
        fetchProd();
    };

    const handleDecrement = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const userId = localStorage.getItem('userId');
            await axios.post(`http://localhost:5632/cart/decrement/${id}`, { userId: userId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Role: role,
                },
            });
        } catch (e) {
            console.log(e);
        }
        fetchProd();
    };

    const handleRemoveItem = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const userId = localStorage.getItem('userId');
            await axios.post(`http://localhost:5632/cart/delete/${id}`, { userId: userId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Role: role,
                },
            });
            fetchProd();
        } catch (e) {
            console.log("ERROR !!", e);
        }
    };
    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.pricePerUnit * item.quantity, 0).toFixed(2);
    };

    const proceedPayment = () => {
        localStorage.setItem("totalPrice", getTotal());
        //if(localStorage.getItem("pid")) navigate('/payment2');
        let requiresPrescription = false;

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].prescription) {
            requiresPrescription = true;
            break;
        }
    }

    if (requiresPrescription) {
        console.log('Navigating to Prescription');
        navigate('/prescription');
    } else {
        console.log('Navigating to Confirmation');
        navigate('/confirmation');
    }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center text-4xl font-extrabold text-gray-800">Shopping Cart</h2>
            {cartItems.map(item => (
                <Row key={item.cartItemID} className="cart-item mb-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4" >
                    <Col md={2} className="flex items-center justify-center">
                        <Image src={item.imageUrl} thumbnail className="w-24 h-24 object-cover" />
                    </Col>
                    <Col md={4} className="flex flex-col justify-center">
                        <h5 className="text-xl font-semibold text-gray-700">{item.productName}</h5>
                        <p className="text-gray-600">₹{item.pricePerUnit}</p>
                        <div className="quantity-control flex items-center mt-2">
                            <Button variant="outline-secondary" className="px-2 py-1" onClick={() => handleDecrement(item.cartItemID)}>-</Button>
                            <h5 className="mx-2 text-lg">{item.quantity}</h5>
                            <Button variant="outline-secondary" className="px-2 py-1" onClick={() => handleIncrement(item.cartItemID)}>+</Button>
                        </div>
                    </Col>
                    <Col md={2} className="flex items-center justify-center">
                        <p className="text-lg font-medium text-gray-700">Total: ₹{item.price}</p>
                    </Col>
                    <Col md={2} className="flex items-center justify-center">
                        <Button variant="danger" className="px-3 py-2" onClick={() => handleRemoveItem(item.cartItemID)}>Remove</Button>
                    </Col>
                </Row>
            ))}
            <Row className="justify-content-end mt-4">
                <Col md={4}>
                    <Card className="bg-gray-50 border border-gray-200 rounded-lg shadow-md">
                        <Card.Body>
                            <Card.Title className="text-2xl font-bold text-gray-800">Total: ₹{getTotal()}</Card.Title>
                            <Button variant="success" className="w-full py-2 mt-4" onClick={() => proceedPayment()}>Checkout</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
