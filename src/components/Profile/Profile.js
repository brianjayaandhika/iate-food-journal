import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Profile.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FaPhone, FaUserEdit, FaMailBulk } from "react-icons/fa";

import profile from "../../images/profile.jpg";

const Profile = () => {
  const [allUser, setAllUser] = useState([]);
  const [specificUser, setSpecificUser] = useState([]);
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

  const getSpecificUser = () => {
    setSpecificUser(allUser.find((user) => user.id == localStorage.getItem("id")));
  };

  useEffect(() => {
    getAllUser();

    if (!isLoading) {
      getSpecificUser();
      console.log(specificUser);
    }
  }, [isLoading]);

  return (
    <>
      <div className="profile-section">
        <Header />

        {/* Taken from LandingPage - Favorite Section */}
        <div className="profile-section pt-4 pb-5">
          <h1 className="profile-title mb-5 pt-3">My Profile</h1>
          <div className="profile-card">
            <div class="profile-card-top-section">
              <p className="profile-id text-capitalize">#{specificUser.id}</p>
            </div>
            <div class="profile-card-bottom-section">
              <img
                className="profile-img p-1 mb-3"
                src={specificUser.profilePictureUrl || profile}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = profile;
                }}
                alt="profilePicture"
              />
              <p className="profile-name">{specificUser.name}</p>
              <p className="profile-desc">
                <FaMailBulk className="profile-icons me-2" />
                {specificUser.email}
              </p>
              <p className="profile-desc">
                <FaPhone className="profile-icons me-2" />
                {specificUser.phoneNumber}
              </p>
              <p className="profile-desc text-capitalize">
                <FaUserEdit className="profile-icons me-2" />
                {specificUser.role} account
              </p>
            </div>
          </div>
          <Button className="btn-success d-flex m-auto mt-4">Edit Profile</Button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
