import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage.js';
import AdminDashboard from './components/AdminDashboard.js';
import HomePage from './components/HomePage.js';
import ViewProducts from './components/ViewProducts.js';
import ProductsPage from './components/ProductsPage.js';
import UserProfile from './components/UserProfile.js';
import CartPage from './components/CartPage.js';
import Login from "./components/Login";
import CheckoutPage from './components/CheckoutPage.js';
import OrderConfirmationPage from './components/OrderConfirmationPage.js';
import AdminOrders from './components/AdminOrders.js';

const App = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  useEffect(() => {
    const updateRole = () => {
      setUserRole(localStorage.getItem('userRole'));
    };
    window.addEventListener('storage', updateRole);
    return () => window.removeEventListener('storage', updateRole);
  }, []);

  return (
      <Router>
        <Routes>
          {/* Role-based access */}
          <Route
              path="/"
              element={userRole === 'USER' ? <HomePage /> : <Navigate to="/login" />}
          />
          {/* <Route
              path="/admin/Dashboard"
              element={userRole === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />}
          /> */}

          {/* Open access routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ViewProducts />} />
          <Route path="/productPage" element={<ProductsPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orderconfirmation" element={<OrderConfirmationPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/orders" element={<AdminOrders />} />
          {/* Redirect to login if no match */}

        </Routes>
      </Router>
  );
};

export default App;
