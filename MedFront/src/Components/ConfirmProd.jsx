import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card ,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
const BASE_URL = process.env.REACT_APP_BASE_URL


const ConfirmProd = () => {
    const [order, setOrder] = useState(null);
    const [totalPrice,setTotalPrice]=useState(0.00);
    const navigate = useNavigate();
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("role");
            const userId = localStorage.getItem("userId");
            const pid=localStorage.getItem("pid");
            const response = await axios.post(`${BASE_URL}/home/getProd/${pid}`,{userId:userId}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Role: role
                }
            });
            console.log(response.data);
            setTotalPrice(localStorage.getItem("totalPrice"));
            setOrder(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    const proceedPayment = () => {
        localStorage.setItem("totalPrice", calculateTotalPrice(Number(totalPrice), getGST(Number(totalPrice))).toFixed(2));
        //if(localStorage.getItem("pid")) navigate('/payment2');
        navigate('/payment2');
    };
    const handleBackBtn=()=>{
        localStorage.removeItem("totalPrice")
        localStorage.removeItem("pid");
        navigate('/products');
    }
    if (!order) return <Container className="mt-5 text-center">Loading</Container>;

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <div className="bg-light p-4 rounded shadow-lg">
                        <h2 className="text-center mb-4">Invoice:</h2>
                        <div className="mb-4">
                            <h4 className="text-danger mb-3">Confirm Your Product..</h4>
                            <p className="mb-2"><strong>Username:</strong> {localStorage.getItem("username")}</p>
                                <Row className="mb-3">
                                    <Col>
                                    <Card className="d-flex flex-row"> {/* Added flexbox class for layout */}
                                        {order.imageUrl && ( // Conditionally render image if available
                                        <img
                                            src={order.imageUrl} // Replace with your image source
                                            alt={order.productName}
                                            style={{width:'200px',height: 'inherit', objectFit: 'cover', marginRight: '10px' }}
                                            className="rounded"
                                        />
                                        )}
                                            <Card.Body>
                                                <Card.Title>{order.productName}</Card.Title>
                                                <Card.Text>
                                                    <p><strong>Quantity:</strong>1</p>
                                                    <p><strong>Price :</strong>₹{order.price}</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            <p className="mt-3"><strong>GST:</strong> {getGST(Number(totalPrice)).toFixed(2)}</p>
                            <p><strong>Delivery Charge:</strong> Free</p>
                            <h4 className="mt-3">Total Price: ₹{calculateTotalPrice(Number(totalPrice), getGST(Number(totalPrice))).toFixed(2)}</h4>
                            <div className="d-flex justify-content-center mt-4">
                                <Button variant="success" className="mx-2" onClick={() =>handleBackBtn()} style={{'width':'200  px'}}>
                                    <i className="bi bi-arrow-left-circle-fill me-2"></i> Back To Products
                                </Button>
                                <Button variant="success" className="mx-2" onClick={() => proceedPayment()} style={{'width':'200px'}}>
                                    Proceed to Pay <i className="bi bi-arrow-right-circle-fill ms-2"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

// Function to calculate total price including GST and delivery charges
const calculateTotalPrice = (tp, gst) => {
    return tp + gst;
};

const getGST = (tp) => {
    return 0.18 * tp;
};

export default ConfirmProd;