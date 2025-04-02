import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage.js';
import Login from './components/Login.js';
import UserDashboard from './components/UserDashboard.js';
import AdminDashboard from './components/AdminDashboard.js';
import HomePage from './components/HomePage.js';
import ViewProducts from './components/ViewProducts.js';
import ProductsPage from './components/ProductsPage.js';

const App = () => {
  const userRole = localStorage.getItem('userRole');

  return (
    <Router>
      <Routes>
        {/* Routes for user registration and login */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* User Role Based Dashboard */}
        <Route
          path="/dashboard/user"
          element={userRole === 'USER' ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/admin"
          element={userRole === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        {/* Routes for viewing and managing products */}
        <Route path="/products" element={<ViewProducts />} />
        <Route path="/productPage" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
