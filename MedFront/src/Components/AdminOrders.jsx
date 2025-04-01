import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
const BASE_URL = process.env.REACT_APP_BASE_URL


const AdminOrders = () => {
  const [usersOrders, setUsersOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/getOrders`);
      setUsersOrders(response.data);
    } catch (error) {
      console.error('Error fetching users orders:', error);
    }
  };

  return (
    <Container fluid className="px-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-indigo-600 my-6">Admin Orders Management</h1>
      {usersOrders.map((userOrders) => (
        <div key={userOrders._id} className="flex flex-col gap-4 mb-8 rounded-lg shadow-md ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2 px-4">
            {userOrders.username}'s Orders
          </h2>
          <Row xs={1} md={2} lg={3} className="gap-4 ">
            {userOrders.ordersList.map((order) => (
              <Col key={order.orderId} className="w-full">
                <Card className="rounded-lg shadow-md bg-gray-200 border-blue-400">  {/* Background change for user orders */}
                  <Card.Body className="p-4 flex flex-col">
                    <Card.Title className="text-xl font-weight-bold text-indigo-600">Order ID: {order.orderId}</Card.Title>
                    <Card.Text className="text-lg mb-2 flex items-center">
                      <span className="text-gray-800 font-weight-bold mr-2">Total Price:</span> ₹{order.totalPrice.toFixed(2)}
                    </Card.Text>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className="font-medium font-weight-bold mr-2">{item.productName}</span> - Quantity: {item.quantity} - Price: ₹
                          {item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between items-center text-gray-600">
                      <Card.Text className="text-sm"><h3>Status: {order.status}</h3></Card.Text>
                      <Card.Text className="text-sm font-weight-bold">Address: {order.address}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default AdminOrders;
