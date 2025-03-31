import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import slide1 from './Assets/slide1.jpeg'; 
import slide2 from './Assets/slide2.jpeg'; 
import slide3 from './Assets/slide3.jpeg';
import {useNavigate} from 'react-router-dom';
const Home = () => {
  const navigate=useNavigate();

  return (
    <>
      <Container className="py-5 text-center">
        <div className="custom-carousel">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slide1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slide2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slide3}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <h1 className="display-4 fw-bold">Welcome to MedWorld</h1>
            <p className="lead">Your one-stop solution for all medical needs</p>
            <Button variant="primary" size="lg" className="mt-3" onClick={()=>navigate('/products')}>View Products</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export {Home};