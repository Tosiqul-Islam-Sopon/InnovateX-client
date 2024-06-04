import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./Pages/ShareAll/ErrorPage";
import Root from "./Layouts/Root/Root";
import Home from "./Pages/User/Home/HomePage/Home";
import Login from "./Pages/ShareAll/Authentication/Login";
import Register from "./Pages/ShareAll/Authentication/Register";
import AuthProvider from "./Providers/AuthProvider";
import Products from "./Pages/User/Products/Products";
import Dashboard from "./Layouts/Dashboard/Dashboard";
import Profile from "./Pages/User/Profile/Profile";
import AddProduct from "./Pages/User/AddProduct/AddProduct";
import MyProducts from "./Pages/User/MyProducts/MyProducts";
import Modal from 'react-modal';
import Payment from "./Pages/User/Profile/Payment";

Modal.setAppElement('#root');

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/registration",
        element: <Register></Register>
      },
      {
        path: "/products",
        element: <Products></Products>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [

      // user dashboard routes
      {
        path: "profile",
        element: <Profile></Profile>
      },
      {
        path: "addProduct",
        element: <AddProduct></AddProduct>
      },
      {
        path: "myProducts",
        element: <MyProducts></MyProducts>
      },
      {
        path: "payment",
        element: <Payment></Payment>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);