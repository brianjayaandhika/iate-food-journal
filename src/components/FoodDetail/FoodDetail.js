import "./FoodDetail.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { FaHeart, FaStar, FaPencilAlt, FaArrowCircleLeft, FaEdit } from "react-icons/fa";
import { RiShoppingBasketFill } from "react-icons/ri";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const FoodDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [food, setFood] = useState([]);
  const foodId = searchParams.get("foodId");
  const jwtToken = localStorage.getItem("token");

  const [toggleLike, setToggleLike] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const formErrorStyle = { color: "red", fontSize: "14px", padding: "0", margin: "0" };

  // States for Modal
  // Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  // Review Modal
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleCloseReviewModal = () => setShowReviewModal(false);
  const handleShowReviewModal = () => setShowReviewModal(true);

  // Get food by ID
  function getFoodDetail() {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/foods/${foodId}`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer ${process.env.REACT_APP_JWTTOKEN}`,
      },
    })
      .then((response) => {
        setFood(response.data.data);
        setIsLoading(false);
        // console.log(food);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // handle isLogin
  const handleLogin = () => {
    localStorage.getItem("name") ? setIsLogin(true) : setIsLogin(false);
  };

  // handle isAdmin
  const handleRole = () => {
    localStorage.getItem("role") == "admin" ? setIsAdmin(true) : setIsAdmin(false);
  };

  // Like Button
  const handleLikeButton = (food) => {
    const foodId = food.id;
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/like`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        foodId: foodId,
      },
    })
      .then(function (response) {
        setToggleLike((prevState) => !prevState);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Unlike Button
  const handleUnlikeButton = (food) => {
    const foodId = food.id;
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/unlike`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        foodId: foodId,
      },
    })
      .then(function (response) {
        setToggleLike((prevState) => !prevState);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getFoodDetail();
    handleLogin();
    handleRole();
  }, [toggleLike]);

  // Formik Update Data
  const formik = useFormik({
    initialValues: {
      name: food.name,
      description: food.description,
      imageUrl: food.imageUrl,
      ingredients: food.ingredients,
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      description: Yup.string(),
      ingredients: Yup.string(),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/update-food/${foodId}`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
          Authorization: `Bearer ${jwtToken}`,
        },
        data: {
          name: values.name,
          description: values.description,
          imageUrl: values.imageUrl,
          ingredients: values.ingredients,
        },
      })
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  return (
    <>
      <div className="detail-section">
        <Header />

        <h1 className="detail-food-name pt-3 pb-5 text-capitalize ">
          <a href="/foods" className="detail-back-to-foods ">
            <FaArrowCircleLeft />
          </a>
          {food.name}
        </h1>
        <div className="detail-food-area">
          <Container className="detail-container">
            <Row name="description-section">
              <Col md={12} lg={6} className="detail-food-left pb-5 pb-lg-0 ">
                <img className="detail-food-img" src={food.imageUrl} alt="food" />
              </Col>
              <Col md={12} lg={5} className="detail-food-right align-items-xl-start align-items-center ms-lg-5 ">
                <p className="detail-food-desc text-capitalize text-center text-lg-start">{food.description}</p>
                <p className="detail-food-stats desc-ingredients text-capitalize">
                  <RiShoppingBasketFill className="detail-ingredients-icon " /> {!isLoading ? food.ingredients.join(", ") : null}
                </p>
                <p className="detail-food-stats">
                  Created at: {food.createdAt}
                  <br />
                  Updated at: {food.updatedAt}
                </p>
                <div className="detail-icons-group">
                  <span className="detail-icons-text">
                    <FaHeart
                      className="detail-icons detail-heart-icon"
                      style={!food.isLike ? { color: "grey" } : { color: "red" }}
                      onClick={() => {
                        food.isLike ? handleUnlikeButton(food) : handleLikeButton(food);
                      }}
                    />
                    {food.totalLikes}
                  </span>
                  <span className="detail-icons-text">
                    <FaStar className="detail-icons " style={{ color: "yellow" }} /> {food.rating}
                  </span>
                </div>
                <div className="detail-btn-group">
                  {/* Leave Review Modal */}

                  {isLogin ? (
                    <Button className="btn-success detail-btn mt-5" onClick={handleShowReviewModal}>
                      <FaPencilAlt /> Leave a Review!
                    </Button>
                  ) : null}

                  <Modal show={showReviewModal} onHide={handleCloseReviewModal} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>I will not close if you click outside me. Don't even try to press escape key.</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseReviewModal}>
                        Close
                      </Button>
                      <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                  </Modal>

                  {/* Edit Food Modal */}

                  {isAdmin ? (
                    <Button className="btn-success detail-btn mt-5" onClick={handleShowEditModal}>
                      <FaEdit /> Edit Food!
                    </Button>
                  ) : null}

                  <Modal show={showEditModal} onHide={handleCloseEditModal} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Food - {food.name}</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                      <Modal.Body>
                        {/* name */}
                        <Form.Group className="mb-1" controlId="name">
                          <Form.Label className="detail-label">Food Name</Form.Label>
                          <Form.Control type="text" placeholder={food.name} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
                          <Form.Text style={formErrorStyle}>{formik.touched.name && formik.errors.name}</Form.Text>
                        </Form.Group>

                        {/* description */}
                        <Form.Group className="mb-1" controlId="description">
                          <Form.Label className="detail-label">Food Description</Form.Label>
                          <Form.Control type="text" placeholder={food.description} onBlur={formik.handleBlur} onChange={formik.handleChange} value={food.description} />
                          <Form.Text style={formErrorStyle}>{formik.touched.description && formik.errors.description}</Form.Text>
                        </Form.Group>

                        {/* ImageUrl */}
                        <Form.Group controlId="imageUrl" className="mb-3">
                          <Form.Label className="detail-label">Upload Food Image (JPG, JPEG, PNG)</Form.Label>
                          <Form.Control type="file" onChange={formik.handleChange} value={formik.values.imageUrl} />
                        </Form.Group>

                        {/* Ingredients */}
                        <Form.Group controlId="ingredients" className="mb-3">
                          <Form.Label className="detail-label">Food Ingredients</Form.Label>
                          <ul></ul>
                          <Form.Control type="text" onChange={formik.handleChange} value={formik.values.ingredients} />
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModal}>
                          Close
                        </Button>
                        <Button className="btn-success" type="submit">
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FoodDetail;
