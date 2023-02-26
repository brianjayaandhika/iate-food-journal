import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import LandingPage from "./components/LandingPage/LandingPage";
import FoodList from "./components/FoodList/FoodList";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import MyFavorite from "./components/MyFavorite/MyFavorite";
import Profile from "./components/Profile/Profile";
import AllUser from "./components/AllUser/AllUser";

import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <p>Page Not Found</p>,
  },
  {
    path: "/foods",
    element: <FoodList />,
    errorElement: <p>Page Not Found</p>,
  },
  {
    path: "/favorite",
    element: <MyFavorite />,
    errorElement: <p>Page Not Found</p>,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <p>Page Not Found</p>,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <p>Page Not Found</p>,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <p>Page Not Found</p>,
  },
  {
    path: "/all-user",
    element: <AllUser />,
    errorElement: <p>Page Not Found</p>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
