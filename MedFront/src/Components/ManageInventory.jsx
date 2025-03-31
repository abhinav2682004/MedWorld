import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ManageInventory = () => {
    const navigate=useNavigate()
    return (
        <Container className="mt-5">
            <Row className="justify-content-center mt-4">
                <Col md={8} className="text-center">
                    <h2>Manage Inventory</h2>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col md={8} className="text-center">
                    <Button variant="danger" className="mb-2 w-100" onClick={()=>navigate('/manageexisting')}>Manage Existing Stock</Button>
                    <p className="text-muted">Keep track of your current inventory. Update stock levels, remove items that are out of stock, and ensure that your inventory is always accurate.</p>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col md={8} className="text-center">
                    <Button variant="danger" className="mb-2 w-100" onClick={()=>navigate('/addProduct')}>Add New Products</Button>
                    <p className="text-muted">Expand your inventory by adding new products. Provide detailed information and images for each new product to help customers make informed choices.</p>
                </Col>
            </Row>
        </Container>
    );
};

export { ManageInventory };
