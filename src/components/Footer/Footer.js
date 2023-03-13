import "./Footer.css";
import { FaCopyright, FaGithub, FaLinkedin } from "react-icons/fa";
import { Row, Col, Container, InputGroup, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const Footer = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleIsLogin = () => {
    localStorage.getItem("id") ? setIsLogin(true) : setIsLogin(false);
  };

  useEffect(() => {
    handleIsLogin();
  }, []);

  return (
    <>
      <div className="footer-section pt-4">
        <Container>
          <Row className="d-flex g-2 text-center text-md-start">
            <Col md={6} lg={4}>
              <p className="footer-item-title m-0">Navigation</p>
              <ul>
                <li>
                  <a className="footer-item" href="/">
                    Home
                  </a>
                </li>
                {isLogin ? (
                  <li>
                    <a href="/favorite" className="footer-item">
                      Favorite
                    </a>
                  </li>
                ) : null}
                <li>
                  <a className="footer-item" href="/foods">
                    Recipes
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={6} lg={4}>
              <p className="footer-item-title m-0 pb-2">Follow us at</p>
              <ul className="d-flex gap-3 justify-content-center justify-content-md-start">
                <li className="footer-item">
                  <a href="https://www.linkedin.com/in/muhammad-brianjaya-andhika/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="footer-icon" />
                  </a>
                </li>

                <li className="footer-item">
                  <a href="https://github.com/brianjayaandhika" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="footer-icon" />
                  </a>
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
            <FaCopyright /> Made by Muhammad Brianjaya Andhika
          </h1>
        </Container>
      </div>
    </>
  );
};

export default Footer;
