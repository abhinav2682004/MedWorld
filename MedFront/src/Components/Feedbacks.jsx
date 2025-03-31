import React, { useEffect, useState } from 'react';
import { Container, Modal, Button, Nav } from 'react-bootstrap';
import axios from 'axios';

const Feedbacks = () => {
    const [feedbacks, setFeedbacks] = useState({ unacknowledged: [], acknowledged: [] });
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [activeSection, setActiveSection] = useState('unacknowledged');

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5632/feedback/'); // Replace with your API endpoint
                const unacknowledged = response.data.filter(feedback => !feedback.acknowledged);
                const acknowledged = response.data.filter(feedback => feedback.acknowledged);
                setFeedbacks({ unacknowledged, acknowledged });
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleShow = (feedback) => {
        setSelectedFeedback(feedback);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedFeedback(null);
    };

    const handleAcknowledge = async () => {
        if (selectedFeedback) {
            try {
                await axios.patch(`http://localhost:5632/feedback/acknowledge/${selectedFeedback._id}`, {
                    acknowledged: true
                });
                setFeedbacks(prevState => ({
                    unacknowledged: prevState.unacknowledged.filter(fb => fb._id !== selectedFeedback._id),
                    acknowledged: [...prevState.acknowledged, { ...selectedFeedback, acknowledged: true }]
                }));
                handleClose();
            } catch (error) {
                console.error('Error acknowledging feedback:', error);
            }
        }
    };

    const handleNavClick = (section) => {
        setActiveSection(section);
    };

    return (
        <Container>
            <h2 
                className="my-4 text-center font-weight-bold" 
                style={{ color: 'red', fontSize: '2rem' }}
            >
                Customer Issues
            </h2>

            {/* Navbar for section navigation */}
            <Nav variant="tabs" className="my-4">
                <Nav.Item>
                    <Nav.Link
                        onClick={() => handleNavClick('unacknowledged')}
                        active={activeSection === 'unacknowledged'}
                    >
                        Unacknowledged Issues
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => handleNavClick('acknowledged')}
                        active={activeSection === 'acknowledged'}
                    >
                        Acknowledged Issues
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/* Display feedbacks based on the selected section */}
            {activeSection === 'unacknowledged' && (
                <>
                    {feedbacks.unacknowledged.length > 0 ? (
                        <div className="feedback-list">
                            {feedbacks.unacknowledged.map(feedback => (
                                <div 
                                    key={feedback._id} 
                                    className="feedback-item mb-4 p-3 border rounded"
                                    onClick={() => handleShow(feedback)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex justify-content-between">
                                        <p className="text-primary mb-1">
                                            <strong>{feedback.name}</strong> ({feedback.email})
                                        </p>
                                        <p className="text-muted mb-1"><small>{new Date(feedback.timestamp).toLocaleString()}</small></p>
                                    </div>
                                    <h4 className="mb-2 text-black">{feedback.subject}</h4>
                                    <p>{feedback.message.split('\n').slice(0, 2).join('\n')}...</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No unacknowledged feedback available.</p>
                    )}
                </>
            )}

            {activeSection === 'acknowledged' && (
                <>
                    {feedbacks.acknowledged.length > 0 ? (
                        <div className="feedback-list">
                            {feedbacks.acknowledged.map(feedback => (
                                <div 
                                    key={feedback._id} 
                                    className="feedback-item mb-4 p-3 border rounded"
                                    onClick={() => handleShow(feedback)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex justify-content-between">
                                        <p className="text-primary mb-1">
                                            <strong>{feedback.name}</strong> ({feedback.email})
                                        </p>
                                        <p className="text-muted mb-1"><small>{new Date(feedback.timestamp).toLocaleString()}</small></p>
                                    </div>
                                    <h4 className="mb-2 text-black">{feedback.subject}</h4>
                                    <p>{feedback.message.split('\n').slice(0, 2).join('\n')}...</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No acknowledged feedback available.</p>
                    )}
                </>
            )}

            {/* Modal for displaying feedback details */}
            <Modal 
                show={showModal} 
                onHide={handleClose} 
                size="lg" // Larger size for the modal
                centered // Center modal vertically in the viewport
            >
                <Modal.Header closeButton>
                    <Modal.Title>Feedback Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedFeedback && (
                        <>
                            <p className="text-primary mb-1">
                                <strong>{selectedFeedback.name}</strong> ({selectedFeedback.email})
                            </p>
                            <p className="text-muted mb-1"><small>{new Date(selectedFeedback.timestamp).toLocaleString()}</small></p>
                            <h4 className="mb-2 text-black">{selectedFeedback.subject}</h4>
                            <p>{selectedFeedback.message}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {!selectedFeedback?.acknowledged && ( // Only show if feedback is not acknowledged
                        <Button 
                            variant="success" 
                            onClick={handleAcknowledge}
                            className="mr-2"
                        >
                            Acknowledge
                        </Button>
                    )}
                    <Button 
                        variant="danger" 
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Feedbacks;
