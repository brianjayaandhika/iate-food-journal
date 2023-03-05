import "./FoodDetail.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import profile from "../../images/profile.jpg";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { FaHeart, FaStar, FaPencilAlt, FaArrowCircleLeft, FaEdit, FaPlus, FaTimes, FaTrashAlt } from "react-icons/fa";
import { RiShoppingBasketFill } from "react-icons/ri";
import { Container, Row, Col, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const FoodDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [food, setFood] = useState([]);
  const [review, setReview] = useState([]);
  const [foodIngredient, setFoodIngredient] = useState([]);

  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const foodId = searchParams.get("foodId");
  const jwtToken = localStorage.getItem("token");
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

  // handle isLogin
  const handleLogin = () => {
    localStorage.getItem("name") ? setIsLogin(true) : setIsLogin(false);
  };

  // handle isAdmin
  const handleRole = () => {
    localStorage.getItem("role") == "admin" ? setIsAdmin(true) : setIsAdmin(false);
  };

  // Get food and food review by ID
  const getFoodDetail = () => {
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
        setFoodIngredient(response.data.data.ingredients);
        // console.log(response.data.data.isLike);
        updateFood.setFieldValue("name", food.name);
        updateFood.setFieldValue("description", food.description);
        updateFood.setFieldValue("phoneNumber", food.imageUrl);
        updateFood.setFieldValue("ingredients", food.ingredients);

        axios({
          method: "get",
          url: `${process.env.REACT_APP_BASEURL}/api/v1/food-rating/${foodId}`,
          headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
          },
        })
          .then((response) => {
            setReview(response.data.data);
            setIsLoading(false);
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
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
      .then(() => {
        setIsLiked(food.isLike);
        // console.log(food.isLike);
      })
      .catch((error) => {
        alert("You have to login to use this feature!");
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
      .then(() => {
        setIsLiked(food.isLike);
        // console.log(food.isLike);
      })
      .catch((error) => {
        alert("You have to login to use this feature!");
      });
  };

  // States for Food Review (stars)
  const stars = Array(5).fill(0);

  const [rating, setRating] = useState("");
  const [hover, setHover] = useState(null);

  // Formik Add Review
  const addReview = useFormik({
    initialValues: {
      rating: "",
      review: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number(),
      review: Yup.string().required(),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/rate-food/${foodId}`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
          Authorization: `Bearer ${jwtToken}`,
        },
        data: {
          rating: rating,
          review: values.review,
        },
      })
        .then(() => {
          alert("Review has been submitted");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  // Add Review Submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addReview.submitForm();
  };

  // Formik Update Food
  const updateFood = useFormik({
    initialValues: {
      name: "",
      description: "",
      imageUrl: "",
      ingredients: "",
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
        .then()
        .catch((error) => {
          console.log(error);
        });
    },
  });

  // // Add and Delete ingredients function
  // const addIngredients = () => {};

  // Delete Food
  const handleDeleteFood = () => {
    if (window.confirm("Are you sure you want to delete this food? This change cannot be undone!")) {
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/delete-food/${foodId}`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then(() => {
          alert(`${food.name.toUpperCase()} has been deleted.`);
          window.location.assign("/foods");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getFoodDetail();
    // console.log(food.isLike);

    handleRole();
    handleLogin();
  }, [foodId, isLiked]);

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
                      className="foodlist-heart-icon"
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

                <div className="detail-btn-group ">
                  {/* Leave Review Modal */}

                  {isLogin ? (
                    <Button className="btn-success detail-btn mt-5 me-3" onClick={handleShowReviewModal}>
                      <FaPencilAlt /> Leave a Review
                    </Button>
                  ) : null}

                  <Modal show={showReviewModal} onHide={handleCloseReviewModal} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Food Review - {food.name}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="details-review-modalbody">
                      <Form onSubmit={handleReviewSubmit}>
                        <img className="details-review-image" src={food.imageUrl} alt={food.name} />

                        {/* Form untuk rating bintang */}

                        <div className="details-review-star">
                          {stars.map((_, i) => {
                            const ratingValue = i + 1;

                            return (
                              <Form.Label key={i}>
                                <Form.Check
                                  className="detail-review-type"
                                  type="radio"
                                  name="rating"
                                  style={{ display: "none" }}
                                  value={ratingValue}
                                  onClick={() => {
                                    setRating(ratingValue);
                                  }}
                                ></Form.Check>
                                <FaStar
                                  className="detail-review-star-icon mt-4"
                                  color={ratingValue <= (hover || rating) ? "#ffff00" : "#333"}
                                  size={48}
                                  onMouseEnter={() => {
                                    setHover(ratingValue);
                                  }}
                                  onMouseLeave={() => {
                                    setHover(null);
                                  }}
                                />
                              </Form.Label>
                            );
                          })}
                        </div>

                        <Form.Group className="mb-1" controlId="review">
                          <Form.Label className="detail-review-label">Review</Form.Label>
                          <Form.Control className="detail-review-control" as="textarea" placeholder="Tell us what you think about the food!" onBlur={addReview.handleBlur} onChange={addReview.handleChange} value={addReview.values.review} />
                        </Form.Group>
                        <Button className="btn-success mt-4" type="submit">
                          Save Changes
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>

                  {/* Edit Food Modal */}

                  {isAdmin ? (
                    <Button className="btn-success detail-btn mt-5 me-3" onClick={handleShowEditModal}>
                      <FaEdit /> Edit Food
                    </Button>
                  ) : null}

                  <Form onSubmit={updateFood.handleSubmit}>
                    <Modal show={showEditModal} onHide={handleCloseEditModal} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Food - {food.name}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {/* name */}
                        <Form.Group className="mb-1" controlId="name">
                          <Form.Label className="detail-label">Food Name</Form.Label>
                          <Form.Control type="text" placeholder={food.name} onBlur={updateFood.handleBlur} onChange={updateFood.handleChange} value={updateFood.values.name} />
                          <Form.Text style={formErrorStyle}>{updateFood.touched.name && updateFood.errors.name}</Form.Text>
                        </Form.Group>

                        {/* description */}
                        <Form.Group className="mb-1" controlId="description">
                          <Form.Label className="detail-label">Food Description</Form.Label>
                          <Form.Control type="text" placeholder={food.description} onBlur={updateFood.handleBlur} onChange={updateFood.handleChange} value={food.description} />
                          <Form.Text style={formErrorStyle}>{updateFood.touched.description && updateFood.errors.description}</Form.Text>
                        </Form.Group>

                        {/* ImageUrl */}
                        <Form.Group controlId="imageUrl" className="mb-1">
                          <Form.Label className="detail-label">Upload Food Image (JPG, JPEG, PNG)</Form.Label>
                          <Form.Control type="file" onChange={updateFood.handleChange} value={updateFood.values.imageUrl} />
                        </Form.Group>

                        {/* Ingredients */}
                        <Form.Group controlId="ingredients" className="mb-3">
                          <Form.Label className="detail-label">Food Ingredients</Form.Label>
                          {foodIngredient.map((e, i) => {
                            return (
                              <InputGroup className="mb-3" key={i}>
                                <Form.Control readOnly type="text" onChange={updateFood.handleChange} value={e} className="mb-3" />

                                {/* times button */}
                                <Button className="detail-ingredients-button btn-danger icon-times ">
                                  <FaTimes className="detail-ingredients-icon " />
                                </Button>
                              </InputGroup>
                            );
                          })}

                          {/* Add new ingredients */}
                          <InputGroup className="mb-3">
                            <Form.Control type="text" onChange={updateFood.handleChange} value="test" className="mb-3" />

                            {/* plus button */}
                            <Button className="detail-ingredients-button btn-success icon-plus">
                              <FaPlus className="detail-ingredients-icon " />
                            </Button>

                            {/* times button */}
                            <Button className="detail-ingredients-button btn-danger icon-times ">
                              <FaTimes className="detail-ingredients-icon" />
                            </Button>
                          </InputGroup>
                        </Form.Group>

                        <Button className="btn-success mt-4" type="submit">
                          Save Changes
                        </Button>
                      </Modal.Body>
                    </Modal>
                  </Form>

                  {/* Delete Food */}

                  {isAdmin ? (
                    <Button className="btn-danger detail-btn mt-5" onClick={() => handleDeleteFood()}>
                      <FaTrashAlt /> Delete Food
                    </Button>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="detail-review-section">
        <h1 className="review-title mb-3 pb-2">Food Review</h1>
        {review.length > 0 ? (
          review.map((e, i) => {
            return (
              <div className="review-bubble mb-4" key={i}>
                <img
                  className="review-img"
                  src={e.user.profilePictureUrl || profile}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = profile;
                  }}
                  alt="profile"
                />
                <div className="review-text-group">
                  <p className="review-name">{e.user.name}</p>
                  <p className="review-comment">{e.review || "Comment Unavailable"}</p>
                </div>
                <p className="review-icon-text">
                  <FaStar className="review-icon" style={{ color: "yellow" }} /> {e.rating}
                </p>
              </div>
            );
          })
        ) : (
          <p style={{ color: "white", opacity: "0.8" }} className="mt-3">
            No review has been made on this food
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default FoodDetail;
