import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";

import Home from "./Pages/Home/Home.jsx";
import Product from "./Pages/Product/Product.jsx";
import Products from "./Pages/Products/Products.jsx";

// Admin Components
import Sidebar from "./Pages/Admin/Sidebar/Sidebar";
import Dashboard from "./Pages/Admin/Dashboard/DashBoard";
import ProductsAdmin from "./Pages/Admin/ProductsAdmin/ProductsAdmin.jsx";
import CategoriesAdmin from "./Pages/Admin/CategoriesAdmin/CategoriesAdmin.jsx";
import LoginSignUp from "./Pages/Auth/LoginSignUp/Login.jsx";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  return (
    <div className="app flex flex-col flex-1">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
};

// Admin Page
const LayoutAdmin = () => {
  return(
    <div className="app flex w-screen min-h-screen gap-8 flex-col md:flex-row">
      <ScrollToTop />
      <Sidebar className="w-1/4 min-w-fit"/>
      <Outlet className="w-full max-w-full"/>
    </div>
  )
};

const router = createBrowserRouter([
  // Main pages
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/product/:id",
        element: <Product />
      },
    ],
  },
  // Admin pages
  {
    path: "admin",
    element: <LayoutAdmin />,
    children: [
      {
        path: "/admin/",
        element: <Dashboard />
      },
      {
        path: "/admin/products",
        element: <ProductsAdmin />
      },
      {
        path: "/admin/categories",
        element: <CategoriesAdmin />
      }
    ]
  },
  // Login page
  {
    path:"login",
    element: <LoginSignUp />
  }
]);

function App(){

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
