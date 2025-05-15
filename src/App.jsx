import React, { useState, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
// import './App.css'
import { useSelector } from "react-redux";
import Login from "./Components/Login";
import SignupPage from "./Components/SignupPage";
import Counter from "./Components/Counter";
import ReduxLogin from "./Components/ReduxLogin";
import ReduxSignup from "./Components/ReduxSignup";
import FormikLogin from "./Components/FormikLogin";
import FormikSignup from "./Components/FormikSignup";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import UnknownPage from "./Components/UnknownPage";
import CategoryPage from "./Pages/CategoryPage";
import Cart from "./Pages/Cart";
import ProductDetail from "./Pages/ProductDetail";
// const Lazy = React.lazy(() => import("./Pages/CategoryPage"));
// Lazy load the Category page
// const CategoryPage = lazy(() => import("./pages/CategoryPage"));

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // return isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />;
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <>
      {/* < SignupPage /> 
            < Login />        */}
      {/* < Counter /> */}
      {/* < ReduxLogin /> 
             < ReduxSignup /> */}
      {/* < FormikLogin />
            < FormikSignup /> */}
      {/* <Navbar />
            < HomePage /> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categoryPage"
            element={
              <ProtectedRoute>
                <CategoryPage />
                {/* <Suspense fallback={<div>Loading...</div>}>
                <CategoryPage />
                </Suspense>   // this is use for full page lazyloading i want to add only for images lazyloading i have add in produtCard file */}  
              </ProtectedRoute> 
            }
          />
          <Route
            path="/product/:sku"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <FormikLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <FormikSignup />
              </PublicRoute>
            }
          />
          {/* Optional 404 Page */}
          {/* <Route path="*" element={<PublicRoute>
              <UnknownPage />
            </PublicRoute>} /> */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <UnknownPage />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
