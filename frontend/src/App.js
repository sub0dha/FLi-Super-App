import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage.js';
import Login from './components/Login.js';
import AdminDashboard from './components/AdminDashboard.js';
import HomePage from './components/HomePage.js';
import ViewProducts from './components/ViewProducts.js';
import ProductsPage from './components/ProductsPage.js';
import UserProfile from './components/UserProfile.js';
import CartPage from './components/CartPage.js';

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
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Role-based access */}
          <Route
              path="/HomePage"
              element={userRole === 'USER' ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
              path="/admin/Dashboard"
              element={userRole === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />}
          />

          {/* Open access routes */}
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ViewProducts />} />
          <Route path="/productPage" element={<ProductsPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cart" element={<CartPage />} />

        </Routes>
      </Router>
  );
};

export default App;
