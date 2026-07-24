import React from "react";
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import ProductDetail from "../pages/public/ProductDetail";
import Wishlist from "../pages/public/Wishlist";
import Categories from "../pages/public/Categories";
import Shop from "../pages/public/Shop";
import Dashboard from "../pages/admin/Dashboard";
import AddProduct from "../pages/admin/AddProduct";
import NotFound from "../pages/NotFound";
import { publicProductsLoader, productDetailLoader } from "./productLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFound />,
    HydrateFallback: () => (
      <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
        Loading Nexus Application...
      </div>
    ),
    children: [
      {
        index: true,
        element: <Home />,
        loader: publicProductsLoader,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
        loader: productDetailLoader,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "shop",
        element: <Shop />,
        loader: publicProductsLoader,
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    errorElement: <NotFound />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
