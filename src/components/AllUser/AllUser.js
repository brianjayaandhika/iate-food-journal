import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./AllUser.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhone, FaUserEdit, FaMailBulk } from "react-icons/fa";

import profile from "../../images/profile.jpg";

const AllUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get All User
  const getAllUser = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/all-user`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_JWTTOKEN}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((response) => {
        // console.log(response.data.data);
        setAllUser(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="alluser-section" style={!allUser.length > 0 ? { height: "100vh" } : { height: "100%" }}>
        <Header />

        {/* Taken from LandingPage - Favorite Section */}
        <div className="alluser-section pt-4 pb-5">
          <h1 className="alluser-title mb-5 pt-3">All User</h1>
          <div className="card-section">
            <Container>
              <Row xs={1} sm={2} md={3} lg={3} xl={3} xxl={4} className="card-group g-xl-4 gy-lg-4 gx-sm-1 gy-sm-4 gy-md-2 gx-md-5 g-4  ">
                {!isLoading
                  ? allUser.map((user, i) => {
                      return (
                        <Col key={i}>
                          <div className="alluser-card">
                            <div className="alluser-card-top-section">
                              <p className="alluser-id text-capitalize">#{user.id}</p>
                            </div>
                            <div className="alluser-card-bottom-section">
                              <img
                                className="alluser-img p-1 mb-3"
                                src={user.profilePictureUrl || profile}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = profile;
                                }}
                                alt="profilePicture"
                              />
                              <p className="alluser-name">{user.name}</p>
                              <p className="alluser-desc">
                                <FaMailBulk className="alluser-icons me-2" />
                                {user.email}
                              </p>
                              <p className="alluser-desc">
                                <FaPhone className="alluser-icons me-2" />
                                {user.phoneNumber}
                              </p>
                              <p className="alluser-desc text-capitalize">
                                <FaUserEdit className="alluser-icons me-2" />
                                {user.role} account
                              </p>
                            </div>
                          </div>
                        </Col>
                      );
                    })
                  : null}
              </Row>
            </Container>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AllUser;
