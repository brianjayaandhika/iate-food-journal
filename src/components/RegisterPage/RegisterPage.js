import "./RegisterPage.css";

import Header from "../Header/Header";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RegisterPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const formErrorStyle = { color: "red", fontSize: "14px", padding: "0", margin: "0" };

  // Formik Login
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
      profilePictureUrl: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(8, "Must be 8 characters or more").required("Required"),
      passwordRepeat: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]*$/, "Must be a number")
        .min(8, "Must be 8 charaters or more")
        .max(12, "Must be 12 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/register`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          passwordRepeat: values.passwordRepeat,
          role: values.role,
          profilePictureUrl: values.profilePictureUrl,
          phoneNumber: values.phoneNumber,
        },
      })
        .then(() => {
          alert("You have registered!");
          window.location.assign("/login");
        })
        .catch(() => {
          alert("Something wrong happened!");
        });
    },
  });

  return (
    <>
      <div className="register-section pb-2 pt-2">
        <Header />
        <div className="register-regist-area">
          <div className="register-bubble m-auto">
            <h1>
              <a href="/" className="register-brand pb-2">
                iAte
              </a>
            </h1>

            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col>
                  {/* Name */}
                  <Form.Group controlId="name">
                    <Form.Label className="register-label">Name</Form.Label>
                    <Form.Control placeholder="Enter Name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
                    <Form.Text style={formErrorStyle}>{formik.touched.name && formik.errors.name}</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  {/* Email */}
                  <Form.Group controlId="email">
                    <Form.Label className="register-label">Email</Form.Label>
                    <Form.Control placeholder="Enter Email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                    <Form.Text style={formErrorStyle}>{formik.touched.email && formik.errors.email}</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* Password */}
                  <Form.Group controlId="password">
                    <Form.Label className="register-label">Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                    <Form.Text style={formErrorStyle}>{formik.touched.password && formik.errors.password}</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  {/* Confirm Password */}
                  <Form.Group controlId="passwordRepeat">
                    <Form.Label className="register-label">Confirm Password</Form.Label>
                    <Form.Control placeholder="Confirm Password" type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.passwordRepeat} />
                    <Form.Text style={formErrorStyle}>{formik.touched.passwordRepeat && formik.errors.passwordRepeat}</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* Phone */}
                  <Form.Group controlId="phoneNumber">
                    <Form.Label className="register-label">Phone Number</Form.Label>
                    <Form.Control placeholder="Enter Phone Number" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phoneNumber} />
                    <Form.Text style={formErrorStyle}>{formik.touched.phoneNumber && formik.errors.phoneNumber}</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  {/* Role */}
                  <Form.Group controlId="role">
                    <Form.Label className="register-label">Role</Form.Label>
                    <Form.Select aria-label="Select Role" onChange={formik.handleChange} value={formik.values.role}>
                      <option>Select Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Profile Picture */}
              <Form.Group controlId="profilePictureUrl" className="mb-3">
                <Form.Label className="register-label">Profile Picture (JPG, JPEG, PNG)</Form.Label>
                <Form.Control type="file" onChange={formik.handleChange} value={formik.values.profilePictureUrl} />
              </Form.Group>

              <Button disabled={!formik.isValid} type="submit" className="login-btn btn-success">
                Sign Up
              </Button>
            </Form>

            <span className="regist-text mt-4 pb-3">
              Already have an account?
              <a className="regist-link" href="/login">
                Sign In
              </a>
              here
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
