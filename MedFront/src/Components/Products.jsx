import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Col, Row, Card, ListGroup, Pagination, Placeholder, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [colorFilter, setColorFilter] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const response = await axios.post('http://localhost:5632/home', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Role: role,
        },
      });

      setProds(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleCardClick = (event, productId) => {
    if (!event.target.closest('button')) {
      localStorage.setItem("pid", productId);
      navigate('/prodPage');
    }
  };

  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!userId) {
      toast.error('You must be logged in to add items to the cart');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5632/cart/addtocart/${product._id}`,
        {
          userId,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Role: role,
          },
        }
      );
      if (response.data.status === false) {
        toast.error('Sorry Product is Out Of Stock');
      } else {
        toast.success('Item added to cart successfully!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error adding to cart. Please try again.');
    }
  };

  const handleBuyNow = (product) => {
    localStorage.setItem("pid", product._id);
    localStorage.setItem("totalPrice", product.price);
    if (product.prescriptionRequired) {
      navigate('/prodPres');
    } else {
      navigate('/confirmProd');
    }
  };

  const handleEdit = (productId) => {
    localStorage.setItem("pid", productId);
    navigate('/manageexisting');
  };

  if (loading) {
    const placeholders = Array.from({ length: 4 }).map((_, index) => (
      <Col key={index} md={3} className="mb-4">
        <Card style={{ height: '100%' }}>
          <div style={{ height: '150px', objectFit: 'contain', backgroundColor: '#e9ecef' }}></div>
          <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
            </Placeholder>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
              <Placeholder.Button variant="primary" xs={6} />
              <Placeholder.Button variant="success" xs={6} />
            </div>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <Placeholder as={ListGroup.Item} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </ListGroup>
        </Card>
      </Col>
    ));

    return <Row>{placeholders}</Row>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filterByPriceRange = (product) => {
    if (priceRange === '') return true;
    if (priceRange === '0-50') return product.price >= 0 && product.price <= 50;
    if (priceRange === '0-100') return product.price >= 0 && product.price <= 100;
    if (priceRange === '0-150') return product.price >= 0 && product.price <= 150;
    if (priceRange === '>150') return product.price > 150;
    return true;
  };

  const filteredProducts = prods.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (colorFilter === '' || product.category.toLowerCase() === colorFilter.toLowerCase()) &&
    filterByPriceRange(product)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const role = localStorage.getItem('role');

  const productCards = currentProducts.map((product, index) => (
    <Col key={index} md={3} className="mb-4">
      <Card className="h-full cursor-pointer" onClick={(e) => handleCardClick(e, product._id)}>
        <Card.Img variant="top" src={product.imageUrl} className="h-36 object-contain" />
        <Card.Body className="flex flex-col" style={{height:'150px'}}>
          <Card.Title>{product.productName}</Card.Title>
          <Card.Text className={product.quantity > 0 ? 'text-green-500' : 'text-red-500'}>
            {product.quantity > 0 ? 'Available' : 'Out of Stock'}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Price: ₹{product.price.toFixed(2)}</ListGroup.Item>
          {localStorage.getItem("role") === 'admin' && (<ListGroup.Item>Quantity: {product.quantity}</ListGroup.Item>)}
        </ListGroup>
        <Card.Body className="flex justify-between">
          {role !== 'admin' ? (
            <>
              <Button variant="primary" style={{'height':'50px'}} onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              <Button variant="success" style={{'height':'50px'}} onClick={() => handleBuyNow(product)}>Buy Now</Button>
            </>
          ) : (
            <>
              <Button variant="warning" onClick={() => handleEdit(product._id)}>Edit</Button>
              <Button variant="danger" onClick={() => handleEdit(product._id)}>Remove</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  ));

  const rows = [];
  for (let i = 0; i < productCards.length; i += 4) {
    const row = (
      <Row key={i}>
        {productCards.slice(i, i + 4)}
      </Row>
    );
    rows.push(row);
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <Dropdown className="filter-dropdown">
          <Dropdown.Toggle id="dropdown-basic" className="bg-gray-200 text-purple-700 border-white">
            Filters
          </Dropdown.Toggle>
          <Dropdown.Menu className="p-2">
            <Form.Group controlId="colorFilter">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
                <option value="">All</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Others">Others</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="priceRange" className="mt-3">
              <Form.Label>Price Range</Form.Label>
              <Form.Control as="select" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="">All</option>
                <option value="0-50">₹0 - ₹50</option>
                <option value="0-100">₹0 - ₹100</option>
                <option value="0-150">₹0 - ₹150</option>
                <option value=">150">₹150+</option>
              </Form.Control>
            </Form.Group>
          </Dropdown.Menu>
        </Dropdown>
        <Form inline className="search-form flex">
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-2 flex-grow w-64"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button variant="danger">Search</Button>
        </Form>
      </div>
      <div>
        {rows}
      </div>
      <Pagination className="justify-content-center mt-4">
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
        {[...Array(totalPages).keys()].map(number => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};

export { Products };