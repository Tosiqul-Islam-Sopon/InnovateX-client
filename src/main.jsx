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
import Payment from "./Pages/User/Profile/Payment";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import UpdateProduct from "./Pages/User/UpdateProduct/UpdateProduct";
import Statistics from "./Pages/Admin/Statistics/Statistics";
import ManageUsers from "./Pages/Admin/ManageUsers/ManageUsers";
import ManageCoupons from "./Pages/Admin/ManageCoupons/ManageCoupons";
import ProductReview from "./Pages/Modarator/ProductReview/ProductReview";
import ReportedContent from "./Pages/Modarator/ReportedContent/ReportedContent";
import ProductDetails from "./Pages/ShareAll/ProductDetails/ProductDetails";
import ProductDetailsMd from "./Pages/Modarator/ProductDetails/ProductDetailsMd";

const queryClient = new QueryClient()

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
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails></ProductDetails>
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
        path: "payment/:amount",
        element: <Payment></Payment>
      },
      {
        path: "updateProduct/:id",
        element: <UpdateProduct></UpdateProduct>
      },


      // Modarator Dashboard Routes
      {
        path: "productReview",
        element: <ProductReview></ProductReview>
      },
      {
        path: "reportedContent",
        element: <ReportedContent></ReportedContent>
      },
      {
        path: "productDetailsMd/:id",
        element: <ProductDetailsMd></ProductDetailsMd>
      },

      // Admin Dashboard Routes
      {
        path: "statistics",
        element: <Statistics></Statistics>
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>
      },
      {
        path: "manageCoupons",
        element: <ManageCoupons></ManageCoupons>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);