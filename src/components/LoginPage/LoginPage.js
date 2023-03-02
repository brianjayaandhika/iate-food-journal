import "./LoginPage.css";

import Header from "../Header/Header";

import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginPage = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const formErrorStyle = { color: "red", fontSize: "16px" };

  // Handle Show Password
  const handleShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  // Formik Login
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/login`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
        data: {
          email: values.email,
          password: values.password,
        },
      })
        .then((response) => {
          localStorage.setItem("name", response.data.user.name);
          localStorage.setItem("id", response.data.user.id);
          localStorage.setItem("role", response.data.user.role);
          localStorage.setItem("token", response.data.token);
          alert("You have signed in!");
          window.location.assign("/");
        })
        .catch(() => {
          alert("Invalid Email or Password");
        });
    },
  });

  return (
    <>
      <div className="login-section pb-2 pt-2">
        <Header />
        <div className="login-regist-area">
          <div className="login-bubble m-auto mb-5">
            <h1>
              <a href="/" className="login-brand pb-2">
                iAte
              </a>
            </h1>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-1" controlId="email">
                <Form.Label className="login-label">Email</Form.Label>
                <Form.Control placeholder="Enter Email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                <Form.Text style={formErrorStyle}>{formik.touched.email && formik.errors.email}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-4" controlId="password">
                <Form.Label className="login-label">Password</Form.Label>
                <Form.Control type={passwordShown ? "text" : "password"} placeholder="Enter Password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                <Form.Text style={formErrorStyle}>{formik.touched.password && formik.errors.password}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check className="login-label" type="checkbox" label="Show Password" onClick={handleShowPassword} />
              </Form.Group>

              <Button disabled={!formik.isValid} type="submit" className="login-btn btn-success">
                Sign In
              </Button>
            </Form>
            <span className="regist-text mt-4 pb-3">
              Are you new?
              <a className="regist-link" href="/register">
                Sign Up
              </a>
              here
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
