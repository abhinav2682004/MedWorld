import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Row, Col, Image } from 'react-bootstrap';

const Order = () => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("role");
            const userId = localStorage.getItem("userId");
            const response = await axios.post(`http://localhost:5632/orders/${userId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Role: role
                }
            });
            const formattedOrders = response.data.order.map(order => ({
                ...order,
                placedDate: new Date(order.placedDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), // Example: DD-MM-YYYY HH:MM:SS format
                expectedDate: order.expectedDate // Assuming expectedDate is already in a readable format
            }));
            setOrders(formattedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    if (!orders) return <div className="mt-5 text-center text-gray-500">No Orders yet</div>;
    return(
    <div className="container mx-auto p-6">
    <h1 className="text-4xl font-extrabold mb-12 text-center text-blue-800">Your Orders</h1>
    <div className="grid grid-col-1 sm:grid-rows-2 lg:grid-rows-3">
        {orders.map(order => (
            <div key={order.orderId} className="border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 mb-8">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-green-700">Order ID: {order.orderId}</h2>
                    <Row className="space-y-4" style={{'margin-left':'2px'}}>
                        {order.items.map((item, index) => (
                            <Row key={index} className="border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors duration-300 p-4 mb-4">
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Image src={item.imageUrl} thumbnail className="w-15 h-15 object-cover" style={{'height':'150px','width':'150px'}}/>
                                </Col>
                                <Col md={9} className="pl-4">
                                    <p className="text-lg font-medium text-gray-700">Product Name: {item.productName}</p>
                                    <p className="text-gray-700">Price: ₹{item.price}</p>
                                    <p className="text-gray-700">Quantity: {item.quantity}</p>
                                </Col>
                            </Row>
                        ))}
                    </Row>
                    <h3 className="text-xl font-semibold mt-6 text-purple-700">Total Price: ₹{order.totalPrice}</h3>
                    <p className="text-xl font-semibold mt-6 text-black-700">Placed Date: {order.placedDate}</p>
                    <p className="text-xl font-semibold mt-6 text-black-700">Expected Date: {order.expectedDate}</p>
                </div>
            </div>
        ))}
    </div>
</div>
        
);
};

export default Order;
