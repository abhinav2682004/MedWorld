import React, { useEffect, useState } from 'react';
import { Container, Modal, Button, Nav, Alert } from 'react-bootstrap';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Feedbacks = () => {
    const [feedbacks, setFeedbacks] = useState({ unacknowledged: [], acknowledged: [] });
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [activeSection, setActiveSection] = useState('unacknowledged');
    const [acknowledgeSuccess, setAcknowledgeSuccess] = useState(false);

    // Function to fetch feedbacks
    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/feedback/`);
            const unacknowledged = response.data.filter(feedback => !feedback.acknowledged);
            const acknowledged = response.data.filter(feedback => feedback.acknowledged);
            setFeedbacks({ unacknowledged, acknowledged });
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    // Fetch feedbacks on component mount
    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleShow = (feedback) => {
        setSelectedFeedback(feedback);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedFeedback(null);
        setAcknowledgeSuccess(false);
    };

    const handleAcknowledge = async () => {
        if (selectedFeedback) {
            try {
                await axios.patch(`${BASE_URL}/feedback/acknowledge/${selectedFeedback._id}`, {
                    acknowledged: true
                });

                // Close the modal and show success message
                setShowModal(false);
                setAcknowledgeSuccess(true);

                // Wait a moment, then refresh the feedback list
                setTimeout(() => {
                    setAcknowledgeSuccess(false);
                    fetchFeedbacks(); // Refresh feedbacks immediately
                }, 1000);
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
            <h2 className="my-4 text-center font-weight-bold" style={{ color: 'red', fontSize: '2rem' }}>
                Customer Issues
            </h2>

            {/* Show success message when feedback is acknowledged */}
            {acknowledgeSuccess && (
                <Alert variant="success" onClose={() => setAcknowledgeSuccess(false)} dismissible>
                    Feedback acknowledged successfully!
                </Alert>
            )}

            {/* Navbar for section navigation */}
            <Nav variant="tabs" className="my-4">
                <Nav.Item>
                    <Nav.Link onClick={() => handleNavClick('unacknowledged')} active={activeSection === 'unacknowledged'}>
                        Unacknowledged Issues
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => handleNavClick('acknowledged')} active={activeSection === 'acknowledged'}>
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
                                <div key={feedback._id} className="feedback-item mb-4 p-3 border rounded"
                                    onClick={() => handleShow(feedback)}
                                    style={{ cursor: 'pointer' }}>
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
                                <div key={feedback._id} className="feedback-item mb-4 p-3 border rounded"
                                    onClick={() => handleShow(feedback)}
                                    style={{ cursor: 'pointer' }}>
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
            <Modal show={showModal} onHide={handleClose} size="lg" centered>
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
                    {!selectedFeedback?.acknowledged && (
                        <Button variant="success" onClick={handleAcknowledge} className="mr-2">
                            Acknowledge
                        </Button>
                    )}
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Feedbacks;
