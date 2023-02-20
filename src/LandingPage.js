import "./LandingPage.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Container, Button, Row, Col } from "react-bootstrap";
import { FaStar, FaBookmark, FaPlusCircle } from "react-icons/fa";

const LandingPage = () => {
  return (
    <>
      {/* Intro Section */}
      <div className="intro-section">
        <Header />
        <div className="intro-section-text-group">
          <Container>
            <h1 className="intro-brand">iAte</h1>
            <p className="intro-text mb-5">Look, cook, and enjoy.</p>
            <p className="intro-text mb-4">Recipes from around the world.</p>
            <Button className="btn btn-success" style={{ fontSize: "18px" }}>
              Explore Our Recipes
            </Button>
          </Container>
        </div>
      </div>
      {/* End of Intro Section */}

      {/* Favorite Section */}
      <div className="favorite-section pt-4 pb-5">
        <Container>
          <h1 className="favorite-title mb-5 pt-3">Most Liked Foods</h1>
          <Row>
            <Col md={12} lg={12} xl={4} className="d-flex flex-column align-items-center mb-md-4 mb-4">
              <img src="https://source.unsplash.com/random/?food&1/" className="favorite-img" />
              <p className="favorite-text mt-3">Sushi</p>
            </Col>
            <Col sm={12} md={6} lg={6} xl={4} className="d-flex flex-column align-items-center mb-4">
              <img src="https://source.unsplash.com/random/?food&2/" className="favorite-img" />
              <p className="favorite-text mt-3">Pizza</p>
            </Col>
            <Col sm={12} md={6} lg={6} xl={4} className="d-flex flex-column align-items-center">
              <img src="https://source.unsplash.com/random/?food&3/" className="favorite-img" />
              <p className="favorite-text mt-3">Spaghetti</p>
            </Col>
          </Row>
        </Container>
      </div>
      {/* End of Favorite Section */}

      {/* Feature Section */}
      <div className="feature-section pt-5 pb-5">
        <Container>
          <h1 className="feature-title mb-5">
            <span className="feature-title-brand">iAte</span>
            <br />
            Features
          </h1>
          <Row>
            <Col md={12} lg={12} xl={4} className="d-flex flex-column align-items-center mb-md-4 mb-4">
              <FaStar className="feature-icons mb-4" />
              <h1 className="feature-text">
                Add
                <br />
                Rating & Review
              </h1>
            </Col>
            <Col sm={12} md={6} lg={6} xl={4} className="d-flex flex-column align-items-center mb-4">
              <FaPlusCircle className="feature-icons mb-4" />
              <h1 className="feature-text">
                Add
                <br /> New Recipe
              </h1>
            </Col>
            <Col sm={12} md={6} lg={6} xl={4} className="d-flex flex-column align-items-center">
              <FaBookmark className="feature-icons mb-4" />
              <h1 className="feature-text">
                Add
                <br /> Favorite Food
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
      {/* End of Feature Section */}

      {/* Footer Section */}
      <Footer />
      {/* End of Footer Section */}
    </>
  );
};

export default LandingPage;
