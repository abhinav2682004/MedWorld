import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const responsibilities = [
  {
      title: 'User Management',
      tasks: [
          'Monitor user registrations and manage user accounts.',
          'Ensure the verification of healthcare professionals’ credentials.',
          'Handle user queries and support requests.',
      ],
  },
  {
      title: 'Website Maintenance',
      tasks: [
          'Regularly update the website content, including medical articles, health tips, and news.',
          'Ensure the website is up-to-date with the latest features and security patches.',
          'Perform routine backups to prevent data loss.',
      ],
  },
  {
      title: 'Data Security and Privacy',
      tasks: [
          'Implement and monitor data protection policies to ensure patient confidentiality.',
          'Ensure compliance with relevant healthcare regulations (e.g., HIPAA, GDPR).',
          'Monitor and respond to security threats and vulnerabilities.',
      ],
  },
  {
      title: 'Content Management',
      tasks: [
          'Oversee the quality and accuracy of medical information provided on the website.',
          'Collaborate with medical professionals to create and review content.',
          'Manage multimedia content, such as images and videos.',
      ],
  },
  {
      title: 'Technical Support',
      tasks: [
          'Provide technical support to users experiencing issues with the website.',
          'Troubleshoot and resolve technical problems promptly.',
          'Coordinate with IT professionals for advanced technical issues.',
      ],
  },
  {
      title: 'Performance Monitoring',
      tasks: [
          'Monitor website performance and load times to ensure a smooth user experience.',
          'Use analytics tools to track user behavior and website usage.',
          'Implement improvements based on analytics data to enhance user engagement.',
      ],
  },
  {
      title: 'E-commerce Management',
      tasks: [
          'Manage product listings, including medical supplies and medications.',
          'Oversee the order and payment processing system.',
          'Handle customer service related to product inquiries and orders.',
      ],
  },
  {
      title: 'Compliance and Legal Responsibilities',
      tasks: [
          'Ensure that the website complies with healthcare laws and regulations.',
          'Stay updated with changes in legal requirements and implement necessary changes.',
          'Manage user consent for data collection and use.',
      ],
  },
  {
      title: 'Marketing and Promotion',
      tasks: [
          'Implement digital marketing strategies to attract and retain users.',
          'Collaborate with marketing professionals to run campaigns and promotions.',
          'Monitor the effectiveness of marketing efforts and adjust strategies accordingly.',
      ],
  },
  {
      title: 'Collaboration and Coordination',
      tasks: [
          'Work closely with medical staff, IT team, content creators, and marketing professionals.',
          'Coordinate with external vendors and service providers as needed.',
          'Participate in strategic planning and decision-making for the website\'s growth.',
      ],
  },
  {
      title: 'Feedback and Improvement',
      tasks: [
          'Collect and analyze user feedback to identify areas for improvement.',
          'Implement changes based on feedback to enhance user satisfaction.',
          'Stay updated with industry trends and best practices to keep the website competitive.',
      ],
  },
];

const AdminDashboard = () => {
  return(
    <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} className="text-center">
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Welcome, Admin!</h1>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5">
                <Col md={8} className="text-center">
                    <h2>Your Responsibilities</h2>
                </Col>
            </Row>
            {responsibilities.map((responsibility, index) => (
                <Row className="justify-content-center mt-4" key={index}>
                    <Col md={8}>
                        <h5>{responsibility.title}</h5>
                        <ul className="text-left">
                            {responsibility.tasks.map((task, idx) => (
                                <li key={idx}>{task}</li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            ))}
        </Container>
  )
};

export {AdminDashboard};