import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Col, Row, Card, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
const BASE_URL = process.env.REACT_APP_BASE_URL


const ManageExistingStock = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedProductName, setEditedProductName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedPricePerUnit, setEditedPricePerUnit] = useState(0);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/home`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Role: localStorage.getItem('role')
                }
            });
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredProducts(products.filter(product => 
            product.productName.toLowerCase().includes(query)
        ));
    };

    const handleEditData = (product) => {
        setSelectedProduct(product);
        setEditMode(true);
        setEditedProductName(product.productName);
        setEditedDescription(product.description);
        setEditedPricePerUnit(product.price);
    };

    const handleSubmit = async () => {
        if (!selectedProduct || !selectedProduct.productId) {
            toast.error("No product selected for editing.");
            return;
        }
    
        const updatedProduct = {
            productName: editedProductName,
            description: editedDescription,
            price: editedPricePerUnit,
            imageUrl: selectedProduct.imageUrl || "",  // Ensure it's included
            quantity: selectedProduct.quantity || 0,   // Ensure it's included
            category: selectedProduct.category || ""   // Ensure it's included
        };
    
        try {
            await axios.post(`${BASE_URL}/admin/productEdit/${selectedProduct.productId}`, { updatedProduct }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Role: localStorage.getItem('role')
                }
            });
            toast.success('Product updated successfully!');
            setEditMode(false);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error updating product. Please try again.');
        }
    };
    

    const handleRemove = () => setShowConfirmationModal(true);

    const confirmRemove = async () => {
        try {
            await axios.post(`${BASE_URL}/admin/delete/${selectedProduct.productId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Role: localStorage.getItem('role')
                }
            });
            toast.success('Product removed successfully!');
            setEditMode(false);
            setSelectedProduct(null);
            fetchProducts();
            setShowConfirmationModal(false);
        } catch (error) {
            console.error('Error removing product:', error);
            toast.error('Error removing product. Please try again.');
            setShowConfirmationModal(false);
        }
    };

    return (
        <div style={{ marginBottom: '100px' }}>
            <ToastContainer />
            <Row className="mt-4">
                <Col md={6} className="mx-auto">
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search products"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mt-4">
                {filteredProducts.map((product) => (
                    <Col md={4} key={product.productId} className="mb-4">
                        <Card>
                            <Card.Body>
                                {product.imageUrl ? <img src={product.imageUrl} alt={product.productName} style={{ width: '100%' }} /> : <FontAwesomeIcon icon={faImage} size="6x" />}
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>Price: ₹{product.price}</Card.Text>
                                <Button variant="primary" onClick={() => handleEditData(product)}>Edit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {editMode && (
                <div className="edit-section">
                    <Form>
                        <Form.Group>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" value={editedProductName} onChange={(e) => setEditedProductName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price (INR)</Form.Label>
                            <Form.Control type="number" value={editedPricePerUnit} onChange={(e) => setEditedPricePerUnit(e.target.value)} />
                        </Form.Group>
                        <Button variant="success" onClick={handleSubmit}>Submit</Button>
                        <Button variant="danger" onClick={handleRemove}>Delete</Button>
                    </Form>
                </div>
            )}

            {/* Confirmation Modal for Delete */}
            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={confirmRemove}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export { ManageExistingStock };
