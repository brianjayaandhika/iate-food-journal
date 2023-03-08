import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Profile.css";

import { useState, useEffect, useCallback } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaPhone, FaUserEdit, FaMailBulk } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import profile from "../../images/profile.jpg";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const jwtToken = localStorage.getItem("token");

  // For Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formErrorStyle = { color: "red", fontSize: "14px", padding: "0", margin: "0" };

  // Formik Edit Profile
  const formik = useFormik({
    initialValues: {
      name: userData.name,
      email: userData.email,
      profilePictureUrl: userData.profilePictureUrl,
      phoneNumber: userData.phoneNumber,
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      email: Yup.string().email("Invalid email address"),
      profilePictureUrl: Yup.string(),
      phoneNumber: Yup.string()
        .matches(/^[0-9]*$/, "Must be a number")
        .min(8, "Must be 8 charaters or more")
        .max(12, "Must be 12 characters or less"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/update-profile`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
          Authorization: `Bearer ${jwtToken}`,
        },
        data: {
          name: values.name,
          email: values.email,
          profilePictureUrl: values.profilePictureUrl,
          phoneNumber: values.phoneNumber,
        },
      })
        .then(() => {
          localStorage.setItem("name", values.name);
          alert("Changes has been successfully made!");
          window.location.assign("/profile");
        })
        .catch((error) => {
          alert("Something wrong happened!");
          console.log(error);
        });
    },
  });

  // Get User Data
  const getUserData = useCallback(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/user`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        setUserData(response.data.user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [jwtToken]);

  useEffect(() => {
    if (!isLoading) {
      if (Object.keys(userData).length) {
        formik.setFieldValue("name", userData.name);
        formik.setFieldValue("email", userData.email);
        formik.setFieldValue("phoneNumber", userData.phoneNumber);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, userData]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <>
      <div className="profile-section">
        <Header />

        {!isLoading ? (
          <>
            <div className="profile-section pt-4 pb-5">
              <h1 className="profile-title mb-5 pt-3">My Profile</h1>
              <div className="profile-card">
                <div className="profile-card-top-section">
                  <p className="profile-id text-capitalize">#{userData.id}</p>
                </div>
                <div className="profile-card-bottom-section">
                  <img
                    className="profile-img p-1 mb-3"
                    src={userData.profilePictureUrl || profile}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = profile;
                    }}
                    alt="profilePicture"
                  />
                  <p className="profile-name">{userData.name}</p>
                  <p className="profile-desc">
                    <FaMailBulk className="profile-icons me-2" />
                    {userData.email}
                  </p>
                  <p className="profile-desc">
                    <FaPhone className="profile-icons me-2" />
                    {userData.phoneNumber}
                  </p>
                  <p className="profile-desc text-capitalize">
                    <FaUserEdit className="profile-icons me-2" />
                    {userData.role} account
                  </p>
                </div>
              </div>
              <Button className="btn-success d-flex m-auto mt-4" onClick={handleShow}>
                Edit Profile
              </Button>

              <Modal show={show} centered onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="profile-modal">
                  <img
                    className="profile-modal-img p-1 mb-3"
                    src={userData.profilePictureUrl || profile}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = profile;
                    }}
                    alt="profilePicture"
                  />

                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="name">
                      <Form.Label className="register-label">Name</Form.Label>
                      <Form.Control placeholder="Enter Name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
                      <Form.Text style={formErrorStyle}>{formik.touched.name && formik.errors.name}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="email">
                      <Form.Label className="register-label">Email</Form.Label>
                      <Form.Control placeholder="Enter Email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                      <Form.Text style={formErrorStyle}>{formik.touched.email && formik.errors.email}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="phoneNumber">
                      <Form.Label className="register-label">Phone Number</Form.Label>
                      <Form.Control placeholder="Enter Phone Number" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phoneNumber} />
                      <Form.Text style={formErrorStyle}>{formik.touched.phoneNumber && formik.errors.phoneNumber}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="profilePictureUrl" className="mb-5">
                      <Form.Label className="register-label">Profile Picture (Url)</Form.Label>
                      <Form.Control type="text" placeholder="Image Url" onChange={formik.handleChange} value={formik.values.profilePictureUrl} />
                    </Form.Group>
                    <Button className="btn-success profile-modal-btn" type="submit">
                      Save Changes
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>
          </>
        ) : (
          <div style={{ height: "100vh", backgroundColor: "black" }}></div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Profile;
