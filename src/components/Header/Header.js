import "./Header.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const jwtToken = localStorage.getItem("token");

  const handleIsLogin = () => {
    localStorage.getItem("id") ? setIsLogin(true) : setIsLogin(false);
  };

  const handleIsAdmin = () => {
    localStorage.getItem("role") === "admin" ? setIsAdmin(true) : setIsAdmin(false);
  };

  // Logout
  const handleLogout = () => {
    alert("You have logged out!");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setIsLogin(false);

    window.location.assign("/");
  };

  useEffect(() => {
    handleIsLogin();
    handleIsAdmin();

    if (isLogin) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/user`,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
      })
        .then()
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLogin, isAdmin, jwtToken]);

  return (
    <>
      <Navbar expand="lg" style={{ borderBottom: "2px solid rgba(3, 172, 14, 0.2" }}>
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
              {isAdmin ? (
                <Nav.Link href="/add-food" className="header-link">
                  Add Food
                </Nav.Link>
              ) : null}
            </Nav>
            {isLogin ? (
              <NavDropdown className="header-username" title={localStorage.getItem("name")} id="nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                {isAdmin ? <NavDropdown.Item href="/all-user">All User (Admin)</NavDropdown.Item> : null}
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <a href="/login" className="login-header">
                Sign In
              </a>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
