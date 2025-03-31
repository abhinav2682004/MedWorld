import  axios  from 'axios';
import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('creditDebitCard');
  const [address,setAddress]=useState('');
  const navigate=useNavigate();
  const confirmPayment=async ()=>{
    try{
      const userId=localStorage.getItem("userId");
      const token=localStorage.getItem("token");
      const role=localStorage.getItem("role");
      const res=await axios.post(`http://localhost:5632/orders/saveOrder/${userId}`,
          {address:address,modeOfPayment:paymentMethod},
          {
            headers:{
              Authorization:`Bearer ${token}`,
              Role:role
            }
          }
        )
        if(res.data.status===true){
          localStorage.removeItem('totalPrice');
          // localStorage.removeItem('pid');
          toast.success('Order Placed Successfully!!!');
          navigate('/orders');
        }
    }
    catch(err){
      console.log(err);
      toast.error('Sorry Error in Placing the Order!!')
    }
  }
  return (
    <Container
      className="py-5"
      fluid
      style={{
        backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/Others/background3.webp)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        background:'none'
      }}
    >
      <Row className="justify-content-center">
        <Col md="8">
          <Card className="rounded-3">
            <Card.Body className="p-4">
              <div className="text-left mb-4">
                <h3 className="fw-bold text-danger mb-4" style={{ marginBottom: '30px' }}>Total Amount Payable: ₹{localStorage.getItem('totalPrice')}</h3>
                <h6>Choose your Payment Option</h6>
              </div>
               {/* Address Field */}
               <Form.Group className="mb-4">
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                />
              </Form.Group>
              <Form>
                <Container
                  className={`mb-4 p-4 border border-warning shadow-lg rounded`}
                >
                  <Form.Check
                    type="radio"
                    label={<span className="fw-bold" style={{ fontSize: '1.1rem' }}>Credit/Debit Card</span>}
                    name="paymentMethod"
                    id="creditDebitCard"
                    value="creditDebitCard"
                    className="mb-3"
                    checked={paymentMethod === 'creditDebitCard'}
                    onChange={() => setPaymentMethod('creditDebitCard')}
                  />
                  <Form.Group className="mb-3">
                    <Form.Label>Cardholder's Name</Form.Label>
                    <Form.Control type="text" size="lg" placeholder="Cardholder's Name" required={paymentMethod==='creditDebitCard'}/>
                  </Form.Group>
                  <Row className="mb-4">
                    <Col md={7}>
                      <Form.Group>
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control type="text" size="lg" placeholder="xxxx xxxx xxxx xxxx" required={paymentMethod==='creditDebitCard'}/>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>Expire</Form.Label>
                        <Form.Control type="text" size="lg" placeholder="MM/YYYY" required={paymentMethod==='creditDebitCard'}/>
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>CVV</Form.Label>
                        <Form.Control type="text" size="lg" placeholder="CVV" required={paymentMethod==='creditDebitCard'}/>
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
                
                <Container
                  className={`mb-4 p-4 border border-warning shadow-lg rounded`}
                >
                  <Form.Check
                    type="radio"
                    label={<span className="fw-bold" style={{ fontSize: '1.1rem' }}>UPI</span>}
                    name="paymentMethod"
                    id="upi"
                    value="upi"
                    className="mb-3"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <Form.Group className="mb-4">
                    <Form.Label>Virtual Payment Address</Form.Label>
                    <Form.Control type="text" size="lg" placeholder="example@upi" required={paymentMethod==='upi'}/>
                  </Form.Group>
                </Container>
                
                <Container
                  className={`mb-4 p-4 border border-warning shadow-lg rounded`}
                >
                  <Form.Check
                    type="radio"
                    label={<span className="fw-bold" style={{ fontSize: '1.1rem' }}>Cash on Delivery</span>}
                    name="paymentMethod"
                    id="cashOnDelivery"
                    value="cashOnDelivery"
                    className="mb-3"
                    checked={paymentMethod === 'cashOnDelivery'}
                    onChange={() => setPaymentMethod('cashOnDelivery')}
                  />
                  <p className="text-danger mb-1" style={{ fontSize: '0.9rem', marginTop: '-10px' }}>extra 2% extra charges applicable on choosing Cash On Delivery</p>
                </Container>

                <div className="text-center mt-5">
                  <Button variant="danger" size="lg" onClick={()=>confirmPayment()}>
                    Confirm Order
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div style={{ marginBottom: '200px' }}></div> {/* Adjust margin bottom as needed */}
    </Container>
  );
}
