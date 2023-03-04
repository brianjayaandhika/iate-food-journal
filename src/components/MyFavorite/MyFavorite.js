import "./MyFavorite.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { FaStar, FaHeart } from "react-icons/fa";

const MyFavorite = () => {
  const [likedFoods, setLikedFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleLike, setToggleLike] = useState(false);

  const jwtToken = localStorage.getItem("token");

  // Get All Foods
  const getFoodList = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/like-foods`,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((response) => {
        setLikedFoods(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
        setToggleLike((prevState) => !prevState);
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
        setToggleLike((prevState) => !prevState);
      })
      .catch(() => {
        alert("You have to login to use this feature!");
      });
  };

  // onClick for food details
  const onClickDetails = (food) => {
    window.location.assign(`/detail?foodId=${food.id}`);
  };

  useEffect(() => {
    getFoodList();
  }, [toggleLike]);

  return (
    <>
      <div className="favorite-section">
        <Header />

        {/* Taken from LandingPage - Favorite Section */}
        <div className="foodlist-section pt-4 pb-5" style={likedFoods.length > 0 ? { marginBottom: "50px" } : { height: "70vh" }}>
          <Container>
            <h1 className="foodlist-title mb-5 pt-3">My Favorites</h1>
            {likedFoods.length > 0 ? (
              <Row className="foodlist-row g-1">
                {likedFoods.map((food, i) => {
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
                      <img src={food.imageUrl} onClick={() => onClickDetails(food)} className="foodlist-img " />
                      <p className="foodlist-text">{food.name}</p>
                      <div className="foodlist-rates mb-3">
                        <span className="foodlist-rates-text">
                          <FaStar style={{ color: "gold" }} /> {food.rating}
                        </span>
                        <span className="foodlist-rates-text">
                          <FaHeart
                            className="foodlist-heart-icon"
                            style={!food.isLike ? { color: "grey" } : { color: "red" }}
                            onClick={() => {
                              food.isLike ? handleUnlikeButton(food) : handleLikeButton(food);
                            }}
                          />
                          {food.totalLikes}
                        </span>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <p className="favorite-text">
                You have no liked foods! <br /> Explore more foods on <br />
                <a href="/foods" className="regist-link">
                  Food List
                </a>
              </p>
            )}
          </Container>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyFavorite;
