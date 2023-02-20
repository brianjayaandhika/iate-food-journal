import "./Header.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand className="header-brand " href="#home">
            iAte
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex gap-3 ms-lg-5 mb-3 mb-lg-0">
              <Nav.Link href="#home" className="header-link">
                Home
              </Nav.Link>
              <Nav.Link href="#link" className="header-link">
                Favorite
              </Nav.Link>
              <Nav.Link href="#link" className="header-link">
                Food List
              </Nav.Link>
            </Nav>
            <NavDropdown title="Login" className="header-link" id="basic-nav-dropdown"></NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
