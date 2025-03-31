import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Badge, Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const ProductPage = () => {
  const [prod, setProd] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [isCartClicked,setIsCartClicked]=useState(false);
  const [userRole,setUserRole]=useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProd();
  }, []);

  const fetchProd = async () => {
    try {
      setUserRole(localStorage.getItem("role"));
      const pid = localStorage.getItem('pid');
      const res = await axios.post(`http://localhost:5632/home/getProd/${pid}`);
      setProd(res.data);
    } catch (e) {
      console.log(e);
      toast.error('Error in fetching product data');
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
          userId,quantity
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
        setQuantity(1);
        setIsCartClicked(true); // Set the initial quantity to 1 when added to cart
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error adding to cart. Please try again.');
    }
  };

  const handleIncrement = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const userId = localStorage.getItem('userId');
        const res=await axios.post(`http://localhost:5632/cart/increment/${id}`, { userId: userId }, {
            headers: {
                Authorization: `Bearer ${token}`,
                Role: role,
            },
        });
        if(res.data.status===false){
          toast.error('Sorry Product is Out Of Stock');
        }
        else{ 
          setQuantity(prevQuantity => prevQuantity + 1);
        }
    } catch (e) {
        console.log(e);
    }
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
        setQuantity(prevQuantity => {
            if (prevQuantity > 1) {
              return prevQuantity - 1;
            } else {
              // If the quantity becomes 0, show the buttons again
              setQuantity(0);
              return 0;
            }
          });
          if(quantity===0) setIsCartClicked(false);
    } catch (e) {
        console.log(e);
    }
  };

  const handleBuyItem = (product) => {
    localStorage.setItem("pid", product._id);
    
    localStorage.setItem("totalPrice", product.price);
    if (product.prescriptionRequired) {
      navigate('/prodPres');
    } else {
      navigate('/confirmProd');
    }
  };

  const handleEdit = (productId) => {
    localStorage.setItem("pid",productId);
    navigate('/manageexisting')
  };

  const handleBackClick = () => {
    localStorage.removeItem('pid');
    navigate('/products');
  };

  return (
    <Container className="mt-4 relative">
      <Button variant="secondary" onClick={handleBackClick} className="absolute top-0 left-0 m-3">
        &lt; Back
      </Button>
      <Row className="flex items-center justify-center">
        <Col md={6}>
          <Image src={prod.imageUrl} alt={prod.productName} fluid className="rounded shadow-lg" />
        </Col>
        <Col md={6} className="text-left p-4">
          <h2 className="text-2xl font-bold mb-4">{prod.productName}</h2>
          <p className="mb-2"><strong>Product ID:</strong> {prod.productId}</p>
          <p className="mb-2"><strong>Description:</strong> {prod.description}</p>
          <p className="mb-2"><strong>Price:</strong> ₹{(prod.price)}</p>
          {userRole==='admin' && (<p className="mb-2"><strong>Quantity:</strong> {(prod.quantity)}</p>)}
          <p className="mb-2"><strong>Prescription Required:</strong> {prod.prescriptionRequired ? 'Yes' : 'No'}</p>
          <p className="mb-4">
            <strong>Availability:</strong>
            {prod.quantity >0 ? (
              <Badge bg="success" className="ml-2">Available</Badge>
            ) : (
              <Badge bg="danger" className="ml-2">Not Available</Badge>
            )}
          </p>
          {userRole === 'admin' ? (
            <div className="mb-3">
              <Button variant="info" onClick={() => handleEdit(prod._id)}>Edit</Button>{' '}
              <Button variant="danger" onClick={() => handleEdit(prod._id)}>Remove</Button>
            </div>
          ) : (
            <>
              {isCartClicked && quantity > 0 ? (
                <div className="flex items-center space-x-3 mb-4">
                  <ButtonGroup>
                    <Button variant="outline-secondary" onClick={() => handleDecrement(prod._id)}>-</Button>
                    <Button variant="outline-secondary" disabled>{quantity}</Button>
                    <Button variant="outline-secondary" onClick={() => handleIncrement(prod._id)}>+</Button>
                  </ButtonGroup>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Button variant="primary" disabled={prod.quantity === 0} onClick={() => handleAddToCart(prod)}>Add to Cart</Button>
                  <Button variant="success" disabled={prod.quantity === 0} onClick={() => handleBuyItem(prod)}>Buy Now</Button>
                </div>
              )}
            </>
          )}
          {isCartClicked && quantity > 0 && (
            <Button variant="primary" onClick={handleBackClick} className="mt-2">Go Back to Products</Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
