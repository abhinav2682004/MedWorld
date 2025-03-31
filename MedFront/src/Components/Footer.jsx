import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const footerStyle = {
    bottom: '0',
    width: '100%',
    zIndex: '1000',
    backgroundColor: 'dark',
    color: 'white',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    backgroundColor:'black'
  };

  return (
    <Container fluid style={footerStyle}>
      <Row className="justify-content-center">
        <Col md={3} className="text-center mb-3">
          <a href="/" target="_self" className="d-block">
            <img
              className="rounded-circle"
              id="cb-logo-main-menu"
              itemProp="image"
              height="125"
              width="125"
              alt="MedWorld Logo"
              title="MedWorld Logo"
              src="https://www.creativefabrica.com/wp-content/uploads/2020/07/17/Medicine-Logo-Graphics-4647232-1.jpg"
            />
          </a>
        </Col>
        <Col md={3} className="mb-3">
          <div className="font-weight-bold mb-2">MOBILE SITE & APPS</div>
          <ul className="list-unstyled">
            <li className="mb-2">
              <a href="#" className="text-white d-flex align-items-center">
                <span className="cb-mobile-site mr-2"></span>
                <span>www.medworld.com</span>
              </a>
            </li>
            <li className="mb-2">
              <a className="text-white d-flex align-items-center" href="#" target="_blank" rel="noreferrer">
                <span className="cb-app-android mr-2"></span>
                <span>Android</span>
              </a>
            </li>
            <li className="mb-2">
              <a className="text-white d-flex align-items-center" href="#" target="_blank" rel="noreferrer">
                <span className="cb-app-ios mr-2"></span>
                <span>iOS</span>
              </a>
            </li>
          </ul>
        </Col>
        <Col md={3} className="mb-3">
          <div className="font-weight-bold mb-2">FOLLOW US ON</div>
          <ul className="list-unstyled">
            <li className="mb-2">
              <a className="text-white d-flex align-items-center" title="Facebook" href="#" target="_blank" rel="noreferrer">
                <span className="cb-social-fb mr-2"></span>
                <span>facebook</span>
              </a>
            </li>
            <li className="mb-2">
              <a className="text-white d-flex align-items-center" title="Twitter" href="#" target="_blank" rel="noreferrer">
                <span className="cb-social-twitter mr-2"></span>
                <span>twitter</span>
              </a>
            </li>
            <li className="mb-2">
              <a className="text-white d-flex align-items-center" title="Youtube" href="#" target="_blank" rel="noreferrer">
                <span className="cb-social-ytbe mr-2"></span>
                <span>youtube</span>
              </a>
            </li>
            <li className="mb-2">
              <a className="text-white d-flex align-items-center" title="Pinterest" href="#" target="_blank" rel="noreferrer">
                <span className="cb-social-pinterest mr-2"></span>
                <span>Pinterest</span>
              </a>
            </li>
          </ul>
        </Col>
        <Col md={3} className="mb-3">
          <div className="font-weight-bold mb-2">COMPANY</div>
          <ul className="list-unstyled">
            <li className="mb-2">
              <a className="text-white" title="Careers" href="/careers">Careers</a>
            </li>
            <li className="mb-2">
              <a className="text-white" title="Advertise" href="/info/advertise">Advertise</a>
            </li>
            <li className="mb-2">
              <a className="text-white" rel="nofollow" title="Privacy Policy" href="/info/privacy">Privacy Policy</a>
            </li>
            <li className="mb-2">
              <a className="text-white" rel="nofollow" title="Terms of Use" href="/info/termsofuse">Terms of Use</a>
            </li>
          </ul>
        </Col>
        <Col md={12} className="text-center mt-3">
          © 2024 medworld.com, CVR College of Engineering. All rights reserved | 
          <a className="text-white text-decoration-none ml-1" href="http://www.cvr.ac.in/" target="_blank" rel="noreferrer">CVR College of Engineering</a>
        </Col>
      </Row>
    </Container>
  );
};

export { Footer };
