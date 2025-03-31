import React, { useState } from 'react';
import { Form, Button, Col, Row, Card, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productId, setProductId] = useState('');
    const [price, setPrice] = useState(0);
    const [prescriptionRequired, setPrescriptionRequired] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async () => {
        const newProduct = {
            productName,
            productId,
            price,
            prescriptionRequired,
            quantity,
            imageUrl,
            description,
            category,
        };

        try {
            const response = await axios.post('http://localhost:5632/admin/addProduct', newProduct, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Role: `${localStorage.getItem('role')}`
                }
            });
            toast.success('Product added successfully!');
            console.log(response.data.productName);
            handleReset();
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Error adding product. Please try again.');
        }
    };

    const handleReset = () => {
        setProductName('');
        setProductId('');
        setPrice(0);
        setPrescriptionRequired(false);
        setQuantity(0);
        setImageUrl('');
        setDescription('');
        setCategory('');
    };

    return (
        <div style={{ marginBottom: '100px' }}>
            <ToastContainer />
            <Row className="mt-4">
                <Col md={6}>
                    <Card style={{ marginTop: '40px', width: '18rem', marginLeft: 'auto' }}>
                        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                            {imageUrl ? (
                                <img src={imageUrl} alt="Product" style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                            ) : (
                                <FontAwesomeIcon icon={faImage} size="6x" />
                            )}
                            <Form.Control
                                as="textarea"
                                placeholder="Give product description here"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ marginTop: '10px', resize: 'none' }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <div style={{ marginTop: '50px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '20px' }}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Product ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Prescription Required" 
                                    checked={prescriptionRequired}
                                    onChange={(e) => setPrescriptionRequired(e.target.checked)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        {category || "Select Category"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setCategory('Syrup')}>Syrup</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setCategory('Capsule')}>Capsule</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setCategory('Others')}>Others</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                            <div className="d-flex justify-content-between">
                                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                                <Button variant="secondary" onClick={handleReset}>Reset</Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export { AddProduct };
