import "./FoodList.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { FaStar, FaHeart } from "react-icons/fa";

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  // Get All Foods
  const getFoodList = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/foods`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_JWTTOKEN}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then(function (response) {
        setFoods(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // // Like Button
  // const handleLikeButton = (foodId) => {
  //   axios({
  //     method: "post",
  //     url: `${process.env.REACT_APP_BASEURL}/api/v1/like`,
  //     headers: {
  //       apiKey: `${process.env.REACT_APP_APIKEY}`,
  //       Authorization: `Bearer ${process.env.REACT_APP_JWTTOKEN}`,
  //     },
  //     body: {
  //       foodId: foodId,
  //     },
  //   });
  // };

  // // Unlike Button
  // const handleUnlikeButton = () => {
  //   axios({
  //     method: "post",
  //     url: `${process.env.REACT_APP_BASEURL}/api/v1/unlike`,
  //     headers: {
  //       apiKey: `${process.env.REACT_APP_APIKEY}`,
  //       Authorization: `Bearer ${process.env.REACT_APP_JWTTOKEN}`,
  //     },
  //   });
  // };

  useEffect(() => {
    getFoodList();
  }, []);

  return (
    <>
      <div className="foodlist-section">
        <Header />

        {/* Taken from LandingPage - Favorite Section */}
        <div className="foodlist-section pt-4 pb-5">
          <Container>
            <h1 className="foodlist-title mb-5 pt-3">Our Recipes</h1>
            <Row className="foodlist-row g-1">
              {foods.map((food, i) => {
                return (
                  <Col
                    key={i}
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                    xl={4}
                    xxl={3}
                    className="d-flex flex-column align-items-center
                 mb-md-4 mb-4 foodlist-col"
                  >
                    <img src={food.imageUrl} className="foodlist-img " />
                    <p className="foodlist-text">{food.name}</p>
                    <div className="foodlist-rates mb-3">
                      <span className="foodlist-rates-text">
                        <FaStar style={{ color: "gold" }} /> {food.rating}
                      </span>
                      <span className="foodlist-rates-text">
                        <FaHeart className="foodlist-heart-icon" style={{ color: "red" }} />
                        {food.totalLikes}
                      </span>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FoodList;
