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
import FoodDetail from "./components/FoodDetail/FoodDetail";
import AddFood from "./components/AddFood/AddFood";
import PageError from "./components/PageError/PageError";

import reportWebVitals from "./reportWebVitals";

const noAuth = ["/", "/foods", "/login", "/register", "/detail"];

const auth = {
  noAuth: (Component) => {
    return <Component />;
  },
  login: (Component) => {
    const isLogin = localStorage.getItem("id") ? true : false;

    if (isLogin || noAuth.includes(window.location.pathname)) {
      return <Component />;
    } else {
      const isLoginPage = window.location.pathname === "/login";
      if (isLoginPage) {
        return <LoginPage />;
      } else {
        alert("You have to sign in to access this page!");
        window.location.assign("/login");
      }
    }
  },
  admin: (Component) => {
    const isLogin = localStorage.getItem("id") ? true : false;
    const isAdmin = localStorage.getItem("role") == "admin" ? true : false;
    if (isLogin && isAdmin) {
      return <Component />;
    } else {
      return <PageError />;
    }
  },
};

const router = createBrowserRouter([
  {
    path: "/", // No Authentication Needed
    element: auth.noAuth(LandingPage),
    errorElement: <PageError />,
  },
  {
    path: "/foods", // No Authentication Needed
    element: auth.noAuth(FoodList),
    errorElement: <PageError />,
  },
  {
    path: "/favorite", // Need to Login
    element: auth.login(MyFavorite),
    errorElement: <PageError />,
  },
  {
    path: "/login", // No Authentication Needed
    element: auth.noAuth(LoginPage),
    errorElement: <PageError />,
  },
  {
    path: "/register", // No Authentication Needed
    element: auth.noAuth(RegisterPage),
    errorElement: <PageError />,
  },
  {
    path: "/profile", // Need to Login
    element: auth.login(Profile),
    errorElement: <PageError />,
  },
  {
    path: "/all-user", // Need to Login and Have admin role
    element: auth.admin(AllUser),
    errorElement: <PageError />,
  },
  {
    path: "/detail", // No Authentication Needed
    element: auth.noAuth(FoodDetail),
    errorElement: <PageError />,
  },
  {
    path: "/add-food", // Need to Login and Have admin role
    element: auth.admin(AddFood),
    errorElement: <PageError />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
