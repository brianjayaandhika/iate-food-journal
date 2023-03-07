import "./AddFood.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";

const AddFood = () => {
  const jwtToken = localStorage.getItem("token");
  const formErrorStyle = { color: "red", fontSize: "12px", padding: "0", margin: "0" };

  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  // Add new ingredients
  const handleAddNew = (event) => {
    event.preventDefault();
    if (newIngredient) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient("");
    } else {
      alert("Someting wong");
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

  // Add Food Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      imageUrl: "",
      ingredients: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      imageUrl: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/create-food`,
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
          alert("Your food has been successfully added!");
          window.location.assign("/foods");
        })
        .catch((error) => {
          alert("Something wrong happened!");
          console.log(error);
        });
    },
  });

  return (
    <>
      <div className="addFood-section pb-2 pt-2">
        <Header />
        <div className="addFood-area">
          <div className="addFood-bubble  m-auto mb-5">
            <h1 className="login-title">Add Food</h1>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="name" className="addFood-group mb-2">
                <Form.Label className="addFood-label">Name</Form.Label>
                <Form.Control placeholder="Food Name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
                <Form.Text style={formErrorStyle}>{formik.touched.name && formik.errors.name}</Form.Text>
              </Form.Group>

              <Form.Group controlId="description" className="addFood-group mb-2">
                <Form.Label className="addFood-label">Description</Form.Label>
                <Form.Control placeholder="Food Description" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description} />
                <Form.Text style={formErrorStyle}>{formik.touched.description && formik.errors.description}</Form.Text>
              </Form.Group>

              <Form.Group controlId="imageUrl" className="addFood-group mb-2">
                <Form.Label className="register-label">Image Url</Form.Label>
                <Form.Control type="text" placeholder="Image Url" onChange={formik.handleChange} value={formik.values.imageUrl} />
              </Form.Group>

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

              <Button type="submit" disabled={!formik.isValid} className="btn-success m-auto d-flex mt-4">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AddFood;
