import "./Header.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleIsLogin = () => {
    localStorage.getItem("id") ? setIsLogin(true) : setIsLogin(false);
  };

  // Logout
  const handleLogout = () => {
    alert("You have logged out!");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setIsLogin(false);

    window.location.reload(true);
  };

  useEffect(() => {
    handleIsLogin();

    if (isLogin) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/user`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_JWTTOKEN}`,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand className="header-brand " href="/">
            iAte
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex gap-3 ms-lg-5 mb-3 mb-lg-0">
              <Nav.Link href="/" className="header-link">
                Home
              </Nav.Link>
              {isLogin ? (
                <Nav.Link href="/favorite" className="header-link">
                  Favorite
                </Nav.Link>
              ) : null}
              <Nav.Link href="/foods" className="header-link">
                Food List
              </Nav.Link>
            </Nav>
            {isLogin ? (
              <NavDropdown className="header-username" title={localStorage.getItem("name")} id="nav-dropdown">
                <NavDropdown.Item href="/profile">Edit Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <a href="/login" className="login-header">
                Login
              </a>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
