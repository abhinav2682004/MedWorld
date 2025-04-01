// About.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import logo from './Assets/about.png';
const BASE_URL = process.env.REACT_APP_BASE_URL


const About = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/feedback/add`, formData);
            alert('Feedback submitted successfully.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            // alert('Error submitting feedback.');
        }
    };

    return (
        <>
            <section className="py-3 py-md-5">
                <Container>
                    <Row className="gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
                        <Col xs={12} lg={6} xl={5}>
                            <img className="img-fluid rounded shadow-lg" loading="lazy" src={logo} alt="About MedWorld" style={{ 'margin-top': '10px' }} />
                        </Col>
                        <Col xs={12} lg={6} xl={7}>
                            <Row className="justify-content-xl-center">
                                <Col xs={12} xl={11}>
                                    <h2 className="mb-3 text-primary">Who Are We?</h2>
                                    <p className="lead fs-4 text-secondary mb-3">MedWorld is dedicated to providing a comprehensive online platform for purchasing medications.</p>
                                    <p className="mb-5 text-secondary">Our mission is to make healthcare accessible and convenient by offering a wide range of medical products with detailed information, an easy-to-use interface, and efficient order management.</p>
                                    <Row className="gy-4 gy-md-0 gx-xxl-5">
                                        <Col xs={12} md={6}>
                                            <div className="d-flex">
                                                <div className="me-4 text-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h2 className="h4 mb-3">Our Vision</h2>
                                                    <p className="text-secondary mb-0">To be the most trusted and preferred online medicine store by consistently delivering value to our customers.</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <div className="d-flex">
                                                <div className="me-4 text-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                                                        <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h2 className="h4 mb-3">Our Values</h2>
                                                    <p className="text-secondary mb-0">Integrity, Customer Satisfaction, Innovation, and Excellence.</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <div className="p-4 rounded shadow-sm bg-white">
                                <h2 className="mb-4 text-center">Contact Us</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formName" className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        
                                        <Form.Control
                                           type="text"
                                           placeholder="Enter your name"
                                           name="name"
                                           value={formData.name}
                                           onChange={handleChange}
                                       />
                                       </Form.Group>

                                       <Form.Group controlId="formEmail" className="mb-3">
                                           <Form.Label>Email</Form.Label>
                                           <Form.Control
                                               type="email"
                                               placeholder="Enter your email"
                                               name="email"
                                               value={formData.email}
                                               onChange={handleChange}
                                           />
                                       </Form.Group>

                                       <Form.Group controlId="formSubject" className="mb-3">
                                           <Form.Label>Subject</Form.Label>
                                           <Form.Control
                                               type="text"
                                               placeholder="Subject"
                                               name="subject"
                                               value={formData.subject}
                                               onChange={handleChange}
                                           />
                                       </Form.Group>

                                       <Form.Group controlId="formMessage" className="mb-3">
                                           <Form.Label>Message</Form.Label>
                                           <Form.Control
                                               as="textarea"
                                               rows={5}
                                               placeholder="Your message"
                                               name="message"
                                               value={formData.message}
                                               onChange={handleChange}
                                           />
                                       </Form.Group>

                                       <Button variant="primary" type="submit" className="w-100">
                                           Send Message
                                       </Button>
                                   </Form>
                               </div>
                           </Col>
                       </Row>

                       <Row className="justify-content-center mt-5">
                           <Col md={8} className="text-center">
                               <h4>Contact Details</h4>
                               <p><strong>Email:</strong> support@medworld.com</p>
                               <p><strong>Phone:</strong> +1 234 567 890</p>
                               <p><strong>Address:</strong> 123 MedWorld Street, Health City, Wellness State, 12345</p>
                           </Col>
                       </Row>
                   </Container>
               </div>
           </>
       );
   };

   export { About };
