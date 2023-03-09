import "./FoodDetail.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import profile from "../../images/profile.jpg";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { FaHeart, FaStar, FaPencilAlt, FaArrowCircleLeft, FaEdit, FaPlus, FaTimes, FaTrashAlt } from "react-icons/fa";
import { RiShoppingBasketFill } from "react-icons/ri";
import { Container, Row, Col, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment/moment";

const FoodDetail = () => {
  const [searchParams] = useSearchParams();

  const [food, setFood] = useState([]);
  const [review, setReview] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  const [isLike, setIsLike] = useState();
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
    localStorage.getItem("role") === "admin" ? setIsAdmin(true) : setIsAdmin(false);
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
        setIsLike((prevState) => !prevState);
      })
      .catch(() => {
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
        setIsLike((prevState) => !prevState);
      })
      .catch(() => {
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

  // Add new ingredients
  const handleAddNew = (event) => {
    event.preventDefault();
    if (newIngredient) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient("");
    } else {
      alert("Something Wrong Happened!");
    }
  };

  const handleInput = (ingredient) => {
    setNewIngredient(ingredient);
  };

  // Handle Delete Ingredients
  const handleDeleteButton = (index) => {
    const updatedArray = [...ingredients];
    updatedArray.splice(index, 1);
    setIngredients(updatedArray);
  };

  // Formik Update Food
  const updateFood = useFormik({
    initialValues: {
      name: "",
      description: "",
      imageUrl: "",
      ingredients: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      imageUrl: Yup.string().url("Invalid URL").required("Required"),
      ingredients: Yup.array().of(Yup.string()),
    }),
    onSubmit: (values) => {
      if (window.confirm("Are you sure? The changes you make will be saved in the system and cannot be undone.")) {
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
            ingredients: ingredients,
          },
        })
          .then(() => {
            alert("Changes have been successfully made!");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  });

  // Get food and food review by ID
  const getFoodDetail = useCallback(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/foods/${foodId}`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer ${jwtToken || process.env.REACT_APP_JWTTOKEN}`,
      },
    })
      .then((response) => {
        setFood(response.data.data);
        setIngredients(response.data.data.ingredients);
        setIsLike(response.data.data.isLike);

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
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

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
    if (!isLoading) {
      if (Object.keys(food).length) {
        updateFood.setFieldValue("name", food.name);
        updateFood.setFieldValue("description", food.description);
        updateFood.setFieldValue("imageUrl", food.imageUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, food]);

  useEffect(() => {
    getFoodDetail();

    handleRole();
    handleLogin();
  }, [getFoodDetail, foodId, isLike]);

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
        <div className="detail-food-area pb-5">
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
                  Created at: {moment(food.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  <br />
                  Updated at: {moment(food.updatedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </p>
                <div className="detail-icons-group">
                  <span className="detail-icons-text">
                    <FaHeart
                      className="foodlist-heart-icon"
                      style={!isLike ? { color: "grey" } : { color: "red" }}
                      onClick={() => {
                        isLike ? handleUnlikeButton(food) : handleLikeButton(food);
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
                      <Modal.Title>Food Review</Modal.Title>
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
                                  size={window.innerWidth > "420px" ? 48 : 36}
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
                          <Form.Control
                            className="detail-review-control m-auto"
                            as="textarea"
                            placeholder="Tell us what you think about the food!"
                            onBlur={addReview.handleBlur}
                            onChange={addReview.handleChange}
                            value={addReview.values.review}
                          />
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

                  <Modal show={showEditModal} onHide={handleCloseEditModal} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Food - {food.name}</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={updateFood.handleSubmit}>
                      <Modal.Body>
                        {/* name */}
                        <Form.Group controlId="name" className="updateFood-group mb-2">
                          <Form.Label className="detail-review-label">Name</Form.Label>
                          <Form.Control type="text" onBlur={updateFood.handleBlur} onChange={updateFood.handleChange} value={updateFood.values.name} />
                          <Form.Text style={formErrorStyle}>{updateFood.touched.name && updateFood.errors.name}</Form.Text>
                        </Form.Group>

                        {/* description */}
                        <Form.Group controlId="description" className="updateFood-group mb-2">
                          <Form.Label className="detail-review-label">Description</Form.Label>
                          <Form.Control type="text" onBlur={updateFood.handleBlur} onChange={updateFood.handleChange} value={updateFood.values.description} />
                          <Form.Text style={formErrorStyle}>{updateFood.touched.description && updateFood.errors.description}</Form.Text>
                        </Form.Group>

                        {/* ImageUrl */}
                        <Form.Group controlId="imageUrl" className="updateFood-group mb-2">
                          <Form.Label className="detail-review-label">Image Url</Form.Label>
                          <Form.Control type="text" placeholder="Image Url" onChange={updateFood.handleChange} value={updateFood.values.imageUrl} />
                          <Form.Text style={formErrorStyle}>{updateFood.touched.imageUrl && updateFood.errors.imageUrl}</Form.Text>
                        </Form.Group>

                        {/* Ingredients */}
                        <Form.Group controlId="ingredients" className="addFood-group mb-2">
                          <Form.Label className="addFood-label">Ingredients</Form.Label>

                          <InputGroup className="mb-2">
                            <Form.Control
                              placeholder="Add Ingredients"
                              value={newIngredient}
                              onChange={(e) => {
                                handleInput(e.target.value);
                              }}
                            />
                            <Button className="btn-success addFood-ingredients-btn" onClick={handleAddNew}>
                              <FaPlus className="AddFood-ingredients-icon" />
                            </Button>
                          </InputGroup>
                          <Form.Text style={formErrorStyle}>{updateFood.touched.ingredients && updateFood.errors.ingredients}</Form.Text>

                          {ingredients.length === 0 ? null : (
                            <ul style={{ listStyleType: "none", paddingLeft: "0" }} className="addFood-ingredients-area">
                              {ingredients.map((e, i) => {
                                return (
                                  <li key={i}>
                                    <InputGroup className="mb-2">
                                      <Form.Control value={ingredients[i]} readOnly />
                                      <Button
                                        className="btn-danger addFood-ingredients-btn"
                                        onClick={() => {
                                          handleDeleteButton(i);
                                        }}
                                      >
                                        <FaTimes className="AddFood-ingredients-icon" key={i} />
                                      </Button>
                                    </InputGroup>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </Form.Group>

                        <Button className="btn-success mt-4 d-flex m-auto" type="submit">
                          Save Changes
                        </Button>
                      </Modal.Body>
                    </Form>
                  </Modal>

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
