import "./Footer.css";
import { FaCopyright, FaTwitter, FaInstagram, FaGithub, FaFacebook } from "react-icons/fa";
import { Row, Col, Container, InputGroup, Form, Button } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <div className="footer-section pt-4">
        <Container>
          <Row className="d-flex g-2 text-center text-md-start">
            <Col md={6} lg={4}>
              <p className="footer-item-title m-0">Navigation</p>
              <ul>
                <li>
                  <a className="footer-item" href="#">
                    Home
                  </a>
                </li>
                <li>
                  <a className="footer-item" href="#">
                    Favorite
                  </a>
                </li>
                <li>
                  <a className="footer-item" href="#">
                    Food List
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={6} lg={4}>
              <p className="footer-item-title m-0 pb-2">Follow us at</p>
              <ul className="d-flex gap-3 justify-content-center justify-content-md-start">
                <li className="footer-item">
                  <FaTwitter className="footer-icon" />
                </li>
                <li className="footer-item">
                  <FaInstagram className="footer-icon" />
                </li>
                <li className="footer-item">
                  <FaGithub className="footer-icon" />
                </li>
                <li className="footer-item">
                  <FaFacebook className="footer-icon" />
                </li>
              </ul>
            </Col>
            <Col md={12} lg={4} className="pt-3 pt-lg-0 ">
              <p className="footer-item-title m-0 pb-2">Never miss a thing - subscribe now!</p>
              <InputGroup className="mb-3">
                <Form.Control placeholder="Enter your email" aria-label="Enter your email" aria-describedby="basic-addon2" />
                <Button className="btn btn-success" id="button-addon2">
                  Subscribe
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <h1 className="footer-copyright-text pt-4 ">
            <FaCopyright /> All Rights Reserved 2023. Made by Muhammad Brianjaya Andhika
          </h1>
        </Container>
      </div>
    </>
  );
};

export default Footer;
